import './App.css'

import NavBar from "./components/layout/NavBar";
import Dashboard from './components/layout/Dashboard'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import Pokemon from './components/Pokemon/Pokemon'


function App() {
  return (
    <Router>
      <div className="App">
        <>
          <NavBar />
          {/* <SearchBar /> */}
          <div className="container">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/pokemon/:pokemonID" component={Pokemon} />
            </Switch>
          </div>
        </>
      </div>
    </Router>
  );
}

export default App;
