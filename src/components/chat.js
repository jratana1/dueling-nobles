import React from 'react'

function Chat(props) {

    const { updateCurrentMessage, handleSendEvent, chat, currentMessage } = props

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

            <div className='chat-logs'>
                { renderChatLog() }
                <input
                value={ currentMessage }
                onKeyPress={ (e) => handleChatInputKeyPress(e) }
                onChange={ (e) => updateCurrentMessage(e.target.value) }
                type='text'
                placeholder='Enter your message...'
                className='chat-input' />
                <button onClick={ handleSendEvent } className='send'> Send </button>
            </div>



           

    )
}

export default Chat