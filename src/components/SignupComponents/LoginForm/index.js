import React, { useState } from "react";
import InputComponent from "../../Common2/Input";
import Button from "../../Common2/Button";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../slices/userSlice";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [flag, setFlag] = useState(true);
  const [emailFp, setEmailFp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);

    if (email && password) {
      try {
        //create user's account
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();

        dispatch(
          setUser({
            name: userData.name,
            email: user.email,
            uid: user.uid,
            // profilePic: userData.profilePic
          })
        );
        toast.success("Login Successful!");
        setLoading(false);
        navigate("/profile");
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
      }
    } else {
      setLoading(false);
      toast.error("Make sure email and password are not empty");
    }
  };

  const handleForgotPass = async () => {
    if(emailFp){
      try{
          await sendPasswordResetEmail(auth, emailFp);
          toast.success("password reset email sent successfuly!");
          setEmailFp('');
          setFlag(true)
      }catch(error){
        toast.error(error.message)
      }
    }
    else{
      toast.error("Enter email to reset password!")
    }
  }

  return (
    <>
      {flag ? (
        <div className="login-wrapper">
          <h1 className="login-text">Sign In</h1>
          <InputComponent
            type="text"
            placeholder="Email"
            state={email}
            setState={setEmail}
            required={true}
          />
          <InputComponent
            state={password}
            setState={setPassword}
            placeholder="Password"
            type="password"
            required={true}
          />

          <p className="text" onClick={()=>{setFlag(false)}}>Forgot password? click here to Reset.</p>

          <Button
            text={loading ? "Loading..." : "Login"}
            onClick={handleLogin}
            disabled={loading}
          />
        </div>
      ) : (
        <div>
          <h1 className="login-text">Reset Password</h1>
          <InputComponent
            type="text"
            placeholder="Email"
            state={emailFp}
            setState={setEmailFp}
            // required={true}
          />

          <Button
            type="submit"
            onClick={handleForgotPass}
            disabled={loading}
            text={loading ? "Loading..." : "Login"}
          />
        </div>
      )}
    </>
  );
};

export default LoginForm;
