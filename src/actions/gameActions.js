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

export const joinGame = (payload) => {
    return {
        type: 'JOIN_GAME',
        payload: payload
    }
}

export const setPlayers = (payload) => {
    return {
        type: 'SET_PLAYERS',
        payload: payload
    }
}

export const updateGame = (payload) => {
    return {
        type: 'UPDATE_GAME',
        payload: payload
    }
}

export const updateStatus = (payload) => {
    return {
        type: 'UPDATE_STATUS',
        payload: payload
    }
}

