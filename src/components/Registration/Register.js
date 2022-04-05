import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import axios from "../../api/Axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z)(?=/*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

function Register() {
  let Navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [ValidMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    console.log(email, pwd, user);
    const fetchValue = {
      user: user,
      pwd: pwd,
      email: email,
    };

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify(fetchValue),
        {
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      console.log(JSON.stringify(response));
      return Navigate("/login");
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.resonse?.status === 409) {
        setErrMsg("User Taken");
      } else {
        setErrMsg("Registration failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <div className="flex justify-center items-center h-screen bg-[#afb0b3] ">
        <div className="flex rounded-lg flex-col h-3/5 max-w-[550px] bg-white w-[90%]">
          <div className="flex rounded-t-lg flex-col justify-center items-center w-full h-1/6 bg-[#75a8fa] text-white">
            <h1 className="text-lg">Distribution Management System</h1>
            <h1>Register</h1>
          </div>
          <div className="flex flex-col justify-center items-center grow text-center">
            <p
              ref={errRef}
              className={errMsg ? "errmsg text-red-500 mb-3" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>

            <form className="w-2/4" onSubmit={handleSubmit}>
              <label className="flex relative justify-center items-end">
                <input
                  className="border-b shadow-sm p-[3px]  w-full"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
              </label>
              <br />
              <label htmlFor="username" className=" relative flex ">
                <input
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  required
                  className="border-b shadow-sm p-[3px] w-full"
                  type="text"
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="UserName"
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                ></input>
                <span className={validName ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validName || !user ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <div className="user-info">
                <p
                  id="uidnote"
                  className={
                    userFocus && user && !validName
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 25 characters.
                  <br />
                  Must begin with a letter. <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
              </div>
              <br />
              <label className="flex relative justify-center items-end">
                <input
                  className="border-b shadow-sm p-[3px] w-full"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPwd(e.target.value);
                  }}
                ></input>
              </label>
              <br />

              <label className="flex relative justify-center items-end">
                <input
                  className="border-b shadow-sm p-[3px]  w-full"
                  type="password"
                  placeholder="Confirm password"
                  onChange={(e) => setMatchPwd(e.target.value)}
                ></input>
              </label>
              <button
                className=" text-white border-2 mt-5 p-1 rounded-lg shadow bg-sky-600 hover:bg-sky-700"
                type="submit"
              >
                Register
              </button>
            </form>
          </div>
          <div className="flex rounded-b-lg justify-center items-center h-1/6 bg-[#f0cfbb] text-gray-500">
            Already have an Account?{" "}
            <a href="/login" className="underline text-blue-500 ">
              {" "}
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
