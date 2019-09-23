import React from "react"

import {
    ActivityIndicator,
    Modal,
    TouchableOpacity,
    View
} from "react-native"

export default ActivityIndicatorModal = props => {
    return (
        <Modal
            transparent
            visible = {props.visible}
        >
            <TouchableOpacity
                activeOpacity = {1}
                onPress = {() => {
                    if(props.Dismiss != undefined) {
                        props.Dismiss()
                    }
                }}
                style = {{
                    bottom: 0,
                    left: 0,
                    position: "absolute",
                    right: 0,
                    top: 0,
                }}
            />

            <View
                pointerEvents = "box-none"
                style = {{
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    flex: 1,
                    justifyContent: "center"
                }}
            >
                <View
                    style = {{
                        backgroundColor: "white",
                        borderRadius: 10,
                        padding: 20
                    }}
                >
                    <ActivityIndicator
                        color = {props.color}
                        size = "large"
                    />
                </View>
            </View>
        </Modal>
    )
}