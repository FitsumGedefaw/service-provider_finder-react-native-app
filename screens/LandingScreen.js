import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/ui/Button";
import { AuthContext } from "../store/auth-context";

const LandingScreen = ({ navigation }) => {
  const authCtx = useContext(AuthContext);

  const navigateEmployerToLoginScreen = () => {
    authCtx.set_Is_SP(false);
    authCtx.set_Is_Employer(true);
    navigation.navigate("Login");
  };

  const navigateSPToLoginScreen = () => {
    authCtx.set_Is_Employer(false);
    authCtx.set_Is_SP(true);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.text}>Which one are you?</Text>
      </View>
      <View style={styles.item}>
        <Button onPress={navigateEmployerToLoginScreen}>Employer</Button>
      </View>
      <View style={styles.item}>
        <Button onPress={navigateSPToLoginScreen}>Service Provider</Button>
      </View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    //fontFamily: "Rubik",
    fontSize: 15,
    fontWeight: "500",
  },
  item: {
    margin: 10,
    width: "70%",
  },
});
