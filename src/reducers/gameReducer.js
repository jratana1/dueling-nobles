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
    drawPile: makeDrawPile(),
    discardPile: [],
    turn: true,
    players: {player1: "", player2: ""},
    seat: null,
    game: { status: null,
            turn: 0}
}

const gameReducer = (state= initialState, action) => {
    let found
    let newPlayerHand
    let newDrawPile
    let newOpponentHand
    
    switch(action.type){
        case "DRAW_CARD":

            if (action.payload.card.location ==="drawPile") {
  
                if (action.payload.player ==="player"){
                    let newPlayerHand = state.playerHand.slice()
                    let newDrawPile = state.drawPile.slice()
                    let card = newDrawPile.pop()
                    card.image= action.payload.playerHand[action.payload.playerHand.length-1]
                    newPlayerHand.push(card)
                   
                    return {...state, drawPile: newDrawPile, playerHand: newPlayerHand, game: {...state.game, turn: action.payload.turn}}
                }
                else if (action.payload.player ==="opponent"){
                    let newOpponentHand = state.opponentHand.slice()
                    let newDrawPile = state.drawPile.slice()
                    let card = newDrawPile.pop()
                    newOpponentHand.push(card)
                    return {...state, drawPile: newDrawPile, opponentHand: newOpponentHand, game: {...state.game, turn: action.payload.turn}}
                }
            }
            else if (action.payload.card.location ==="playerHand") {
                if (action.payload.player ==="player"){         
                    let newPlayerHand = state.playerHand.filter(card => card.id !== action.payload.card.card.id)
                    let newDiscardPile = state.discardPile.slice()
                    newDiscardPile.push(action.payload.card.card)

                    return {...state, discardPile: newDiscardPile, playerHand: newPlayerHand, game: {...state.game, turn: action.payload.turn}}
                }
                else if (action.payload.player ==="opponent"){
                    let newOpponentHand = state.opponentHand.slice()
                    let newDiscardPile = state.discardPile.slice()
                    let card = newOpponentHand.pop()
                    card.image= action.payload.card.card.image
                    newDiscardPile.push(card)
                    return {...state, discardPile: newDiscardPile, opponentHand: newOpponentHand, game: {...state.game, turn: action.payload.turn}}
                }
            }  
            else if (action.payload.card.location ==="discardPile") {
                if (action.payload.player ==="player"){         
                    let newDiscardPile = state.discardPile.filter(card => card.id !== action.payload.card.card.id)
                    let newPlayerHand = state.playerHand.slice()
                    newPlayerHand.push(action.payload.card.card)

                    return {...state, discardPile: newDiscardPile, playerHand: newPlayerHand, game: {...state.game, turn: action.payload.turn}}
                }
                else if (action.payload.player ==="opponent"){
                    let newOpponentHand = state.opponentHand.slice()
                    let newDiscardPile = state.discardPile.slice()
                    let card = newDiscardPile.pop()
                    newOpponentHand.push(card)
                    return {...state, discardPile: newDiscardPile, opponentHand: newOpponentHand, game: {...state.game, turn: action.payload.turn}}
                }
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

        case "DEAL_GAME":
             newPlayerHand = state.playerHand.slice()
             newDrawPile = state.drawPile.slice()
             newOpponentHand = state.opponentHand.slice()

            action.payload.playerHand.forEach((imageId) => {
                    let draw= newDrawPile.pop()
                    draw.image = imageId
                    newPlayerHand.push(draw)   
                    draw= newDrawPile.pop()  
                    newOpponentHand.push(draw)
                })
            return {...state, playerHand: newPlayerHand, drawPile: newDrawPile, opponentHand: newOpponentHand, game: {...state.game, status: action.payload.status}}

        case "UPDATE_STATUS":
            return {...state, game: {...state.game, status: action.payload}}

        case "CLEAR_GAME":
            return {...state, available: [...Array(52).keys()],
                            flag: false,
                            playerHand: [],
                            opponentHand: [],
                            drawPile: makeDrawPile(),
                            discardPile: [],
                            turn: true,
                            players: {player1: "", player2: ""},
                            game: { status: null,
                                turn: 0}}

        case "LOAD_GAME":
            newPlayerHand = state.playerHand.slice()
            newDrawPile = state.drawPile.slice()
            newOpponentHand = state.opponentHand.slice()
            let newDiscardPile = state.discardPile.slice()
            let seat
            if (action.payload.playerHand.length>0)   {               
            action.payload.playerHand.forEach((imageId) => {
                    let draw= newDrawPile.pop()
                    draw.image = imageId
                    newPlayerHand.push(draw)  
            })
            }   

            for(var i=0; i < action.payload.opponentHand ; i++){
                let draw= newDrawPile.pop()  
                newOpponentHand.push(draw)
            }
            if (action.payload.discardPile.length>0)   { 
            action.payload.discardPile.forEach((imageId) => {

                let draw= newDrawPile.pop()
                draw.image = imageId
                newDiscardPile.push(draw)  
            })}

            if (action.payload.seat === "player1"){
                seat = 0
            }
            else {
                seat = 1
            }
        return {...state, playerHand: newPlayerHand, 
                          discardPile: newDiscardPile,
                          drawPile: newDrawPile,
                          opponentHand: newOpponentHand,
                          seat: seat,
                          game: {...state.game, status: action.payload.status, turn: action.payload.turn}}

        default:
            return {...state}
        
        case "INCREMENT_TURN":
            return {...state, game: {...state.game, turn: state.game.turn + 1}}

    }
}

export default gameReducer

