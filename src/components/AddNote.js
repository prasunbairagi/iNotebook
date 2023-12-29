import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { useSelector } from "react-redux";
const AddNote = (props) => {
  const theme= useSelector((state)=>state.theme)
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Added Successfully", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="py-3">
      <h3 className="pb-2">Add a note</h3>

      <form className={`card ${theme === 'dark' ? 'addnotecard-dark' : 'addnotecard-light'} p-3`}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className={`form-control ${theme === 'dark' ? 'form-control-dark' : ''}`}
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className={`form-control ${theme === 'dark' ? 'form-control-dark' : ''}`}
            id="description"
            name="description"
            onChange={onChange}
            value={note.description}
            rows="3"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className={`form-control ${theme === 'dark' ? 'form-control-dark' : ''}`}
            id="tag"
            name="tag"
            onChange={onChange}
            value={note.tag}
          />
        </div>
        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          className="btn btn-primary my-2"
          onClick={handleClick}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;
