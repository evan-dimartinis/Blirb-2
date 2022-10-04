import React from "react";
import { StyleSheet, View, Text } from "react-native";

const PodcastEpisodes = (props) => {


    return (
        <View style={styles.container}>
            <Text onPress={() => {
                props.navigation.pop();
            }}>
                AYO
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default PodcastEpisodes;