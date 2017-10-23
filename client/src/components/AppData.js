import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import { Form, Icon, Button, Popup, Table, Input } from 'semantic-ui-react'
import shortid from 'shortid'


class AppData extends Component {

    state = {
        userData: [],
        appDataListJson: []

    }


    handleAdd = (e) => {
		console.log("<AppData> - handleAdd()")

		let user_id = localStorage.getItem('user_id')
		console.log({user_id})

		let appData = {}

		console.log("<AppData> - FETCH - handleAdd() - POST - /api/addappdata/:id")

		fetch(`/api/addappdata/${user_id}`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'

			},
			body: JSON.stringify(appData)

		})
		.then((results) => {
			return results.json()

		})
		.then((data) => {
			console.log("<AppData> - THEN - handleAdd() - POST - /api/addappdata/:id")
			console.log({data})

            this.renderResultsFromDb()

		})
		.catch((err) => {
			console.log(err)

		})

	}


    handleTableData = (e) => {
        console.log("<AppData> - handleTableData()")

        let jsonIndex = e.currentTarget.dataset.index

        let userDataJson = this.state.appDataListJson
        let jsonReq = userDataJson[jsonIndex]

        console.log({jsonReq})

        jsonReq.data = e.target.innerText
        let idapp_data = userDataJson[jsonIndex].idapp_data
        let self = this

        console.log("--- FETCH - handleTableData()")
        console.log("<AppData> - FETCH - handleTableData() - POST - /api/editappdata/:id")
        fetch(`/api/editappdata/${idapp_data}`, {
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
            console.log("<AppData> - THEN - handleTableData() - POST - /api/editjob/:id")
            console.log({data})
            self.renderResultsFromDb()

		})
		.catch((err) => {
            console.log(err)

		})

    }


    handleTableLabel = (e) => {
        console.log("<AppData> - handleTableLabel()")

        let jsonIndex = e.currentTarget.dataset.index

        let userDataJson = this.state.appDataListJson
        let jsonReq = userDataJson[jsonIndex]

        console.log({jsonReq})

        jsonReq.label = e.target.innerText
        let idapp_data = userDataJson[jsonIndex].idapp_data
        let self = this

        console.log("--- FETCH - handleTableData()")
        console.log("<AppData> - FETCH - handleTableLabel() - POST - /api/editappdata/:id")
        fetch(`/api/editappdata/${idapp_data}`, {
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
            console.log("<AppData> - THEN - handleTableLabel() - POST - /api/editjob/:id")
            console.log({data})
            self.renderResultsFromDb()

		})
		.catch((err) => {
            console.log(err)

		})

    }




    renderResultsFromDb = () => {
        console.log("<AppData> - renderResultsFromDb()")

        let self = this
        let user_id = localStorage.getItem('user_id')

        console.log("<AppData> - FETCH - renderResultsFromDb() - GET - /api/listappdata/:id")
        fetch(`/api/listappdata/${user_id}`)
        .then((results) => {
            return results.json()

        })
        .then((data) => {
            console.log("<AppData> - THEN - renderResultsFromDb() - GET - /api/listappdata/:id")
            console.log({data})
            
            self.setState({appDataListJson: data.rows})

            let appDataList = []

            appDataList = data.rows.map((appData, idx) => {
                return (

                    <Table.Row width={16} key={idx}>

                        <Table.Cell width={1}><Icon name='tag' /></Table.Cell>
                        <Table.Cell key={'label' + shortid.generate()} width={2} data-index={idx} onBlur={this.handleTableLabel} style={{fontWeight: "900"}} contentEditable="true">{appData.label}</Table.Cell>
                        <Table.Cell width={1}><Icon name='cubes' /></Table.Cell>
                        <Table.Cell key={'data' + shortid.generate()} width={7} id={`copy${idx}`} data-index={idx} onBlur={this.handleTableData} contentEditable="true">{appData.data}</Table.Cell>
                        <Table.Cell width={5} textAlign="right">
                            <Popup key={'popup' + shortid.generate()} id={'popup' + idx} wide trigger={<Icon name='trash' size='large' style={{margin: "0px"}} />} on='click' hideOnScroll hideOnClick>
                                <Button value={idx} onClick={this.handleDelete} color='red'>Remove</Button>
                            </Popup>
                            <Button color='black' value={idx} onClick={this.handleCopy} className="ml-2">Copy</Button>
                        </Table.Cell>
                    </Table.Row>

                )
            })

            self.setState({userData: appDataList})

        })
        .catch((err) => {
            console.log(err)

        })

    }

    handleDelete = (e) => {
        console.log("<AppData> - handleDelete()")

        let jobIndex = e.target.value
        console.log({jobIndex})

        let userDataJson = this.state.appDataListJson
        console.log({userDataJson})

        let idapp_data = userDataJson[jobIndex].idapp_data
        console.log({idapp_data})

        // document.querySelector(`#popup${jobIndex}`).style = "height: 0px; width: 0px; visibility: hidden;"
        let self = this

        console.log("<AppData> - FETCH - handleDelete() - POST - /api/removeappdata/:id")
        fetch(`/api/removeappdata/${idapp_data}`, {
            method: 'POST'

		})
		.then((results) => {
            return results.json()

		})
		.then((data) => {
            console.log("<AppData> - THEN - handleDelete() - POST - /api/removeappdata/:id")
            console.log({data})
            self.setState({appDataListJson: data})
            self.renderResultsFromDb()

		})
		.catch((err) => {
            console.log(err)

		})

    }


    handleCopy = (e) => {
        console.log("<AppData> - handleCopy()")

        let dataIndex = e.target.value
        console.log({dataIndex})


        let dataElement = document.querySelector(`#copy${dataIndex}`)
        let clipboardStaging = document.querySelector("#clipboardTextArea")

        clipboardStaging.value = dataElement.innerText
        clipboardStaging.select()

        console.log({dataElement})

        document.execCommand('copy')

    }




    componentDidMount() {
        console.log("<Appdata> - componentDidMount()")
        this.renderResultsFromDb()

    }


    render() {

        return (

            <div>

                <Button color='black' onClick={this.handleAdd}><Icon name='plus' />Add Row</Button>
                <Table width={16} striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}><Icon name='tag' /></Table.HeaderCell>
                            <Table.HeaderCell width={2}>Label</Table.HeaderCell>
                            <Table.HeaderCell width={1}><Icon name='cubes' /></Table.HeaderCell>
                            <Table.HeaderCell width={7}>Data</Table.HeaderCell>
                            <Table.HeaderCell width={5}><Form>Copied to clipboard: <Input id="clipboardTextArea"></Input></Form></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>


                    <Table.Body>

                        {this.state.userData}

                    </Table.Body>

                </Table>


            </div>


        )

    }

}


function mapStateToProps(appState) {
    const {isAuthenticated, errorMessage, isFetching} = appState.auth

    console.log("<AppData> - mapStateToProps()")
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


export default withRouter(connect(mapStateToProps)(AppData))
