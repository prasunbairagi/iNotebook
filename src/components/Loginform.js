import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Loginform = (props) => {
  const theme = useSelector((state) => state.theme);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
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
      navigate("/");
      props.showAlert("Successfully logged in", "success");
    } else {
      props.showAlert("User not found", "danger");
      navigate("/signup");
    }
  };
  return (
    <div className="d-flex py-5 pt-3 px-3 justify-content-center">
      <div className="py-4 px-4 " style={{ maxWidth: "500px" }}>
        <h3 className="pb-3">Login to use your Notebook</h3>
        <form
          className={`p-3 rounded-2 ${
            theme === "dark" ? "addnotecard-dark" : "addnotecard-light"
          }`}
          onSubmit={handleSubmit}
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
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${theme === 'dark' ? 'form-control-dark' : ''}`}
              id="password"
              value={credentials.password}
              name="password"
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Loginform;
