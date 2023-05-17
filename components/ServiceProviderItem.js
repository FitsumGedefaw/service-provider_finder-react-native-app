import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ServiceProviderItem = ({ person }) => {
  const navigation = useNavigation();
  const navigationHandler = () => {
    navigation.navigate("Service Provider Details", { person: person });
  };
  return (
    <View style={styles.providerItem}>
      <Pressable
        onPress={navigationHandler}
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
      >
        <View style={styles.innerContainer}>
          <View style={styles.imageContainer}>
            {<Image source={{ uri: person.photoUrl }} style={styles.image} />}
          </View>
          <View style={styles.datails}>
            <Text style={styles.detailItem}>
              {person.firstName} {person.lastName}
            </Text>
            <Text style={styles.detailItem}>{person.phoneNumber}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  providerItem: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 16,
    overflow: "hidden",
    elevation: 4,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 170,
    height: 200,
  },
  imageContainer: {
    flex: 1,
    // backgroundColor: "yellow",
  },
  buttonPressed: {
    opacity: 0.5,
  },

  datails: {
    flex: 1,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  detailItem: {
    margin: 8,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default ServiceProviderItem;
