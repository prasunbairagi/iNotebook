import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Loginform = (props) => {
  const theme = useSelector((state) => state.theme);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotPasswordBox, setForgotPasswordBox] = useState(false);

  let navigate = useNavigate();
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("username", json.name);
      navigate("/");
      props.showAlert("Successfully logged in", "success");
    } else {      
      if(json.error==='Wrong Password'){
        setForgotPassword(true)        
        props.showAlert("Wrong Password", "danger");
      }
      else{
        props.showAlert("User not found", "danger");
      navigate("/signup");
      }
      
    }
  };
  const changePassword = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/resetpassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Password successfully changed", "success");
    } else {      
      if(json.error==='Sorry this user is not present'){
        // setForgotPassword(true)        
        props.showAlert("Sorry this user is not present", "danger");
        navigate("/signup");
      }
      else{
        props.showAlert("There is some error", "danger");        
      }
      
    }
  };
  return (
    <div className="d-flex py-5 pt-3 px-3 justify-content-center">
      <div className="py-4 px-4 " style={{ maxWidth: "500px" }}>
        {!forgotPasswordBox && <h3 className="pb-3">Login to use your Notebook</h3>}
        {forgotPasswordBox && <h3 className="pb-3">Reset your Password</h3>}
        <div
          className={`p-3 rounded-2 ${
            theme === "dark" ? "addnotecard-dark" : "addnotecard-light"
          }`}          
        >
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className={`form-control ${theme === 'dark' ? 'form-control-dark' : ''}`}
              id="email"
              value={credentials.email}
              name="email"
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            {!forgotPasswordBox && <label htmlFor="password" className="form-label">
              Password
            </label>}
            {forgotPasswordBox && <label htmlFor="password" className="form-label">
              Reset Password
            </label>}
            <input
              type="password"
              className={`form-control ${theme === 'dark' ? 'form-control-dark' : ''}`}
              id="password"
              value={credentials.password}
              name="password"
              onChange={onChange}
            />
          </div>
          {!forgotPasswordBox && <button type="submit" className="btn btn-primary mt-3" onClick={handleSubmit}>
            Submit
          </button>}
          {forgotPassword && !forgotPasswordBox && <button className="btn ms-3 btn-primary mt-3" onClick={()=>{setForgotPasswordBox(true)}}>
            Forgot Password
          </button>}
          {forgotPassword && forgotPasswordBox && <><button className="btn btn-primary mt-3" onClick={changePassword}>
            Set Password
          </button>
          <button className="btn btn-primary ms-3 mt-3" onClick={()=>{setForgotPasswordBox(false);setForgotPassword(false)}}>
          Back
        </button></>}
        </div>
      </div>
    </div>
  );
};

export default Loginform;
