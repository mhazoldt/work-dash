import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import { Grid, Form, Icon, TextArea, Header, Button, Popup, Responsive, Transition } from 'semantic-ui-react'
import setTaskListJson from '../reduxActionCreators/setTaskListJson'
import shortid from 'shortid'

class TaskList extends Component {

    state = {
        userData: [],
        taskListJson: [],
        taskListSetFromMount: false,
        setFrom: {input: false, mount: false}

    }


    updateTaskListJson = () => {
        console.log("<TaskList> - updateTaskListJson()")

        let user_id = localStorage.getItem('user_id')

        console.log("<TaskList> - FETCH - updateTaskListJson() - GET - /api/listjobs/:id")
        fetch(`/api/listjobs/${user_id}`)
        .then((results) => {
            return results.json()

        })
        .then((data) => {
            console.log("<TaskList> - THEN - updateTaskListJson() - THEN - /api/listjobs/:id")
            console.log({data})

            console.log("REDUX <TaskList> - updateTaskListJson() - DISPATCH setTaskListJson()")
            this.props.dispatch(setTaskListJson(data))

        })
        .catch((err) => {
            console.log(err)

        })

    }


    handleDelete = (e) => {
        console.log("<TaskList> - handleDelete()")

        let jobIndex = e.target.value
        console.log({jobIndex})

        let userDataJson = this.props.taskListJson
        console.log({userDataJson})

        let idjob_listings = userDataJson[jobIndex].idjob_listings
        console.log({idjob_listings})

        document.querySelector(`#popup${jobIndex}`).hidden = true
        let self = this

        console.log("<TaskList> - FETCH - handleDelete() - POST - /api/removejob/:id")
        fetch(`/api/removejob/${idjob_listings}`, {
            method: 'POST'

		})
		.then((results) => {
            return results.json()

		})
		.then((data) => {
            console.log("<TaskList> - THEN - handleDelete() - POST - /api/removejob/:id")
            console.log({data})
            self.updateTaskListJson()



		})
		.catch((err) => {
            console.log(err)

		})

    }


    handleAppliedCheckbox = (e) => {
        console.log("<TaskList> - handleAppliedCheckbox()")
        

        let jsonIndex = e.currentTarget.value
        console.log({jsonIndex})

        let userDataJson = this.props.taskListJson
        let jsonReq = userDataJson[jsonIndex]

        console.log({jsonReq})

        jsonReq.applied = !(jsonReq.applied)
        let idjob_listings = userDataJson[jsonIndex].idjob_listings
        let self = this

        console.log("<TaskList> - FETCH - handleAppliedCheckbox() - POST - /api/editjob/:id")
        fetch(`/api/editjob/${idjob_listings}`, {
            method: 'POST',
            headers: {
				'Accept': 'application/json',
                'Content-Type': 'application/json'

			},
            body: JSON.stringify(jsonReq)

		})
		.then((results) => {
            return results.json()

		})
		.then((data) => {
            console.log("<TaskList> - THEN - handleAppliedCheckbox() - POST - /api/editjob/:id")
            console.log({data})
            self.updateTaskListJson()


		})
		.catch((err) => {
            console.log(err)

		})

    }


    handleResponseCheckbox = (e) => {
        console.log("<TaskList> - handleAppliedCheckbox()")

        let jsonIndex = e.currentTarget.value
        console.log({jsonIndex})
        

        let userDataJson = this.props.taskListJson
        let jsonReq = userDataJson[jsonIndex]

        console.log({jsonReq})

        jsonReq.response_received = !(jsonReq.response_received)
        let idjob_listings = userDataJson[jsonIndex].idjob_listings
        let self = this

        console.log("<TaskList> - FETCH - handleResponseCheckbox() - POST - /api/editjob/:id")
        fetch(`/api/editjob/${idjob_listings}`, {
            method: 'POST',
            headers: {
				'Accept': 'application/json',
                'Content-Type': 'application/json'

			},
            body: JSON.stringify(jsonReq)

		})
		.then((results) => {
            return results.json()

		})
		.then((data) => {
            console.log("<TaskList> - THEN - handleResponseCheckbox() - POST - /api/editjob/:id")
            console.log({data})
            self.updateTaskListJson()

		})
		.catch((err) => {
            console.log(err)

		})

    }


    handleNotes = (e) => {
        console.log("<TaskList> - handleNotes()")

        console.log("--- data-index ---")
        console.log(e.target.dataset.index)

        let jsonIndex = e.target.dataset.index
        let userDataJson = this.props.taskListJson
        let jsonReq = userDataJson[jsonIndex]

        console.log(JSON.stringify({jsonReq}))

        jsonReq.followed_up = e.target.value
        let idjob_listings = userDataJson[jsonIndex].idjob_listings
        let self = this

        console.log("--- FETCH - handleNotes()")
        console.log("<TaskList> - FETCH - handleNotes() - POST - /api/editjob/:id")
        fetch(`/api/editjob/${idjob_listings}`, {
            method: 'POST',
            headers: {
				'Accept': 'application/json',
                'Content-Type': 'application/json'

			},
            body: JSON.stringify(jsonReq)

		})
		.then((results) => {
            return results.json()

		})
		.then((data) => {
            console.log("<TaskList> - THEN - handleNotes() - POST - /api/editjob/:id")
            console.log({data})
            self.updateTaskListJson()

		})
		.catch((err) => {
            console.log(err)

		})

    }

    renderResultsFromJson = (taskListJson) => {
        let jobList = []
        
        jobList = taskListJson.map((job, idx) => {
            let haveApplied
            let responseReceived
            let followed_up = job.followed_up

            if(job.applied === 0){haveApplied = false}
            if(job.applied === 1){haveApplied = true}

            if(job.response_received === 0){responseReceived = false}
            if(job.response_received === 1){responseReceived = true}

            haveApplied = job.applied
            responseReceived = job.response_received

            console.log("index", idx)
            console.log({haveApplied})
            console.log({responseReceived})
            console.log({followed_up})

            return (

                <Grid.Row key={job.detailUrl}>

                    <Grid.Column computer={8} mobile={16}>




                            <Grid>

                                <Grid.Row width={16} verticalAlign='middle' style={{border: "0px solid orange", paddingBottom: "0px"}}>

                                    <Grid.Column width={14} style={{border: "0px solid green", margin: "0px", padding: "3px", paddingBottom: "0px"}}>
                                        <Header.Content><Icon name="bookmark outline" /><a href={job.detailUrl} rel="noopener noreferrer" target="_blank" style={{color: "black"}}>{job.jobTitle}</a></Header.Content>
                                    </Grid.Column>

                                    <Grid.Column width={1} textAlign='right' style={{border: "0px solid red", margin: "0px", padding: "0px"}}>
                                        <Popup id={'popup' + idx} wide trigger={<Icon name='trash' size='large' style={{margin: "0px"}} />} on='click' hideOnScroll hideOnClick>
                                            <Button value={idx} onClick={this.handleDelete} color='red'>Remove</Button>
                                        </Popup>
                                    </Grid.Column>

                                </Grid.Row>


                                <Grid.Row style={{border: "0px solid orange", paddingTop: "0px", marginTop: "0px"}}>

                                    <Grid.Column verticalAlign='top' textAlign='right' width={1} style={{border: "0px solid red", padding: "0px"}}>
                                    </Grid.Column>

                                    <Grid.Column width={14} style={{border: "0px solid green", paddingTop: "0px"}}>
                                        <Header.Subheader><Icon name="building outline" />{job.company}</Header.Subheader>
                                        <Header.Subheader><Icon name="world" />{job.location}</Header.Subheader>
                                        <Header.Subheader><Icon name="wait" />{job.date}</Header.Subheader>
                                    </Grid.Column>

                                </Grid.Row>

                            </Grid>




                    </Grid.Column>
                    <Grid.Column computer={1} mobile={8} textAlign='center' style={{height: "100%"}}>
                        <div style={{border: "0px solid blue", margin: "0px", padding: "0px", height: "100%", display: "flex"}}>
                        {!(haveApplied) &&
                            <Button className='checkboxButton' onClick={this.handleAppliedCheckbox} value={idx}>
                                <Icon color='red' style={{border: "0px solid orange", margin: "0px", padding: "0px"}} name='square outline' size='big' />
                            </Button>

                        }
                        {haveApplied &&
                            <Button className='checkboxButton' onClick={this.handleAppliedCheckbox} value={idx}>
                                <Icon color='green' style={{border: "0px solid orange", margin: "0px", padding: "0px"}} name='checkmark box' size='big' />
                            </Button>

                        }
                        </div>
                    </Grid.Column>
                    <Grid.Column computer={1} mobile={8} textAlign='center' style={{height: "100%"}}>
                        <div style={{border: "0px solid blue", margin: "0px", padding: "0px", height: "100%", display: "flex"}}>
                        {!(responseReceived) &&
                            <Button className='checkboxButton' onClick={this.handleResponseCheckbox} value={idx}>
                                <Icon color='red' style={{border: "0px solid orange", margin: "0px", padding: "0px"}} name='square outline' size='big' />
                            </Button>

                        }
                        {responseReceived &&
                            <Button className='checkboxButton' onClick={this.handleResponseCheckbox} value={idx}>
                                <Icon color='green' style={{border: "0px solid orange", margin: "0px", padding: "0px"}} name='checkmark box' size='big' />
                            </Button>

                        }
                        </div>
                    </Grid.Column>
                    <Grid.Column computer={6} mobile={16}><Form><TextArea defaultValue={job.followed_up} data-index={idx} onBlur={this.handleNotes} /></Form></Grid.Column>

                </Grid.Row>

            )
        })

        return jobList
    }


    render() {
        console.log("<TaskList> - render()")

        let taskListSaved = this.renderResultsFromJson(this.props.taskListJson)

  
        console.log("")

        return (

            <div>
                {this.state.taskListSetFromMount &&
                    <Transition.Group as={Grid} duration={1000} animation='fade' centered={true} width={16} celled='internally'>

                        <Responsive as={Grid.Row} minWidth={723}>
                            <Grid.Column computer={8}>Job Title</Grid.Column>
                            <Grid.Column computer={1}>Applied</Grid.Column>
                            <Grid.Column style={{paddingLeft: "5px"}} computer={1}>Response</Grid.Column>
                            <Grid.Column computer={6}>Notes</Grid.Column>
                        </Responsive>

                        {taskListSaved}

                    </Transition.Group>

                }
                {!(this.state.taskListSetFromMount) &&
                    <Grid centered={true} width={16} celled='internally'>

                        <Responsive as={Grid.Row} minWidth={723}>
                            <Grid.Column computer={8}>Job Title</Grid.Column>
                            <Grid.Column computer={1}>Applied</Grid.Column>
                            <Grid.Column style={{paddingLeft: "5px"}} computer={1}>Response</Grid.Column>
                            <Grid.Column computer={6}>Notes</Grid.Column>
                        </Responsive>

                        {taskListSaved}

                    </Grid>

                }


            </div>

        )

    }

}


function mapStateToProps(appState) {
    const {isAuthenticated, errorMessage, isFetching} = appState.auth

    console.log("<TaskList> - mapStateToProps()")
    console.log({appState})
    console.log("")

    return {
        isAuthenticated,
        isFetching,
        errorMessage,
        taskListJson: appState.taskListJson,
        searchResultsJson: appState.searchResultsJson

    }

}


export default withRouter(connect(mapStateToProps)(TaskList))
