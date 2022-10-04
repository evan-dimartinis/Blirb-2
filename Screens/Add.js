import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  Button,
  Easing,
  Pressable,
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import Colors from "../custom_components/Colors";
import SearchResult from "../custom_components/SearchResult";
//import { ActionSheetCustom as ActionSheet } from "react-native-actionsheet";

const Add = (props) => {
  const popupAnimation = useRef(new Animated.Value(40)).current;

  const spinValue = useRef(new Animated.Value(0)).current;

  const [searchType, setSearchType] = useState("Movie/TV");
  const [popupShown, setPopupShown] = useState(false);
  const [searchText, setSearchText] = useState("");

  const spinIcon = () => {
    Animated.timing(spinValue, {
      toValue: 180,
      duration: 3000,
      useNativeDriver: false,
    });
  };

  const popup = () => {
    Animated.timing(popupAnimation, {
      toValue: 160,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const lowerpopup = () => {
    Animated.timing(popupAnimation, {
      toValue: 40,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const SeeEpisodes = (id) => {
    props.navigation.navigate('AddEpisode')
  }

  const keyExtractor = useCallback((item, index) => item.toString(), []);

  const returnSearchResult = (data) => {
    return <SearchResult SeeEpisodes={SeeEpisodes} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchinputcontainer}>
        <Icon
          name="search"
          style={styles.searchicon}
          size={30}
          color={"gray"}
        />
        <TextInput
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          style={styles.searchinput}
          clearButtonMode={1}
        />
      </View>

      <FlatList
        data={[0, 1, 2, 3, 4, 5, 6, 7]}
        renderItem={returnSearchResult}
        keyExtractor={keyExtractor}
        style={{
          height: "88%",
          width: "100%",
        }}
      />
      <Animated.View
        style={[
          styles.popup,
          {
            height: popupAnimation,
          },
        ]}
      >
        <Pressable
          onPress={() => {
            popup();
          }}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.3 : 1,
            },
            styles.showsearchtypes,
          ]}
        >
          <Text style={styles.searchingfor}>Searching For: {searchType}</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            lowerpopup();
            setPopupShown(false);
            setSearchType("Movie/TV");
          }}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.3 : 1,
            },
            styles.medialabel,
          ]}
        >
          <Text style={styles.medialabeltext}>Movie/TV</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            lowerpopup();
            setPopupShown(false);
            setSearchType("Podcast");
          }}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.3 : 1,
            },
            styles.medialabel,
          ]}
        >
          <Text style={styles.medialabeltext}>Podcast</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            lowerpopup();
            setPopupShown(false);
            setSearchType("Book");
          }}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.3 : 1,
            },
            styles.medialabel,
          ]}
        >
          <Text style={styles.medialabeltext}>Book</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "90%",
    backgroundColor: Colors.primary,
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  showsearchtypes: {
    backgroundColor: Colors.primary,
    display: "flex",
    justifyContent: "center",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    height: 40,
    width: "100%",
  },
  searchingfor: {
    fontSize: 20,
    fontWeight: "300",
    alignSelf: "center",
    color: "white",
  },
  medialabel: {
    display: "flex",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderTopColor: "#404040",
    borderTopWidth: 2,
    height: 40,
    width: "100%",
  },
  medialabeltext: {
    fontSize: 25,
    fontWeight: "300",
  },
  searchinput: {
    width: "80%",
    height: "50%",
    borderColor: Colors.primary,
    borderBottomWidth: 2,
    marginLeft: 5,
    fontSize: 20,
  },
  searchinputcontainer: {
    display: "flex",
    flexDirection: "row",
    height: "12%",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "100%",
  },
  searchicon: {
    marginRight: 10,
    paddingBottom: 5,
  },
});

export default Add;
