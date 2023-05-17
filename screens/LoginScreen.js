import { useContext, useState } from "react";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import Button from "../components/ui/Button";
import FlatButton from "../components/ui/FlatButton";
import { logUserInAuth } from "../utils/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

function LoginScreen({ navigation }) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const authCtx = useContext(AuthContext);

  const emailChangeHandler = (email) => {
    setEnteredEmail(email);
  };

  const passwordChangeHandler = (password) => {
    setEnteredPassword(password);
  };

  function switchAuthModeHandler() {
    navigation.replace("Signup");
  }

  const loginHandler = async () => {
    if (enteredEmail.trim().length < 10) {
      Alert.alert(
        "Could not log you in!",
        "Email Address should be atleast 10 characters long!"
      );
      return;
    } else if (
      (enteredEmail.includes("@") && enteredEmail.includes(".com")) == false
    ) {
      Alert.alert("Could not log you in!", "Email is not in the right format!");
      return;
    } else if (enteredPassword.trim().length < 6) {
      Alert.alert(
        "Could not log you in!",
        "Password should be atleast 6 characters long!"
      );
      return;
    } else {
      setIsLoggingIn(true);
      try {
        const responseData = await logUserInAuth(enteredEmail, enteredPassword);

        const token = responseData.idToken;
        const email = responseData.email;

        authCtx.setAuthEmail(email);
        authCtx.authenticate(token);
      } catch (error) {
        console.log(error);
        Alert.alert(
          "Could not log you in",
          "Please check your credentials or try again later."
        );

        setIsLoggingIn(false);
      }
    }
  };

  if (isLoggingIn) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Your email..."
        onChangeText={emailChangeHandler}
        value={enteredEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password..."
        onChangeText={passwordChangeHandler}
        value={enteredPassword}
      />

      <View style={styles.buttons}>
        <Button onPress={loginHandler}>Login</Button>
      </View>

      <View style={styles.flatButton}>
        <FlatButton onPress={switchAuthModeHandler}>create account</FlatButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "black",
    //marginHorizontal: 10,
    //marginTop: 10,
    //  marginBottom: 30,
    // paddingBottom: 30,
  },
  input: {
    width: "80%",
    paddingVertical: 6,
    paddingHorizontal: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    borderColor: "black",
    borderWidth: 1,
    fontSize: 16,
    margin: 8,
  },
  buttons: {
    width: "65%",
    marginTop: 8,
  },
  flatButton: {
    textAlign: "right",
  },
});

export default LoginScreen;
