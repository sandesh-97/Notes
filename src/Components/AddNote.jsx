import React, { useState } from "react";
import "../index.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const AddNote = (props) => {
  const [expand, setExpand] = useState(false);
  const [note, setNote] = useState({
    title: "",
    tagline: "",
    content: "",
  });

  const InputEvent = (e) => {
    // const value = e.target.value;
    // const name = e.target.value;

    const { name, value } = e.target;

    setNote((oldData) => {
      return {
        ...oldData,
        [name]: value,
      };
    });
    console.log(note);
  };

  const addEvent = () => {
    props.passnote(note);
    setNote({
      title: "",
      tagline: "",
      content: "",
    });
  };

  const expandIt = () => {
    setExpand(true);
  };

  return (
    <>
      <div className="main_note">
        <form>
          {expand ? (
            <input
              type="text"
              name="title"
              value={note.title}
              onChange={InputEvent}
              placeholder="Title"
              autoComplete="off"
            />
          ) : null}
          {expand ? (
            <input
              type="text"
              name="tagline"
              value={note.tagline}
              onChange={InputEvent}
              placeholder="Tagline"
            />
          ) : null}

          <textarea
            rows=""
            name="content"
            value={note.content}
            onChange={InputEvent}
            column=""
            placeholder="write a note"
            onClick={expandIt}
          ></textarea>

          {expand ? (
            <Button onClick={addEvent}>
              <AddIcon className="plus_sign" />{" "}
            </Button>
          ) : null}
        </form>
      </div>
    </>
  );
};

export default AddNote;
