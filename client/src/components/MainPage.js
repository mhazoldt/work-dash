import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import SearchPage from './SearchPage'
import Tabs from './Tabs'


class MainPage extends Component {

    render() {
        console.log("<MainPage> - render()")
        console.log("")

        return (

            <div>

                {!(this.props.isAuthenticated) && <div className="p-4"><SearchPage /></div>}

                {this.props.isAuthenticated && <Tabs />}
            </div>

        )

    }

}


function mapStateToProps(appState) {
    const {isAuthenticated, errorMessage, isFetching} = appState.auth

    console.log("<MainPage> - mapStateToProps()")
    console.log({appState})
    console.log("")

    return {
        isAuthenticated,
        isFetching,
        errorMessage
    }

}


export default withRouter(connect(mapStateToProps)(MainPage))
