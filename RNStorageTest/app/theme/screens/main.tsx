import {Text, View} from "react-native";
import {useTheme} from "@react-navigation/native";

export function Main() {
    const { colors } = useTheme()

    return (
        <View style={{ backgroundColor: colors.background }}>
            <Text style={{ color: colors.text }}>Main</Text>



            <View style={{ width: 40, height: 40, backgroundColor: colors.red}}></View>
        </View>
    )
}
