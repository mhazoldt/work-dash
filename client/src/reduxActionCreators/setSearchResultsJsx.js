export default function setSearchResultsJsx(searchResultsJsx) {
    console.log("REDUX actionCreator: setSearchResultsJsx(), type: SET_SEARCH_RESULTS_JSX")
    return ({type: 'SET_SEARCH_RESULTS_JSX', data: searchResultsJsx})

}