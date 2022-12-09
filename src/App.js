import logo from "./logo.svg";
import "./App.css";
import Login from "./Components/Login/Login";
import Dashbord from "./Components/Dashbord/Dashbord";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Signup from "./Components/Signup/Signup";
import { useState } from "react";

function App() {
  const { products, isError, isLoading, loggedin } = useSelector(
    (state) => state.prod
  );

  console.log("Dashbord  products", isLoading);
  return (
    <div className="App">
      {/* <div className="editform">
        <div></div>
      </div> */}
      <Routes>
        <Route path="/" element={<Dashbord />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
      {/* <div> */}{" "}
      {isLoading && (
        <center className="loadin">
          <img width="100%" src="loader.gif" alt="loading"></img>
        </center>
      )}
      {/* </div> */}
    </div>
  );
}

export default App;
