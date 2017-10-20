export default function setSearchResults(searchResults) {
    console.log("REDUX actionCreator: setSearchResults(), type: SET_SEARCH_RESULTS")
    return ({type: 'SET_SEARCH_RESULTS', data: searchResults})

}