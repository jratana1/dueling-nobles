import { useSpring, animated as a, interpolate } from "react-spring";
import React, { useState, useRef, useEffect } from "react";
import { useDrag } from 'react-use-gesture'
import Card from '../components/card'

export default function CardContainer(props)  {
  const [flipped, setFlipped] = useState(false)
  const [{ pos }, setPos] = useSpring(() => ({ pos: [0, 0], config: {mass: 2, tension: 100, friction: 50}
  }))

  const [ tap, setTap] = useState(false)
  
    const bind = useDrag(
        ({ down, movement: xy, tap }) => {

          setPos({ pos: xy, immediate: down })
          setTap(tap)
        },
        { initial: () => pos.getValue() },
        { filterTaps: true }
      )

    const onCardClick = (event) => { 
      if (tap) setFlipped(state => !state)
      // dispatch(increment())
      // event.target.closest(".Card-Reading-Container").style.zIndex= count
      }

    // const onMouseDown = (event) => {
    //   dispatch(increment())
    //   event.target.closest(".Card-Reading-Container").style.zIndex= count
    // }
  

    const translate = () => {
      return interpolate([pos], ([x, y]) => `translate3d(${x}px,${y}px,0)` )
    }

    return    <a.div id={`card-${props.cardId}`} className="Card-Reading-Container" onClick={(event) => onCardClick(event)}
                    {...bind()}
                    style={{ transform: translate()}}>
                        <Card cardId={props.cardId} flipped= {flipped} />
                        
                </a.div>
  
}