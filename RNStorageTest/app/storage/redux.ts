import {combineReducers, createStore} from 'redux'
import {MMKV} from "react-native-mmkv";
import {persistReducer, persistStore, Storage} from 'redux-persist'
import tasksReducer from '../redux/task-reducer'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const storage = new MMKV()


export const reduxStorage: Storage = {
    setItem: (key, value) => {
        storage.set(key, value)
        return Promise.resolve(true)
    },
    getItem: (key) => {
        let value = storage.getString(key)
        return Promise.resolve(value)
    },
    removeItem: (key) => {
        storage.delete(key)
        return Promise.resolve()
    }
}

const rootPersistConfig = {
    key: 'root',
    storage: reduxStorage
}

const tasksPersistConfig = {
    key: 'tasks',
    storage: reduxStorage
}

const rootReducer = combineReducers({
    tasks: persistReducer(tasksPersistConfig, tasksReducer),
})

let persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

