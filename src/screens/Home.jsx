/* eslint-disable semi */
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ScrollView, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Header from "../components/Header";
import { useAppContext } from "../../AppContext";
import SingleNoteCard from "../components/SingleNoteCard";

const EmptyNotesMessage = () => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text>No notes available</Text>
    </View>
  );
};

const Home = ({ navigation }) => {
  const { notes, filterNotesByTitle } = useAppContext();

  const [searchText, setSearchText] = useState("");

  const addNewNote = () => {
    navigation.navigate("Create");
  };

  useEffect(() => {
    filterNotesByTitle(searchText);
  }, [searchText]);

  return (
    <View style={styles.mainContainer}>
      <Header />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          marginTop: 10,
        }}
      >
        <TextInput
          mode="outlined"
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
          }}
          label={"Search"}
          placeholder="Search by Title"
          style={{ height: 34, flex: 1 }}
        />
        <Button mode="contained" onPress={addNewNote}>
          Add Note
        </Button>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 20 }}
      >
        <FlatList
          data={notes}
          renderItem={({ item }) => <SingleNoteCard note={item} />}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<EmptyNotesMessage />}
        />
      </ScrollView>
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
    paddingHorizontal: 15,
  },
});

export default Home;
