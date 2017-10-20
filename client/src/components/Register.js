import React, { Component } from 'react'
import { logoutUser } from '../lib/auth'
import { connect } from 'react-redux'
import '../styles/App.css'
import { Card, Grid, Button, Form, Popup } from 'semantic-ui-react'


class Login extends Component {

  state = {
    username:'',
    password:''
  }

  componentWillMount() {
    this.props.dispatch(logoutUser())

  }

  handleSubmit = (e) => {
    e.preventDefault('')
    // this.props.dispatch(loginUser({username: this.state.username, password:this.state.password}))
    let self = this
    fetch('/api/register', {
        method: 'POST',
        body: `username=${self.state.username}&password=${self.state.password}`,
        headers: { 'Content-Type':'application/x-www-form-urlencoded' }

    })
    .then(function(response) {
      return response.json()

    })
    .then((data) => {
      console.log(data)
      console.log("login did update")
      let self = this
      console.log("isAuth:")
      console.log(this.props.isAuthenticated)
      self.props.history.push('/login')

    })
    .catch(function(err) {
      console.log(err)

    })

  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value

    })

  }


  render() {
    console.log("login page")

    return (

      <div>
        <Grid className="m-3" columns='equal'>
          <Grid.Row>
            <Grid.Column />
            <Grid.Column width={8}>


              <Card className="p-3" fluid>
                <Card.Content>


                  <Form onSubmit={this.handleSubmit}>

                      <Form.Input onChange={this.handleChange} type="text" placeholder="username" name="username" value={this.state.username} />

                      <Form.Input onChange={this.handleChange} type="password" placeholder="password" name="password" value={this.state.password} />

                      <Popup
    										trigger={<Button type="submit" secondary>Register</Button>} content='You have been registered! Please log in.'
    										on='click'
    										hideOnScroll
    									/>
                  </Form>
                </Card.Content>
                </Card>


              </Grid.Column>
              <Grid.Column />
            </Grid.Row>
          </Grid>


      </div>

    )

  }

}


function mapStateToProps(appState) {
  const {isAuthenticated, errorMessage, isFetching} = appState.auth

  return {
    isAuthenticated,
    isFetching,
    errorMessage

  }

}


export default connect(mapStateToProps)(Login)