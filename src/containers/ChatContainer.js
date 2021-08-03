import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux'
import { setPlayers, updateStatus } from "../actions/gameActions";

import Chat from '../components/chat'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    textAlign: "center"
  },
  pos: {
    marginBottom: 12,
  },
});


function ChatContainer(props) {;
  const [currentMessage, setcurrentMessage] = useState("")
  const [chat, setChat] = useState([]) 
  const { loggedIn, title, roomId, cable, setGames, joining,  setJoining,} = props

  const dispatch= useDispatch()

  const chatChannel = useRef(null);

  const classes = useStyles();


  useEffect(
      () => {
        if (document.getElementsByClassName("listitem").length>0) {
          document.getElementsByClassName("listitem")[document.getElementsByClassName("listitem").length-1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
        }
      }, [chat])

      useEffect(
        () => {
          chatChannel.current = cable.subscriptions.create(
                { channel: "ChatChannel",
                  room_id: roomId,
                  jwt: sessionStorage.jwt } 
                ,  {
                connected: () => {},
                received: (data) => {

                  if (data.action === "chat") {
                    setChat(oldArray => [...oldArray, data])
                  }
                  if (data.action === "subscribed") {
                  }
                  if (data.action === "create") {
                    setGames(oldArray =>  [...oldArray, data.room])
                  }
                  if (data.action === "join") {
                    dispatch(setPlayers(data.players))
                  }
                  if (data.action === "started") {
                    console.log(data)
                    dispatch(updateStatus(data.action))
                  }

                },
                speak: function(currentMessage) {
                  this.perform('speak', {
                    content: currentMessage,
                    user: sessionStorage.jwt,
                    room_id: roomId
                  });
                },
                joinGame: function() {
                  this.perform('join', {
                    user: sessionStorage.jwt,
                    room_id: roomId
                  });
                },
              })
          
          return () => {
                cable.subscriptions.remove(chatChannel.current)
          }
        }, [roomId, cable.subscriptions, dispatch, setGames])

        useEffect(
          () => {
            if (joining) {
            chatChannel.current.joinGame();
            setJoining(false)
            }
        }
        , [joining, setJoining])

  const handleSendEvent = () => {
        if (!currentMessage || !loggedIn) { 
          return }
        chatChannel.current.speak(currentMessage);
        setcurrentMessage('');
    }

  return (
      <div className = "play">
          <Typography className={classes.title} color="textSecondary" gutterBottom>
          {title}
          </Typography>
          <Chat chat={chat} currentMessage={currentMessage} updateCurrentMessage={(val) => {setcurrentMessage(val)}} handleSendEvent={handleSendEvent}/>
      </div>
  );
}
 
export default ChatContainer;