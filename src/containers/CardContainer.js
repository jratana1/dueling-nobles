import { useSpring, animated as a, interpolate} from "react-spring";
import React, { useState, useRef, useEffect } from "react";
import { useDrag } from 'react-use-gesture'
import Card from '../components/card'
import { useSelector } from "react-redux";



export default function CardContainer(props)  {
  const [flipped, setFlipped] = useState(false)

  const { count, setCount, height, cardId, dropZone, gameChannel } = props
  const [self] = useState(cardId)
  const [tap, setTap] = useState(false)
  const stageCanvasRef = useRef(null);
  const [cardHeight, setCardHeight] =  useState(null)
  const [cardWidth, setCardWidth] =  useState(null)
  const flag = useSelector(state => state.game.flag);
  const playerHand = useSelector(state => state.game.playerHand);
  const opponentHand = useSelector(state => state.game.opponentHand);
  const drawPile = useSelector(state => state.game.drawPile);
  const discardPile = useSelector(state => state.game.discardPile);
  const status = useSelector(state => state.game.game.status);
  const turn = useSelector(state => state.game.game.turn);
  const seat = useSelector(state => state.game.seat);
  // const dispatch = useDispatch()


  const [{ pos }, setPos] = useSpring(() => ({ pos: [0, 0], config: {mass: 2, tension: 100, friction: 50}
  }))

  useEffect(() => {
    for(let i=0; i<drawPile.length; i++) {
      if (drawPile[i].id === self) {
        setPos({...pos, pos: [10+cardId, height/2-cardHeight]})
      }
    }
  
  },
  [flag, cardHeight, height, cardId, drawPile, pos, self, setPos])

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
          setPos({pos: [(i*(.85*cardWidth))+10, height-cardHeight-10]})
          setFlipped(true)
        }
      }
    }
    
    if(opponentHand.length>0){
        for(let i=0; i<opponentHand.length; i++) {
          if (opponentHand[i].id === self) {
            setPos({pos: [i*50+10,10]})
            setFlipped(false)
          }
        }
    }

    if(discardPile.length>0) {
      for(let i=0; i<discardPile.length; i++) {
        if (discardPile[i].id === self) {
          setPos({pos: [dropZone.dropX, dropZone.dropY]})
          setFlipped(true)
        
          stageCanvasRef.current.style.zIndex= i
        }
      }
    }

    if(drawPile.length>0)
      for(let i=0; i<drawPile.length; i++) {
        if (drawPile[i].id === self) {
          setPos({...pos, pos: [10+cardId, height/2-cardHeight]})
      }
    }
  },[flag, playerHand, opponentHand, drawPile, cardHeight, cardId, cardWidth, discardPile, height, pos, self, setPos])
  
    const bind = useDrag(
        ({ down, movement: xy, tap }) => {

          setPos({ pos: xy, immediate: down })
          setTap(tap)
        },
        { initial: () => pos.getValue() },
        { filterTaps: true }
      )

    function findCard(id) {
      let found = drawPile.find((element) => {
        return(element.id === id)})
        if (found) {return {location: "drawPile", card: found}}
        else {
          let found = playerHand.find((element) => {
            return(element.id === id)})
            if (found) {return {location: "playerHand", card: found}}
            else {
              let found = discardPile.find((element) => {
                return(element.id === id)})
                if (found) {return {location: "discardPile", card: found}}
                else {
                  let found = discardPile.find((element) => {
                    return(element.id === id)})
                  return {location: "opponentHand", card: found}}
            }
        }
  
    }
    const onCardClick = (event) => { 

      if ( turn%2 === seat){
        setCount(count+1)
        event.currentTarget.style.zIndex= 2500 + count
          let found = findCard(self)
          if (status ==="playing"){
            gameChannel.current.draw(found)
          }
        }
      }

    const onMouseDown = (event) => {
      setCount(count+1)
      event.currentTarget.style.zIndex= 2500 + count
      }
  

    const translate = () => {
      return interpolate([pos], ([x, y]) => `translate3d(${x}px,${y}px,0)` )
    }

    return    <a.div id={`card-${props.cardId}`} className="Card-Reading-Container" onClick={(event) => onCardClick(event)} onMouseDown={(e) => onMouseDown(e)} ref = {stageCanvasRef}
                    {...bind()}
                    style={{ transform: translate(), touchAction: 'none'}}>
                        <Card playerHand={playerHand} discard= {discardPile} cardId={cardId} flipped= {flipped} />        
              </a.div>
  
}