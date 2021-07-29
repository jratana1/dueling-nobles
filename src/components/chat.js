import React from 'react'

function Chat(props) {

    const { updateUserName, userConfirmed, isUsernameConfirmed, updateCurrentMessage, handleSendEvent, chat, username, currentMessage } = props

    const renderChatLog = () => {
        return chat.map((el) => {
            return (
                <div className="listitem"  key={`chat_${el.id}`}>
                    <p>{el.username}</p><p className='chat-created-at'>({ el.created_at })</p><p className='chat-message'>: { el.content }</p>
                </div>
            );
          })
    }

    const handleChatInputKeyPress = (event) => {
        if(event.key === 'Enter') {
          handleSendEvent(event);
        }
      }

    return(
        <div className='stage'>
            {isUsernameConfirmed ? <h2>Chatting as : {username}</h2> :
            <>
            <input
                value={ username }
                onChange={ (e) => updateUserName(e.target.value) }
                type='text'
                placeholder='Enter Your Username'
                className='username-input'
                id='username-input'
                />
            <button onClick={ () => userConfirmed(true) } className='sign-in'>Sign-In</button>
            </>
            }

            <div className='chat-logs'>
                { renderChatLog() }
            </div>

            {isUsernameConfirmed ? 
            <>
            <input
                value={ currentMessage }
                onKeyPress={ (e) => handleChatInputKeyPress(e) }
                onChange={ (e) => updateCurrentMessage(e.target.value) }
                type='text'
                placeholder='Enter your message...'
                className='chat-input' />
            <button onClick={ handleSendEvent } className='send'> Send </button>
            </> : <></>}
        </div>
    )
}

export default Chat