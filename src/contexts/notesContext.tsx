import { createContext, useContext, useReducer } from "react";
import React from "react";
import { notesReducer, ACTIONTYPE } from "../reducers/notesReducer";

export type notesType = {
  _id: String;
  text: String;
  pinned: Boolean;
  archived: Boolean;
  trash: Boolean;
  label: String;
};

export type labelType = {
  _id: String;
  name: String;
};

export type initialStateType = {
  notes: notesType[];
  email: String;
  label: labelType[];
};

export type ContextValue = {
    state: initialStateType;
    dispatch: React.Dispatch<ACTIONTYPE>;
  };



const NotesContext = createContext({} as ContextValue);


const initialState: initialStateType = {
  notes: [],
  email: "",
  label: []
};

export const NotesProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);
  return (
    <NotesContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useScribble = () => useContext(NotesContext);
