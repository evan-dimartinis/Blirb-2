import React, { useCallback, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import Colors from "../custom_components/Colors";

const GroupModal = (props) => {
  const keyExtractor = useCallback((item, index) => item.toString(), []);

  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState({
    MovieTV: false,
    Podcast: false,
    Book: false,
    All: true,
  });

  const renderGroup = (data) => {
    return (
      <Pressable
        onPress={() => {
          const index = selectedGroups.indexOf(data.item);
          if (index > -1) {
            let tempselectedgroups = [...selectedGroups];
            tempselectedgroups.splice(index, 1);
            setSelectedGroups(tempselectedgroups);
          } else {
            setSelectedGroups([...selectedGroups, data.item]);
          }
        }}
        style={[
          styles.grouppressable,
          {
            backgroundColor:
              selectedGroups.indexOf(data.item) > -1
                ? Colors.secondary
                : Colors.primary,
          },
        ]}
      >
        <Text style={styles.groupnametext}>Group Name</Text>
      </Pressable>
    );
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.grouplistcontainer}>
          <FlatList
            data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            keyExtractor={keyExtractor}
            renderItem={renderGroup}
            style={{
              height: "100%",
            }}
          />
        </View>
        <View style={styles.mediaoptioncontainer}>
          <Pressable
            onPress={() =>
              setSelectedMedia({
                ...selectedMedia,
                MovieTV: !selectedMedia.MovieTV,
                All: false
              })
            }
            style={[
              styles.mediaoption,
              {
                backgroundColor: selectedMedia.MovieTV
                  ? Colors.secondary
                  : Colors.primary,
              },
            ]}
          >
            <Text style={styles.mediaoptiontext}>Movie/TV</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              setSelectedMedia({
                ...selectedMedia,
                Podcast: !selectedMedia.Podcast,
                All: false
              })
            }
            style={[
              styles.mediaoption,
              {
                backgroundColor: selectedMedia.Podcast
                  ? Colors.secondary
                  : Colors.primary,
              },
            ]}
          >
            <Text style={styles.mediaoptiontext}>Podcast</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              setSelectedMedia({
                ...selectedMedia,
                Book: !selectedMedia.Book,
                All: false
              })
            }
            style={[
              styles.mediaoption,
              {
                backgroundColor: selectedMedia.Book
                  ? Colors.secondary
                  : Colors.primary,
              },
            ]}
          >
            <Text style={styles.mediaoptiontext}>Books</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              setSelectedMedia({
                MovieTV: false,
                Podcast: false,
                Book: false,
                All: true,
              })
            }
            style={[
              styles.mediaoption,
              {
                backgroundColor: selectedMedia.All
                  ? Colors.secondary
                  : Colors.primary,
              },
            ]}
          >
            <Text style={styles.mediaoptiontext}>All</Text>
          </Pressable>
        </View>
        <Pressable onPress={() => props.closeModal()} style={styles.savebutton}>
          <Text>Get Feed</Text>
        </Pressable>
        <Pressable onPress={() => props.closeModal()} style={styles.savebutton}>
          <Text>Generate Random Recommendation</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  grouppressable: {
    borderColor: Colors.white,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    height: 50,
    margin: 10,
    justifyContent: "center",
  },
  grouplistcontainer: {
    height: "75%",
    width: "100%",
    borderBottomColor: "gray",
    borderBottomWidth: 2,
    paddingTop: "12%"
  },
  mediaoption: {
    width: "23%",
    borderRadius: 10,
    marginHorizontal: "1%",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderColor: "white",
    borderWidth: 1,
  },
  mediaoptioncontainer: {
    height: "5%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "gray",
    borderBottomWidth: 2,
  },
  savebutton: {
    backgroundColor: Colors.tertiary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: "5%",
    width: "90%",
    margin: "2.5%",
  },
  groupnametext: {
    color: "white",
    fontWeight: "300",
    fontSize: 20,
  },
  mediaoptiontext: {
    color: "white",
  },
});

export default GroupModal;
