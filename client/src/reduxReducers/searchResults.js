function searchResults(state=[], action) {
    console.log("REDUX reducer: searchResults(), type: SET_SEARCH_RESULTS")
    switch(action.type){
        case 'SET_SEARCH_RESULTS': {
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

export default searchResults