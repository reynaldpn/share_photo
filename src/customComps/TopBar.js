import React from "react"

import {
    Text,
    TouchableOpacity,
    View
} from "react-native"

import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'

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
                        <IconMaterialCommunity
                            name = "arrow-left"
                            size = {30}
                            color = "white"
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