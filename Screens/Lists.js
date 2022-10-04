import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  Animated,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import ListName from "../custom_components/ListName";
import Colors from "../custom_components/Colors";
import Icon from "react-native-vector-icons/FontAwesome";

const Lists = (props) => {
  const dispatch = useDispatch();

  const newListAnimation = useRef(new Animated.Value(40)).current;

  const showNewList = () => {
    Animated.timing(newListAnimation, {
      toValue: 120,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeNewList = () => {
    Animated.timing(newListAnimation, {
      toValue: 40,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const [NewListName, setNewListName] = useState("");
  const [CreatingNewList, setCreatingNewList] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://www.themoviedb.org/t/p/original/9uGHEgsiUXjCNq8wdq4r49YL8A1.jpg",
        }}
        style={styles.profileimage}
      />
      <View style={styles.header}>
        <Text style={styles.headertext}>Evan DiMartinis</Text>
        <Text>evan-dimar</Text>
      </View>
      <Animated.View
        style={[
          styles.newlistview,
          {
            height: newListAnimation,
          },
        ]}
      >
        <Pressable
          style={styles.newlistbutton}
          onPress={() => {
            if (CreatingNewList) {
              closeNewList()
              setCreatingNewList(false)
            } else {
              showNewList()
              setCreatingNewList(true)
            }
          }}
        >
          <Text style={styles.createnewlisttext}>Create New List</Text>
          <Icon name="caret-down" size={20} color={Colors.primary}/>
        </Pressable>
        <TextInput
          value={NewListName}
          placeholder="List Name..."
          onChangeText={(text) => setNewListName(NewListName)}
          style={styles.newlistinput}
        />
        <Pressable style={styles.createlistbutton}>
          <Text>Create List!</Text>
        </Pressable>
      </Animated.View>
      <FlatList
        keyExtractor={(item, index) => Math.random().toString()}
        data={[0, 0, 0, 0, 0, 0, 0]}
        renderItem={() => <ListName />}
        style={styles.list}
        numColumns={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
  },
  list: {
    flex: 1,
    height: "80%",
    width: "100%",
    backgroundColor: Colors.white,
  },
  header: {
    height: "12%",
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  headertext: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.primary,
  },
  profileimage: {
    height: 200,
    width: 200,
    borderRadius: 100,
    resizeMode: "cover",
    marginTop: "12%",
  },
  newlistview: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  newlistbutton: {
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  createlistbutton: {
    height: 30,
    marginVertical: 5,
    width: "75%",
    backgroundColor: Colors.primary,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  newlistinput: {
    height: 40,
    width: "65%",
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2
  },
  createnewlisttext: {
    color: Colors.primary,
    fontSize: 20
  }
});

export default Lists;
