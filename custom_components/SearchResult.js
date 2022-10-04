import React from "react";
import { View, Image, StyleSheet, Pressable, Text } from "react-native";
import Colors from "./Colors";

class SearchResult extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Pressable style={styles.pressable}>
          <View style={styles.imagecontainer}>
            <Image
              source={{
                uri: "https://www.themoviedb.org/t/p/original/9uGHEgsiUXjCNq8wdq4r49YL8A1.jpg",
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.detailscontainer}>
            <Text style={styles.titletext} numberOfLines={1}>
              American Psycho
            </Text>
            <Text style={styles.yeartext} >
                2000
            </Text>
            <Text style={styles.yeartext}>
                Christian Bale, Isaac Newton
            </Text>
            <Text onPress={() => this.props.SeeEpisodes(0)}>See Episodes</Text>
          </View>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection:"row",
    height: 120,
    width: "90%",
    backgroundColor: Colors.white,
    margin: 15,
    alignSelf: "center",
    borderColor: Colors.green,
    borderWidth: 3,
    borderRadius: 10,
  },
  imagecontainer: {
    width: "30%",
    height: "100%",
    padding: 5,
  },
  image: {
    resizeMode: "contain",
    height: "100%",
    width: "100%",
  },
  detailscontainer: {
    width: "70%",
    justifyContent: "space-around"
  },
  pressable: {
    height: "100%",
    width: "100%",
    position: "absolute",
    backgroundColor: "transparent",
    display: "flex",
    flexDirection:"row",
  },
  titletext: {
    fontWeight: "600",
    fontSize: 20,
    textAlign: "left"
  },
  yeartext: {
    fontSize: 15,
    fontWeight: "300",
    textAlign: "left"
  },
  seeepisodes: {
    fontWeight: "600",
    fontSize: 20,
    color: Colors.primary
  }
});

export default SearchResult;
