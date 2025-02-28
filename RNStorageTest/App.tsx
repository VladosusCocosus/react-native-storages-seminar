import { AsyncStorageExample } from "./app/async-storage";
import {SafeAreaView, StatusBar, ActivityIndicator, View, AppState} from "react-native";
import { ReduxExample } from "./app/redux";
import {store, persistor} from './app/storage/redux'
import { Provider } from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryExample} from "./app/react-query";
import {PersistQueryClientProvider} from "@tanstack/react-query-persist-client";
import {clientPersister} from './app/storage/react-query'
import { RootNavigator} from "./app/theme";

const queryClient = new QueryClient()

function App () {
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={'light-content'}/>

        <View>
            {/*<AsyncStorageExample/>*/}

            {/*<Provider store={store}>*/}
            {/*    <PersistGate persistor={persistor} loading={<ActivityIndicator/>}>*/}
            {/*        <ReduxExample/>*/}
            {/*    </PersistGate>*/}
            {/*</Provider>*/}


            {/*<QueryClientProvider client={queryClient}>*/}
            {/*    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: clientPersister }}>*/}
            {/*        <ReactQueryExample/>*/}
            {/*    </PersistQueryClientProvider>*/}
            {/*</QueryClientProvider>*/}
        </View>


        <RootNavigator/>
    </SafeAreaView>

  );
}


export default App;
