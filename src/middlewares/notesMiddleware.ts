import axios from "axios";
import React from "react";
import { ACTIONTYPE } from "../reducers/notesReducer";
import { queryGetNotes, queryAddNote, queryDeleteNote, queryAddLabel, queryDeleteLabel, queryEditLabel } from "./notesQuery";

export type addNoteType = {
  title: String;
  text: String;
  email: String;
  label: String;
  pinned: Boolean;
};

export type addLabelType = {
  email: String;
  label: String;
}

const Axios = axios.create({
  baseURL: process.env.REACT_APP_HASURA_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": process.env.REACT_APP_HASURA_SECRET,
  },
});

export const getNotesAndLabels = async(dispatch: React.Dispatch<ACTIONTYPE>, email: String | undefined) => {
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

  dispatch({ type: "GET_NOTES", payload: res.data.data.notes });
  dispatch({ type: "GET_LABELS", payload: res.data.data.labels });
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
      variables: { "_id": payload },
    })
  );

  dispatch({ type: "DELETE_NOTE", payload: res.data.data.delete_notes_by_pk._id });
};

export const addLabelThunk = async (
  dispatch: React.Dispatch<ACTIONTYPE>,
  payload: addLabelType
) => {
  const res = await Axios.post(
    "/",
    JSON.stringify({
      query: queryAddLabel,
      variables: payload,
    })
  );
  dispatch({ type: "ADD_LABEL", payload: res.data.data.insert_labels_one });
};

export const deleteLabelThunk = async (
  dispatch: React.Dispatch<ACTIONTYPE>,
  payload: String
) => {
  const res = await Axios.post(
    "/",
    JSON.stringify({
      query: queryDeleteLabel,
      variables: { "_id": payload},
    })
  );
  dispatch({ type: "DELETE_LABEL", payload: res.data.data.delete_labels_by_pk._id });
};

export const editLabelThunk = async (
  dispatch: React.Dispatch<ACTIONTYPE>,
  payload: { _id: String, label: String}
) => {
  const res = await Axios.post(
    "/",
    JSON.stringify({
      query: queryEditLabel,
      variables: payload,
    })
  );

  dispatch({ type: "DELETE_LABEL", payload: res.data.data.update_labels_by_pk._id });
};