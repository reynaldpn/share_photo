import React from "react"

import {
    Image,
    Text,
    TouchableOpacity,
    View
} from "react-native"

export default TopBar = props => {
    return (
        <View
            style = {{
                alignItems: "center",
                backgroundColor: "mediumseagreen",
                elevation: 8,
                flexDirection: "row",
                height: 60,
                paddingHorizontal: 20
            }}
        >
            {
                props.navigation == undefined ?
                    null
                    :
                    <TouchableOpacity
                        activeOpacity = {0.7}
                        onPress = {() => props.navigation.pop()}
                        style = {{
                            marginRight: 10
                        }}
                    >
                        <Image
                            resizeMode = "contain"
                            source = {require("../icons/back.png")}
                            style = {{
                                height: 25,
                                width: 25
                            }}
                        />
                    </TouchableOpacity>
            }

            <Text
                style = {{
                    color: "white",
                    fontSize: 24,
                    fontWeight: "bold"
                }}
            >
                {props.title}
            </Text>
        </View>
    )
}