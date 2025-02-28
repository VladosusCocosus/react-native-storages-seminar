import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import {RootNavigation} from "./navigation";
import {Main} from "./screens/main";
import {Setting} from "./screens/setting";
import {DarkTheme, LightTheme} from "./themes";
import {useColorScheme} from "react-native";
import {useMMKVString} from "react-native-mmkv";
import {Theme} from "./theme";

const Tab = createBottomTabNavigator<RootNavigation>()

export function RootNavigator() {
    const scheme = useColorScheme()
    const [ theme ] = useMMKVString('color-scheme')

    let themesMap = {
        light: LightTheme,
        dark: DarkTheme,
        auto: scheme === 'light' ? LightTheme : DarkTheme
    }

    return (
        <NavigationContainer theme={themesMap[theme as Theme ?? 'auto']}>
            <Tab.Navigator initialRouteName={'Main'}>
                <Tab.Screen
                    name={'Main'}
                    component={Main}
                    options={{
                        headerShown:false
                    }}
                />
                <Tab.Screen
                    name={'Settings'}
                    component={Setting}
                    options={{
                        headerShown:false
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
