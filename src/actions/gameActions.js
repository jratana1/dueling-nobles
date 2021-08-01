export const drawCard = (payload) => {
    return {
        type: 'DRAW_CARD',
        payload: payload
    }
}

export const setFlag = () => {
    return {
        type: 'SET_FLAG',
    }
}

export const playCard = (payload) => {
    return {
        type: 'PLAY_CARD',
        payload: payload
    }
}

export const dealHands = (payload) => {
    return {
        type: 'DEAL_HANDS',
        payload: payload
    }
}

