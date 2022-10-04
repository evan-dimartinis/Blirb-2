import React from "react";
import { View, Text, StyleSheet } from "react-native"
import Colors from "./Colors";

class ListName extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.listnametext}>
                My List 1
            </Text>
        </View>
    )
    }
    
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        height: 100,
        width: "90%",
        alignSelf: "center",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        borderColor: "white",
        backgroundColor: "white",
        marginVertical: 20,
        margin: "5%",
        borderRadius: 10,
        borderWidth: 3,
        borderColor: Colors.secondary
    },
    listnametext: {
        fontSize: 30,
        fontWeight: "600",
        color: Colors.primary,
        margin: 5
    }
})

export default ListName;