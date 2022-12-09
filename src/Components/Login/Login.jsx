import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Redux/Action/action";

const Login = () => {
  const dispatch = useDispatch();
  const [email, Setemail] = useState("");
  const [password, SetPassword] = useState("");
  const handelSubmit = (e) => {
    e.preventDefault();
    const payload = { email, password };
    dispatch(login(payload));
  };
  const navigate = useNavigate();
  const { products, isError, isLoading, loggedin } = useSelector(
    (state) => state.prod
  );

  useEffect(() => {
    if (loggedin) {
      navigate("/");
    }
  });
  return (
    <div className="loginDiv">
      <form onSubmit={handelSubmit}>
        <div className="formComponents">
          <div>
            <h1>Login</h1>
          </div>
          <div>
            <input
              type="email"
              autoComplete="email"
              name=""
              onChange={(e) => Setemail(e.target.value)}
              id=""
              required={true}
              placeholder="Username"
            />
          </div>
          <div>
            <input
              type="password"
              autoComplete="password"
              name=""
              required={true}
              onChange={(e) => SetPassword(e.target.value)}
              id=""
              placeholder="Password"
            />
          </div>
          <div>
            <input
              className="button-27"
              type="submit"
              name=""
              id=""
              value={"Login"}
              placeholder="submit"
            />
          </div>
          <div>
            <Link to="/signup"> Signup</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
