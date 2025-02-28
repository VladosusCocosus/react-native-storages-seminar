import {Pressable, ScrollView, Text, View} from "react-native";
import {getData, storeData} from "../storage/async-storage";
import {useEffect, useState} from "react";

export function AsyncStorageExample() {
    const [ value, setValue ] = useState<string | null | undefined>(null)

    function onChange(value: string) {
        storeData('key', value)
            .then(() => {
                setValue(value)
            })
    }

    useEffect(() => {
        getData('key')
            .then((response) => {
                setValue(response)
            })
    }, [])

    return (
        <View style={{ margin: 10, marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 10 }}>Текущиее значение: {value ?? '-'}</Text>
            <Pressable
                onPress={() => onChange('new item')}
                style={{ padding: 10, backgroundColor: '#80b0e0', margin: 5, borderRadius: 10}}
            >
                <Text>Add new item</Text>
            </Pressable>


            <Pressable
                onPress={() => onChange('1')}
                style={{ padding: 10, backgroundColor: '#80b0e0', margin: 5, borderRadius: 10}}
            >
                <Text>Set value 1</Text>
            </Pressable>

            <Pressable
                onPress={() => onChange('2')}
                style={{ padding: 10, backgroundColor: '#80b0e0', margin: 5, borderRadius: 10}}
            >
                <Text>Set value 2</Text>
            </Pressable>

            <Pressable
                onPress={() => onChange('3')}
                style={{ padding: 10, backgroundColor: '#80b0e0', margin: 5, borderRadius: 10}}
            >
                <Text>Set value 3</Text>
            </Pressable>
        </View>
    )
}
