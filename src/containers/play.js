import Cable from 'actioncable';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import Chat from '../components/chat'


function Play() {
    //   const cable = Cable.createConsumer('wss://chat-n-draw.herokuapp.com/cable');
  const cable = Cable.createConsumer('ws://localhost:3000/cable');
  const [currentMessage, setcurrentMessage] = useState("")
  const [chat, setChat] = useState([]) 
  const [username, setUsername] = useState(""); 
  const [isUsernameConfirmed, setUsernameConfirmed] = useState(false);
  const [roomId, setRoomId] = useState("")
  const chatChannel = useRef(null);

  useEffect(
    () => {
      if (document.getElementsByClassName("listitem").length>0) {
        document.getElementsByClassName("listitem")[document.getElementsByClassName("listitem").length-1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
      }
    }, [chat])
 
    useEffect(
      () => {
        chatChannel.current = cable.subscriptions.create(
              { channel: 'GameChannel' }
              ,  {
              connected: () => {},
              received: (data) => {
                if (data.action === "chat") {
                  setChat(oldArray => [...oldArray, data])
                }
                if (data.action === "subscribed") {
                  console.log(data)
                  setRoomId(data.channel)
                }
              },
              create: function(chatContent, username, roomId) {
                this.perform('create', {
                  content: chatContent,
                  user: username,
                  room: roomId
        
                });
              }
            })
      }, [])

  // const chatChannel = useMemo(() => {
  //   return cable.subscriptions.create(
  //     { channel: 'GameChannel' }
  //     ,  {
  //     connected: () => {},
  //     received: (data) => {
  //       if (data.action === "chat") {
  //         setChat(oldArray => [...oldArray, data])
  //       }
  //       if (data.action === "subscribed") {
  //         console.log(data)
  //         setRoomId(data.channel)
  //       }
  //     },
  //     create: function(chatContent, username, roomId) {
  //       this.perform('create', {
  //         content: chatContent,
  //         user: username,
  //         room: roomId

  //       });
  //     },
  //   });
  // }, []);


  const handleSendEvent = () => {
        if (!currentMessage || !isUsernameConfirmed) { 
          return }
        chatChannel.current.create(currentMessage, username, roomId);
        setcurrentMessage('');
    }

  const updateUserName = (value) => {
    setUsername(value);
  }

  return (
      <div className = "play">
       <div className="left-column" >
          <Chat updateUserName={updateUserName} userConfirmed={(val) => {setUsernameConfirmed(val)}} username={username} chat={chat} isUsernameConfirmed={isUsernameConfirmed} currentMessage={currentMessage} updateCurrentMessage={(val) => {setcurrentMessage(val)}} handleSendEvent={handleSendEvent}/>
      </div>
      </div>
  );
}
 
export default Play;