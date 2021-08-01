import React, { useEffect, useState, useRef } from 'react'
import CardContainer from './CardContainer'
import Card from '../components/card'

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import { useDispatch, useSelector } from 'react-redux'
import { setFlag, setFlagFalse, dealHands } from "../actions/gameActions";
import blank from '../assets/card-blank.png'

import Cable from 'actioncable';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    discard: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      width: '7vw',
      height: '12vh',
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

const { status, setStatus, roomId, cable} = props

const [height, setHeight] =  useState(null)
const [width, setWidth] =  useState(null)
const [dropZone, setDropZone] = useState(null)
const [deck, setDeck] = useState([...Array(52).keys()]);
const [count, setCount] = useState(0)
const gameChannel = useRef(null);

const playerHand = useSelector(state => state.game.playerHand);
const opponentHand = useSelector(state => state.game.opponentHand);
const drawPile = useSelector(state => state.game.drawPile);
const available = useSelector(state => state.game.available);

const dispatch = useDispatch();

useEffect( 
    () => {
        gameChannel.current = cable.subscriptions.create(
              { channel: "GameChannel",
                room_id: roomId,
                jwt: sessionStorage.jwt } 
              ,  {
              connected: () => {console.log("connected to game")},

              received: (data) => {
                
                if (data.action === "chat") {
                //   setChat(oldArray => [...oldArray, data])
                }
                if (data.action === "subscribed") {
                  console.log(data)
                }
              },

              join: function() {
                this.perform('join', {
                //   content: currentMessage,
                  user: sessionStorage.jwt,
                  room_id: roomId
                });
              }
            })
        
        return () => {
              cable.subscriptions.remove(gameChannel.current)
        }
      }, [roomId]
)


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
    if (status === "Started") {
        let removed_values=[]
    getRandom(available,5).forEach((imageId) => {
        let draw= drawPile.pop()
        draw.image = imageId
        playerHand.push(draw)   
        draw= drawPile.pop()  
        opponentHand.push(draw)
        removed_values.push(imageId)
    })
    dispatch(dealHands({playerHand: playerHand, opponentHand: opponentHand, drawPile: drawPile, remove: removed_values}))
    }

}, [status])
    
const renderDeck = () => {
    return (
        deck.map( (card) =>  {
    return <CardContainer   
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