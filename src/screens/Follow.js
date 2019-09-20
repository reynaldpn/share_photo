import React from "react"

import {
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native"

import TopBar from "../customComps/TopBar"

export default Follow = props => {
    return (
        <View
            style = {{
                flex: 1
            }}
        >
            <TopBar
                title = {props.navigation.getParam("title")}
                navigation = {props.navigation}
            />

            <ScrollView
                contentContainerStyle = {{
                    padding: 20
                }}
                style = {{
                    backgroundColor: "gainsboro",
                    flex: 1
                }}
            >
                {
                    props.navigation.getParam("peoples").map((item, index) => {
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
        </View>
    )
}