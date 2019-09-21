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
    View
} from "react-native"

import IconMaterial from "react-native-vector-icons/MaterialIcons"
import IconEntypo from "react-native-vector-icons/Entypo"
import ActivityIndicatorModal from './src/customComps/ActivityIndicatorModal'

const BottomTab = createBottomTabNavigator(
    {
        Public: {
            screen: Public,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <IconMaterial name = "public" size = {25} color = {tintColor} />
                )
            }
        },
        Search: {
            screen: Search,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <IconMaterial name = "search" size = {27} color = {tintColor} />
                )
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <IconEntypo name = "user" size = {22} color = {tintColor} />
                )
            }
        }
    },
    {
        tabBarOptions: {
            style: {
                backgroundColor: "seagreen"
            },
            activeTintColor: "lightyellow",
            inactiveTintColor: "lightgray"
        }
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
            <View
                style = {{
                    backgroundColor: "white",
                    flex: 1
                }}
            >
                {
                    realmsLoaded ?
                        <Stack />
                        :
                        null
                }

                <ActivityIndicatorModal
                    color = "green"
                    visible = {!realmsLoaded}
                />
            </View>
        </ViewContainer>
    )
}