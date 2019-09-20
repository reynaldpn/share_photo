import React, {
    useEffect,
    useState
} from 'react'

import {
    NavigationActions,
    StackActions
} from 'react-navigation'

import {
    Dimensions,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native'

import ImageView from 'react-native-image-view'

import {
    GetRealmObjs
} from '../helpers/Realm'

import {
    SetImages
} from '../helpers/ImageView'

import TopBar from '../customComps/TopBar'

export default ProfileDetails = props => {
    let [isThisUserSession, setIsThisUserSession] = useState(false)
    let [username, setUsername] = useState("")
    let [photos, setPhotos] = useState([])
    let [following, setFollowing] = useState([])
    let [follower, setFollower] = useState([])
    let [showMode, setShowMode] = useState("Grid")
    let [viewedImageURI, setViewedImageURI] = useState("")

    useEffect(() => {
        let pickedUsername = ""

        if(props.username != undefined) {
            pickedUsername = props.username
        } else if(props.navigation.getParam("username") != undefined) {
            pickedUsername = props.navigation.getParam("username")
        }

        setUsername(pickedUsername)
        setIsThisUserSession(pickedUsername == GetRealmObjs(require("../refs/realmSess").Session)[0].username)

        LoadProfile(pickedUsername)
        LoadPhotos(pickedUsername)
    }, [])

    return (
        <View
            style = {{
                flex: 1
            }}
        >
            <TopBar
                title = "Profile Details"
                navigation = {props.cannotGoBack ? null : props.navigation}
            />
                    
            <View
                style = {{
                    backgroundColor: "white",
                    borderBottomColor: "lightgray",
                    borderBottomWidth: 1,
                    elevation: 4,
                    padding: 20
                }}
            >
                <View
                    style = {{
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <Text
                        style = {{
                            fontSize: 24,
                            fontWeight: "bold"
                        }}
                    >
                        {username}
                    </Text>

                    {
                        isThisUserSession ?
                            <TouchableOpacity
                                activeOpacity = {0.7}
                                onPress = {() => Logout()}
                                style = {{
                                    backgroundColor: "salmon",
                                    borderRadius: 10,
                                    padding: 10
                                }}
                            >
                                <Text
                                    style = {{
                                        fontSize: 18,
                                        fontWeight: "bold"
                                    }}
                                >
                                    Logout
                                </Text>
                            </TouchableOpacity>
                            :
                            null
                            // <TouchableOpacity
                            //     activeOpacity = {0.7}
                            //     style = {{
                            //         backgroundColor: "rgb(0, 200, 255)",
                            //         borderRadius: 10,
                            //         padding: 10
                            //     }}
                            // >
                            //     <Text
                            //         style = {{
                            //             fontSize: 18,
                            //             fontWeight: "bold"
                            //         }}
                            //     >
                            //         Follow
                            //     </Text>
                            // </TouchableOpacity>
                    }
                </View>

                <View
                    style = {{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 20
                    }}
                >
                    <TouchableOpacity
                        activeOpacity = {0.7}
                        onPress = {() => props.navigation.push("Follow", {title: "Following", peoples: following})}
                        style = {{
                            alignItems: "center",
                            borderRadius: 10,
                            borderWidth: 1,
                            padding: 5,
                            width: (Dimensions.get("screen").width - 60) / 2
                        }}
                    >
                        <Text>
                            {following.length} Following
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity = {0.7}
                        onPress = {() => props.navigation.push("Follow", {title: "Follower", peoples: follower})}
                        style = {{
                            alignItems: "center",
                            borderRadius: 10,
                            borderWidth: 1,
                            padding: 5,
                            width: (Dimensions.get("screen").width - 60) / 2
                        }}
                    >
                        <Text>
                            {follower.length} Follower
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View
                style = {{
                    backgroundColor: "white",
                    elevation: 4,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    padding: 20
                }}
            >
                <TouchableOpacity
                    onPress = {() => setShowMode("Grid")}
                >
                    <Image
                        resizeMode = "contain"
                        source = {showMode == "Grid" ? require("../icons/grid-selected.png") : require("../icons/grid.png")}
                        style = {{
                            height: 25,
                            width: 25
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress = {() => setShowMode("List")}
                >
                    <Image
                        resizeMode = "contain"
                        source = {showMode == "List" ? require("../icons/list-selected.png") : require("../icons/list.png")}
                        style = {{
                            height: 25,
                            width: 25
                        }}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                style = {{
                    backgroundColor: "gainsboro",
                    flex: 1
                }}
            >
                <View
                    style = {{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginBottom: showMode == "List" ? 10 : 0,
                        paddingBottom: 10,
                        paddingLeft: 20,
                        paddingTop: 20
                    }}
                >
                    {
                        photos.map((item, index) => {
                            return (
                                <View
                                    key = {index.toString()}
                                >
                                    {
                                        showMode == "Grid" ?
                                            <TouchableOpacity
                                                activeOpacity = {0.7}
                                                onPress = {() => setViewedImageURI(item.photo_url)}
                                            >
                                                <Image
                                                    resizeMode = "cover"
                                                    source = {{uri: item.photo_url}}
                                                    style = {{
                                                        backgroundColor: "lightgray",
                                                        height: (Dimensions.get("screen").width - 60) / 3,
                                                        marginRight: 10,
                                                        marginBottom: 10,
                                                        width: (Dimensions.get("screen").width - 60) / 3
                                                    }}
                                                />
                                            </TouchableOpacity>
                                            :
                                            <View
                                                style = {{
                                                    marginTop: index == 0 ? 0 : 20
                                                }}
                                            >
                                                <Post
                                                    item = {item}
                                                    navigation = {props.navigation}
                                                    fromProfileDetailsOfUsername = {username}
                                                    ViewImage = {imageURI => setViewedImageURI(imageURI)}
                                                />
                                            </View>
                                    }
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>

            <ImageView
                images = {SetImages([viewedImageURI])}
                onClose = {() => setViewedImageURI("")}
                isVisible = {viewedImageURI != ""}
            />
        </View>
    )

    function LoadProfile(pickedUsername) {
        fetch("https://reynova.000webhostapp.com/share-photo/users.json")
        .then(res => res.json())
        .then(resJson => {
            let users = resJson.data

            for(let user of users) {
                if(user.username == pickedUsername) {
                    setFollowing(user.following)
                    setFollower(user.follower)

                    break
                }
            }
        })
    }

    function LoadPhotos(pickedUsername) {
        fetch("https://reynova.000webhostapp.com/share-photo/photos.json")
        .then(res => res.json())
        .then(resJson => {
            let posts = resJson.data

            let photos = []

            for(let post of posts) {
                if(post.username == pickedUsername) {
                    photos.push(post)
                }
            }

            photos.sort((a, b) => (a.time < b.time) ? 1 : ((b.time < a.time) ? -1 : 0))

            setPhotos(photos)
        })
    }

    function Logout() {
        let realmSess = require("../refs/realmSess").Session

        realmSess.realm.write(() => {
            realmSess.realm.delete(GetRealmObjs(realmSess)[0])
        })

        props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Login" })],
            })
        )
    }
}