// По большей части различия MMKV и AsyncStorage заключаются в скорости работы
// И Async Storage и MMKV отличный выбор для хранения примитивов (строки, числа)
// MMKV так же отлично справляется с объектами благодаря чему является отлично связкой с redux persist или react query

// Здесь мы разберемся в том, насколько легко сохранить useQuery state
// https://github.com/mrousavy/react-native-mmkv/blob/master/docs/WRAPPER_REACT_QUERY.md#react-query-wrapper


import { View, TextInput, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../storage/redux";
import { complete, createTask, reset } from "./task-reducer";

export function ReduxExample() {
    const [ taskName, setTaskName ] = useState('')
    const tasks = useAppSelector((state) => state.tasks)

    const dispatch = useDispatch()


    return (
        <View style={{ margin: 10, marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 10  }}>Task Manager</Text>
            <TextInput
                onChangeText={(s) => setTaskName(s)}
                value={taskName}
                style={{padding: 10, backgroundColor: '#f1f1f1'}}
                placeholder={'Enter task name'}
                onSubmitEditing={() => {
                    dispatch(createTask({ title: taskName, completed: false, id: String(Math.floor(Math.random() * 100)) }))
                }}
            />
            <Pressable onPress={() => dispatch(reset())}><Text>Reset</Text></Pressable>
            <View>
                {tasks.tasks.map((task) => (
                    <View key={task.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                        <Text>{task.title}</Text>
                        <Pressable
                            style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: task.completed ? '#257535' : '#4e5ed3' , borderRadius: 15 }}
                            onPress={() => dispatch(complete({ id: task.id }))}
                        >
                            <Text style={{ color: 'white'}}>{task.completed ? 'Completed' : 'Done'}</Text>
                        </Pressable>
                    </View>
                ))}
            </View>
        </View>
    )
}
