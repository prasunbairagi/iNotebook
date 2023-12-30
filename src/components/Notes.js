import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Notes = (props) => {
  const theme = useSelector((state) => state.theme);
  let navigate=useNavigate()
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({
    etitle: "",
    edescription: "",
    etag: "",
  });
  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert('Updated Successfully','success')
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate('/login')
    }
    
  }, [getNotes]);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
  };
  const ref = useRef(null);
  const refClose = useRef(null);
  return (
    <>
    <div className="row pt-3 px-0 mx-0">
      <div className="col-12 col-md-4 col-lg-4">
      <AddNote showAlert={props.showAlert}/>
      </div>
      <div className="col-12 col-md-8 col-lg-8 mx-0 px-0">
      <div className="row mx-0 px-0 py-3">
        <h3 className="pb-2">Yours notes</h3>
        <div className="container">
        {notes.length===0 && 'No notes to display'}
        </div>
        <div className="row py-1 mx-0 px-0" style={{maxHeight:'400px',overflow:'auto'}}>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
          );
        })}
        </div>
        
      </div>
      </div>
    </div>
      
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className={`modal-content ${theme === 'dark' ? 'addnotecard-dark' : 'addnotecard-light'}`}>
            <div className={`modal-header ${theme === 'dark' ? 'modal-header-dark' : ''}`}>
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Node
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className={`form-control ${theme === 'dark' ? 'form-control-dark' : ''}`}
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.etitle}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className={`form-control ${theme === 'dark' ? 'form-control-dark' : ''}`}
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className={`form-control ${theme === 'dark' ? 'form-control-dark' : ''}`}
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className={`modal-footer ${theme === 'dark' ? 'modal-footer-dark' : ''}`}>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                disabled={note.etitle.length<5 || note.edescription.length<5}
                type="button"
                onClick={handleClick}
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Notes;
