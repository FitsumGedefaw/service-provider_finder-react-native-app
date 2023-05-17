import "react-native-get-random-values";
import { addServiceProvider, addEmployer } from "../utils/http";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "../components/ui/Button";
import FlatButton from "../components/ui/FlatButton";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../utils/firebase";
import { createUserAuth } from "../utils/auth";
import { AuthContext } from "../store/auth-context";
import RenderRadioButton from "../components/ui/RenderRadioButton";
import ProfessionRadio from "../components/ProfessionRadio";
import AddressDropdown from "../components/AddressDropdown";

function SignupScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false);

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
  const [gender, setGender] = useState("Male");

  const authCtx = useContext(AuthContext);

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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      Alert.alert("You did not select a picture!");
    }
  };

  const uploadImage = async (person) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });
    let uniqueId = uuidv4();
    const ref = firebase.storage().ref().child(`Pictures/${uniqueId}`);
    const snapshot = ref.put(blob);
    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        //setIsSigningUp(true);
      },
      (error) => {
        setIsSigningUp(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          console.log("Download URL: ", url);
          // const serviceProvider = {
          //   firstName: firstName,
          //   lastName: lastName,
          //   photoUrl: url,
          //   address: address,
          //   phoneNumber: phoneNumber,
          //   email: email,
          //   password: password,
          //   profession: profession,
          //   shortBio: shortBio,
          // };
          person.photoUrl = url;

          if (authCtx.isEmployer) {
            addEmployer(person);
          } else {
            addServiceProvider(person);
          }

          console.log("heyy");

          // console.log("User added");
          setImage(url);
          blob.close();
          return url;
        });
      }
    ).then;
  };

  async function submitHandler() {
    if (enteredFirstName.trim().length < 3) {
      Alert.alert(
        "Could not create your account",
        "First Name should be atleast 3 characters long!"
      );
      return;
    } else if (enteredLastName.trim().length < 3) {
      Alert.alert(
        "Could not create your account",
        "Last Name should be atleast 3 characters long!"
      );
      return;
    } else if (enteredAddress.trim().length < 3) {
      Alert.alert(
        "Could not create your account",
        "Subcity should be atleast 3 characters long!"
      );
      return;
    } else if (
      enteredPhoneNumber.trim().length < 10 ||
      enteredPhoneNumber.trim().match(/^[0-9]+$/) == null
    ) {
      Alert.alert(
        "Could not create your account",
        "Phone Number should be 10 digits and contain only digits!"
      );
      return;
    } else if (enteredEmail.trim().length < 10) {
      Alert.alert(
        "Could not create your account",
        "Email Address should be atleast 10 characters long!"
      );
      return;
    } else if (
      (enteredEmail.includes("@") && enteredEmail.includes(".com")) == false
    ) {
      Alert.alert(
        "Could not create your account",
        "Email is not in the right format!"
      );
      return;
    } else if (enteredPassword.trim().length < 6) {
      Alert.alert(
        "Could not create your account",
        "Password should be atleast 6 characters long!"
      );
      return;
    } else {
      setIsSigningUp(true);

      try {
        const responseData = await createUserAuth(
          enteredEmail,
          enteredPassword
        );

        const token = responseData.idToken;
        const email = responseData.email;

        if (authCtx.isEmployer) {
          var person = {
            firstName: enteredFirstName,
            lastName: enteredLastName,
            address: enteredAddress,
            phoneNumber: enteredPhoneNumber,
            email: enteredEmail,
            password: enteredPassword,
            sex: gender,
          };
        } else {
          var person = {
            firstName: enteredFirstName,
            lastName: enteredLastName,
            address: enteredAddress,
            phoneNumber: enteredPhoneNumber,
            email: enteredEmail,
            sex: gender,
            //confirmEmail: enteredConfirmEmail,
            password: enteredPassword,
            //confirmPassword: enteredConfirmPassword,
            profession: enteredProfession,
            shortBio: enteredShortBio,
          };
        }

        await uploadImage(person);

        authCtx.setAuthEmail(email);
        authCtx.authenticate(token);
        console.log("auth user created");
      } catch (error) {
        Alert.alert(
          "Could not create your account",
          "Please check your input or try again later."
        );

        console.log(error);
        setIsSigningUp(false);
      }
    }
  }

  function switchAuthModeHandler() {
    navigation.replace("Login");
  }

  const genderHandler = (selectedGender) => {
    // console.log(selectedGender);
    setGender(selectedGender);
  };

  const professionRadioHandler = (profession) => {
    setEnteredProfession(profession);
  };

  const subCityChangeHandler = (subCity) => {
    setEnteredAddress(subCity);
  };

  if (isSigningUp) {
    return <LoadingOverlay message="Signing up..." />;
  }

  return (
    // <AuthContent onAuthenticate={uploadImage} />

    <View style={styles.form}>
      <ScrollView>
        <View>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            onChangeText={updateInputValueHandler.bind(this, "firstName")}
            value={enteredFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            onChangeText={updateInputValueHandler.bind(this, "lastName")}
            value={enteredLastName}
          />
          <RenderRadioButton onSelect={genderHandler} />
          <AddressDropdown
            onSelect={subCityChangeHandler}
            ph="Select your subcity"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            onChangeText={updateInputValueHandler.bind(this, "phoneNumber")}
            value={enteredPhoneNumber}
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            onChangeText={updateInputValueHandler.bind(this, "email")}
            value={enteredEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={updateInputValueHandler.bind(this, "password")}
            value={enteredPassword}
          />
          {authCtx.isSP && (
            <ProfessionRadio
              onSelect={professionRadioHandler}
              firstChecked="Nurse"
            />
          )}

          {authCtx.isSP && (
            <TextInput
              style={styles.input}
              placeholder="Short Bio"
              onChangeText={updateInputValueHandler.bind(this, "shortBio")}
              value={enteredShortBio}
              multiline={true}
              textAlignVertical="top"
              numberOfLines={5}
            />
          )}

          <View style={styles.pickerContainer}>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            {
              <View style={styles.selectImageButton}>
                <Button onPress={pickImage}>Select Image </Button>
              </View>
            }
            {/* {!uploading ? (
          <Button title="Upload Image" onPress={uploadImage} />
        ) : (
          <ActivityIndicator size={"small"} color="black" />
        )} */}
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button onPress={submitHandler}>Sign Up</Button>
            </View>
          </View>

          <View style={styles.flatButton}>
            <FlatButton onPress={switchAuthModeHandler}>
              Log in instead
            </FlatButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    // backgroundColor: "black",
    marginHorizontal: 10,
    marginTop: 10,
    //  marginBottom: 30,
    paddingBottom: 30,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    borderColor: "#F0F0F0",
    borderWidth: 1,
    fontSize: 16,
    margin: 8,
  },
  pickerContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  image: {
    width: 170,
    height: 200,
    borderWidth: 3,
    borderColor: "#F0A500",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  button: {
    width: "50%",
  },
  selectImageButton: {
    marginTop: 5,
  },
  flatButton: {
    textAlign: "right",
  },
});

export default SignupScreen;
