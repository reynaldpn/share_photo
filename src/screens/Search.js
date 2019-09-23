import React, {
    useEffect,
    useState
} from "react"

import {
    KeyboardAvoidingView,
    ScrollView,
    TextInput,
    View
} from "react-native"

import TopBar from "../customComps/TopBar"
import List from "../customComps/List"

import {
    API
} from "../refs/API"

export default Search = props => {
    const [searchText, setSearchText] = useState("")
    const [allPeoples, setAllPeoples] = useState([])
    const [peoples, setPeoples] = useState([])

    useEffect(() => {
        LoadPeoples()
        
        let focusListener = props.navigation.addListener('willFocus', () => LoadPeoples())

        return (() => {
            focusListener.remove()
        })
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
                                <List
                                    key = {index.toString()}
                                    navigation = {props.navigation}
                                    username = {item}
                                />
                            )
                        })
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )

    function LoadPeoples() {
        API().GetUsers()
        .then(res => {
            if(res.trim()[0] == "{" || res.trim()[0] == "[") {
                let newPeoples = []

                for(let people of JSON.parse(res)) {
                    newPeoples.push(people.username)
                }

                setAllPeoples(newPeoples)
                setPeoples(newPeoples)
            }
        })
    }
}