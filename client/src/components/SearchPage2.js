import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import shortid from 'shortid'
import { Grid, Form, Input, Checkbox, Icon, Card, Transition, Popup } from 'semantic-ui-react'


class SearchPage2 extends Component {

	constructor(props) {
		super(props);
		this.state = {
			searchText: '',
			searchState: '',
			searchCity: '',
			directJobsOnly: false,
			results: [],
			jsonRes: []

		}
	}


	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleCheck = (e) => {
		this.setState({
			directJobsOnly: !(this.state.directJobsOnly),
			results: []
		})
	}

	handleSave = (e) => {
		let username = localStorage.getItem('username')
		let user_id = localStorage.getItem('user_id')
		console.log(username)
		console.log({user_id})
		console.log(e.target.value)

		let jobIndex = e.target.value

		let jobData = this.state.jsonRes[jobIndex]
		jobData.user_id = user_id
		jobData.applied = false
		jobData.response_received = false


		let jobPostData = new FormData()
		jobPostData.append("json", JSON.stringify(jobData))

		console.log({jobData})

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
		.then((data) => {
			console.log({data})
		})
		.catch((err) => {
			console.log(err)
		})

	}

	queryUrlBuilder = () => {
		let url = 'http://service.dice.com/api/rest/jobsearch/v1/simple.json?'
		let text = `text=${this.state.searchText}`
		let state = `&state=${this.state.searchState}`
		let city = `&city=${this.state.searchCity}`
		let directJobsOnly = `&direct=${+this.state.directJobsOnly}`

		console.log({directJobsOnly})

		url = url + text

		if(this.state.searchCity) {url = url + state}

		if(this.state.searchCity) {url = url + city}

		if(this.state.directJobsOnly) {url = url + directJobsOnly}

		return url

	}



	handleSubmit = (event) => {

		event.preventDefault()

		this.setState({results: []})

		const url = this.queryUrlBuilder()

		console.log(url)

		fetch(url)
		.then(results => results.json())
		.then(data => {
			this.setState({jsonRes: data.resultItemList})

			console.log("data", data.resultItemList)

			let cards = []
			cards = data.resultItemList.map((job, idx) => {
				return (
					<Grid.Column computer={4} tablet={8} mobile={16} key={'card' + shortid.generate()}>
							<Card color='violet' style={{height: "250px"}} className="mx-auto">
								<Card.Content>

									<Card.Header>
										<Icon color='brown' name='suitcase' /> {job.jobTitle}
									</Card.Header>
									<Card.Meta>
										{job.company}
									</Card.Meta>
									<Card.Description>
									</Card.Description>
								</Card.Content>
								<Card.Content className="no-border-extra" extra>
								<div className='ui two buttons'>
									<Popup
										trigger={<Button icon='save' color='green'></Button>}
										content='Please log in to use this feature!'
										on='click'
										hideOnScroll
									/>
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
			})

			this.setState({
				results: cards,
				searchText: '',
				searchState: '',
				searchCity: '',
				directJobsOnly: false,
			})
		})
		.catch(error => {console.log('404', error)})
		//dispatch action with results as the payload
	}

	render(){

		let style = {
				opacity: "0.35",
				position: "fixed",
				bottom: "10px",
				left: "33%",
				width: "490px",
				maxWidth: "50%"
		}

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
								<Form.Field control={Input} placeholder="city" name="searchCity"  icon="" onChange={this.handleChange} className="" value={this.state.searchCity} fluid />
							</Grid.Column>
							<Grid.Column>
								<Form.Field control={Input} placeholder="state" name="searchState" icon="" onChange={this.handleChange} className="" value={this.state.searchState} fluid />
							</Grid.Column>
							<Grid.Column>
								<Form.Field control={Checkbox} name="directJobsOnly" icon="" onChange={this.handleCheck} className="" label="Direct Jobs Only" checked={this.state.directJobsOnly} />
							</Grid.Column>
						</Grid.Row>

						<Grid.Row>
							<Grid.Column>
								<Button color='black' type="submit" className="">Submit</Button>
							</Grid.Column>
						</Grid.Row>

					</Grid>
				</Form>

				<img src={require('../images/run.png')} alt='run' class='run' style={style}/>

				<Transition.Group as={Grid} duration={1000} animation='fly right' centered={true}>
					{this.state.results}
				</Transition.Group>
			</div>
		)
	}

}

export default SearchPage2
