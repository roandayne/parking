import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Navigation from './components/Navigation'

function App() {
  return (
    <Router>
      <Navigation />

      <Switch>
        <Route path='/' component={Dashboard} />
      </Switch>
    </Router>
  )
}

export default App
