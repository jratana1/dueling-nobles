import { useSpring, animated as a, interpolate } from "react-spring";
import React, { useState, useRef, useEffect } from "react";
import { useDrag } from 'react-use-gesture'
import Card from '../components/card'
import { useDispatch, useSelector } from "react-redux";
import { setFlag, drawCard } from "../actions/gameActions";


export default function CardContainer(props)  {
  const [flipped, setFlipped] = useState(false)

  const { count, setCount, height, width, cardId } = props
  const [self] = useState(cardId)
  const [ tap, setTap] = useState(false)
  const stageCanvasRef = useRef(null);
  const [cardHeight, setCardHeight] =  useState(null)
  const [cardWidth, setCardWidth] =  useState(null)
  const flag = useSelector(state => state.game.flag);
  const dispatch = useDispatch();
  const playerHand = useSelector(state => state.game.playerHand);
  const opponentHand = useSelector(state => state.game.opponentHand);
  const drawPile = useSelector(state => state.game.drawPile);

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
  },[flag, playerHand, opponentHand])
  
    const bind = useDrag(
        ({ down, movement: xy, tap }) => {

          setPos({ pos: xy, immediate: down })
          setTap(tap)
        },
        { initial: () => pos.getValue() },
        { filterTaps: true }
      )

    
    const onCardClick = (event) => { 
      setCount(count+1)
      event.currentTarget.style.zIndex= count

      let cardId= event.currentTarget.id.split("-")[1]
      let found = drawPile.find((element) => {
        console.log(element.id === self)
        return(element.id === self)
        }
      )
      if(found){
              dispatch(drawCard(found))
      }



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