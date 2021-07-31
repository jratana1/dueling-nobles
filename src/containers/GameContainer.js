import React, { useEffect, useState, useRef } from 'react'
import CardContainer from './CardContainer'
import { useDispatch, useSelector } from 'react-redux'
import { setFlag, setFlagFalse } from "../actions/readingsActions";
import Cable from 'actioncable';

export function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

export function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

export default function GameContainer(props)  {
const [deck, setDeck] = useState([...Array(52).keys()]);
const [drawPile, setDrawPile] = useState([...Array(52).keys()])

const [count, setCount] = useState(0)
const stageCanvasRef = useRef(null);

const [playerHand, setPlayerHand] = useState([])
const [opponentHand, setOpponentHand] = useState([])
const { status, setStatus} = props
const [height, setHeight] =  useState(null)
const [width, setWidth] =  useState(null)

const flag = useSelector(state => state.readings.flag);
const dispatch = useDispatch();



useEffect( () => {
    // The 'current' property contains info of the reference:
    // align, title, ... , width, height, etc.
    if(stageCanvasRef.current){

        setHeight(stageCanvasRef.current.offsetHeight)
        setWidth(stageCanvasRef.current.offsetWidth)
    }
}, [stageCanvasRef])

useEffect( () => {
    let Hand = playerHand
    let oppHand = opponentHand
    if (status === "Started") {
    getRandom(drawPile,5).forEach((card) => {
        Hand.push({id: drawPile[drawPile.length-1], image: card})
        drawPile.pop()
        oppHand.push({id: drawPile[drawPile.length-1], image: "blank"})
        drawPile.pop()
        setDrawPile(drawPile)
    })
    setPlayerHand(Hand)
    setOpponentHand(oppHand)
    dispatch(setFlag())
    }

}, [status])
    
const renderDeck = () => {
    return (
        deck.map( (card) =>  {
    return <CardContainer   
                            setplayerHand={setPlayerHand}
                            playerHand={playerHand} 
                            opponentHand={opponentHand}
                            height={height} 
                            width={width} 
                            key={card} 
                            cardId={card} 
                            count={count} 
                            setCount={setCount}>
            </CardContainer>
    }))
}

return (
    <div className="Reading-Container" ref = {stageCanvasRef}>
        {renderDeck()}    
    </div>
)
}