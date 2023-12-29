import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";
import { useSelector } from "react-redux";
const Noteitem = (props) => {
  const theme = useSelector((state) => state.theme);
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const { note,updateNote } = props;
  return (
    <div className="col-md-6 py-1">
      <div className={`card ${theme === 'dark' ? 'addnotecard-dark' : 'addnotecard-light'} my-2`}>
        <div className="card-body" style={{position:'relative'}}>
          <span className={`text-white px-2 rounded-3 tags`} style={{position:'absolute',top:"-10px",left:"0px",backgroundColor:'#ff7e00'}}>{note.tag}</span>
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
