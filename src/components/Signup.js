import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Signup = (props) => {
  const theme = useSelector((state) => state.theme);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;
    if (password === cpassword) {
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        props.showAlert("Account created successfully", "success");
      } else {
        props.showAlert("Sorry user already exists", "danger");
      }
    } else {
      props.showAlert(
        "Password and Confirm Password are not matching",
        "danger"
      );
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="d-flex py-5 pt-3 px-3 justify-content-center">
      <div className="py-4 px-4" style={{ maxWidth: "500px" }}>
        <h3 className="pb-3">Signup to use your Notebook</h3>
        <form
          className={`p-3 rounded-2 ${
            theme === "dark" ? "addnotecard-dark" : "addnotecard-light"
          }`}
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Name
            </label>
            <input
              type="text"
              className={`form-control ${
                theme === "dark" ? "form-control-dark" : ""
              }`}
              id="name"
              value={credentials.name}
              name="name"
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className={`form-control ${
                theme === "dark" ? "form-control-dark" : ""
              }`}
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
              className={`form-control ${
                theme === "dark" ? "form-control-dark" : ""
              }`}
              id="password"
              value={credentials.password}
              name="password"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className={`form-control ${
                theme === "dark" ? "form-control-dark" : ""
              }`}
              id="cpassword"
              value={credentials.cpassword}
              name="cpassword"
              onChange={onChange}
              minLength={5}
              required
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

export default Signup;
