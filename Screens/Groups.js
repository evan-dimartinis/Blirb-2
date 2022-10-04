import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Pressable,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../custom_components/Colors";

const Groups = (props) => {
  const [joinGroupCode, setJoinGroupCode] = useState("");

  const keyExtractor = useCallback((item, index) => item.toString(), []);

  const renderGroup = (data) => {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.grouplabel,
          {
            opacity: pressed ? 0.3 : 1,
          },
        ]}
        onPress={() => {
            props.navigation.push('EditGroup')
        }}
      >
        <Text>Group {data.item}</Text>
        <Icon name="caret-right" size={30} style={styles.caret} />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.joingroupcontainer}>
        <TextInput
          value={joinGroupCode}
          onChangeText={(text) => setJoinGroupCode(text)}
          placeholder="Group join code..."
          placeholderTextColor={"gray"}
          style={styles.joingroupinput}
        />
        <Pressable style={styles.joingroupbutton}>
          <Text>Join Group</Text>
        </Pressable>
      </View>
      <View style={styles.creategroupcontainer}>
        <TextInput
          value={joinGroupCode}
          onChangeText={(text) => setJoinGroupCode(text)}
          placeholder="Group Name..."
          placeholderTextColor={"gray"}
          style={styles.joingroupinput}
        />
        <Pressable
          onPress={() => console.log(selectedGroups)}
          style={styles.joingroupbutton}
        >
          <Text>Create Group</Text>
        </Pressable>
      </View>
      <FlatList
        style={{
          height: "76%",
          width: "100%",
        }}
        data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
        keyExtractor={keyExtractor}
        renderItem={renderGroup}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  joingroupcontainer: {
    height: "12%",
    display: "flex",
    width: "100%",
    alignItems: "center",
    borderBottomColor: "gray",
    borderBottomWidth: 2,
    marginTop: "12%",
  },
  creategroupcontainer: {
    height: "12%",
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "gray",
  },
  joingroupinput: {
    height: "40%",
    width: "80%",
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
  },
  joingroupbutton: {
    width: "80%",
    height: "40%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    margin: 10,
  },
  grouplabel: {
    height: 60,
    width: "100%",
    borderTopColor: "gray",
    borderBottomColor: "gray",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  caret: {
    position: "absolute",
    alignSelf: "flex-end",
  },
});

export default Groups;
