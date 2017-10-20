import React, { Component } from 'react'
import { loginUser, logoutUser } from '../lib/auth'
import { connect } from 'react-redux'
import '../styles/App.css'
import { withRouter } from 'react-router'
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
    e.preventDefault()
    this.props.dispatch(loginUser({username: this.state.username, password:this.state.password}))

  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value

    })

  }


  componentDidUpdate() {
    console.log("login did update")

    let self = this

    console.log("isAuth:")
    console.log(this.props.isAuthenticated)
    if(this.props.isAuthenticated) {
      self.props.history.push('/')

    }

  }


  render() {

    return (

      <div>
        <Grid className="m-3" columns='equal'>
          <Grid.Row>
            <Grid.Column />
            <Grid.Column width={8}>


              <Card className="p-3" fluid>
                <Card.Content>
                  <Form onSubmit={this.handleSubmit}>

                    <Form.Input onChange={this.handleChange} type="text" placeholder="username" name="username" value={this.state.username} width={16}/>

                    <Form.Input onChange={this.handleChange} type="password" placeholder="password" name="password" value={this.state.password} />

                    <Popup
                      trigger={<Button type="submit" secondary>Login</Button>} content='You have been logged in!'
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

  console.log("passed to login:")
  console.log({isAuthenticated})

  return {
    isAuthenticated,
    isFetching,
    errorMessage
  }

}


export default withRouter(connect(mapStateToProps)(Login))