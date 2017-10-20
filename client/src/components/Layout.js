import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { logoutUser } from '../lib/auth'
import { Menu, Icon, Grid } from 'semantic-ui-react'


class Layout extends Component {

  handleClick = (e) => {
    this.props.dispatch(logoutUser())

  }


  render() {
    console.log("<Layout> - render()")
    console.log("")

    return (

      <div className="main-layout">


        <Grid container>

          <Grid.Column>
              <Menu fluid={true} color='blue' size="massive" style={{borderTopRightRadius: "0px", borderTopLeftRadius: "0px"}} inverted>
                    
                    <Menu.Item>
                      <Link to="/"><Icon name="options" />Work-Dash</Link>
                    </Menu.Item>
                    
                    <Menu.Menu position="right">
                      {!(this.props.isAuthenticated) && <Menu.Item><Link to="/register">Register</Link></Menu.Item>}
                      {!(this.props.isAuthenticated) && <Menu.Item><Link to="/login"><Icon name="sign in" />Login</Link></Menu.Item>}
                      {this.props.isAuthenticated && <Menu.Item><Icon name='user' />{localStorage.getItem('username')}</Menu.Item>}
                      {this.props.isAuthenticated && <Menu.Item><Link onClick={this.handleClick} to="/"><Icon name="sign out" />Logout</Link></Menu.Item>}
                    </Menu.Menu>
              
              </Menu>
              {this.props.children}
          </Grid.Column>

        </Grid>




        <div className="footer-content ui container">

          <Menu color='blue' fluid={true} borderless={true} style={{borderBottomRightRadius: "0px", borderBottomLeftRadius: "0px"}} inverted>
            
            <Menu.Item>
              Copyright 2017
            </Menu.Item>

          </Menu>

        </div>


      </div>

    )

  }

}


function mapStateToProps(appState) {
    const {isAuthenticated, errorMessage, isFetching} = appState.auth

    console.log("<Layout> - mapStateToProps()")
    console.log({appState})
    console.log("")
  
    return {
      isAuthenticated,
      isFetching,
      errorMessage
    }

}


export default withRouter(connect(mapStateToProps)(Layout))