import React, { useState, useRef, useEffect } from "react";
import { UsersIcon } from "@heroicons/react/solid";
import { KeyIcon } from "@heroicons/react/solid";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import axios from "../../api/Axios";

const LOGIN_URL = "/auth";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [errMsg, setErrMsg] = useState("");
  const from = location.state?.from?.pathname || "/";

  const errRef = useRef();
  let userCredentials = { user: userName, pwd: password };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify(userCredentials),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      //  const accessToken = response?.data?.accessToken;
      //  const roles = response?.data?.roles;
      setAuth({ user: userName, pwd: password });
      setUserName("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#afb0b3] ">
      <div className="flex flex-col h-3/5 max-w-[550px] bg-white w-[90%]">
        <div className="flex justify-center items-center w-full h-1/6 bg-[#75a8fa] text-white">
          Distribution Management System
        </div>
        <div className="flex flex-col justify-center items-center grow text-center">
          <form className="w-2/4" onSubmit={(e) => handleSubmit(e)}>
            <label className=" relative flex justify-center items-end">
              <UsersIcon className="absolute h-5 w-5 text-blue-500 mr-1 left-2" />
              <input
                className="border-b mt-3 ml-10 w-full"
                type="text"
                placeholder="UserName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              ></input>
            </label>

            <br />
            <label className="flex relative justify-center items-end">
              <KeyIcon className="absolute h-5 w-5 text-blue-500 mr-1 left-2" />
              <input
                className="border-b mt-3 ml-10 w-full"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </label>
            <br />
            <button
              className=" text-white border-2 mt-5 p-1 rounded-lg shadow bg-sky-600 hover:bg-sky-700"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center h-1/6 bg-[#f0cfbb] text-gray-500">
          Do Not have an Accout?{" "}
          <a href="/register" className="underline text-blue-500 ">
            {" "}
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
