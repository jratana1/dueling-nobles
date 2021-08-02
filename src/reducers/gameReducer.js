function makeDrawPile() {
    let drawPile = []
        for(let i=0; i<52; i++){
        drawPile.push({id: i, image: "blank"})
        }
    return drawPile
}

function popRandom (array) {
    let i = (Math.random() * array.length) | 0
    return array.splice(i, 1)[0]
  }

const initialState = {
    available: [...Array(52).keys()],
    flag: false,
    playerHand: [],
    opponentHand: [],
    drawPile: makeDrawPile(),
    discardPile: [],
    turn: true,
    players: {player1: "", player2: ""},
    game: { status: "open",
            playerHand: [],
            opponentHand: [],
            drawPile: makeDrawPile(),
            discardPile: [],
            turn: 0}
}

const gameReducer = (state= initialState, action) => {
    let found
    
    switch(action.type){
        case "DRAW_CARD": 
            found = state.drawPile.find((element) => {
                    return(element.id === action.payload)})

                if (found) {
                let newPlayerHand = state.playerHand.slice()
                let newDrawPile = state.drawPile.filter(card => card.id !== found.id)

                    if(found.image ==="blank") {
                        let newAvailable = state.available.slice()
                        let image_value = popRandom(newAvailable)
                        found.image= image_value              
                        newPlayerHand.push(found)
                        return {...state,  drawPile: newDrawPile, available: newAvailable, playerHand: newPlayerHand, flag: !state.flag}
                    }

                    newPlayerHand.push(found)
                    return {...state,  drawPile: newDrawPile, playerHand: newPlayerHand, flag: !state.flag}
                }
            return {...state}

        case "PLAY_CARD":
            found = state.playerHand.find((element) => {
                    return(element.id === action.payload)})

            if (found) {
                let newPlayerHand = state.playerHand.filter(card => card.id !== found.id)
                let newDiscardPile = state.discardPile.concat([found])
                
    
                return {...state, discardPile: newDiscardPile, playerHand: newPlayerHand, flag: !state.flag}
            }
            return {...state}

        case "SET_FLAG":
            return {...state, flag: !state.flag}

        case "JOIN_GAME":
            if (state.players.player1) {
                return {...state, players: {...state.players, player2: action.payload.userName}}
            } 
            else {
                return {...state, players: {...state.players, player1: action.payload.userName}}
            }

        case "SET_PLAYERS":
        return {...state, players: action.payload}

        case "DEAL_HANDS":
            let newAvailable= state.available.filter(id => !(action.payload.remove.includes(id)))
            return {...state, available: newAvailable, drawPile: action.payload.drawPile, playerHand: action.payload.playerHand, opponentHand: action.payload.opponentHand, flag: !state.flag}

        case "UPDATE_GAME":
            return {...state, game: action.payload}

        case "UPDATE_STATUS":
            
            return {...state, game: {...state.game, status: action.payload}}

        default:
            return {...state}
        


    }
}

export default gameReducer

