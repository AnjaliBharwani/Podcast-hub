// import { BrowserRouter as Route, Router, Routes } from 'react-router-dom';  //this is not working 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  // this is works properly
// import './App.css';
import "./index.css"
import SignUpPage from './pages/SignUpPage';
import Profile from "./pages/Profile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { setUser } from "./slices/userSlice";
import PrivateRoutes from "./components/Common2/PrivateRoutes";
import CreateAPodcastPage from "./pages/CreateAPodcast";
import PodcastsPage from "./pages/Podcasts";
import { setPodcasts } from "./slices/podcastSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import PodcastDetailsPage from "./pages/PodcastDetails";
import CreateAnEpisodePage from "./pages/CreateAnEpisode";
import Welcome from "./components/welcomePage/Welcome";

function App() {
  
  const [user, loading, error] = useAuthState(auth);
    const dispatch = useDispatch();
    const [flag, setFlag] = useState(true);

    // useEffect(()=>{
    //   setTimeout(()=>{
    //     setFlag(false);
    //   }, 2800)
    // }, [])

    useEffect(() => {
        const fetchUserData = async () => {
            if(user && !error){
                // Update user according to the auth
                const userDoc = await getDoc(doc(db, "users", user.uid))
                const userData = userDoc.data();
                dispatch(setUser({ 
                    name: userData?.name,
                    email: userData?.email,
                    uid: userData?.uid,
                    image : userData?.image,
                }))

                // Update podcasts according to the auth
                const podcastsCollectionRef = collection(db, "podcasts");
                console.log(podcastsCollectionRef);
                const podcastsData = await getDocs(podcastsCollectionRef);
                const podcasts = [];
                podcastsData.forEach(doc => {
                    podcasts.push({...doc.data(), id: doc.id});
                });
                dispatch(setPodcasts(podcasts))
            }
        }

        fetchUserData();

        return fetchUserData;
    }, [user])
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const unsubscribeSnapshot = onSnapshot(
  //         doc(db, "users", user.uid),
  //         (userDoc) => {
  //           if (userDoc.exists()) {
              
  //             const userData = userDoc.data();
  //             dispatch 
              
  //              (
  //               setUser({
  //                 name: userData.name,
  //                 email: userData.email,
  //                 uid: user.uid,
  //                 profileImage : userData?.profileImage
  //               })
  //             );
  //           }
  //         },
  //         (error) => {
  //           console.error("Error fetching user data:", error);
  //         }
  //       );

  //       return () => {
  //         unsubscribeSnapshot();
  //       };
  //     }
  //   });

  //   return () => {
  //     unsubscribeAuth();
  //   };
  // }, []); 


  return (
    <div className="App">
      <ToastContainer/>
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage setWelcomeFlag={setFlag} welcomeFlag={flag}/>} />
          <Route element={<PrivateRoutes />}>
              <Route path="/profile" element={<Profile setFlag={setFlag}/>}/> 
              <Route path="/create-a-podcast" element={<CreateAPodcastPage setFlag={setFlag} />}/> 
              <Route path="/podcasts" element={<PodcastsPage setFlag={setFlag} />}/> 
              <Route path="/podcast/:id" element={<PodcastDetailsPage setFlag={setFlag} />}/> 
              <Route path="/podcast/:id/create-episode" element={<CreateAnEpisodePage setFlag={setFlag} />}/>  
          </Route>
           
        </Routes>
      </Router>
      {/* {flag && <Welcome setFlag={setFlag}/>} */}
      
    </div>
  );
}

export default App;
