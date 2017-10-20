import React, { Component } from 'react'

// router
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { AuthRoute as Route } from '../lib/auth'

// connecting react and redux
import { Provider } from 'react-redux'
import store from '../store'

// layout
import Layout from './Layout'

// page components
import MainPage from './MainPage'
import Login from './Login'
import Register from './Register'

// base styles and icons
import 'normalize.css/normalize.css'
import 'font-awesome/css/font-awesome.min.css'

// custom styles
import '../styles/App.css'
import '../styles/bootstrap-utilities.css'


class App extends Component {

  render() {
    console.log("<App> - render()")
    console.log("")

    return (

      <Provider store={store}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              {/* <Route exact path="/searchform" component={SearchForm} /> */}
            </Switch>
          </Layout>
        </Router>
      </Provider>

    )
    
  }

}

export default App
