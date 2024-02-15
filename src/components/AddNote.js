import React, { useContext, useState,useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import { useSelector } from "react-redux";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
const AddNote = (props) => {
  const [color, setColor] = useColor("#fff700");
  // const [colorPicked, setColorPicked] = useState("#fff700");
  // const [picker, setPicker] = useState(false);
  const theme = useSelector((state) => state.theme);
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "",color:color.hex });
  const handleClick = async (e) => {
    e.preventDefault();
    await addNote(note.title, note.description, note.tag, color.hex);
    setNote({ title: "", description: "", tag: "" , color:"#fff700" });
    props.showAlert("Added Successfully", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="py-3">
        <h3 className="pb-2">Add a note</h3>

        <form
          className={`card ${
            theme === "dark" ? "addnotecard-dark" : "addnotecard-light"
          } p-3`}
        >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className={`form-control ${
                theme === "dark" ? "form-control-dark" : ""
              }`}
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
              className={`form-control ${
                theme === "dark" ? "form-control-dark" : ""
              }`}
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
              className={`form-control ${
                theme === "dark" ? "form-control-dark" : ""
              }`}
              id="tag"
              name="tag"
              onChange={onChange}
              value={note.tag}
            />
          </div>
          <div className="d-flex justify-content-between pb-3">
            <button
              data-bs-toggle="modal"
              data-bs-target="#colorpallette"
              type="button"
              className="btn btn-primary my-2"
            >
              <div className="d-flex justify-content-between">
                <div className="my-auto pe-3">Background</div>
                <div
                  className="my-auto"
                  style={{
                    backgroundColor: color.hex,
                    width: "20px",
                    border: "2px solid black",
                    borderRadius: "4px",
                    height: "20px",
                  }}
                ></div>
              </div>
            </button>
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
      <div
        className="modal fade"
        id="colorpallette"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className={`modal-content ${
              theme === "dark" ? "addnotecard-dark" : "addnotecard-light"
            }`}
          >
            <div className="modal-body">
              <ColorPicker
                hideInput={["rgb", "hsv"]}
                color={color}
                onChange={setColor}
              />
            </div>
            <div
              className={`modal-footer ${
                theme === "dark" ? "modal-footer-dark" : ""
              }`}
            >
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNote;
