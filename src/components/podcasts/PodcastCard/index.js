import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import Genres from "../../genres/Genres";

function PodcastCard({ id, title, displayImage, genres }) {
  return (
    <Link to={`/podcast/${id}`}>
      <div className="podcast-card">
        <div className="display-img-box">
        <img className="display-image-podcast" src={displayImage} />
        <Genres genres={genres}/>
        </div>
        <p className="title-podcast">{title}</p>
        {/* <p className="title-podcast">{desc}</p> */}
        
      </div>
    </Link>
  );
}

export default PodcastCard;
