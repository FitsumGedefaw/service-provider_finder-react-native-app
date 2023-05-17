import CategoryItem from "../components/CategoryItem";
import { FlatList } from "react-native";
import { SERVICE_CATEGORIES } from "../utils/data";
import { fetchAllServiceProviders } from "../utils/http";
import { useState, useLayoutEffect } from "react";

const ServiceCategoriesScreen = ({ navigation }) => {
  const serviceCategories = SERVICE_CATEGORIES;
  const [allServiceProviders, setAllServiceProviders] = useState([]);

  useLayoutEffect(() => {
    const getAllServiceProviders = async () => {
      const AllServiceProviders = await fetchAllServiceProviders();
      setAllServiceProviders(AllServiceProviders);
    };
    getAllServiceProviders();
  }, []);

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={serviceCategories}
      numColumns={2}
      renderItem={(itemData) => {
        return (
          <CategoryItem
            categoryName={itemData.item.categoryName}
            onPress={() => {
              navigation.navigate("ServiceProviders", {
                categoryName: itemData.item.categoryName,
                allServiceProviders: allServiceProviders,
              });
            }}
          />
        );
      }}
    />
  );
};

export default ServiceCategoriesScreen;
