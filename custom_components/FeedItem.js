import React, { PureComponent } from "react";
import { Image, StyleSheet, View, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import Colors from "./Colors";
import AddMediaModal from "../Modals/AddMediaModal";

class FeedItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  /* SHOULD TAKE A PROP FOR MEDIA TYPE TO SET THE CORRECT ROUTE FOR THE MORE INFO MODAL
  SHOULD ALSO EVENTUALLY IMPLEMENT LOGIC TO UPDATE ONLY WHEN THE ENDORSEMENTS HAVE CHANGED USING SHOULDCOMPONENTUPDATE 
  IS IT MORE EFFICIENT TO IMPLEMENT THE MODAL FUNCTIONALITY THROUGH THE MAIN FEED SCREEN?*/

  render() {
    return (
      <View style={styles.container}>
        <AddMediaModal visible={this.state.showModal} closeModal={() => this.setState({showModal: false})} mediaID={this.props.data} />
        <View style={styles.details}>
          <Image
            source={{
              uri: "https://image.tmdb.org/t/p/original/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
            }}
            style={styles.image}
          />
          <View style={styles.infobox}>
            <View style={styles.titleview}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                Movie Title That is Very long and annoying
              </Text>
            </View>
            <View style={styles.descriptionview}>
              <Text ellipsizeMode="tail" numberOfLines={10}>
                <Text style={styles.username}>Username: </Text>
                This is a description for a movie that is extremely long. I am
                already regretting deciding to type this on my own and not just
                copying and pasting an actual long movie description, this was
                very stupid but hopefully I can be done soon because this is an
                awful use of my time but it looks like I have to continue
                because this is stupid
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.bottombar}>
          <Button title="Endorse" color={"white"} style={styles.barbutton} />
          <View style={styles.barsplit} />
          <Button onPress={() => this.setState({showModal: true})} title="More Info" color={"white"} style={styles.barbutton} />
        </View>
      </View>
    );
  }
}

/* const FeedItem = (props) => {
  const dispatch = useDispatch();

  

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Image
          source={{ uri: "https://image.tmdb.org/t/p/original/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg" }}
          style={styles.image}
        />
        <View style={styles.infobox}>
          <View style={styles.titleview}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              Movie Title That is Very long and annoying
            </Text>
          </View>
          <View style={styles.descriptionview}>
            <Text ellipsizeMode="tail" numberOfLines={10}><Text style={styles.username}>Username: </Text>
              This is a description for a movie that is extremely long. I am
              already regretting deciding to type this on my own and not just
              copying and pasting an actual long movie description, this was
              very stupid but hopefully I can be done soon because this is an
              awful use of my time but it looks like I have to continue because
              this is stupid
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.bottombar}>
        <Button title="Endorse" color={"white"} style={styles.barbutton} />
        <View style={styles.barsplit} />
        <Button title="More Info" color={"white"} style={styles.barbutton} />
      </View>
    </View>
  );
}; */

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: 300,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 20,
    borderColor: Colors.primary,
    borderWidth: 5,
  },
  details: {
    height: "80%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  image: {
    height: "100%",
    width: "20%",
    resizeMode: "contain",
    margin: 5,
  },
  infobox: {
    width: "80%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
    width: "90%",
  },
  titleview: {
    display: "flex",
    height: "20%",
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
  },
  descriptionview: {
    height: "80%",
    width: "90%",
    marginLeft: 5,
    marginBottom: 5,
  },
  bottombar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "20%",
    width: "100%",
    backgroundColor: Colors.primary,
  },
  barsplit: {
    alignSelf: "center",
    width: "2%",
    height: "80%",
    backgroundColor: "gray",
  },
  barbutton: {
    width: "49%",
    height: "100%",
    backgroundColor: "silver",
    color: "#0e2c52",
  },
  username: {
    color: Colors.primary,
    fontWeight: "bold",
  },
});

export default FeedItem;
