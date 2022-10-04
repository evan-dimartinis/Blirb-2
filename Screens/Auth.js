import React, { UseEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../store/auth/authActions";
import colors from "../custom_components/Colors";
import { TextInput } from "react-native-gesture-handler";

const Auth = (props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [Login, setLogin] = useState(true);
  const [LoginUsername, setLoginUsername] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  const [SignUpUsername, setSignUpUsername] = useState("");
  const [SignUpPassword, setSignUpPassword] = useState("");
  const [SignUpPasswordConfirm, setSignUpPasswordConfirm] = useState("");
  const [SignUpEmail, setSignUpEmail] = useState("");
  const [SignUpPhoneNumber, setSignUpPhoneNumber] = useState("");
  const [SignUpFirstName, setSignUpFirstName] = useState("");
  const [SignUpLastName, setSignUpLastName] = useState("");

  const log_in = async () => {
    if (LoginUsername === "" || LoginPassword === "") {
      Alert.alert("Please enter a valid username and password", "", [
        {
          text: "Okay",
          onPress: () => {},
        },
      ]);
    } else {
      setIsLoading(true);
      let action = login(LoginUsername, LoginPassword);
      try {
        await dispatch(action);
        setIsLoading(false);
        props.navigation.navigate("Tabs");
      } catch (err) {
        console.log(err)
        setIsLoading(false);
        Alert.alert(
          "Error logging in",
          "Please check credentials and try again",
          [
            {
              text: "Okay",
              onPress: () => {},
            },
          ]
        );
      }
    }
  };

  const sign_up = async () => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      username !== "" &&
      password !== "" &&
      passwordConfirm !== "" &&
      email !== "" &&
      phoneNumber !== ""
    ) {
      if (password !== passwordConfirm) {
        Alert.alert(
          "Passwords do not match",
          "please check passwords and try again",
          [
            {
              text: "Ok",
              onPress: () => {},
            },
          ]
        );
      } else {
        try {
          setIsLoading(true);
          let action = null;
          if (signupCode === "") {
            action = signup(
              firstName,
              lastName,
              username,
              password,
              email,
              phoneNumber,
              "BLANK"
            );
          } else {
            action = signup(
              firstName,
              lastName,
              username,
              password,
              email,
              phoneNumber,
              signupCode
            );
          }

          await dispatch(action);
          await dispatch(login(username, password));
          setIsLoading(false);
          props.navigation.navigate("Tabs");
        } catch (err) {
          setIsLoading(false);
          if (err.message === "phone number in use") {
            Alert.alert(
              "Phone number already in use",
              "try again with another number",
              [
                {
                  text: "Okay",
                },
              ]
            );
          } else {
            Alert.alert(
              "Error signing up",
              "Please review your information and try again",
              [
                {
                  text: "Okay",
                },
              ]
            );
          }
        }
      }
    } else {
      Alert.alert(
        "All fields not filled",
        "please fill out all fields (except signup code) and try again",
        [
          {
            text: "Ok",
            onPress: () => {},
          },
        ]
      );
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
          animating={isLoading}
        />
      </View>
    );
  } else {
    if (Login) {
      return (
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={50}
          style={styles.Screen}
        >
          <Image
            source={require("../assets/Logos/BlirbLogo.png")}
            style={{
              resizeMode: "cover",
              height: 150,
              width: 150,
              paddingBottom: 10,
              marginBottom: 10,
            }}
          ></Image>
          <View>
            <Text style={{ color: "white", fontSize: 30 }}>
              Welcome to Blirb!
            </Text>
            <TextInput
              placeholderTextColor="#202020"
              style={styles.usernameInput}
              placeholder="Username..."
              value={LoginUsername}
              onChangeText={(input) => setLoginUsername(input)}
            />
            <TextInput
              placeholderTextColor="#202020"
              style={styles.usernameInput}
              placeholder="Password..."
              value={LoginPassword}
              onChangeText={(input) => setLoginPassword(input)}
              secureTextEntry={true}
              onSubmitEditing={log_in}
            />
            <View style={{ alignItems: "center", paddingTop: 20 }}>
              <Button color="white" title="Log In" onPress={log_in} />
              <Text style={{ color: "white", paddingVertical: 5 }}>or</Text>
              <Button
                title="Switch to Sign Up"
                onPress={() => setLogin(false)}
                color="white"
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      );
    } else {
      return (
        <KeyboardAvoidingView style={styles.container}>
          <TextInput
            placeholderTextColor="#202020"
            placeholder="First Name..."
            style={styles.usernameInput}
            value={SignUpFirstName}
            onChangeText={(text) => setSignUpFirstName(text)}
          />
          <TextInput
            placeholderTextColor="#202020"
            placeholder="Last Name..."
            style={styles.usernameInput}
            value={SignUpLastName}
            onChangeText={(text) => setSignUpLastName(text)}
          />
          <TextInput
            placeholderTextColor="#202020"
            placeholder="Username..."
            style={styles.usernameInput}
            value={SignUpUsername}
            onChangeText={(text) => setSignUpUsername(text)}
          />
          <TextInput
            placeholderTextColor="#202020"
            placeholder="Password..."
            style={styles.usernameInput}
            value={SignUpPassword}
            onChangeText={(text) => setSignUpPassword(text)}
            secureTextEntry={true}
          />
          <TextInput
            placeholderTextColor="#202020"
            placeholder="Confirm Password..."
            style={styles.usernameInput}
            value={SignUpPasswordConfirm}
            onChangeText={(text) => setSignUpPasswordConfirm(text)}
            secureTextEntry={true}
          />
          <TextInput
            placeholderTextColor="#202020"
            placeholder="Email..."
            style={styles.usernameInput}
            value={SignUpEmail}
            onChangeText={(text) => setSignUpEmail(text)}
          />
          <TextInput
            placeholderTextColor="#202020"
            placeholder="Phone Number..."
            style={styles.usernameInput}
            value={SignUpPhoneNumber}
            onChangeText={(text) => setSignUpPhoneNumber(text)}
          />
          <Button color={"white"} title="Sign Up!" onPress={sign_up} />
          <Text style={{ color: "white" }}>or</Text>
          <Button
            color={"white"}
            title="Back to Login"
            onPress={() => setLogin(true)}
          />
        </KeyboardAvoidingView>
      );
    }
  }
};

const styles = StyleSheet.create({
  Screen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  usernameInput: {
    height: 50,
    width: 200,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    color: "white",
  },
  usernameInput: {
    height: 50,
    width: 200,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
});

export default Auth;