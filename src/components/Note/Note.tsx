import { Icon } from "semantic-ui-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./Note.module.css";
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { addNoteThunk } from "../../middlewares/notesMiddleware";
import { useScribble } from "../../contexts/notesContext";
import { useParams } from "react-router-dom"

 
function Editor() {
  const { state, dispatch } = useScribble();
  const { noteId } = useParams();
  const note = state.notes.find(item=> item._id === noteId)
  const noteTitle: any = note?.title
  const noteText: any = note?.text
  const noteLabel: any = note?.label
  const[ title, setTitle] = useState(noteTitle);
  const[ text, setText] = useState(noteText);
  const [label, setLabel] = useState(noteLabel);
  const { user } = useAuth0();

  console.log(title, label, text)
  return (
    <div className={styles.editorBody}>
      
      <div className={styles.editorHeader}>
        <input name="title" value={title} placeholder="Enter your note's title" onChange={(e)=>setTitle(e.target.value)}/>
        {label}
        <select placeholder="Select Label" name="label" value={label} onChange={(e)=>setLabel(e.target.value)}>
        <option value="">
            Change Label
          </option>
          <option value="label1">
            label1
          </option>
          <option value="label2">
            label2
          </option>
          </select>
      </div>

      <ReactQuill
        value={text}
        onChange={(e)=>setText(e)}
        className={styles.editor}
        placeholder="Write your note here..."
      />
    </div>
  );
}

export default Editor;
