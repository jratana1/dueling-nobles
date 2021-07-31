export default function count(state = {
    count: 0,
    query: "all"
    }, action) {
    switch (action.type) {
      case 'BUTTON_INCREMENT':
        return {count: state.count + 1}

      case 'DECREMENT':
        return state.count - 1

      case 'FILTER':
        return  {...state, query: action.payload.query}

      default:
        return state
    }
  }