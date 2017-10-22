import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import shortid from 'shortid'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Grid, Form, Input, Checkbox, Icon, Card, Transition, Label } from 'semantic-ui-react'
import setSearchResultsJsx from '../reduxActionCreators/setSearchResultsJsx'
import setSearchResultsJson from '../reduxActionCreators/setSearchResultsJson'
import setTaskListJson from '../reduxActionCreators/setTaskListJson'


class SearchResults extends Component {

    state = {transitionTimes: {show: 0, hide: 0}}


	generateCards = (searchResultsJson, taskListJson) => {
        console.log("<SearchResults> - generateCards()")
        console.log('%c<SearchResults> - generateCards()', 'color: #ff0000')
		// let searchResultsJson = this.props.searchResultsJson
		// let taskListJson = this.props.taskListJson

		let cards = []

		cards = searchResultsJson.map((job, idx) => {
			let alreadyInTaskList = false

			taskListJson.forEach((jsonEntry) => {
				if(jsonEntry.detailUrl === job.detailUrl) {
					alreadyInTaskList = true

				}

			})

			let longJobTitle

			if(job.jobTitle.length > 40) {
				longJobTitle = true

			} else {
				longJobTitle = false

			}

			if(alreadyInTaskList && this.props.isAuthenticated){
				return (

					<Grid.Column computer={4} tablet={8} mobile={16} key={'card' + shortid.generate()}>
							<Card color='green' style={{height: "250px"}} className="mx-auto">


								<Card.Content>
									{longJobTitle &&
										<Card.Header className="cut-text">
											<span style={{color: "#016936"}}><Icon name='suitcase' /> {job.jobTitle}</span>
										</Card.Header>

									}
									{!(longJobTitle) &&
										<Card.Header>
										<span style={{color: "#016936"}}><Icon name='suitcase' /> {job.jobTitle}</span>
										</Card.Header>

									}
									<Card.Meta>
										{job.company}
									</Card.Meta>
									<Card.Description>
									</Card.Description>
								</Card.Content>


								<Card.Content className="no-border-extra" extra>
									<Label as='a' color='green' style={{marginBottom: "15px"}} ribbon>Saved</Label>
									<div className='ui two buttons'>
										<Button icon='checkmark' value={idx}></Button>
										<Button href={job.detailUrl} rel="noopener noreferrer" target="_blank" basic color='blue'>Link</Button>
									</div>
								</Card.Content>


								<Card.Content extra>
									<div style={{display: "flex", justifyContent: "space-between"}}>
										<a href={job.detailUrl}>{job.date}</a>
										<span>{job.location}</span>
									</div>
								</Card.Content>
							</Card>
					</Grid.Column>

				)

			} else {
				return (

					<Grid.Column computer={4} tablet={8} mobile={16} key={'card' + shortid.generate()}>
							<Card color='violet' style={{height: "250px"}} className="mx-auto">


								<Card.Content>
									{longJobTitle &&
										<Card.Header className="cut-text">
											<Icon name='suitcase' /> {job.jobTitle}
										</Card.Header>

									}
									{!(longJobTitle) &&
										<Card.Header>
											<Icon name='suitcase' /> {job.jobTitle}
										</Card.Header>

									}
									<Card.Meta>
										{job.company}
									</Card.Meta>
									<Card.Description>
									</Card.Description>
								</Card.Content>


								<Card.Content className="no-border-extra" extra>
									<div className='ui two buttons'>
										{this.props.isAuthenticated && <Button icon='save' color='green' value={idx} onClick={this.handleSave}></Button>}
										{!(this.props.isAuthenticated) && <Button icon='save' color='green' href='/login'></Button>}
										<Button href={job.detailUrl} rel="noopener noreferrer" target="_blank" basic color='blue'>Link</Button>
									</div>
								</Card.Content>


								<Card.Content extra>
									<div style={{display: "flex", justifyContent: "space-between"}}>
										<a href={job.detailUrl}>{job.date}</a>
										<span>{job.location}</span>
									</div>
								</Card.Content>
							</Card>
					</Grid.Column>

				)

			}

		})

        return cards

    }
    

    updateTaskListJson = () => {
		console.log("<SearchPage> - updateTaskListJson()")

		let user_id = localStorage.getItem('user_id')

		console.log("<SearchPage> - FETCH - updateTaskListJson() - GET - /api/listjobs/:id")
        fetch(`/api/listjobs/${user_id}`)
        .then((results) => {
			return results.json()

        })
        .then((data) => {
			console.log("<SearchPage> - THEN - updateTaskListJson() - GET - /api/listjobs/:id")
            console.log({data})
			console.log("")

			console.log("REDUX <SearchPage> - updateTaskListJson() - DISPATCH setTaskListJson()")
            this.props.dispatch(setTaskListJson(data))
			

        })
        .catch((err) => {
			console.log(err)
			console.log("<SearchPage> - error - updateTaskListJson() - GET - /api/listjobs/:id")

			
			console.log("REDUX <SearchPage> - error - updateTaskListJson() - DISPATCH setTaskListJson()")
            this.props.dispatch(setTaskListJson([]))
			

        })

    }





    handleSave = (e) => {
		console.log("<SearchPage> - handleSave()")
		
		this.props.changeSetFrom("saved")
		let user_id = localStorage.getItem('user_id')
		let jobIndex = e.currentTarget.value

		console.log(JSON.stringify({user_id}))
		console.log(JSON.stringify({jobIndex}))

		let jobData = this.props.searchResultsJson[jobIndex]
		jobData.user_id = user_id
		jobData.applied = false
		jobData.response_received = false
		jobData.followed_up = ""

		console.log("<SearchPage> - FETCH - handleSave() - POST - /api/addjob")
		console.log(JSON.stringify({jobData}))
		fetch('/api/addjob', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'

			},
			body: JSON.stringify(jobData)

		})
		.then((results) => {
			return results.json()

		})
		.then((thenData) => {
			console.log("<SearchPage> - THEN - handleSave() - POST - /api/addjob")
			console.log(JSON.stringify({thenData}))

			
			this.updateTaskListJson()

		})
		.catch((err) => {
			console.log(err)

		})

	}


    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.setFrom.input){
            return false
        } else {
            return true
        }


    }


	render(){
        console.log("<SearchResults> - render()")

        let searchData
        let searchDataJsx
        let setFrom
        let taskListJson
        
        searchData = this.props.searchData
        taskListJson = this.props.savedJson
        console.log({searchData})
        searchDataJsx = this.generateCards(searchData, taskListJson)

        setFrom = this.props.setFrom
        console.log({setFrom})


		return(

			<div>
				
                {this.props.setFrom.search &&
					<Transition.Group as={Grid} duration={1000} animation='fly right'>
						{searchDataJsx}
					</Transition.Group>

                }
                
				{this.props.setFrom.mount &&
					<Transition.Group as={Grid} duration={1000} animation='fade'>
						{searchDataJsx}
					</Transition.Group>

				}

				{this.props.setFrom.saved &&
					<Grid>
						{searchDataJsx}
					</Grid>

				}

			</div>

		)

	}

}


function mapStateToProps(appState) {
	const {isAuthenticated, errorMessage, isFetching} = appState.auth
	let searchResultsJsx = appState.searchResultsJsx

	console.log("<SearchResults> - mapStateToProps()")
	console.log({appState})
	console.log("")

	return {
	  isAuthenticated,
	  isFetching,
	  errorMessage,
	  searchResultsJsx,
	  taskListJson: appState.taskListJson,
	  searchResultsJson: appState.searchResultsJson

	}

}


export default withRouter(connect(mapStateToProps)(SearchResults))
