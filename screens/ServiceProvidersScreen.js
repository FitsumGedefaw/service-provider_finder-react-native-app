import { SERVICE_PROVIDERS } from "../utils/data";
import ServiceProviderItem from "../components/ServiceProviderItem";
import { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import Dropdown from "../components/DropdownComponent";

const ServiceProvidersScreen = ({ navigation, route }) => {
  const [filteredProviders, setFilteredProviders] = useState([]);

  const serviceCatName = route.params.categoryName;
  const allServiceProviders = route.params.allServiceProviders;
  //console.log(serviceCatName);
  //console.log(allServiceProviders);
  const providersUnderCategory = allServiceProviders.filter(
    (person) => person.profession === serviceCatName
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: serviceCatName,
    });

    setFilteredProviders(providersUnderCategory);
  }, [serviceCatName, navigation]);

  //console.log(providersUnderCategory);
  // console.log(providersUnderCategory.length);

  const filterBySubcity = (subCity) => {
    const providersInSubcity = providersUnderCategory.filter(
      (person) => person.address === subCity
    );
    setFilteredProviders(providersInSubcity);
  };

  if (filteredProviders.length == 0) {
    return (
      <View>
        <Image
          source={{
            uri: "https://cdn.iconscout.com/icon/premium/png-256-thumb/not-registered-user-627628.png",
          }}
          style={styles.image}
        />
        <Text style={styles.text}>Sorry,</Text>
        <Text style={styles.text2}>
          We have no service providers registered in the area.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Dropdown onSelect={filterBySubcity} />
      <FlatList
        data={filteredProviders}
        keyExtractor={(person) => person.id}
        renderItem={(itemData) => (
          <ServiceProviderItem person={itemData.item} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
  },
  image: {
    marginHorizontal: 70,
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 25,
    marginTop: 20,
    textAlign: "center",
  },
  text2: {
    fontSize: 25,
    textAlign: "center",
  },
});

export default ServiceProvidersScreen;
