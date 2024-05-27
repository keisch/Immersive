import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import Modal from "../general-components/modal/";
import { Link, useNavigate } from "react-router-dom";
import "./styles.scss";
import { useRecoilState } from "recoil";
import { isUser } from "../../states/user-state";
import axios from "axios";

const LogInForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const [animateOnLoad, setAnimateOnLoad] = useState<boolean>(false);
  const [, setUser] = useRecoilState(isUser);
  const validateEmail = (email: string): boolean => {
    const regex = /^.[a-zA-Z0-9.]+@[a-zA-Z0-9.]+.[A-Za-z0-9]+.[A-Za-z]{2,}/;
    return regex.test(email);
  };

  useEffect(() => {
    setAnimateOnLoad(true);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (email === "") {
      setErrorMessage("Enter the email to continue");
      setShowErrorModal(true);
    } else if (!validateEmail(email)) {
      setErrorMessage("The email does not have a valid format.");
      setShowErrorModal(true);
      return;
    } else if (password === "") {
      setErrorMessage("Enter the password to continue");
      setShowErrorModal(true);
      return;
    } else {
      setUser(true);

      axios
        .post("http://localhost:8080/auth/login", {
          email: email,
          password: password,
        })
        .then(function (response) {
          const { token } = response.data;
          localStorage.setItem("token", token);
          navigate("/");
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status === 401) {
              setErrorMessage("Wrong Email or Password");
              setShowErrorModal(true);
            }
          }
        });
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleCloseErrorModal = (): void => {
    setShowErrorModal(false);
  };

  return (
    <>
      <div className={`login-container ${animateOnLoad ? "swapped" : ""}`}>
        <div className="logo-container">
          <img
            className="logo-container__img"
            src="/images/LogoWhite.png"
            alt="logo"
          />
        </div>
        <div className="form-container">
          <h1 className="form-container__h1">Sign In</h1>
          <form className="form" onSubmit={handleSubmit}>
            <span className="input-container">
              <FontAwesomeIcon
                className="input-container__icon"
                icon={faUser}
              />
              <input
                className="input-container__input"
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </span>
            <span className="input-container">
              <FontAwesomeIcon
                className="input-container__icon"
                icon={faLock}
              />
              <input
                className="input-container__input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </span>
            <div>
              <Link
                to={"/signup"}
                className="input-container__submit--signin"
                aria-label="Submit"
                type="submit"
              >
                Sign Up
              </Link>
              <button
                className="input-container__submit"
                aria-label="Submit"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modal
        isOpen={showErrorModal}
        onClose={handleCloseErrorModal}
        message={errorMessage}
      />
    </>
  );
};

export default LogInForm;
