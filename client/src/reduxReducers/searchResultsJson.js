function searchResultsJson(state=[], action) {
    console.log("REDUX reducer: searchResultsJson(), type: SET_SEARCH_RESULTS_JSON")
    switch(action.type){
        case 'SET_SEARCH_RESULTS_JSON': {
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

export default searchResultsJson