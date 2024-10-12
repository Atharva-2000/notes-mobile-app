/* eslint-disable semi */
import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Header from "../components/Header";
import NotesForm from "../components/NotesForm";
import { useAppContext } from "../../AppContext";

const EditNote = ({ navigation }) => {
  const { setSelectedId } = useAppContext();

  return (
    <View style={styles.mainContainer}>
      <Header />
      <View style={{ alignSelf: "flex-start", marginLeft: 7 }}>
        <Button
          mode="contained"
          onPress={() => {
            setSelectedId(null);
            navigation.navigate("Home");
          }}
        >
          Back
        </Button>
      </View>
      <NotesForm title="Edit Note" operation="updation" />
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

export default EditNote;
