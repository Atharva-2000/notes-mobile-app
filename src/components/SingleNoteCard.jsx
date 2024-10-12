import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../AppContext";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

const SingleNoteCard = ({ note }) => {
  const navigation = useNavigation();

  const { deleteNote, setSelectedId } = useAppContext();

  const editNote = (id) => {
    setSelectedId(id);
    navigation.navigate("Edit");
  };

  const { noteCard, noteTitle, noteDescription, buttonsContainer } = styles;

  return (
    <View style={noteCard}>
      <Text style={noteTitle}>{note.title}</Text>
      <Text style={noteDescription}>{note.description}</Text>
      <View style={buttonsContainer}>
        <Feather
          name="edit"
          size={27}
          color="black"
          onPress={() => {
            editNote(note.id);
          }}
        />
        <AntDesign
          name="delete"
          size={27}
          color="red"
          onPress={() => {
            deleteNote(note.id);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noteCard: {
    marginBottom: 15,
    borderRadius: 16,
    borderColor: "grey",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 15,
    gap: 12,
  },
  noteTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  noteDescription: {
    fontSize: 16,
  },
  buttonsContainer: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
});

export default SingleNoteCard;
