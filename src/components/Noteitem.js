import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const { note,updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-2">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div>
              <h5 className="card-title">{note.title}</h5>
            </div>
            <div>
              <i className="fa fa-pencil px-2" aria-hidden="true" onClick={()=>{updateNote(note)}}></i>
              <i className="fa fa-trash" aria-hidden="true" onClick={()=>{deleteNote(note._id);props.showAlert('Deleted Successfully','success')}}></i>
            </div>
          </div>

          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
