import { Icon } from "semantic-ui-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./Editor.module.css";
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { addNoteThunk } from "../../middlewares/notesMiddleware";
import { useScribble } from "../../contexts/notesContext";

 
function Editor() {
  const[ title, setTitle] = useState("");
  const[ text, setText] = useState("");
  const [label, setLabel] = useState("");
  const [pinned, setPinned] = useState(false);
  const { user } = useAuth0();
  const { state, dispatch } = useScribble();


  function submitNewNote(){
    addNoteThunk(dispatch,{title, text, email:user?.email!, label, pinned })
    setText("");
    setTitle("");
    setLabel("");
    setPinned(false);
  }

  console.log(title, label, text)
  return (
    <div className={styles.editorBody}>
      
      <div className={styles.editorHeader}>
        <input name="title" value={title} placeholder="Enter your note's title" onChange={(e)=>setTitle(e.target.value)}/>
        <select placeholder="Select Label" name="label" onChange={(e)=>setLabel(e.target.value)}>
        <option value="">
            Select Label
          </option>
          {
            state.label.map(item=>(
              <option value={`${item.label}`}>
              {item.label}
            </option>
            ))
          }
          </select>
          <button onClick={()=>setPinned(prev=>!prev)} style={{padding:"0.5rem"}}>{pinned?"Unpin":"Pin"}</button>
        {text.length>11 && <Icon name="checkmark box" size="large" onClick={submitNewNote} className={styles.submitIcon} />}
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
