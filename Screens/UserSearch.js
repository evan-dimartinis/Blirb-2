import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useDispatch } from "react-redux";

const UserSearch = (props) => {
    const dispatch = useDispatch()

    return (
        <View style={styles.container}>
            <Text onPress={() => props.navigation.push('User')} >UserSearch Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default UserSearch;