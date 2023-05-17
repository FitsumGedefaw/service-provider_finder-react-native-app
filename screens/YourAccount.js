import { useState, useContext, useLayoutEffect, useEffect } from "react";
import { AuthContext } from "../store/auth-context";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import Button from "../components/ui/Button";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ScrollView,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../utils/firebase";
import {
  fetchAllEmployers,
  fetchAllServiceProviders,
  updateEmployer,
  updateServiceProvider,
} from "../utils/http";
import AddressDropdown from "../components/AddressDropdown";
import ProfessionRadio from "../components/ProfessionRadio";
const YourAccount = () => {
  const authCtx = useContext(AuthContext);

  const [image, setImage] = useState(null);
  const [isUpdatingAcc, setIsUpdatingAcc] = useState(false);

  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");
  const [enteredProfession, setEnteredProfession] = useState("");
  const [enteredShortBio, setEnteredShortBio] = useState("");
  const [authUserId, setAuthUserId] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  useLayoutEffect(() => {
    const filterAuthSP = async () => {
      try {
        const AllServiceProviders = await fetchAllServiceProviders();
        const authSP = AllServiceProviders.filter(
          (person) => person.email === authCtx.authEmail
        )[0];

        setEnteredProfession(authSP.profession);

        setEnteredFirstName(authSP.firstName);
        setEnteredLastName(authSP.lastName);
        setEnteredAddress(authSP.address);
        setEnteredPhoneNumber(authSP.phoneNumber);
        setImage(authSP.photoUrl);
        setEnteredShortBio(authSP.shortBio);
        setAuthUserId(authSP.id);
        setEnteredEmail(authSP.email);
        setEnteredPassword(authSP.password);
      } catch (error) {
        console.log("authenticated user filtering error");
        console.log(error);
      }
    };

    const filterAuthEmployer = async () => {
      try {
        const AllEmployers = await fetchAllEmployers();
        console.log(AllEmployers);
        console.log("email: ", authCtx.authEmail);
        const authEmployer = AllEmployers.filter(
          (person) => person.email === authCtx.authEmail
        )[0];

        console.log("filteredEmployer: ", authEmployer);
        setEnteredFirstName(authEmployer.firstName);
        setEnteredLastName(authEmployer.lastName);
        setEnteredAddress(authEmployer.address);
        setEnteredPhoneNumber(authEmployer.phoneNumber);
        setImage(authEmployer.photoUrl);
        setAuthUserId(authEmployer.id);
        setEnteredEmail(authEmployer.email);
        setEnteredPassword(authEmployer.password);
      } catch (error) {
        console.log("authenticated user filtering error");
        console.log(error);
      }
    };

    if (authCtx.isEmployer) {
      filterAuthEmployer();
    } else {
      filterAuthSP();
    }
  }, []);

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

  const updateAccount = async (person) => {
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

          person.photoUrl = url;

          if (authCtx.isEmployer) {
            updateEmployer(authUserId, person);
          } else {
            updateServiceProvider(authUserId, person);
          }

          // console.log("heyy");
          Alert.alert(
            "",
            "Account updated successfully",
            [
              {
                text: "Hide Message",
                style: "cancel",
              },
            ],
            {
              cancelable: true,
            }
          );
          setIsUpdatingAcc(false);
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
    } else {
      setIsUpdatingAcc(true);

      let person = {
        firstName: enteredFirstName,
        lastName: enteredLastName,
        address: enteredAddress,
        phoneNumber: enteredPhoneNumber,
        email: enteredEmail,
        password: enteredPassword,
      };

      if (authCtx.isSP) {
        person.shortBio = enteredShortBio;
        person.profession = enteredProfession;
      }

      try {
        await updateAccount(person);

        //authCtx.authenticate(token);
        // console.log("auth user created");
      } catch (error) {
        Alert.alert(
          "Could not update your account",
          "Please check your input or try again later."
        );

        setIsUpdatingAcc(false);
      }
    }
  }

  const subCityChangeHandler = (subCity) => {
    setEnteredAddress(subCity);
  };

  const professionRadioHandler = (profession) => {
    setEnteredProfession(profession);
  };

  if (isUpdatingAcc) {
    return <LoadingOverlay message="Updating your account..." />;
  }

  return (
    <View style={styles.form}>
      <ScrollView>
        <View>
          <Text>First Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={updateInputValueHandler.bind(this, "firstName")}
            value={enteredFirstName}
          />
          <Text>Last Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={updateInputValueHandler.bind(this, "lastName")}
            value={enteredLastName}
          />
          <AddressDropdown
            onSelect={subCityChangeHandler}
            ph={enteredAddress}
          />
          <Text>Phone Number</Text>
          <TextInput
            style={styles.input}
            onChangeText={updateInputValueHandler.bind(this, "phoneNumber")}
            value={enteredPhoneNumber}
            keyboardType="number-pad"
          />
          {authCtx.isSP && (
            <ProfessionRadio
              onSelect={professionRadioHandler}
              firstChecked={enteredProfession}
            />
          )}

          {authCtx.isSP && (
            <>
              <Text>Short Bio</Text>
              <TextInput
                style={styles.input}
                onChangeText={updateInputValueHandler.bind(this, "shortBio")}
                value={enteredShortBio}
                multiline={true}
                textAlignVertical="top"
                numberOfLines={5}
              />
            </>
          )}

          <View style={styles.pickerContainer}>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            {
              <View style={styles.selectImageButton}>
                <Button onPress={pickImage}>Select Image </Button>
              </View>
            }
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button onPress={submitHandler}>Update Account</Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default YourAccount;

const styles = StyleSheet.create({
  form: {
    // backgroundColor: "black",
    marginHorizontal: 10,
    marginTop: 10,
    //  marginBottom: 30,
    // paddingBottom: 30,
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
    marginVertical: 12,
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
