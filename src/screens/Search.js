import React, {
    useEffect,
    useState
} from "react"

import {
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"

import TopBar from "../customComps/TopBar"

export default Search = props => {
    let [searchText, setSearchText] = useState("")
    let [allPeoples, setAllPeoples] = useState([])
    let [peoples, setPeoples] = useState([])

    useEffect(() => {
        LoadPeoples()
    }, [])

    return (
        <View
            style = {{
                flex: 1
            }}
        >
            <TopBar
                title = "Search Peoples"
            />

            <View
                style = {{
                    backgroundColor: "white",
                    elevation: 4,
                    padding: 20
                }}
            >
                <TextInput
                    autoCapitalize = "none"
                    onChangeText = {value => {
                        setSearchText(value)

                        let newPeoples = []

                        if(value == "") {
                            newPeoples = allPeoples
                        } else {
                            for(let people of allPeoples) {
                                if(people.includes(value)) {
                                    newPeoples.push(people)
                                }
                            }
                        }

                        setPeoples(newPeoples)
                    }}
                    placeholder = "Search people username here..."
                    style = {{
                        backgroundColor: "white",
                        borderRadius: 10,
                        borderWidth: 1,
                        height: 40,
                        paddingHorizontal: 10
                    }}
                    value = {searchText}
                />
            </View>

            <KeyboardAvoidingView
                style = {{
                    backgroundColor: "gainsboro",
                    flex: 1
                }}
            >
                <ScrollView
                    contentContainerStyle = {{
                        padding: 20
                    }}
                    style = {{
                        flex: 1
                    }}
                >
                    {
                        peoples.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key = {index.toString()}
                                    onPress = {() => props.navigation.push("ProfileDetails", {username: item})}
                                    style = {{
                                        borderBottomWidth: 1,
                                        paddingVertical: 10
                                    }}
                                >
                                    <Text
                                        key = {index.toString()}
                                        style = {{
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )

    function LoadPeoples() {
        fetch("https://reynova.000webhostapp.com/share-photo/users.json")
        .then(res => res.json())
        .then(resJson => {
            let newPeoples = []

            for(let people of resJson.data) {
                newPeoples.push(people.username)
            }

            setAllPeoples(newPeoples)
            setPeoples(newPeoples)
        })
    }
}