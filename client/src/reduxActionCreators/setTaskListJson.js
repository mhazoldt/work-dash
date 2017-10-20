export default function setTaskListJson(taskListJson) {
        console.log("REDUX actionCreator: setTaskListJson(), type: SET_TASKLIST_JSON")
        return ({type: 'SET_TASKLIST_JSON', data: taskListJson})
    
}