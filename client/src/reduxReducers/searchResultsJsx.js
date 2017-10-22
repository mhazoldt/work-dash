function searchResultsJsx(state=[], action) {
    console.log("REDUX reducer: searchResultsJsx(), type: SET_SEARCH_RESULTS_JSX")
    switch(action.type){
        case 'SET_SEARCH_RESULTS_JSX': {
            state = action.data
            console.log({state})
            console.log("")
            return state
        }
        default: {
            return state
        }
    }
   
}

export default searchResultsJsx