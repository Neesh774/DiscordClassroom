import * as React from 'react';

import './App.css';

import LandingPage from './pages/LandingPage.js'
import Dashboard from './pages/Dashboard.js'

import { Switch, Route } from 'react-router-dom'
import { ChakraProvider } from "@chakra-ui/react"

function App() {
  return (
    <ChakraProvider>
      <Switch>
        <Route path="/" exact={true} component={LandingPage}>
        </Route>
        <Route path="/dashboard" exact={true} component={Dashboard}>
        </Route>
      </Switch>
    </ChakraProvider>

  );
}

export default App;
