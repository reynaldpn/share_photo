import React from "react"

import {
    Text,
    TouchableOpacity
} from "react-native"

export default List = props => {
    return (
        <TouchableOpacity
            onPress = {() => props.navigation.push("ProfileDetails", {username: props.username})}
            style = {{
                borderBottomWidth: 1,
                paddingVertical: 10
            }}
        >
            <Text
                style = {{
                    fontWeight: "bold"
                }}
            >
                {props.username}
            </Text>
        </TouchableOpacity>
    )
}