import {ActivityIndicator, Text, View} from "react-native";
import {useQuery} from "@tanstack/react-query";

export function ReactQueryExample() {
    const query = useQuery(['CAT_FACT'], async () => {
        const response = await fetch('https://catfact.ninja/fact')
        if (!response.ok) {
            return null
        }

        return response.json()
    })

    if (!query.isFetched) {
        return <ActivityIndicator/>
    }

    return (
        <View style={{ margin: 10, marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 10  }}>Cat Fact:</Text>

            <Text style={{ backgroundColor: '#f1f1f1', padding: 10, borderRadius: 8 }}>{query?.data?.fact  ?? '-'}</Text>
        </View>
    )
}
