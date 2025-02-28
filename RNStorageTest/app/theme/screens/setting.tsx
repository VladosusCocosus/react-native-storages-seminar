import {Pressable, Text, View} from "react-native";
import {storage} from "../../storage/redux";
import {Theme} from "../theme";
import {useMMKVString} from "react-native-mmkv";
import {useTheme} from "@react-navigation/native";

export function Setting() {
    const [ theme ] = useMMKVString('color-scheme')
    const { colors } = useTheme()

    return (
        <View style={{ margin: 10 }}>

            <Text style={{ color: colors.text, fontSize: 20, fontWeight: '600' }}>Setting</Text>

            <ChangeThemeButton value={'auto'} label={'Системный'} current={theme as Theme}/>
            <ChangeThemeButton value={'dark'} label={'Темная'} current={theme as Theme}/>
            <ChangeThemeButton value={'light'} label={'Светлая'} current={theme as Theme}/>
        </View>
    )
}

interface Props {
    value: Theme
    label: string
    current: Theme
}

export function ChangeThemeButton({value, label, current}: Props) {
    const {colors} = useTheme()


    function handlePress() {
        if (value === current) {
            return
        }

        storage.set('color-scheme', value)
    }

    return  (
        <Pressable
            onPress={handlePress}
            style={{ padding: 10, margin: 10, backgroundColor: colors.border, borderRadius: 6 }}
        >
            <Text style={{ color: colors.text }}>{label}</Text>
        </Pressable>
    )
}
