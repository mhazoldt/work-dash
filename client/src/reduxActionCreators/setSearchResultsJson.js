export default function setSearchResultsJson(searchResultsJson) {
        console.log("REDUX actionCreator: setSearchResultsJson(), type: SET_SEARCH_RESULTS_JSON")
        return ({type: 'SET_SEARCH_RESULTS_JSON', data: searchResultsJson})
    
}