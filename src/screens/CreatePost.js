import React, {
    useState
} from "react"

import {
    Dimensions,
    Image,
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"

import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'
import ImgToBase64 from 'react-native-image-base64'
import ImageView from 'react-native-image-view'

import TopBar from "../customComps/TopBar"

import {
    SetImages
} from "../helpers/ImageView"
import { API } from "../refs/API"
import { GetRealmObjs } from "../helpers/Realm"

const options = {
    title: 'Select Picture',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
}

export default CreatePost = props => {
    const [selectedImage, setSelectedImage] = useState("")
    const [viewedImageURI, setViewedImageURI] = useState("")
    const [caption, setCaption] = useState("")

    return (
        <View
            style = {{
                flex: 1
            }}
        >
            <TopBar
                title = "Create Post"
            />

            <View
                style = {{
                    flex: 1,
                    padding: 20
                }}
            >
                <View
                    style = {{
                        height: (Dimensions.get("screen").width - 40) / 16 * 9,
                        width: Dimensions.get("screen").width - 40
                    }}
                >
                    {
                        selectedImage != "" ?
                            <TouchableOpacity
                                activeOpacity = {0.7}
                                onPress = {() => setViewedImageURI(selectedImage)}
                                style = {{
                                    backgroundColor: "white",
                                    borderRadius: 10,
                                    elevation: 4,
                                    flex: 1,
                                    overflow: "hidden"
                                }}
                            >
                                <Image
                                    resizeMode = "cover"
                                    source = {{uri: selectedImage}}
                                    style = {{
                                        flex: 1
                                    }}
                                />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress = {() => {
                                    if(selectedImage == "") {
                                        ImagePicker.showImagePicker(options, (response) => {
                                            if (response.didCancel) {
                                                
                                            } else if (response.error) {
                                                alert(response.error.toString())
                                            } else {
                                                ProcessImageToBase64(response.uri)
                                            }
                                        })
                                    }
                                }}
                                style = {{
                                    alignItems: "center",
                                    borderRadius: 10,
                                    borderStyle: "dashed",
                                    borderWidth: 1,
                                    flex: 1,
                                    justifyContent: "center",
                                }}
                            >
                                <Text
                                    style = {{
                                        color: "darkgray",
                                        fontSize: 24,
                                        fontWeight: "bold"
                                    }}
                                >
                                    + Add Photo
                                </Text>
                            </TouchableOpacity>
                    }
                </View>

                <TextInput
                    onChangeText = {value => setCaption(value)}
                    placeholder = "Add caption..."
                    style = {{
                        borderRadius: 10,
                        borderWidth: 1,
                        height: 40,
                        marginTop: 20,
                        paddingHorizontal: 10
                    }}
                    value = {caption}
                />

                <View
                    style = {{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 20
                    }}
                >
                    <View
                        style = {{
                            backgroundColor: "black",
                            borderRadius: 10,
                            overflow: "hidden"
                        }}
                    >
                        <TouchableOpacity
                            activeOpacity = {0.7}
                            disabled = {selectedImage == ""}
                            onPress = {() => PostNow()}
                            style = {{
                                alignItems: "center",
                                backgroundColor: selectedImage != "" ? "goldenrod" : "dimgray",
                                paddingHorizontal: 20,
                                paddingVertical: 10
                            }}
                        >
                            <Text
                                style = {{
                                    color: "white",
                                    fontSize: 20,
                                    fontWeight: "bold"
                                }}
                            >
                                Post Now!
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {
                        selectedImage != "" ?
                            <View
                                style = {{
                                    backgroundColor: "black",
                                    borderRadius: 10,
                                    overflow: "hidden"
                                }}
                            >
                                <TouchableOpacity
                                    activeOpacity = {0.7}
                                    onPress = {() => {
                                        ImagePicker.showImagePicker(options, (response) => {
                                            if (response.didCancel) {
                                                
                                            } else if (response.error) {
                                                alert(response.error.toString())
                                            } else {
                                                ProcessImageToBase64(response.uri)
                                            }
                                        })
                                    }}
                                    style = {{
                                        alignItems: "center",
                                        backgroundColor: "seagreen",
                                        paddingHorizontal: 20,
                                        paddingVertical: 10
                                    }}
                                >
                                    <Text
                                        style = {{
                                            color: "white",
                                            fontSize: 20,
                                            fontWeight: "bold"
                                        }}
                                    >
                                        Change Photo
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            :
                            null
                    }
                </View>
            </View>

            <ImageView
                images = {SetImages([viewedImageURI])}
                onClose = {() => setViewedImageURI("")}
                isVisible = {viewedImageURI != ""}
            />
        </View>
    )

    function ProcessImageToBase64(uri) {
        let RNGRP = require('react-native-get-real-path')

        RNGRP.getRealPathFromURI(uri).then(filePath => {
            Image.getSize("file://" + filePath, (width, height) => {
                ImageResizer.createResizedImage("file://" + filePath, width / 4, height / 4, "JPEG", 85).then((response) => {
                    ImgToBase64.getBase64String(response.uri)
                    .then(base64String => {
                        setSelectedImage("data:image/jpeg;base64," + base64String)
                    })
                    .catch(err => {
                        alert(err.toString())
                    })
                }).catch((err) => {
                    alert(err.toString())
                })
            })
        })
    }

    function PostNow() {
        Keyboard.dismiss()

        API().UploadPost({
            username: GetRealmObjs(require("../refs/realmSess").Session)[0].username,
            photo: selectedImage,
            caption: caption,
            time: (new Date()).getTime()
        })
        .then(res => {
            if(res.trim()[0] == "{" || res.trim()[0] == "[") {
                setSelectedImage("")
                setCaption("")

                props.navigation.navigate("Profile")
            }
        })
    }
}