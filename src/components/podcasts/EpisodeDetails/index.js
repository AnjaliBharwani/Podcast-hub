import React from "react";
import Button from "../../Common2/Button";
import "./style.css"
import Genres from "../../genres/Genres";


function EpisodeDetails({ index, title, description, audioFile, onClick, setPlayingFile, playingFile}) {
  return (
    
    <div className="episode" style={{ width: "100%" }}>
      <h1 style={{ textAlign: "left", marginBottom: 0 }}>
        {index}. {title}
      </h1>

      <p style={{ marginLeft: "1.5rem" }} className="podcast-description ">
      {description}
      </p>

      
      <Button
        text={"Play"}
        onClick={() => {
          if(playingFile && playingFile === audioFile){
            setPlayingFile(null)
          }
          else{
            setPlayingFile(audioFile)
          }
        }}  
        style={{width: "200px"}}
      />
    </div>
  );
}

export default EpisodeDetails;