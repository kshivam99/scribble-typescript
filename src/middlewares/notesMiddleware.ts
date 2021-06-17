import axios from "axios";
import React from "react";
import { ACTIONTYPE } from "../reducers/notesReducer";
import { queryGetNotes, queryAddNote, queryDeleteNote } from "./notesQuery";

export type addNoteType = {
  title: String;
  text: String;
  email: String;
  label: String;
  pinned: Boolean;
};

const Axios = axios.create({
  baseURL: process.env.REACT_APP_HASURA_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": process.env.REACT_APP_HASURA_SECRET,
  },
});

export const getNotes = async(dispatch: React.Dispatch<ACTIONTYPE>, email: String | undefined) => {
  try{
  const res = await Axios.post(
    "/",
    JSON.stringify({
      query: queryGetNotes,
      variables: {
        "email":email
      },
    })
  );
    console.log(res)
  dispatch({ type: "GET_NOTES", payload: res.data.data.notes });
  }
  catch(err)
  {
    console.log(err);
  }
}


export const addNoteThunk = async (
  dispatch: React.Dispatch<ACTIONTYPE>,
  payload: addNoteType
) => {
  const res = await Axios.post(
    "/",
    JSON.stringify({
      query: queryAddNote,
      variables: { ...payload },
    })
  );
  dispatch({ type: "ADD_NOTE", payload: res.data.data.insert_notes_one });
};

export const deleteNoteThunk = async (
  dispatch: React.Dispatch<ACTIONTYPE>,
  payload: String
) => {
  const res = await Axios.post(
    "/",
    JSON.stringify({
      query: queryDeleteNote,
      variables: { ...payload },
    })
  );

  dispatch({ type: "DELETE_NOTE", payload: res.data.data.delete_notes_by_pk._id });
};

