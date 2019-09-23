import React, {
    useEffect,
    useRef,
    useState
} from "react"

import {
    NavigationActions,
    StackActions
} from "react-navigation"

import {
    Alert,
    Image,
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"

import {
    RealmRefs
} from "../refs/Realm"

import {
    GetRealmObjs
} from "../helpers/Realm"

import ActivityIndicatorModal from "../customComps/ActivityIndicatorModal"

import {
    API
} from "../refs/API"

export default Login = props => {
    let passwordTextInput = useRef()

    useEffect(() => {
        setTimeout(() => {
            GetBaseURL()
        }, 10)
    }, [])

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [tryLogin, setTryLogin] = useState(false)
    const [loading, setLoading] = useState(true)

    function GetBaseURL() {
        setLoading(true)

        API().GetBaseURL()
        .then(res => {
            if(res.trim()[0] == "{" || res.trim()[0] == "[") {
                require("../refs/baseURL").baseURL = JSON.parse(res).base_url

                let realmSess = require("../refs/realmSess").Session

                setLoading(false)

                if(GetRealmObjs(realmSess).length == 1) {
                    GoToSessionPage()
                }
            } else {
                setLoading(false)

                Alert.alert(
                    "Alert",
                    "Couldn't connect to network!",
                    [
                        {text: 'Reload', onPress: () => GetBaseURL()},
                    ],
                    {cancelable: false}
                )
            }
        })
        .catch(err => {
            setLoading(false)

            Alert.alert(
                "Alert",
                "Couldn't connect to network!",
                [
                    {text: 'Reload', onPress: () => GetBaseURL()},
                ],
                {cancelable: false}
            )
        })
    }

    return (
        <View
            style = {{
                backgroundColor: "dimgray",
                flex: 1
            }}
        >
            <Image
                resizeMode = "cover"
                source = {{uri: "https://images.unsplash.com/photo-1563858272990-ee61741967f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"}}
                style = {{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0
                }}
            />

            <View
                style = {{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0
                }}
            />

            <Text
                style = {{
                    color: "white",
                    fontSize: 48,
                    fontWeight: "bold",
                    marginVertical: 20,
                    textAlign: "center"
                }}
            >
                Share Photo
            </Text>
            
            <View
                style = {{
                    flex: 1,
                    justifyContent: "center",
                    paddingHorizontal: 20
                }}
            >
                <TextInput
                    autoCapitalize = "none"
                    onChangeText = {value => setUsername(value)}
                    onSubmitEditing = {() => passwordTextInput.current.focus()}
                    placeholder = "Username"
                    style = {{
                        backgroundColor: "white",
                        borderRadius: 10,
                        borderWidth: 1,
                        height: 40,
                        paddingHorizontal: 10
                    }}
                    value = {username}
                />

                <TextInput
                    autoCapitalize = "none"
                    onChangeText = {value => setPassword(value)}
                    placeholder = "Password"
                    ref = {passwordTextInput}
                    secureTextEntry
                    style = {{
                        backgroundColor: "white",
                        borderRadius: 10,
                        borderWidth: 1,
                        height: 40,
                        marginTop: 20,
                        paddingHorizontal: 10
                    }}
                    value = {password}
                />
                
                <View
                    style = {{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 20
                    }}
                >
                    <View
                        style = {{
                            backgroundColor: "black",
                            borderRadius: 10,
                            overflow: "hidden"
                        }}
                    >
                        <TouchableOpacity
                            activeOpacity = {0.7}
                            onPress = {() => SubmitLogin()}
                            style = {{
                                backgroundColor: "seagreen",
                                paddingHorizontal: 20,
                                paddingVertical: 10
                            }}
                        >
                            <Text
                                style = {{
                                    color: "white",
                                    fontSize: 20,
                                    fontWeight: "bold"
                                }}
                            >
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style = {{
                            backgroundColor: "black",
                            borderRadius: 10,
                            overflow: "hidden"
                        }}
                    >
                        <TouchableOpacity
                            activeOpacity = {0.7}
                            onPress = {() => SubmitSignUpAndLogin()}
                            style = {{
                                backgroundColor: "seagreen",
                                paddingHorizontal: 20,
                                paddingVertical: 10
                            }}
                        >
                            <Text
                                style = {{
                                    color: "white",
                                    fontSize: 20,
                                    fontWeight: "bold"
                                }}
                            >
                                Sign Up & Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ActivityIndicatorModal
                color = "green"
                visible = {loading || tryLogin}
            />
        </View>
    )

    function SubmitLogin() {
        Keyboard.dismiss()

        if(username === "") {
            alert("Username cannot be empty!")
        } else if(password === "") {
            alert("Password cannot be empty!")
        } else {
            setTimeout(() => {
                setTryLogin(true)
    
                API().GetUsers()
                .then(res => {
                    setTryLogin(false)
    
                    if(res.trim()[0] == "{" || res.trim()[0] == "[") {
                        let users = JSON.parse(res)
        
                        let userFound = false
        
                        for(let user of users) {
                            if(user.username == username.toLowerCase() && user.password == password.toLowerCase()) {
                                userFound = true
        
                                break
                            }
                        }
        
                        if(userFound) {
                            let realmSess = require("../refs/realmSess").Session
        
                            realmSess.realm.write(() => {
                                realmSess.realm.create(realmSess.schemaName, RealmRefs().Session.InitValue({
                                    username: username
                                }))
                            })
        
                            GoToSessionPage()
                        } else {
                            alert("Wrong username or password!")
                        }
                    }
                })
                .catch(err => {
                    setTryLogin(false)
    
                    alert(err.toString())
                })
            }, 10)
        }
    }

    function SubmitSignUpAndLogin() {
        if(username === "") {
            alert("Username cannot be empty!")
        } else if(password === "") {
            alert("Password cannot be empty!")
        } else {
            setTryLogin(true)

            API().GetUsers()
            .then(res => {
                if(res.trim()[0] == "{" || res.trim()[0] == "[") {
                    let userAlreadyRegistered = false
                    
                    for(let user of JSON.parse(res)) {
                        if(username == user.username) {
                            userAlreadyRegistered = true
                        }
                    }

                    if(userAlreadyRegistered) {
                        setTryLogin(false)

                        alert("Username " + username + " is already registered!")
                    } else {
                        API().SignUp({
                            username: username,
                            password: password,
                            following: [],
                            follower: []
                        })
                        .then(res => {
                            setTryLogin(false)
            
                            if(res.trim()[0] == "{" || res.trim()[0] == "[") {
                                let realmSess = require("../refs/realmSess").Session
                    
                                realmSess.realm.write(() => {
                                    realmSess.realm.create(realmSess.schemaName, RealmRefs().Session.InitValue({
                                        username: username
                                    }))
                                })
            
                                GoToSessionPage()
                            }
                        })
                        .catch(err => {
                            setTryLogin(false)
            
                            alert(err.toString())
                        })
                    }
                } else {
                    setTryLogin(false)
                }
            })
            .catch(err => {
                setTryLogin(false)

                alert(err.toString())
            })
        }
    }

    function GoToSessionPage() {
        props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "BottomTab" })],
            })
        )
    }
}