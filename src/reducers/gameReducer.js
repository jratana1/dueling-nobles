function makeDrawPile() {
    let drawPile = []
        for(let i=0; i<52; i++){
        drawPile.push({id: i, image: "blank"})
        }
    return drawPile
}

const initialState = {
    available: [...Array(52).keys()],
    flag: false,
    playerHand: [],
    opponentHand: [],
    drawPile: makeDrawPile()
}

const gameReducer = (state= initialState, action) => {

    switch(action.type){
        case "DRAW_CARD": 
        // if(action.payload.image ==="blank") {
        //     let image_value = state.available[Math.floor(Math.random()*state.available.length)]

        // }
        // let playerHand = state.playerHand
        let hand = state.playerHand

        hand.push(action.payload)
        // return {...state}
        return {...state, playerHand: hand, flag: !state.flag}

        case "ADD_READING":
        return {...state, game: action.payload.data, flag: true }

        case "SET_FLAG":
        return {...state, flag: !state.flag}

        case "SET_FLAG_FALSE":
        return {...state, flag: false}

        case "CLICK_FLAG":
        return {...state, current: action.payload}

        case "DEAL_HANDS":

        return {...state, drawPile: action.payload.drawPile, playerHand: action.payload.playerHand, opponentHand: action.payload.opponentHand, flag: !state.flag}

        default:
            return {...state}
    }
}

export default gameReducer

