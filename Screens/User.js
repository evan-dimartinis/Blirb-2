import React from "react";
import { ScrollView, StyleSheet, Image, Text } from "react-native";

const User = (props) => {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: "https://image.tmdb.org/t/p/original/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
        }}
        style={styles.profileimage}
      />
      <Text style={styles.bigtext}>BIG TEXT</Text>
      <Text style={styles.bigtext}>BIG TEXT</Text>
      <Text style={styles.bigtext}>BIG TEXT</Text>
      <Text style={styles.bigtext}>BIG TEXT</Text>
      <Text style={styles.bigtext}>BIG TEXT</Text>
      <Text style={styles.bigtext}>BIG TEXT</Text>
      <Text style={styles.bigtext}>BIG TEXT</Text>
      <Text style={styles.bigtext}>BIG TEXT</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
  profileimage: {
    height: 400,
    width: 300,
    resizeMode: "contain",
    alignSelf: "center"
  },
  bigtext: {
    fontSize: 60,
    fontWeight: "800",
    alignSelf: "center"
  },
});

export default User;
