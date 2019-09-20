import React, {
    useEffect,
    useState
} from "react"

import {
    NavigationActions,
    StackActions
} from "react-navigation"

import {
    Alert,
    Image,
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

export default Login = props => {
    useEffect(() => {
        let realmSess = require("../refs/realmSess").Session

        if(GetRealmObjs(realmSess).length == 1) {
            GoToSessionPage()
        }
    }, [])

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

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

            <Text
                style = {{
                    color: "white",
                    fontSize: 36,
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
                
                <TouchableOpacity
                    activeOpacity = {0.7}
                    onPress = {() => SubmitLogin()}
                    style = {{
                        alignSelf: "center",
                        backgroundColor: "seagreen",
                        borderRadius: 10,
                        marginTop: 20,
                        padding: 10
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
    )

    function SubmitLogin() {
        if(username === "") {
            Alert.alert("Info", "Username cannot be empty!")
        } else if(password === "") {
            Alert.alert("Info", "Password cannot be empty!")
        } else {
            fetch("https://reynova.000webhostapp.com/share-photo/users.json")
            .then(res => res.json())
            .then(resJson => {
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