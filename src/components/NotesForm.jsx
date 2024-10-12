/* eslint-disable operator-linebreak */
/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../AppContext";

const NotesForm = ({ title, operation }) => {
  const navigation = useNavigation();
  const { getSingleNote, addNewNote, selectedId, setSelectedId, editNote } =
    useAppContext();

  const emptyNote = {
    id: Date.now().toString(36),
    title: "",
    description: "",
  };

  const [note, setNote] = useState(emptyNote);

  const handleInputChange = (name, value) => {
    setNote({ ...note, [name]: value });
  };

  const addNote = () => {
    if (note.title.trim() !== "") {
      addNewNote(note);
      navigation.navigate("Home");
    }
  };

  const edit_note = () => {
    if (note.title.trim() !== "") {
      editNote(selectedId, note);
      navigation.navigate("Home");
      setSelectedId(null);
    }
  };

  const getOriginalNote = () => {
    const originalNote = getSingleNote(selectedId);
    setNote(originalNote);
  };

  useEffect(() => {
    if (selectedId) {
      getOriginalNote();
    }
  }, [selectedId]);

  const { noteFormCard, formTitle, buttonsContainer } = styles;

  return (
    <View style={noteFormCard}>
      <Text style={formTitle}>{title}</Text>
      <TextInput
        mode="outlined"
        style={{ flexDirection: "row", height: 36 }}
        label="Title"
        value={note.title}
        onChangeText={(text) => {
          handleInputChange("title", text);
        }}
      />
      <TextInput
        mode="outlined"
        multiline
        style={{ flexDirection: "row", height: 200 }}
        label="Description"
        value={note.description}
        onChangeText={(text) => {
          handleInputChange("description", text);
        }}
      />
      <View style={buttonsContainer}>
        {operation === "creation" && (
          <Button
            mode="contained"
            onPress={addNote}
            disabled={note.title.trim() === ""}
          >
            Add Note
          </Button>
        )}
        {operation === "updation" && (
          <>
            <Button mode="outlined" onPress={getOriginalNote}>
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={edit_note}
              disabled={note.title.trim() === ""}
            >
              Save Note
            </Button>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noteFormCard: {
    borderRadius: 16,
    borderColor: "grey",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 15,
    gap: 18,
    margin: 15,
    alignItems: "center",
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NotesForm;
