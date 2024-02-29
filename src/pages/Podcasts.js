import React, { useEffect, useState } from "react";
import Header from "../components/Common2/Header";
import { setPodcasts } from "../slices/podcastSlice";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import InputComponent from "../components/Common2/Input";
import PodcastCard from "../components/podcasts/PodcastCard";
import MultiSelect from "../components/MultiSelect/Multiselect";
import { useLocation } from "react-router-dom";

function PodcastsPage({setFlag}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const [search, setSearch] = useState("");
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

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastsData));
      },
      (error) => {
        console.error("Error fetching podcasts:", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  // console.log(podcasts);

  const filteredPodcasts = podcasts.filter((podcast) => {
    const titleMatch = podcast.title.toLowerCase().includes(search.trim().toLowerCase());
    const genreMatch = selectedOptions.length === 0 || selectedOptions.some(option => podcast.genres.includes(option));

    return titleMatch && genreMatch;
});

    useEffect(() => {
      setFlag(false);
    }, [location])

  return (
    <div className="main-container">
      <Header />
      <div className="input-wrapper" style={{ marginTop: "2rem" }}>
        <h1>Discover Podcasts</h1>
        <InputComponent
          state={search}
          setState={setSearch}
          placeholder="Search By Title"
          type="text"
        />
        <MultiSelect
          options={options}
          setOptions={setOptions}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          text={"Select Genres"}
        />

        {filteredPodcasts.length > 0 ? (
          <div className="podcasts-flex" style={{ marginTop: "1.5rem" }}>
            {filteredPodcasts.map((item) => {
              return (
                <PodcastCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  displayImage={item.displayImage}
                  genres={item.genres}
                />
              );
            })}
          </div>
        ) : (
          <p>{search ? "Podcast Not Found" : "No Podcasts On The Platform"}</p>
        )}
      </div>
    </div>
  );
}
export default PodcastsPage;
