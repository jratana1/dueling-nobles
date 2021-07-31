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

export const setFlagFalse = () => {
    return {
        type: 'SET_FLAG_FALSE',
    }
}

export const dealHands = (payload) => {
    return {
        type: 'DEAL_HANDS',
        payload: payload
    }
}

