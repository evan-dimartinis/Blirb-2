import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../custom_components/Colors";

const EditGroup = (props) => {
  const [GroupName, setGroupName] = useState("Group Name Example");
  const [GroupDescription, setGroupDescription] = useState(
    "Group Description Example lolol this is the group description ahahhhhhahhahhah"
  );

  const renderMember = () => {
    return (
      <View style={styles.membercontainer}>
        <Text>Evan DiMartinis</Text>
        <Icon name="trash" size={20} color="black" style={styles.trashicon}/>
      </View>
    );
  };

  const keyExtractor = useCallback((item, index) => item.toString(), []);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://image.tmdb.org/t/p/original/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
        }}
        style={styles.groupimage}
      />
      <TextInput
        style={styles.groupnameinput}
        value={GroupName}
        placeholder={GroupName}
        onChangeText={(text) => setGroupName(text)}
      />
      <TextInput
        style={styles.groupdescriptioninput}
        value={GroupDescription}
        placeholder={GroupDescription}
        onChangeText={(text) => setGroupDescription(text)}
        multiline={true}
      />
      <FlatList
        data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
        keyExtractor={keyExtractor}
        renderItem={renderMember}
        style={styles.memberlist}
      />
      <Pressable style={styles.savebutton}>
        <Text>Save</Text>
      </Pressable>
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
  groupimage: {
    height: 200,
    width: 200,
    borderRadius: 100,
    resizeMode: "cover",
    marginTop: "12%",
  },
  groupnameinput: {
    width: "60%",
    height: 30,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
    marginTop: "5%",
  },
  groupdescriptioninput: {
    width: "80%",
    height: "auto",
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
    marginTop: "5%",
    maxHeight: "20%",
  },
  memberlist: {
    height: "auto",
    width: "100%",
    marginTop: 5
  },
  membercontainer: {
    display: "flex",
    flexDirection: "row",
    height: 80,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  trashicon: {
    position: "absolute",
    right: 20
  },
  savebutton: {
    height: "7%",
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.tertiary,
    borderRadius: 15,
    marginBottom: 5
  }
});

export default EditGroup;
