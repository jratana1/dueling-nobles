import { useSpring, animated as a } from "react-spring";
import React, {useState} from "react";

import batter1 from '../assets/baseball-batter-silhouette-clip-art-1.svg'
import batter2 from '../assets/baseball-batter-silhouette-clip-art-2.svg'
import batter3 from '../assets/baseball-batter-silhouette-clip-art-3.svg'
import batter4 from '../assets/baseball-batter-silhouette-clip-art-4.svg'
import batter5 from '../assets/baseball-batter-silhouette-clip-art-5.svg'
import runner1 from '../assets/running-baseball-player-silhouette-clip-art-1.svg'
import runner2 from '../assets/running-baseball-player-silhouette-clip-art-2.svg'
import runner3 from '../assets/running-baseball-player-silhouette-clip-art-3.svg'
import runner4 from '../assets/running-baseball-player-silhouette-clip-art-4.svg'
import runner5 from '../assets/running-baseball-player-silhouette-clip-art-5.svg'



export default function Card(props) {
    const {transform, opacity} = useSpring({
        opacity: props.flipped ? 1 : 0,
        transform: `perspective(600px) rotateY(${props.flipped ? 180 : 0}deg)`,
        config: {mass: 5, tension: 400, friction: 80},
      })

    const backImage = () => {
        let array= [batter1,batter2,batter3,batter4,batter5,runner1,runner2,runner3,runner4,runner5]
            return array[Math.floor(Math.random() * 10)];
        }

    const frontText = () => {
        

            return  <div className="Card-Text" >
                    <p className="Card-Upright">Wins : {props.cardId}</p>
                    <p className="Card-Upright">Losses : </p>
                    <p className="Card-Upright">Saves : </p>
                    <p className="Card-Upright">ERA : </p>
            </div>
        }
    




    return <>
    <a.div className="Card-Back" style={{
        backgroundImage: `url(${backImage()})`,
        backgroundColor: `rgba(217, 195, 195, 1)`,
        backgroundRepeat  : 'no-repeat',
        backgroundPosition: 'center',
        opacity: opacity.interpolate(o => 1 - o),
        transform,}}
        >
           <h2 className="Position" style={{backgroundColor: `rgba(255, 255, 255, .9)`}}>{props.cardId}</h2>
    </a.div> 
    <a.div className="Card-Front" style={{
        opacity,
        transform: transform.interpolate(t => `${t} rotateY(180deg)`),
        }} >
        {frontText()}
    </a.div>  
    </>
}