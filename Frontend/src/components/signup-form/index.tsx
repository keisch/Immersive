import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import Modal from "../general-components/modal/";
import { Link, useNavigate } from "react-router-dom";
import "./styles.scss";
import { useRecoilState } from "recoil";
import { isUser } from "../../states/user-state";

const SignUpForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [animateOnLoad, setAnimateOnLoad] = useState<boolean>(false);
  const navigate = useNavigate();
  const [setUser] = useRecoilState(isUser);
  const validateEmail = (email: string): boolean => {
    const regex = /^.[a-zA-Z0-9.]+@[a-zA-Z0-9.]+.[A-Za-z0-9]+.[A-Za-z]{2,}/;
    return regex.test(email);
  };

  useEffect(() => {
    setAnimateOnLoad(true);
  }, [animateOnLoad]);

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
      navigate("/");
      console.log("kchikc");
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
      <div className={`signup-container ${animateOnLoad ? "swapped" : ""}`}>
        <div className="form-sigin-container">
          <h1 className="form-sigin-container__h1">Sign Up</h1>
          <form className="form-signin" onSubmit={handleSubmit}>
            <span className="input-signin-container">
              <FontAwesomeIcon
                className="input-signin-container__icon"
                icon={faUser}
              />
              <input
                className="input-signin-container__input"
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </span>
            <span className="input-signin-container">
              <FontAwesomeIcon
                className="input-signin-container__icon"
                icon={faLock}
              />
              <input
                className="input-signin-container__input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </span>
            <div>
              <Link
                to={"/login"}
                className="input-signin-container__submit--signin"
                aria-label="Submit"
                type="submit"
              >
                Sign In
              </Link>
              <button
                className="input-signin-container__submit"
                aria-label="Submit"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="logo-container-signup">
          <img
            className="logo-container-signup__img"
            src="/images/LogoWhite.png"
            alt="logo"
          />
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

export default SignUpForm;
