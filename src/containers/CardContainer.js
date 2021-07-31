import { useSpring, animated as a, interpolate } from "react-spring";
import React, { useState, useRef, useEffect } from "react";
import { useDrag } from 'react-use-gesture'
import Card from '../components/card'

export default function CardContainer(props)  {
  const [flipped, setFlipped] = useState(false)

  const { count, setCount, height, width, playerHand, opponentHand, cardId } = props
  const [self] = useState(cardId)
  const [ tap, setTap] = useState(false)
  const stageCanvasRef = useRef(null);
  const [cardHeight, setCardHeight] =  useState(null)
  const [cardWidth, setCardWidth] =  useState(null)

  const [{ pos }, setPos] = useSpring(() => ({ pos: [0, 0], config: {mass: 2, tension: 100, friction: 50}
  }))

  useEffect(() => {
    setPos({...pos, pos: [10+cardId, height/2]})
  },
  [width, height])

  useEffect( () => {
    // The 'current' property contains info of the reference:
    // align, title, ... , width, height, etc.
    if(stageCanvasRef.current){

        setCardHeight(stageCanvasRef.current.offsetHeight)
        setCardWidth(stageCanvasRef.current.offsetWidth)
    }
}, [stageCanvasRef])

  useEffect(() => {
    if(playerHand.length>0){
      for(let i=0; i<playerHand.length; i++) {
        if (playerHand[i].id === self) {
          setPos({pos: [i*50+10, height-cardHeight-10]})
          setFlipped(true)
        }
      }
    }
    
    if(opponentHand.length>0){
        for(let i=0; i<opponentHand.length; i++) {
          if (opponentHand[i].id === self) {
            setPos({pos: [i*50+10,10]})
          }
        }
    }
  })
  
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

    return    <a.div id={`card-${props.cardId}`} className="Card-Reading-Container" onClick={(event) => onCardClick(event)} onMouseDown={(e) => onMouseDown(e)} ref = {stageCanvasRef}
                    {...bind()}
                    style={{ transform: translate(), touchAction: 'none'}}>
                        <Card playerHand={playerHand} cardId={cardId} flipped= {flipped} />        
              </a.div>
  
}