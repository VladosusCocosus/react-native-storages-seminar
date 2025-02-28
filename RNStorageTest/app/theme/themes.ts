import { DefaultTheme, DarkTheme as DarkThemeSystem } from '@react-navigation/native'


export let LightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        'text': '#2E466A',
        'background': '#f0f2f5',

        // New Design
        'blue': '#458EF8',
        'dark-blue': '#3577D6',
        'gray': '#DDDDDD',
        'dark-gray': '#5F6B7C',
        'red-border': '#FFE1E1',
        'purple-blue': '#2B5493',
        'gray-text': '#484848',
        'red': '#CF5035',
        'green': '#1BA875',
        'green-border': '#D8F5D9',
        'orange': '#E39826',
        'light-gray': '#CFD5DD'
    }
}

export let DarkTheme = {
    ...DarkThemeSystem,
    colors: {
        ...DarkThemeSystem.colors,
        'text': '#E2EBFA',
        'background': '#111111',

        // New Design
        'blue': '#458EF8',
        'dark-blue': '#3577D6',
        'purple-blue': '#2B5493',
        'gray': '#232323',
        'dark-gray': '#4A5568',
        'red-border': '#FFE1E1',
        'gray-text': '#A0A0A0',
        'red': '#7c0808',
        'orange': '#E39826',
        'green': '#1BA875',
        'green-border': '#D8F5D9',
        'light-gray': '#CFD5DD'
    }
}
