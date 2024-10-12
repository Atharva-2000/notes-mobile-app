/* eslint-disable semi */
import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Header from "../components/Header";
import NotesForm from "../components/NotesForm";

const CreateNote = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <Header />
      <View style={{ alignSelf: "flex-start", marginLeft: 7 }}>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          Back
        </Button>
      </View>
      <NotesForm title="Create New Note" operation="creation" />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    flex: 1,
    paddingTop: 40,
    backgroundColor: "white",
    gap: 24,
  },
});

export default CreateNote;
