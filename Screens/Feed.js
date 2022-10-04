import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FeedItem from "../custom_components/FeedItem";
import Colors from "../custom_components/Colors";
import GroupModal from "../Modals/GroupModal";
import AddMediaModal from "../Modals/AddMediaModal";

const Feed = (props) => {
  const dispatch = useDispatch();

  const [ShowGroupModal, setShowGroupModal] = useState(false);
  const [ShowMediaModal, setShowMediaModal] = useState(false);

  const ToggleMediaModal = () => {
    setShowMediaModal(!ShowMediaModal);
  };

  const returnfeed = (data) => {
    return <FeedItem showModal={ToggleMediaModal} data={data.item} />;
  };

  const closeGroupModal = () => {
    setShowGroupModal(false);
  };

  const keyExtractor = useCallback((item, index) => item.toString(), []);

  return (
    <View style={styles.container}>
      <GroupModal visible={ShowGroupModal} closeModal={closeGroupModal} />
      <View style={styles.feedname}>
        <Text style={styles.feednametext}>Group Name</Text>
      </View>
      <FlatList
        keyExtractor={keyExtractor}
        numColumns={1}
        data={[
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 120,
          130, 44, 900, 1000, 110, 990, 980, 970, 960, 560, 670, 780, 890, 450,
          320, 109,
        ]}
        renderItem={returnfeed}
        style={{
          height: "90%",
        }}
      />
      <Pressable
        style={styles.addpressable}
        onPress={() => setShowGroupModal(true)}
      >
        <Icon name="group" size={40} color="white" style={styles.button} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  buttoncontainer: {
    position: "absolute",
    bottom: "0%",
    alignSelf: "flex-end",
    backgroundColor: "white",
    height: "20%",
    width: "30%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  feedname: {
    backgroundColor: Colors.white,
    top: 0,
    height: "12%",
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    padding: 5,
    justifyContent: "flex-end",
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
  },
  button: {
    alignSelf: "center",
  },
  feednametext: {
    color: Colors.primary,
    fontSize: 30,
    fontWeight: "bold",
  },
  addpressable: {
    backgroundColor: Colors.primary,
    position: "absolute",
    bottom: "3%",
    right: "2%",
    alignSelf: "flex-end",
    height: 75,
    width: 75,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },
});

export default Feed;
