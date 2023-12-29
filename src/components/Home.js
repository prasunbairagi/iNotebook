import React from "react";
import Notes from "./Notes";
import { useSelector } from "react-redux";
const Home = (props) => {
  const theme = useSelector((state) => state.theme);
  return (
    <div className={`container ${theme==='dark'?'bg-dark':''}`}>
     <Notes showAlert={props.showAlert}/>
    </div>
  );
};

export default Home;
