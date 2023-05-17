import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import call from "react-native-phone-call";
import Button from "../components/ui/Button";
import { Ionicons } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";
const ServiceProviderDetailsScreen = ({ route }) => {
  const person = route.params.person;
  return (
    <ScrollView>
      <View style={styles.rootContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: person.photoUrl }} />
        </View>
        <Text style={styles.name}>
          {person.firstName} {person.lastName}
        </Text>
        <View style={styles.datails}>
          <Text style={styles.detailItem}>Profession: </Text>
          <Text style={styles.detailItem1}>{person.profession}</Text>
        </View>
        <View style={styles.datails}>
          <Text style={styles.detailItem}>Subcity: </Text>
          <Text style={styles.detailItem1}>{person.address}</Text>
        </View>

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>About me</Text>
        </View>

        <View style={styles.bioContainer}>
          <Text>"{person.shortBio}"</Text>
        </View>

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Contact address</Text>
        </View>

        <View>
          <View style={styles.button}>
            <Button
              onPress={() => {
                const args = {
                  number: person.phoneNumber, // String value with the number to call
                  prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
                  skipCanOpen: true, // Skip the canOpenURL check
                };

                call(args).catch(console.error);
              }}
            >
              <Ionicons name="call" size={16} color="#F0A500" />
              <Text style={styles.call}>Call Me</Text>
            </Button>
          </View>
          <View style={styles.button}>
            <Button
              onPress={() => {
                MailComposer.composeAsync({
                  recipients: [person.email],
                  subject: "Unleaded Feedback",
                }).catch(() =>
                  Alert.alert("Unable To Send Feedback", undefined, [
                    {
                      text: "Copy feedback email",
                      onPress: () =>
                        Clipboard.setString("unleaded@reiner.design"),
                    },
                    {
                      text: "OK",
                    },
                  ])
                );
              }}
            >
              Email Me
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginBottom: 32,
    paddingTop: 16,
    alignItems: "center",
  },
  imageContainer: {
    backgroundColor: "",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 170,
    height: 200,
    borderWidth: 3,
    borderColor: "#F0A500",
  },
  name: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "black",
  },
  bioContainer: {
    padding: 10,
    borderRadius: 8,
    shadowRadius: 8,
    backgroundColor: "white",
    elevation: 4,
    overflow: "hidden",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitleContainer: {
    marginHorizontal: 24,
    marginTop: 20,
    padding: 6,
    borderBottomColor: "white",
    borderBottomWidth: 2,
  },
  datails: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  detailItem: {
    color: "#F0A500",
    marginHorizontal: 4,
    fontSize: 20,
  },
  detailItem1: {
    color: "black",
    marginHorizontal: 4,
    fontSize: 20,
    fontWeight: "bold",
  },
  call: {
    marginLeft: 6,
  },
  button: {
    marginVertical: 8,
  },
});

export default ServiceProviderDetailsScreen;
