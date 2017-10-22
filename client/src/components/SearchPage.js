import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import shortid from 'shortid'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Grid, Form, Input, Checkbox, Icon, Card, Transition, Label } from 'semantic-ui-react'
import setSearchResultsJsx from '../reduxActionCreators/setSearchResultsJsx'
import setSearchResultsJson from '../reduxActionCreators/setSearchResultsJson'
import setTaskListJson from '../reduxActionCreators/setTaskListJson'
import SearchResults from './SearchResults'


class SearchPage extends Component {

	constructor(props) {
		console.log("<SearchPage> - constructor()")

		super(props);

		this.state = {
			searchText: '',
			searchState: '',
			searchCity: '',
			fullTimeOnly: true,
			searchLoading: false,
			setFrom: {search: false, mount: false, saved: false, input: false},
			resultsMount: []

		}

	}


	handleChange = (e) => {
		console.log("<SearchPage> - handleChange()")
		console.log(e.target.value)
		this.changeSetFrom("input")

		this.setState({
			[e.target.name]: e.target.value

		})

	}


	handleCheck = (e) => {
		console.log("<SearchPage> - handleCheck()")
		this.changeSetFrom("input")

		this.setState({
			fullTimeOnly: !(this.state.fullTimeOnly),
			results: []

		})

	}


	changeSetFrom(origin) {
		console.log('%cchangeSetFrom()', 'color: #00ff00')
		let state = {search: false, mount: false, saved: false, input: false}

		state[origin] = true
		console.log("changeSetFrom", {state})
		this.setState({setFrom: state})

	}


	queryUrlBuilder = () => {
		console.log('%cqueryUrlBuilder()', 'color: #ffbf00')

		let url = '/api/jobsearch?'

		if(this.state.searchText) {
			let searchString = this.state.searchText
			searchString = searchString.replace(/ /g, "+")
			let search = `search=${searchString}`
			url = url + search

		}

		if(this.state.searchCity) {
			let cityString = this.state.searchCity
			cityString = cityString.replace(/ /g, "+")
			let location = `&location=${cityString}`
			url = url + location

		}

		if(this.state.fullTimeOnly) {
			let fullTime = `&full_time=true`
			url = url + fullTime
		
		}
		
		console.log('%cURL', 'color: #ffbf00')
		console.log(`%c${url}`, 'color: #ffbf00')
		return url

	}


	handleSubmit = (event) => {
		console.log("<SearchPage> - handleSubmit()")
		console.log("### submit started ###")
		event.preventDefault()

		this.changeSetFrom("search")
		this.props.dispatch(setSearchResultsJson([]))
		this.setState({searchLoading: true})

		const url = this.queryUrlBuilder()

		console.log("<SearchPage> - FETCH - handleSubmit() - GET - ", url)
		fetch(url)
		.then(results => results.json())
		.then(data => {
			console.log("<SearchPage> - THEN - handleSubmit() - GET - ", url)
			this.setState({searchLoading: false})
			console.log({data})

			console.log("REDUX <SearchPage> - handleSubmit() - DISPATCH setSearchResultsJson()")
			
			setTimeout(this.props.dispatch(setSearchResultsJson(data.resultItemList)), 1000);
			
			

		})
		.catch(error => {
			console.log('404', error)

			console.log("<SearchPage> - error - handleSubmit() - GET - ", url)
			

			console.log("REDUX <SearchPage> - handleSubmit() - DISPATCH setSearchResultsJson()")
			

		})
		//dispatch action with results as the payload
	}


	componentWillMount() {
		console.log('%componentWillMount()', 'color: #0000ff')
		this.changeSetFrom("mount")
		this.setState({resultsMount: this.props.searchResultsJson})
		this.props.dispatch(setSearchResultsJson([]))

	}


	componentDidMount() {
		console.log('%ccomponentDidMount()', 'color: #00ffff')
		this.props.dispatch(setSearchResultsJson(this.state.resultsMount))

	}


	render(){
		
		console.log("<SearchPage> - render()")
		console.log("")
		console.log("### render happening ###")
		let searchResultsData = this.props.searchResultsJson
		console.log({searchResultsData})
		
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
								<Form.Field control={Checkbox} name="fullTimeOnly" onClick={this.handleCheck} label="Full Time" checked={this.state.fullTimeOnly}  />
							</Grid.Column>
						</Grid.Row>

						<Grid.Row>
							<Grid.Column>
								<Button id="searchButton" color='black' type="submit" loading={this.state.searchLoading}>Submit</Button>
							</Grid.Column>
						</Grid.Row>

					</Grid>
				</Form>

				<SearchResults searchData={this.props.searchResultsJson}  setFrom={this.state.setFrom} savedJson={this.props.taskListJson} changeSetFrom={this.changeSetFrom.bind(this)} />

			</div>

		)

	}

}


function mapStateToProps(appState) {
	const {isAuthenticated, errorMessage, isFetching} = appState.auth
	let searchResultsJsx = appState.searchResultsJsx

	console.log("<SearchPage> - mapStateToProps()")
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


export default withRouter(connect(mapStateToProps)(SearchPage))
