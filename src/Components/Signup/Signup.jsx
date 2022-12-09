import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../Redux/Action/action";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, Setemail] = useState("");
  const [password, SetPassword] = useState("");
  const [name, SetName] = useState("");
  const handelSubmit = (e) => {
    e.preventDefault();
    const payload = { name, email, password };
    dispatch(signup(payload));
    navigate("/login");
  };
  return (
    <div className="loginDiv">
      <form onSubmit={handelSubmit}>
        <div className="formComponents">
          <div>
            <h1>Signup</h1>
          </div>
          <div>
            <input
              type="text"
              autoComplete="name"
              name=""
              required={true}
              onChange={(e) => SetName(e.target.value)}
              id=""
              placeholder="Name"
            />
          </div>
          <div>
            <input
              type="email"
              autoComplete="email"
              name=""
              onChange={(e) => Setemail(e.target.value)}
              id=""
              required={true}
              placeholder="email"
            />
          </div>
          <div>
            <input
              type="password"
              autoComplete="password"
              name=""
              onChange={(e) => SetPassword(e.target.value)}
              id=""
              required={true}
              placeholder="Password"
            />
          </div>
          <div>
            <input
              className="button-27"
              type="submit"
              name=""
              id=""
              value={"SignUp"}
              placeholder="submit"
            />
          </div>
          <div>
            <Link to="/login"> Login</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
