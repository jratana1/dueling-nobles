import { useSpring, animated as a } from "react-spring";
import React, {useState} from "react";

import cardBack from '../assets/card-back1.png'
import clubs1 from '../assets/card-clubs-1.png'
import clubs2 from '../assets/card-clubs-2.png'
import clubs3 from '../assets/card-clubs-3.png'
import clubs4 from '../assets/card-clubs-4.png'
import clubs5 from '../assets/card-clubs-5.png'
import clubs6 from '../assets/card-clubs-6.png'
import clubs7 from '../assets/card-clubs-7.png'
import clubs8 from '../assets/card-clubs-8.png'
import clubs9 from '../assets/card-clubs-9.png'
import clubs10 from '../assets/card-clubs-10.png'
import clubs11 from '../assets/card-clubs-11.png'
import clubs12 from '../assets/card-clubs-12.png'
import clubs13 from '../assets/card-clubs-13.png'
import diamonds1 from '../assets/card-diamonds-1.png'
import diamonds2 from '../assets/card-diamonds-2.png'
import diamonds3 from '../assets/card-diamonds-3.png'
import diamonds4 from '../assets/card-diamonds-4.png'
import diamonds5 from '../assets/card-diamonds-5.png'
import diamonds6 from '../assets/card-diamonds-6.png'
import diamonds7 from '../assets/card-diamonds-7.png'
import diamonds8 from '../assets/card-diamonds-8.png'
import diamonds9 from '../assets/card-diamonds-9.png'
import diamonds10 from '../assets/card-diamonds-10.png'
import diamonds11 from '../assets/card-diamonds-11.png'
import diamonds12 from '../assets/card-diamonds-12.png'
import diamonds13 from '../assets/card-diamonds-13.png'
import hearts1 from '../assets/card-hearts-1.png'
import hearts2 from '../assets/card-hearts-2.png'
import hearts3 from '../assets/card-hearts-3.png'
import hearts4 from '../assets/card-hearts-4.png'
import hearts5 from '../assets/card-hearts-5.png'
import hearts6 from '../assets/card-hearts-6.png'
import hearts7 from '../assets/card-hearts-7.png'
import hearts8 from '../assets/card-hearts-8.png'
import hearts9 from '../assets/card-hearts-9.png'
import hearts10 from '../assets/card-hearts-10.png'
import hearts11 from '../assets/card-hearts-11.png'
import hearts12 from '../assets/card-hearts-12.png'
import hearts13 from '../assets/card-hearts-13.png'
import spades1 from '../assets/card-spades-1.png'
import spades2 from '../assets/card-spades-2.png'
import spades3 from '../assets/card-spades-3.png'
import spades4 from '../assets/card-spades-4.png'
import spades5 from '../assets/card-spades-5.png'
import spades6 from '../assets/card-spades-6.png'
import spades7 from '../assets/card-spades-7.png'
import spades8 from '../assets/card-spades-8.png'
import spades9 from '../assets/card-spades-9.png'
import spades10 from '../assets/card-spades-10.png'
import spades11 from '../assets/card-spades-11.png'
import spades12 from '../assets/card-spades-12.png'
import spades13 from '../assets/card-spades-13.png'

export default function Card(props) {
    const {transform, opacity} = useSpring({
        opacity: props.flipped ? 1 : 0,
        transform: `perspective(600px) rotateY(${props.flipped ? 180 : 0}deg)`,
        config: {mass: 5, tension: 400, friction: 80},
      })
    const cardImages = [clubs1, clubs2, clubs3, clubs4, clubs5, clubs6, clubs7, clubs8, clubs9, clubs10, clubs11, clubs12, clubs13,
                        diamonds1, diamonds2, diamonds3, diamonds4, diamonds5, diamonds6, diamonds7, diamonds8, diamonds9, diamonds10, diamonds11, diamonds12, diamonds13,
                        hearts1 , hearts2 ,hearts3 ,hearts4 ,hearts5 ,hearts6 ,hearts7 ,hearts8 ,hearts9 ,hearts10 ,hearts11 ,hearts12 ,hearts13,
                        spades1, spades2, spades3, spades4, spades5, spades6, spades7, spades8, spades9, spades10, spades11, spades12, spades13]
    
    const frontImage = (index) => {
            return cardImages[index];
        }

    const frontText = () => {
            return  <div className="Card-Text" >
                    <p className="Card-Upright">Card# : {props.cardId}</p>
            </div>
        }
    
    return <>
    <a.div className="Card-Back" style={{
        backgroundImage: `url(${cardBack})`,
        backgroundColor: `rgba(217, 195, 195, 1)`,
        backgroundRepeat  : 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        opacity: opacity.interpolate(o => 1 - o),
        transform,}}
        >
           <h2 className="Position" style={{backgroundColor: `rgba(255, 255, 255, 0)`}}>{props.cardId}</h2>
    </a.div> 
    <a.div className="Card-Front" style={{
        backgroundImage: `url(${frontImage(props.cardId)})`,
        backgroundColor: `rgba(217, 195, 195, 1)`,
        backgroundRepeat  : 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        opacity,
        transform: transform.interpolate(t => `${t} rotateY(180deg)`),
        }} >
        {frontText()}
    </a.div>  
    </>
}