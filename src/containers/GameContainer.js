import React, { useEffect, useState, useRef } from 'react'
import CardContainer from './CardContainer'

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { useDispatch, useSelector } from 'react-redux'
import { dealGame, drawCard, incrementTurn } from "../actions/gameActions";
import blank from '../assets/card-blank.png'


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    discard: {
    //   padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      width: '16vw',
      height: '15vh',
      backgroundImage: `url(${blank})`,
      backgroundSize: '100% 100%'
    },
  }));

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
const classes = useStyles();

const gameBoxRef = useRef(null);
const discardRef = useRef(null);

const { roomId, cable} = props

const [height, setHeight] =  useState(null)
const [width, setWidth] =  useState(null)
const [dropZone, setDropZone] = useState(null)
const [deck] = useState([...Array(52).keys()]);
const [count, setCount] = useState(0)
const gameChannel = useRef(null);
const status = useSelector(state => state.game.game.status);
const turn = useSelector(state => state.game.game.turn);



const dispatch = useDispatch();

useEffect( () => {
    // The 'current' property contains info of the reference:
    // align, title, ... , width, height, etc.
    if(gameBoxRef.current){
        setHeight(gameBoxRef.current.offsetHeight)
        setWidth(gameBoxRef.current.offsetWidth)

    let relativePos = {};
    relativePos.dropY = discardRef.current.getBoundingClientRect().y - gameBoxRef.current.getBoundingClientRect().y
    relativePos.dropX = discardRef.current.getBoundingClientRect().x - gameBoxRef.current.getBoundingClientRect().x
    setDropZone(relativePos)

    }
}, [gameBoxRef, discardRef])

useEffect( () => {
    if (status === "started"|| status === "playing") {
        console.log("connecting")
        gameChannel.current = cable.subscriptions.create(
            { channel: "GameChannel",
              room_id: roomId,
              jwt: sessionStorage.jwt } 
            ,  {
            connected: () => {console.log("connected to game")},

            received: (data) => {
              
              if (data.action === "dealing") {     
                console.log(data)     
                dispatch(dealGame(data))
              }
              if (data.action === "drawing") {        
                console.log("drawing a damn card")  
                console.log(data)

                dispatch(drawCard(data))
              }
            },
            join: function() {
              this.perform('join', {
              });
            },
            draw: function(card) {
                dispatch(incrementTurn())
                this.perform('draw', {
                    card: card
                });
            }
          })
        return () => {
            cable.subscriptions.remove(gameChannel.current)
        }
    }

}, [status, cable.subscriptions, dispatch, roomId])
    
const renderDeck = () => {
    return (
        deck.map( (card) =>  {
    return <CardContainer   
                            gameChannel={gameChannel}
                            dropZone={dropZone}
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
    <div className="Reading-Container" ref = {gameBoxRef}>
                {renderDeck()}
        <Grid   container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center">
            <Grid item xs={3}>
                <Paper className={classes.discard} ref = {discardRef}>
                    <Typography>Discard</Typography>
                </Paper>
            </Grid>           
        </Grid>
    </div>
)
}