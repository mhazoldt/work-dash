import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import { Tab } from 'semantic-ui-react'
import SearchPage from './SearchPage'
import AppData from './AppData'
import TaskList from './TaskList'
import setTaskListJson from '../reduxActionCreators/setTaskListJson'

const panes = [
    { menuItem: 'Search', render: () => <Tab.Pane attached={false} raised={false} style={{border: "0px solid black", boxShadow: "0px 0px 0px #000000"}}><SearchPage /></Tab.Pane> },
    { menuItem: 'Saved', render: () => <Tab.Pane attached={false} style={{border: "0px solid black", boxShadow: "0px 0px 0px #000000"}}><TaskList /></Tab.Pane> },
    { menuItem: 'App Data', render: () => <Tab.Pane attached={false} style={{border: "0px solid black", boxShadow: "0px 0px 0px #000000"}}><AppData /></Tab.Pane> }
  ]


class Tabs extends Component {

    componentWillMount() {
        console.log("<Tabs> - componentWillMount()")
        this.getTaskListFromDb()

    }

    getTaskListFromDb = () => {
        console.log("<Tabs> - getTaskListFromDb()")

        let user_id = localStorage.getItem('user_id')
        console.log("<Tabs> - FETCH - getTaskListFromDb() - GET - /api/listjobs/:id")
        fetch(`/api/listjobs/${user_id}`)
        .then((results) => {
            return results.json()
        })
        .then((data) => {
            console.log("<Tabs> - THEN - getTaskListFromDb() - GET - /api/listjobs/:id")
            console.log({data})
            console.log("")

            console.log("REDUX <Tabs> - getTaskListFromDb() - DISPATCH setTaskListJson()")
            this.props.dispatch(setTaskListJson(data))

        })
        .catch((err) => {
            console.log(err)
        })

    }


    render() {
        console.log("<Tabs> - render()")
        console.log("")
        return (
            <div>
                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </div>
        )
    }
}


function mapStateToProps(appState) {
    const {isAuthenticated, errorMessage, isFetching} = appState.auth
    console.log("<Tabs> - mapStateToProps()")
    console.log({appState})
    console.log("")

    return {
        isAuthenticated,
        isFetching,
        errorMessage
    }
}

export default withRouter(connect(mapStateToProps)(Tabs))
