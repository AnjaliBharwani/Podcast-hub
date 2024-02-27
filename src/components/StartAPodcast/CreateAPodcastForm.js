import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import Button from "../Common2/Button";
import InputComponent from "../Common2/Input";
import FileInput from "../Common2/Input/FileInput";
import MultiSelect from "../MultiSelect/Multiselect";

function CreatePodcastForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([
    'News',
    'Comedy',
    'Technology',
    'Sports',
    'Business',
    'Health',
    'Crime'
]);

  const handleSubmit = async () => {
    if (title && desc && displayImage && bannerImage && selectedOptions.length) {
      setLoading(true);
      // 1. Upload files -> get downloadable links
      try {
        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(bannerImageRef, bannerImage);

        const bannerImageUrl = await getDownloadURL(bannerImageRef);

        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef, displayImage);

        const displayImageUrl = await getDownloadURL(displayImageRef);
        const podcastData = {
          title: title,
          description: desc,
          bannerImage: bannerImageUrl,
          displayImage: displayImageUrl,
          genres : selectedOptions,
          createdBy: auth.currentUser.uid,

        };

        const docRef = await addDoc(collection(db, "podcasts"), podcastData);

        setTitle("");
        setDesc("");
        setBannerImage(null);
        setDisplayImage(null);
        setSelectedOptions([]);
        toast.success("Podcast Created!");
        setLoading(false);
        
        navigate("/podcasts");
      } catch (e) {
        toast.error(e.message);
        console.log(e);
        setLoading(false);
      }

      // 2. create a new doc iin a new collection called podcasts
      // 3. save this new podcast episodes states in our podcasts
    } else {
      toast.error("Please Enter All Values");
      setLoading(false);
    }
  };

  const displayImageHandle = (file) => {
    setDisplayImage(file);
  };

  const bannerImageHandle = (file) => {
    setBannerImage(file);
  };

  return (
    <>
      <InputComponent
        state={title}
        setState={setTitle}
        placeholder="Title"
        type="text"
        required={true}
      />
      <InputComponent
        state={desc}
        setState={setDesc}
        placeholder="Description"
        type="text"
        required={true}
      />
      <MultiSelect
        options={options}
        setOptions={setOptions}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        text={"Select Genres"}
      />
      <FileInput
        accept={"image/*"}
        id="display-image-input"
        fileHandleFnc={displayImageHandle}
        text={"Display Image Upload"}
      />

      <FileInput
        accept={"image/*"}
        id="banner-image-input"
        fileHandleFnc={bannerImageHandle}
        text={"Banner Image Upload"}
      />

      <Button
        text={loading ? "Loading..." : "Create Podcast"}
        disabled={loading}
        onClick={handleSubmit}
      />
    </>
  );
}

export default CreatePodcastForm;
