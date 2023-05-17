import { useState } from "react";
import { RadioButton } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";

const RenderRadioButton = ({ onSelect }) => {
  const [checked, setChecked] = useState("Male");
  const data = [
    {
      label: "Male",
    },
    {
      label: "Female",
    },
  ];

  return (
    <View style={styles.genderContainer}>
      <Text style={styles.title}>Gender</Text>
      <View style={styles.genderItem}>
        <RadioButton
          value="Male"
          label="Carto Base MAp"
          status={checked === "Male" ? "checked" : "unchecked"}
          color="#F0A500"
          onPress={() => {
            setChecked("Male");
            onSelect("Male");
          }}
        />
        <Text>Male</Text>
      </View>

      <View style={styles.genderItem}>
        <RadioButton
          value="Female"
          status={checked === "Female" ? "checked" : "unchecked"}
          color="#F0A500"
          onPress={() => {
            setChecked("Female");
            onSelect("Female");
          }}
        />
        <Text>Female</Text>
      </View>
    </View>
  );
};

export default RenderRadioButton;

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
