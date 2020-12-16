import './App.css'

import NavBar from "./components/layout/NavBar";
import Dashboard from './components/layout/Dashboard'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import Pokemon from './components/Pokemon/Pokemon'
import SearchBar from './components/Search/SearchBar'
import PokeList from './components/Testing/PokeList';


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
              {/* <Route exact path="/" component={PokeList} /> */}
            </Switch>
          </div>
        </>
      </div>
    </Router>
  );
}

export default App;
