import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Text, Input } from "react-native-elements";
import { auth, db } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageURL, setImageURL] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login"
    });
  }, [navigation]);

  const exePassword = async () => {
    await db
      .collection("password")
      .add({ password: password })
      .catch(error => alert(error));
  };

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        exePassword;
        authUser.user.updateProfile({
          displayName: name,
          photoURL: imageURL || "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png"
        });
      })
      .catch(error => alert(error.message));
  };

  return (
    <KeyboardAvoidingView bheader="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal account
      </Text>
      <View style={styles.inputContainer}>
        <Input placeholder="Full Name" autoFocus={true} type="text" value={name} onChangeText={text => setName(text)} />
        <Input placeholder="Email" type="email" value={email} onChangeText={text => setEmail(text)} />
        <Input placeholder="Password" type="password" secureTextEntry value={password} onChangeText={text => setPassword(text)} />
        <Input placeholder="Profile Picture URL (optinal)" type="text" value={imageURL} onChangeText={text => setImageURL(text)} onSubmitEditing={register} />
      </View>
      <Button containerStyle={styles.button} raised onPress={register} title="Register" />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white"
  },
  inputContainer: {
    width: 300
  },
  button: {
    width: 200,
    marginTop: 10
  }
});
