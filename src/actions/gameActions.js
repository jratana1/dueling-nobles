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

export const dealGame = (payload) => {
    return {
        type: 'DEAL_GAME',
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

export const loadGame = (payload) => {
    return {
        type: 'LOAD_GAME',
        payload: payload
    }
}

export const updateStatus = (payload) => {
    return {
        type: 'UPDATE_STATUS',
        payload: payload
    }
}

export const clearGame = () => {
    return {
        type: 'CLEAR_GAME'
    }
}

export const incrementTurn = () => {
    return {
        type: 'INCREMENT_TURN'
    }
}

