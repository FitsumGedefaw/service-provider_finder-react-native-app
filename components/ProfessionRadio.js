import { useState } from "react";
import { RadioButton } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";

const ProfessionRadio = ({ onSelect, firstChecked }) => {
  const [checked, setChecked] = useState(firstChecked);
  console.log("in the comp: ", checked);
  return (
    <View style={styles.genderContainer}>
      <Text style={styles.title}>Select your profession</Text>
      <View style={styles.genderItem}>
        <RadioButton
          value="Nurse"
          label="Carto Base MAp"
          status={checked === "Nurse" ? "checked" : "unchecked"}
          color="#F0A500"
          onPress={() => {
            setChecked("Nurse");
            onSelect("Nurse");
          }}
        />
        <Text>Nurse</Text>
      </View>

      <View style={styles.genderItem}>
        <RadioButton
          value="Tutor"
          status={checked === "Tutor" ? "checked" : "unchecked"}
          color="#F0A500"
          onPress={() => {
            setChecked("Tutor");
            onSelect("Tutor");
          }}
        />
        <Text>Tutor</Text>
      </View>

      <View style={styles.genderItem}>
        <RadioButton
          value="Electrician"
          status={checked === "Electrician" ? "checked" : "unchecked"}
          color="#F0A500"
          onPress={() => {
            setChecked("Electrician");
            onSelect("Electrician");
          }}
        />
        <Text>Electrician</Text>
      </View>

      <View style={styles.genderItem}>
        <RadioButton
          value="Cooking Maid"
          status={checked === "Cooking Maid" ? "checked" : "unchecked"}
          color="#F0A500"
          onPress={() => {
            setChecked("Cooking Maid");
            onSelect("Cooking Maid");
          }}
        />
        <Text>Cooking Maid</Text>
      </View>

      <View style={styles.genderItem}>
        <RadioButton
          value="Cleaning Maid"
          status={checked === "Cleaning Maid" ? "checked" : "unchecked"}
          color="#F0A500"
          onPress={() => {
            setChecked("Cleaning Maid");
            onSelect("Cleaning Maid");
          }}
        />
        <Text>Cleaning Maid</Text>
      </View>

      <View style={styles.genderItem}>
        <RadioButton
          value="Satellite Dish Tech"
          status={checked === "Satellite Dish Tech" ? "checked" : "unchecked"}
          color="#F0A500"
          onPress={() => {
            setChecked("Satellite Dish Tech");
            onSelect("Satellite Dish Tech");
          }}
        />
        <Text>Satellite Dish Tech</Text>
      </View>

      <View style={styles.genderItem}>
        <RadioButton
          value="Plumber"
          status={checked === "Plumber" ? "checked" : "unchecked"}
          color="#F0A500"
          onPress={() => {
            setChecked("Plumber");
            onSelect("Plumber");
          }}
        />
        <Text>Plumber</Text>
      </View>

      <View style={styles.genderItem}>
        <RadioButton
          value="Driver"
          status={checked === "Driver" ? "checked" : "unchecked"}
          color="#F0A500"
          onPress={() => {
            setChecked("Driver");
            onSelect("Driver");
          }}
        />
        <Text>Driver</Text>
      </View>
    </View>
  );
};

export default ProfessionRadio;

const styles = StyleSheet.create({
  genderContainer: {
    margin: 8,
  },
  title: {
    //marginLeft: 5,
  },
  genderItem: {
    flexDirection: "row",
    alignItems: "center",
  },
});
