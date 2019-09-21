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

export default Login = props => {
    let passwordTextInput = useRef()

    useEffect(() => {
        setTimeout(() => {
            let realmSess = require("../refs/realmSess").Session

            setLoadRealm(false)

            if(GetRealmObjs(realmSess).length == 1) {
                GoToSessionPage()
            }
        }, 50)
    }, [])

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [tryLogin, setTryLogin] = useState(false)
    const [loadRealm, setLoadRealm] = useState(true)

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
                    onSubmitEditing = {() => SubmitLogin()}
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
                        alignSelf: "center",
                        backgroundColor: "black",
                        borderRadius: 10,
                        marginTop: 20,
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
                                fontSize: 24,
                                fontWeight: "bold"
                            }}
                        >
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ActivityIndicatorModal
                color = "green"
                visible = {loadRealm || tryLogin}
            />
        </View>
    )

    function SubmitLogin() {
        Keyboard.dismiss()

        setTimeout(() => {
            if(username === "") {
                Alert.alert("Info", "Username cannot be empty!")
            } else if(password === "") {
                Alert.alert("Info", "Password cannot be empty!")
            } else {
                setTryLogin(true)
    
                fetch("https://reynova.000webhostapp.com/share-photo/users.json")
                .then(res => res.json())
                .then(resJson => {
                    setTryLogin(false)
    
                    let users = resJson.data
    
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
                        Alert.alert("Info", "Wrong username or password!")
                    }
                })
            }
        }, 50)
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