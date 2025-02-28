export type RootNavigation = {
    Main: undefined
    Settings: undefined
}


declare global {
    namespace ReactNavigation {
        /* eslint-disable */
        interface RootParamList extends RootNavigation {}
    }
}
