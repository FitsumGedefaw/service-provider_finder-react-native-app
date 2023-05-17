import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import Button from "../ui/Button";
import Input from "./Input";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  //const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  //const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [enteredProfession, setEnteredProfession] = useState("");
  const [enteredShortBio, setEnteredShortBio] = useState("");

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "firstName":
        setEnteredFirstName(enteredValue);
        break;
      case "lastName":
        setEnteredLastName(enteredValue);
        break;
      case "address":
        setEnteredAddress(enteredValue);
        break;
      case "phoneNumber":
        setEnteredPhoneNumber(enteredValue);
        break;
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "profession":
        setEnteredProfession(enteredValue);
        break;
      case "shortBio":
        setEnteredShortBio(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      firstName: enteredFirstName,
      lastName: enteredLastName,
      address: enteredAddress,
      phoneNumber: enteredPhoneNumber,
      email: enteredEmail,
      //confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      //confirmPassword: enteredConfirmPassword,
      profession: enteredProfession,
      shortBio: enteredShortBio,
    });
  }

  return (
    <View style={styles.form}>
      <ScrollView>
        <View>
          <Input
            placeholder="First Name"
            onUpdateValue={updateInputValueHandler.bind(this, "firstName")}
            value={enteredFirstName}
          />
          <Input
            placeholder="Last Name"
            onUpdateValue={updateInputValueHandler.bind(this, "lastName")}
            value={enteredLastName}
          />
          <Input
            placeholder="Address"
            onUpdateValue={updateInputValueHandler.bind(this, "address")}
            value={enteredAddress}
          />
          <Input
            placeholder="Phone Number"
            onUpdateValue={updateInputValueHandler.bind(this, "phoneNumber")}
            keyboardType="number-pad"
            value={enteredPhoneNumber}
          />
          <Input
            placeholder="Email Address"
            onUpdateValue={updateInputValueHandler.bind(this, "email")}
            value={enteredEmail}
            keyboardType="email-address"
            isInvalid={emailIsInvalid}
          />
          <Input
            placeholder="Password"
            onUpdateValue={updateInputValueHandler.bind(this, "password")}
            secure
            value={enteredPassword}
            isInvalid={passwordIsInvalid}
          />
          <Input
            placeholder="Profession"
            onUpdateValue={updateInputValueHandler.bind(this, "profession")}
            value={enteredProfession}
          />
          <Input
            placeholder="Short Bio"
            onUpdateValue={updateInputValueHandler.bind(this, "shortBio")}
            value={enteredShortBio}
            multiline={true}
            textAlignVertical="top"
            numberOfLines={5}
          />

          {/* {!isLogin && (
          <Input
            label="Confirm Email Address"
            onUpdateValue={updateInputValueHandler.bind(this, 'confirmEmail')}
            value={enteredConfirmEmail}
            keyboardType="email-address"
            isInvalid={emailsDontMatch}
          />
        )} */}

          {/* {!isLogin && (
          <Input
            label="Confirm Password"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              'confirmPassword'
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )} */}
          <View style={styles.buttons}>
            <Button onPress={submitHandler}>
              {isLogin ? "Log In" : "Sign Up"}
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
