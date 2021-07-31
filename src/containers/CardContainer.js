import { useSpring, animated as a, interpolate } from "react-spring";
import React, { useState, useRef, useEffect } from "react";
import { useDrag } from 'react-use-gesture'
import Card from '../components/card'

export default function CardContainer(props)  {
  
  const [flipped, setFlipped] = useState(false)
  const { count, setCount } = props
  const [{ pos }, setPos] = useSpring(() => ({ pos: [0, 0], config: {mass: 2, tension: 100, friction: 50}
  }))

  const [ tap, setTap] = useState(false)
  
    const bind = useDrag(
        ({ down, movement: xy, tap }) => {

          setPos({ pos: xy, immediate: down })
          setTap(tap)
          if (down) {
            // Prevent scroll on touch screens while dragging:
            document.ontouchmove = function(e) {
              e.preventDefault();
            };
          } else {
            document.ontouchmove = function() {
              return true;
            };
          }
        },
        { initial: () => pos.getValue() },
        { filterTaps: true }
      )

    const onCardClick = (event) => { 
      if (tap) setFlipped(state => !state)
      setCount(count+1)
      event.currentTarget.style.zIndex= count
      }

    const onMouseDown = (event) => {
      setCount(count+1)
      event.currentTarget.style.zIndex= count
      }
  

    const translate = () => {
      return interpolate([pos], ([x, y]) => `translate3d(${x}px,${y}px,0)` )
    }

    return    <a.div id={`card-${props.cardId}`} className="Card-Reading-Container" onClick={(event) => onCardClick(event)} onMouseDown={(e) => onMouseDown(e)}
                    {...bind()}
                    style={{ transform: translate()}}>
                        <Card cardId={props.cardId} flipped= {flipped} />
                        
                </a.div>
  
}