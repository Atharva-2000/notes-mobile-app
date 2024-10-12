import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View>
      <Text style={styles.title}>Notes App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "purple",
    alignSelf: "center",
    marginTop: 10,
  },
});

export default Header;
