import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";

const data = [
  { label: "Addis Ketema", value: "Addis Ketema" },
  { label: "Akaky Kaliti", value: "Akaky Kaliti" },
  { label: "Arada", value: "Arada" },
  { label: "Bole", value: "Bole" },
  { label: "Gullele", value: "Gullele" },
  { label: "Kirkos", value: "Kirkos" },
  { label: "Kolfe Keranio", value: "Kolfe Keranio" },
  { label: "Lideta", value: "Lideta" },
  { label: "Nifas Silk-Lafto", value: "Nifas Silk-Lafto" },
  { label: "Yeka", value: "Yeka" },
];

const AddressDropdown = ({ onSelect, ph }) => {
  //  const [value, setValue] = useState(null);

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={ph}
      searchPlaceholder="Search..."
      // value={value}
      onChange={(item) => {
        onSelect(item.value);
      }}
      renderLeftIcon={() => (
        <Ionicons
          name="location-outline"
          size={24}
          color="black"
          style={styles.icon}
        />
      )}
    />
  );
};

export default AddressDropdown;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
