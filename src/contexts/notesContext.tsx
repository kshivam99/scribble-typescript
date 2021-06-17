import { createContext, useContext, useReducer } from "react";
import React from "react";
import { notesReducer, ACTIONTYPE } from "../reducers/notesReducer";
import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.REACT_APP_HASURA_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": process.env.REACT_APP_HASURA_SECRET,
  },
});


export type notesType = {
  _id: String;
  title: String;
  text: String;
  pinned: Boolean;
  archived: Boolean;
  label: String;
};

export type labelType = {
  _id: String;
  label: String;
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


export const initialState: initialStateType = {
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
