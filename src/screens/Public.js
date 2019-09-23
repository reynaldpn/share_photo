import React, {
    useEffect,
    useState
} from 'react'

import {
    ScrollView,
    View
} from 'react-native'

import {
    GetRealmObjs
} from '../helpers/Realm'

import ImageView from 'react-native-image-view'

import Post from '../customComps/Post'

import {
    SetImages
} from '../helpers/ImageView'

import TopBar from '../customComps/TopBar'

import {
    API
} from '../refs/API'

export default Public = props => {
    const [photos, setPhotos] = useState([])
    const [viewedImageURI, setViewedImageURI] = useState("")

    useEffect(() => {
        LoadPhotos()
        
        let focusListener = props.navigation.addListener('willFocus', () => LoadPhotos())

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
                title = "Public"
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
                    photos.map((item, index) => {
                        return (
                            <View
                                key = {index.toString()}
                                style = {{
                                    marginTop: index == 0 ? 0 : 20
                                }}
                            >
                                <Post
                                    item = {item}
                                    navigation = {props.navigation}
                                    ViewImage = {imageURI => setViewedImageURI(imageURI)}
                                />
                            </View>
                        )
                    })
                }
            </ScrollView>

            <ImageView
                images = {SetImages([viewedImageURI])}
                onClose = {() => setViewedImageURI("")}
                isVisible = {viewedImageURI != ""}
            />
        </View>
    )

    function LoadPhotos() {
        API().GetUsers()
        .then(res => {
            if(res.trim()[0] == "{" || res.trim()[0] == "[") {
                let username = GetRealmObjs(require("../refs/realmSess").Session)[0].username

                let users = JSON.parse(res)

                let following = []

                for(let user of users) {
                    if(user.username == username) {
                        following = user.following

                        break
                    }
                }

                API().GetPosts()
                .then(res => {
                    if(res.trim()[0] == "{" || res.trim()[0] == "[") {
                        let posts = JSON.parse(res)

                        let photos = []

                        for(let post of posts) {
                            let postShouldBeDisplayed = false

                            if(post.username == username) {
                                postShouldBeDisplayed = true
                            }

                            for(let followingPerson of following) {
                                if(post.username == followingPerson) {
                                    postShouldBeDisplayed = true

                                    break
                                }
                            }

                            if(postShouldBeDisplayed) {
                                photos.push(post)
                            }
                        }

                        photos.sort((a, b) => (a.time < b.time) ? 1 : ((b.time < a.time) ? -1 : 0))

                        setPhotos(photos)
                    }
                })
            }
        })
    }
}