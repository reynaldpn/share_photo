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

import IconOcticons from 'react-native-vector-icons/Octicons'
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    API
} from '../refs/API'

export default ProfileDetails = props => {
    const [isThisUserSession, setIsThisUserSession] = useState(false)
    const [username, setUsername] = useState("")
    const [photos, setPhotos] = useState([])
    const [following, setFollowing] = useState([])
    const [follower, setFollower] = useState([])
    const [showMode, setShowMode] = useState("Grid")
    const [viewedImageURI, setViewedImageURI] = useState("")
    const [isFollowing, setIsFollowing] = useState(false)

    useEffect(() => {
        let pickedUsername = ""

        if(props.username != undefined) {
            pickedUsername = props.username
        } else if(props.navigation.getParam("username") != undefined) {
            pickedUsername = props.navigation.getParam("username")

            API().GetUsers()
            .then(res => {
                let otherUserDetails = undefined
            
                for(user of JSON.parse(res)) {
                    if(user.username == pickedUsername) {
                        otherUserDetails = user

                        break
                    }
                }

                let currentSessionUsername = GetRealmObjs(require("../refs/realmSess").Session)[0].username

                let alreadyFollowingOtherUser = false

                for(let otherUserFollower of otherUserDetails.follower) {
                    if(otherUserFollower == currentSessionUsername) {
                        alreadyFollowingOtherUser = true

                        break
                    }
                }

                setIsFollowing(alreadyFollowingOtherUser)
            })
        }

        setUsername(pickedUsername)
        setIsThisUserSession(pickedUsername == GetRealmObjs(require("../refs/realmSess").Session)[0].username)

        LoadProfile(pickedUsername)
        LoadPhotos(pickedUsername)

        let focusListener = props.navigation.addListener('willFocus', () => {
            LoadProfile(pickedUsername)
            LoadPhotos(pickedUsername)
        })

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
                                    backgroundColor: "red",
                                    borderRadius: 10,
                                    padding: 10
                                }}
                            >
                                <Text
                                    style = {{
                                        color: "white",
                                        fontSize: 18,
                                        fontWeight: "bold"
                                    }}
                                >
                                    Logout
                                </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                activeOpacity = {0.7}
                                onPress = {() => Follow()}
                                style = {{
                                    backgroundColor: "rgb(0, 200, 255)",
                                    borderRadius: 10,
                                    padding: 10
                                }}
                            >
                                <Text
                                    style = {{
                                        color: "white",
                                        fontSize: 18,
                                        fontWeight: "bold"
                                    }}
                                >
                                    {isFollowing ? "Followed" : "Follow"}
                                </Text>
                            </TouchableOpacity>
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
                    <IconMaterialCommunity
                        name = "grid"
                        size = {30}
                        color = {showMode == "Grid" ? "rgb(0, 200, 255)" : "black"}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress = {() => setShowMode("List")}
                >
                    <IconOcticons
                        name = "three-bars"
                        size = {30}
                        color = {showMode == "List" ? "rgb(0, 200, 255)" : "black"}
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
                                                onPress = {() => setViewedImageURI(item.photo)}
                                            >
                                                <Image
                                                    resizeMode = "cover"
                                                    source = {{uri: item.photo}}
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
        API().GetUsers()
        .then(res => {
            if(res.trim()[0] == "{" || res.trim()[0] == "[") {
                let users = JSON.parse(res)

                for(let user of users) {
                    if(user.username == pickedUsername) {
                        setFollowing(user.following)
                        setFollower(user.follower)

                        break
                    }
                }
            }
        })
    }

    function LoadPhotos(pickedUsername) {
        API().GetPosts()
        .then(res => {
            if(res.trim()[0] == "{" || res.trim()[0] == "[") {
                let posts = JSON.parse(res)

                let photos = []

                for(let post of posts) {
                    if(post.username == pickedUsername) {
                        photos.push(post)
                    }
                }

                photos.sort((a, b) => (a.time < b.time) ? 1 : ((b.time < a.time) ? -1 : 0))

                setPhotos(photos)
            }
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

    function Follow() {
        API().GetUsers()
        .then(res => {
            if(res.trim()[0] == "{" || res.trim()[0] == "[") {
                let otherUserDetails = undefined
                let currentSessionUserDetails = undefined

                for(user of JSON.parse(res)) {
                    if(user.username == username) {
                        otherUserDetails = user

                        break
                    }
                }

                let currentSessionUsername = GetRealmObjs(require("../refs/realmSess").Session)[0].username

                for(user of JSON.parse(res)) {
                    if(user.username == currentSessionUsername) {
                        currentSessionUserDetails = user

                        break
                    }
                }

                let alreadyFollowingOtherUser = false

                for(let otherUserFollower of otherUserDetails.follower) {
                    if(otherUserFollower == currentSessionUsername) {
                        alreadyFollowingOtherUser = true

                        break
                    }
                }

                if(alreadyFollowingOtherUser) {
                    let newOtherUserFollower = []

                    for(let otherUserFollower of otherUserDetails.follower) {
                        if(otherUserFollower != currentSessionUsername) {
                            newOtherUserFollower.push(otherUserFollower)
                        }
                    }

                    otherUserDetails.follower = newOtherUserFollower

                    let newCurrentSessionUserFollowing = []

                    for(let currentSessionUserFollowing of currentSessionUserDetails.following) {
                        if(currentSessionUserFollowing != username) {
                            newCurrentSessionUserFollowing.push(currentSessionUserFollowing)
                        }
                    }

                    currentSessionUserDetails.following = newCurrentSessionUserFollowing
                } else {
                    otherUserDetails.follower.push(currentSessionUsername)

                    currentSessionUserDetails.following.push(username)
                }

                setIsFollowing(!alreadyFollowingOtherUser)

                API().Follow(otherUserDetails)
                .then(res => {
                    LoadProfile(username)
                    LoadPhotos(username)
                })

                API().Follow(currentSessionUserDetails)
                .then(res => {
                    LoadProfile(username)
                    LoadPhotos(username)
                })
            }
        })
    }
}