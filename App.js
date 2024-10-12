import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/screens/Home";
import CreateNote from "./src/screens/CreateNote";
import EditNote from "./src/screens/EditNote";
import { AppProvider } from "./AppContext";
import { ToastProvider } from "react-native-toast-notifications";

const Stack = createNativeStackNavigator();

const AppContainer = () => {

  return (

    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Create" component={CreateNote} />
        <Stack.Screen name="Edit" component={EditNote} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

const App = () => {
  return (
  <ToastProvider
    placement="top"
    duration={2000}
    animationType='slide-in'
    animationDuration={250}
  >
    <AppProvider>
      <AppContainer />
    </AppProvider>
  </ToastProvider>
  );
};

export default App;
