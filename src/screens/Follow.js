import React from "react"

import {
    ScrollView,
    View
} from "react-native"

import TopBar from "../customComps/TopBar"

import List from "../customComps/List"

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
                            <List
                                key = {index.toString()}
                                navigation = {props.navigation}
                                username = {item}
                            />
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}