import { Pressable, StyleSheet, View, Text } from "react-native";

const CategoryItem = ({ categoryName, onPress }) => {
  return (
    <View style={styles.mainContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}
        android_ripple={{ color: "#ccc" }}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.categoryName}>{categoryName}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 8,
    shadowRadius: 8,
    backgroundColor: "white",
    elevation: 4,
    height: 150,
    overflow: "hidden",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryName: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default CategoryItem;
