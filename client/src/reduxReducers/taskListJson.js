function taskListJson(state=[], action) {
    console.log("REDUX reducer: taskListJson(), type: SET_TASKLIST_JSON")
    switch(action.type){
        case 'SET_TASKLIST_JSON': {
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

export default taskListJson