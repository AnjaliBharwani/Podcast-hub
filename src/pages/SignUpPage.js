import React, { useState } from "react";
import Header from "../components/Common2/Header";
// import InputComponent from "../components/Input";
// import Button from "../components/Common2/Button";
import SignupForm from "../components/SignupComponents/SignupForm/index";
import LoginForm from "../components/SignupComponents/LoginForm";
import Welcome from "../components/welcomePage/Welcome";

const SignUpPage = ({setWelcomeFlag, welcomeFlag}) => {
  
  const [flag, setFlag] = useState(true);

  return (
    <div className="main-container">
      <Header />
      <div className="input-wrapper sign-up-wrapper">
        {/* {!flag ? <h1>Signup </h1> : <h1>Login</h1>} */}
        {!flag ? <SignupForm /> : <LoginForm />}
        {!flag ? (
          <p style={{ cursor: "pointer" }} onClick={() => setFlag(!flag)}>
            Already Have An Account? Click here to Login.
          </p>
        ) : (
          <p style={{ cursor: "pointer" }} onClick={() => setFlag(!flag)}>
            Don't have an account? Click here to signup
          </p>
        )}
      </div>
      {welcomeFlag && <Welcome setFlag={setWelcomeFlag} />}
    </div>
  );
};

export default SignUpPage;
