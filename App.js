import React, {
    useEffect,
    useState
} from 'react'

import {
    OpenRealmSess
} from './src/helpers/Realm'

import {
    RealmRefs
} from './src/refs/Realm'

import {
    createAppContainer
} from 'react-navigation'

import {
    createStackNavigator
} from 'react-navigation-stack'

import {
    createBottomTabNavigator
} from 'react-navigation-tabs'

import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator'

import ViewContainer from './src/comps/ViewContainer'

import Login from './src/screens/Login'
import ProfileDetails from './src/screens/ProfileDetails'
import Follow from './src/screens/Follow'
import Public from './src/screens/Public'
import Profile from './src/screens/Profile'
import Search from './src/screens/Search'

import {
    ActivityIndicator,
    View
} from "react-native"

const BottomTab = createBottomTabNavigator(
    {
        Public,
        Search,
        Profile
    }
)

const Stack = createAppContainer(createStackNavigator(
    {
        Login,
        BottomTab,
        ProfileDetails,
        Follow
    },
    {
        defaultNavigationOptions: {
            header: null
        },
        transitionConfig: () => ({screenInterpolator: sceneProps => StackViewStyleInterpolator.forHorizontal(sceneProps)})
    }
))

export default App = props => {
    let [realmsLoaded, setRealmsLoaded] = useState(false)

    useEffect(() => {
        OpeningRealms()

        return () => { }
    }, [])

    async function OpeningRealms() {
        require("./src/refs/realmSess").Session = await OpenRealmSess(RealmRefs().Session)

        setRealmsLoaded(true)
    }

    return (
        <ViewContainer
            statusBarColor = "seagreen"
            statusBarStyle = "light-content"
        >
            {
                realmsLoaded ?
                    <Stack />
                    :
                    <View
                        style = {{
                            alignItems: "center",
                            backgroundColor: "dimgray",
                            flex: 1,
                            justifyContent: "center"
                        }}
                    >
                        <ActivityIndicator
                            color = "mediumseagreen"
                            size = "large"
                        />
                    </View>
            }
        </ViewContainer>
    )
}