import React, { useEffect, useState } from 'react'
import "./style.css"
import welcomeBanner from "../assets/banner-img3.png"

const Welcome = () => {
    // const progressBar = useRef();
    const [percent, setPercent] = useState(0);

    useEffect(()=>{
        const interval = setInterval(()=>{
            setPercent(prev =>{
                let next = prev+1;
                if(next === 100) clearInterval(interval)
                return next<=100? next:100;
            })
        }, 20)
        return () => clearInterval(interval)
    }, [])

  return (
    <div className='welcome-page'>
        <div className="welcome-container">
            <img src={welcomeBanner} alt="welcomImage" />
            <h1 className="welcome-msg">Welcom To PodCast</h1>
            <p className='intro'>You can create, listen, discover, and be inspired.</p>
            <div className="progress">
                <div className="progress-track">
                    <div  className="progress-bar" style={{width: `${percent}%`}}></div>
                        <p className='progress-percent'>{percent}%</p>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Welcome