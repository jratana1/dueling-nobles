import React, { useState } from 'react';
import Header from './components/header'
import './App.css';
import Landing from './containers/landing'
import { HashRouter, Route, Link } from 'react-router-dom';
import Play from './containers/play'


function App() {
  const [isBusy, setBusy] = useState(true)

  const renderLoad = () => {
    // if (isBusy) {
    //   setBusy(false)
    //   return <div>Loading</div>;
    // } else {
      return (
        <>
          <div >
            <ul className="Navbar">
              <li className="Nav-Item"><Link to="/">About</Link></li> 
              <li className="Nav-Item"><Link to="/play">Chat-N-Draw</Link></li>
              <Header/>
            </ul>
          </div>
          <Route exact path="/" >
            <Landing />
          </Route>
          <Route exact path="/play" >
            <Play />
          </Route>
        </>
      )
    // }
  }

    return (
    <HashRouter basename='/'>
      <div className="App">
            {renderLoad()}      
      </div>
    </HashRouter>
    );
}


export default App;
