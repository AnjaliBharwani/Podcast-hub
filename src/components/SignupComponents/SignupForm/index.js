  import React, { useState } from "react";
  import InputComponent from "../../Common2/Input";
  import Button from "../../Common2/Button";
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { auth, db, storage } from "../../../firebase";
  import { doc, setDoc } from "firebase/firestore";
  import { useDispatch } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { setUser } from "../../../slices/userSlice";
  import { toast } from "react-toastify";
  import FileInput from "../../Common2/Input/FileInput";
  // import "/src/index.css"
  import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

  const SignupForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [profileImage, setProfileImage] = useState();
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignIn = async () => {
      setLoading(true);
      console.log("handling signup");
      if (
        password == confirmPassword &&
        password.length >= 6 &&
        fullName &&
        email &&
        profileImage
      ) {
        try { 
          //create user's account
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
            // profileImage
          );
          const user = userCredential.user;

          // Upload profile image to Firebase Storage
          const profileImageRef = ref(
            storage,
            `profileImages/${user.uid}/${Date.now()}`
          );
          await uploadBytes(profileImageRef, profileImage);

          // Get download URL of the profile image
          const profileImageUrl = await getDownloadURL(profileImageRef);

          //saving users detail
          await setDoc(doc(db, "users", user.uid), {
            name: fullName,
            email: user.email,
            uid: user.uid,
            image: profileImageUrl // Include profile image URL in the document

            // profilePic: fileURL,
          });

          //save the data in the redux, call the redux action
          dispatch(
            setUser({
              name: fullName,
              email: user.email,
              uid: user.uid,
              image: profileImageUrl
            })
          );
          toast.success("User has been created!");
          setLoading(false);

          navigate("/profile");
        } catch (e) {
          toast.error(e.message);
          setLoading(false);
        }
      } else {
        if (password != confirmPassword) {
          toast.error(
            "please make sure Your password and confirmPassword matches"
          );
        } else if (password.length < 6) {
          toast.error("please make sure Your password more than 6 digit long");
        }
        setLoading(false);
      }
    };

    const profileImageHandle = (file) => {
      setProfileImage(file);
    };

    return (
      <div>
        <h1 className="login-text">Sign Up</h1>
        <InputComponent
          state={fullName}
          setState={setFullName}
          placeholder="Full Name"
          type="text"
          required={true}
        />
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
        <InputComponent
          state={confirmPassword}
          setState={setconfirmPassword}
          placeholder="Confirm Password"
          type="password"
          required={true}
        />

        <FileInput
          accept={"image/*"}
          id="profile-image-input"
          fileHandleFnc={profileImageHandle}
          text={"Profile Image Upload"}
        />

        <Button
          text={loading ? "loading..." : "Signup Now"}
          disabled={loading}
          onClick={handleSignIn}
        />
      </div>
    );
  };

  export default SignupForm;
