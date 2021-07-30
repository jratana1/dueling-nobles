import Cable from 'actioncable';

import React, { useEffect, useState, useRef } from 'react';
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


function ChatContainer(props) {
    //   const cable = Cable.createConsumer('wss://chat-n-draw.herokuapp.com/cable');
  const cable = Cable.createConsumer('ws://localhost:3000/cable');
  const [currentMessage, setcurrentMessage] = useState("")
  const [chat, setChat] = useState([]) 
  const { loggedIn, title, roomId } = props

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
                connected: () => {console.log("connected")},
                received: (data) => {

                  if (data.action === "chat") {
                    setChat(oldArray => [...oldArray, data])
                  }
                  if (data.action === "subscribed") {
                    console.log(data)
                  }
                },
                speak: function(currentMessage) {
                  this.perform('speak', {
                    content: currentMessage,
                    user: sessionStorage.jwt,
                    room_id: roomId
                  });
                }
              })
          
          return () => {
                cable.subscriptions.remove(chatChannel.current)
          }
        }, [roomId])

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