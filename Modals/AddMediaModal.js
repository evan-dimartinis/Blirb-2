import React from "react";
import { View, Text, StyleSheet, Modal } from "react-native";

const AddMediaModal = (props) => {
  return (
    <Modal visible={props.visible} animationType="fade">
      <View style={styles.container}>
        <View style={styles.topcontainer}>

        </View>
        <View style={styles.descriptioncontainer}>

        </View>
        <View style={styles.listscontainer}>

        </View>
        <View style={styles.commentscontainer}>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topcontainer: {
    width: "100%",
    height: "20%",
    backgroundColor: "purple"
  },
  descriptioncontainer: {
    width: "100%",
    height: "15%",
    backgroundColor: "red"
  },
  listscontainer: {
    width: "100%",
    height: "15%",
    backgroundColor: "green"
  },
  commentscontainer: {
    height: "40%",
    width: "100%",
    backgroundColor: "yellow"
  }
});

export default AddMediaModal;
