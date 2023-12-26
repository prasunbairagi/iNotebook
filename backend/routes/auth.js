const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Prasunisagoodboy';
var fetchuser=require('../middleware/fetchuser')

//ROUTE 1: create a user using post "/api/auth/createuser" . No login required
router.post(
  "/createuser",
  [
    body("name", "Not a valid name").isLength({ min: 3 }),
    // Validate and sanitize the 'email' field
    body("email", "Not a valid email").isEmail(),
    // Validate the 'password' field
    body("password", "Not a valid password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    let success=false
    //if there are errors, return the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
      success=false
      return res.status(400).json({success, errors: result.array() });
    }
    
    try {
      // check whether the user with same email exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success=false
        return res
          .status(400)
          .json({success, error: "Sorry a user with this email already exists" });
      }
      const salt=await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password,salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data={
        user:{
          id:user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success,authtoken});
    } catch (error) {
      res.status(500).send("Internal Server error");
    }
  }
);

//ROUTE 2:authenticate a user using post "/api/auth/login" . No login required
router.post(
  "/login",
  [
    // Validate and sanitize the 'email' field
    body("email", "Not a valid email").isEmail(),
    // Validate the 'password' field is it blank or not
    body("password", "Password cant be blank").exists(),
  ],
  async (req, res) => {
    let success=false
    //if there are errors, return the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=false
      return res.status(400).json({success, errors: errors.array() });
    }
    const {email,password} = req.body;
    try {
      // check whether the user with same email exists
      let user = await User.findOne({email});
      if (!user) {
        success=false
        return res
          .status(400)
          .json({success, error: "Please try to login with correct credentials" });
      }
      const passwordCompare = bcrypt.compare(password,user.password);
      if(!passwordCompare){
        success=false
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const data={
        user:{
          id:user.id
        }
      }
      
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success, authtoken});
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server error");
    }
  }
);

//ROUTE 3:Get user details using post "/api/auth/getuser" . Login required
router.post(
  "/getuser",fetchuser,async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server error");
    }
  }
);

module.exports = router;
