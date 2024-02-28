import React, { useEffect, useState } from 'react'
import Header from '../components/Common2/Header'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import Button from '../components/Common2/Button';
import EpisodeDetails from '../components/podcasts/EpisodeDetails';
import AudioPlayer from '../components/podcasts/AudioPlayer';
import WebShare from '../components/webShare/WebShare';
import Genres from '../components/genres/Genres';

const PodcastDetailsPage = ({setFlag}) => {

  const location = useLocation();

    const {id} = useParams();
    const navigate = useNavigate();
  const [podcast, setPodcast] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [playingFile, setPlayingFile] = useState("");

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPodcast({ id: id, ...docSnap.data() });
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such Podcast!");
        toast.error("No such Podcast!");
        navigate("/podcasts");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts", id, "episodes")),
      (querySnapshot) => {
        const episodesData = [];
        querySnapshot.forEach((doc) => {
          episodesData.push({ id: doc.id, ...doc.data() });
        });
        setEpisodes(episodesData);
      },
      (error) => {
        console.error("Error fetching episodes:", error);
      }
    );

    // return () => {
    //   unsubscribe();
    // };
  }, [id]);

  useEffect(() => {
    setFlag(false);
}, [location])

  return (
    <div className="main-container">
      <Header />
      <div className="podcast-wrapper" style={{ marginTop: "0rem" }}>
        {podcast.id && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                margin: "1rem",
              }}
            >
              <div className="headingLeft">
                  <h1 className="podcast-title-heading" style={{marginBottom: "0"}}>{podcast.title}</h1>
                  <Genres genres={podcast.genres}/>
              </div>
              {podcast.createdBy == auth.currentUser.uid && (
               <div className='create-share'> 
                 <Button
                  text={"Create Episode"}
                  style={{width:"10rem"}}
                  onClick={() => {
                    navigate(`/podcast/${id}/create-episode`);
                  }}
                />
                <WebShare 
                title={podcast.title}
                text={podcast.description}
                url ={" https://podpulse-rho.vercel.app/podcast/${id}"}
                />
               </div>
              )}
            </div>

            <div className="banner-wrapper">
              <img src={podcast.bannerImage} />
            </div>
            <p className="podcast-description">{podcast.description}</p>
            <h1 className="podcast-title-heading " style={{marginBottom: "0"}}>Episodes</h1>
            <div className='episode-container'>
                {episodes.length > 0 ? (
                  <>
                    {episodes.map((episode, index) => {
                      return (
                        <EpisodeDetails
                          key={index}
                          index={index + 1}
                          title={episode.title}
                          description={episode.description}
                          audioFile={episode.audioFile}
                          setPlayingFile={setPlayingFile}
                          playingFile={playingFile}
                          
                        />
                      );
                    })}
                  </>
                ) : (
                  <p>No Episodes</p>
                )}
            </div>
          </>
        )}
      </div>
      {playingFile && (
        <AudioPlayer audioSrc={playingFile} image={podcast.displayImage} />
      )}
    </div>
  );
}

export default PodcastDetailsPage