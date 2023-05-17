import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

import ServiceCategoriesScreen from "./screens/ServiceCategoriesScreen";
import ServiceProvidersScreen from "./screens/ServiceProvidersScreen";
import ServiceProviderDetailsScreen from "./screens/ServiceProviderDetailsScreen";
import LandingScreen from "./screens/LandingScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import YourAccount from "./screens/YourAccount";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import IconButton from "./components/ui/IconButton";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#FAFAFA" },
        headerTintColor: "black",
        sceneContainerStyle: { backgroundColor: "#FAFAFA" },
      }}
    >
      <Drawer.Screen
        name="Service Categories"
        component={ServiceCategoriesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="category" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Your Account"
        component={YourAccount}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="logout"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#FAFAFA" },
        headerTintColor: "black",
        contentStyle: { backgroundColor: " #FAFAFA" },
      }}
    >
      <Stack.Screen name="Welcome" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#FAFAFA" },
        headerTintColor: "black",
        contentStyle: { backgroundColor: " #FAFAFA" },
      }}
    >
      <Stack.Screen
        name="Drawer Screen"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ServiceProviders"
        component={ServiceProvidersScreen}
      />
      <Stack.Screen
        name="Service Provider Details"
        component={ServiceProviderDetailsScreen}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}

      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />

      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}
