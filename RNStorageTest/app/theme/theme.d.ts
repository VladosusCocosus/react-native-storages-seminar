import '@react-navigation/native'
import { ColorValue } from 'react-native'

type Theme = 'light' | 'dark' | 'auto'

// Override the theme in react native navigation to accept our custom theme props.
declare module '@react-navigation/native' {
    export type ExtendedTheme = {
        dark: boolean;
        colors: {
            secondary: ColorValue
            tertiary: ColorValue
            danger: ColorValue
            background: ColorValue
            card: ColorValue
            text: ColorValue
            subtext: ColorValue
            separator: ColorValue
            border: ColorValue
            notification: ColorValue

            // New design
            blue: ColorValue // 458EF8
            'dark-blue': ColorValue // 3577D6
            'purple-blue': ColorValue // 2B5493
            gray: ColorValue // DDDDDD
            'dark-gray': ColorValue // 4A5568
            'red-border': ColorValue // FFE1E1
            'orange': ColorValue
            'gray-text': ColorValue // A0A0A0
            'red': ColorValue // 9C4949
            'green-border': ColorValue // D8F5D9
            'green': ColorValue // 346035
            'light-gray': ColorValue // CFD5DD
        };
    };
    export function useTheme(): ExtendedTheme;
}
