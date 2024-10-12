import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";

const AppContext = createContext({
  notes: [],
  getAllNotes: () => {},
  selectedId: null,
  setSelectedId: () => {},
  getSingleNote: () => {},
  filterNotesByTitle: () => {},
  addNewNote: () => {},
  editNote: () => {},
  deleteNote: () => {},
});

export const AppProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const [selectedId, setSelectedId] = useState(null);

  const toast = useToast();

  const getAllNotes = async () => {
    try {
      const value = await AsyncStorage.getItem("notes");
      if (value !== null) {
        const allNotes = JSON.parse(value);
        if (allNotes) {
          setNotes(allNotes);
        } else setNotes([]);
      }
    } catch (e) {
      // error reading value
      setNotes([]);
    }
  };

  const getSingleNote = (id) => {
    const note = notes.find((item) => item.id === id);
    return note;
  };

  const filterNotesByTitle = (text) => {
    const filteredNotes = notes.filter((item) => {
      if (item.title.includes(text)) return item;
    });

    if (text.trim() === "") getAllNotes();
    else setNotes(filteredNotes);
  };

  const updateLocalStorage = async (notesList, toastMessage) => {
    try {
      await AsyncStorage.setItem("notes", JSON.stringify(notesList));
      toast.show(`${toastMessage} Sucessfully !!`, { type: "success" });
      getAllNotes();
    } catch (e) {
      toast.show("Some error occurred while updating notes data !!", {
        type: "danger",
      });
    }
  };

  const addNewNote = (note) => {
    // eslint-disable-next-line prefer-const
    let newNotesList = notes;
    newNotesList.push(note);
    setNotes(newNotesList);
    updateLocalStorage(newNotesList, "Added Note");
  };

  const editNote = (id, note) => {
    const updatedNotesList = notes.map((item) => {
      if (item.id === id) return note;
      return item;
    });
    setNotes(updatedNotesList);
    updateLocalStorage(updatedNotesList, "Updated");
  };

  const deleteNote = (id) => {
    const updatedNotesList = notes.filter((item) => item.id !== id);
    setNotes(updatedNotesList);
    updateLocalStorage(updatedNotesList, "Deleted");
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <AppContext.Provider
      value={{
        notes,
        getAllNotes,
        getSingleNote,
        filterNotesByTitle,
        addNewNote,
        editNote,
        deleteNote,
        selectedId,
        setSelectedId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
