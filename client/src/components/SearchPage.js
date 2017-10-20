import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import shortid from 'shortid'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Grid, Form, Input, Checkbox, Icon, Card, Transition, Label } from 'semantic-ui-react'
import setSearchResults from '../reduxActionCreators/setSearchResults'
import setSearchResultsJson from '../reduxActionCreators/setSearchResultsJson'
import setTaskListJson from '../reduxActionCreators/setTaskListJson'
import demoResults from '../demoResults.js'


class SearchPage extends Component {

	constructor(props) {
		console.log("<SearchPage> - constructor()")

		super(props);

		this.state = {
			searchText: '',
			searchState: '',
			searchCity: '',
			directJobsOnly: true,
			results: [],
			jsonRes: [],
			cardsSetFromSearch: false,
			cardsSetFromMount: false,
			cardsSetFromSave: false,
			searchLoading: false

		}

	}


	handleChange = (e) => {
		console.log("<SearchPage> - handleChange()")
		console.log(e.target.value)

		this.setState({
			[e.target.name]: e.target.value

		})

	}


	handleCheck = (e) => {
		console.log("<SearchPage> - handleCheck()")

		this.setState({
			directJobsOnly: !(this.state.directJobsOnly),
			results: []

		})

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
			this.generateCards(data)

        })
        .catch((err) => {
			console.log(err)

        })

    }

	generateCards = (taskListJson) => {
		console.log("<SearchPage> - generateCards()")
		let searchResultsJson = this.props.searchResultsJson

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
											<Icon color='green' name='suitcase' /> {job.jobTitle}
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

		this.setState({
			results: cards,
			searchText: '',
			searchState: '',
			searchCity: '',
			directJobsOnly: false,

		})

		console.log("REDUX <SearchPage> - generateCards() - DISPATCH setSearchResults()")
		this.props.dispatch(setSearchResults(cards))

	}


	handleSave = (e) => {
		console.log("<SearchPage> - handleSave()")
		
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

			this.setState({cardsSetFromSearch: false})
			this.setState({cardsSetFromSave: true})
			this.setState({cardsSetFromMount: false})
			this.updateTaskListJson()

		})
		.catch((err) => {
			console.log(err)

		})

	}


	queryUrlBuilder = () => {


		let searchString = this.state.searchText
		let cityString = this.state.searchCity

		searchString = searchString.replace(/ /g, "+")
		cityString = cityString.replace(/ /g, "+")

		let url = '/api/jobsearch?'
		let search = `search=${searchString}`
		let location = `&location=${cityString}`
		// let state = `&state=${this.state.searchState}`
		
		// let fullTime = `&full_time=true`

		// console.log({fullTime})

		url = url + search

		// if(this.state.searchCity) {url = url + state}
		if(this.state.searchCity) {url = url + location}
		// if(this.state.directJobsOnly) {url = url + fullTime}

		return url

	}


	handleSubmit = (event) => {
		console.log("<SearchPage> - handleSubmit()")
		event.preventDefault()

		this.setState({searchLoading: true})
		this.setState({results: []})

		const url = this.queryUrlBuilder()

		console.log("<SearchPage> - FETCH - handleSubmit() - GET - ", url)
		fetch(url)
		.then(results => results.json())
		.then(data => {
			console.log("<SearchPage> - THEN - handleSubmit() - GET - ", url)
			this.setState({searchLoading: false})
			console.log({data})

			this.setState({jsonRes: data.resultItemList})

			console.log("REDUX <SearchPage> - handleSubmit() - DISPATCH setSearchResultsJson()")
			this.props.dispatch(setSearchResultsJson(data.resultItemList))

			console.log("data", data.resultItemList)

			this.setState({cardsSetFromSearch: true})
			this.setState({cardsSetFromSave: false})
			this.setState({cardsSetFromMount: false})
			this.generateCards(this.props.taskListJson)
			

		})
		.catch(error => {
			console.log('404', error)

			console.log("<SearchPage> - error - handleSubmit() - GET - ", url)
			this.setState({jsonRes: demoResults})

			console.log("REDUX <SearchPage> - handleSubmit() - DISPATCH setSearchResultsJson()")
			this.props.dispatch(setSearchResultsJson(demoResults))

			console.log("data", demoResults)

			this.setState({cardsSetFromSearch: true})
			this.setState({cardsSetFromSave: false})
			this.setState({cardsSetFromMount: false})
			this.generateCards(this.props.taskListJson)

		})
		//dispatch action with results as the payload
	}

	componentWillMount() {
		this.setState({cardsSetFromSearch: false})
		this.setState({cardsSetFromSave: false})
		this.setState({cardsSetFromMount: true})

	}


	componentDidMount() {
		this.setState({cardsSetFromSearch: false})
		this.setState({cardsSetFromSave: false})
		this.setState({cardsSetFromMount: true})
		this.generateCards(this.props.taskListJson)

	}


	render(){
		// let style = {
		// 		opacity: "0.15",
		// 		position: "fixed",
		// 		bottom: "10px",
		// 		left: "33%",
		// 		width: "490px",
		// 		maxWidth: "50%"
		//
		// }

		console.log("<SearchPage> - render()")
		console.log("")

		return(

			<div>
				<Form onSubmit={this.handleSubmit}>
					<Grid columns='equal'>

						<Grid.Row>
							<Grid.Column>
								<Form.Field control={Input} placeholder="job" name="searchText" icon="search" onChange={this.handleChange} className="" value={this.state.searchText}  fluid />
							</Grid.Column>
						</Grid.Row>

						<Grid.Row>
							<Grid.Column>
								<Form.Field control={Input} placeholder="location" name="searchCity" icon="world" onChange={this.handleChange} value={this.state.searchCity} fluid />
							</Grid.Column>

							<Grid.Column>
								<Form.Field control={Checkbox} name="directJobsOnly" onChange={this.handleCheck} label="Full Time" checked={this.state.directJobsOnly}  />
							</Grid.Column>
						</Grid.Row>

						<Grid.Row>
							<Grid.Column>
								<Button id="searchButton" color='black' type="submit" loading={this.state.searchLoading}>Submit</Button>
							</Grid.Column>
						</Grid.Row>

					</Grid>
				</Form>





				{this.state.cardsSetFromSearch &&
					<Transition.Group as={Grid} duration={1000} animation='fly right' centered={true}>
						{this.props.searchResults}
					</Transition.Group>

				}

				{this.state.cardsSetFromMount &&
					<Transition.Group as={Grid} duration={1000} animation='fade' centered={true}>
						{this.props.searchResults}
					</Transition.Group>

				}

				{this.state.cardsSetFromSave &&
					<Grid centered={true}>
						{this.props.searchResults}
					</Grid>

				}

			</div>

		)

	}

}


function mapStateToProps(appState) {
	const {isAuthenticated, errorMessage, isFetching} = appState.auth
	let searchResults = appState.searchResults

	console.log("<SearchPage> - mapStateToProps()")
	console.log({appState})
	console.log("")

	return {
	  isAuthenticated,
	  isFetching,
	  errorMessage,
	  searchResults,
	  taskListJson: appState.taskListJson,
	  searchResultsJson: appState.searchResultsJson

	}

}


export default withRouter(connect(mapStateToProps)(SearchPage))
