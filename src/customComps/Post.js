import React from "react"

import {
    Dimensions,
    Image,
    Text,
    TouchableOpacity,
    View
} from "react-native"

export default Post = props => {
    return (
        <View
            style = {{
                backgroundColor: "white",
                borderRadius: 5,
                overflow: "hidden"
            }}
        >
            <View
                style = {{
                    padding: 10
                }}
            >
                <TouchableOpacity
                    disabled = {props.fromProfileDetailsOfUsername == props.item.username}
                    onPress = {() => props.navigation.push("ProfileDetails", {username: props.item.username})}
                >
                    <Text
                        style = {{
                            fontSize: 18,
                            fontWeight: "bold"
                        }}
                    >
                        {props.item.username}
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                activeOpacity = {0.7}
                onPress = {() => props.ViewImage(props.item.photo)}
            >
                <Image
                    resizeMode = "cover"
                    source = {{uri: props.item.photo}}
                    style = {{
                        backgroundColor: "dimgray",
                        height: (Dimensions.get("screen").width - 40) / 16 * 9,
                        width: Dimensions.get("screen").width - 40
                    }}
                />
            </TouchableOpacity>

            <View
                style = {{
                    padding: 10
                }}
            >
                <Text>
                    {props.item.caption}
                </Text>
            </View>
        </View>
    )
}