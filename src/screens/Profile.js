import React from "react"

import ProfileDetails from "./ProfileDetails"

import {
    GetRealmObjs
} from "../helpers/Realm"

export default Profile = props => {
    return (
        <ProfileDetails
            cannotGoBack
            username = {GetRealmObjs(require("../refs/realmSess").Session)[0].username}
            navigation = {props.navigation}
        />
    )
}