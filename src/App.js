import React, { useState } from 'react';

import { HashRouter, Route, Link, Switch} from 'react-router-dom';
import Cable from 'actioncable';

import RoomPage from './containers/RoomPage'
import LobbyPage from './containers/LobbyPage';
import Header from './components/header'
import './App.css';
import Landing from './containers/landing'

export const BASE_URL = "http://localhost:3000/";


function App() {
  const [isBusy, setBusy] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false);
  const [cable] = useState(Cable.createConsumer('ws://localhost:3000/cable'))
  //   const cable = Cable.createConsumer('wss://chat-n-draw.herokuapp.com/cable');

  

  const renderLoad = () => {
    // if (isBusy) {
    //   setBusy(false)
    //   return <div>Loading</div>;
    // } else {
      return (
        <>
          <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/lobby" render={(props) => (
                            <LobbyPage {...props} cable={cable} loggedIn={loggedIn} />
                            )}
                            />
                <Route exact path="/room/:id" render={(props) => (
                            <RoomPage {...props} cable={cable} loggedIn={loggedIn} />
                            )}
                            />
                {/* <Route component={NotFoundPage} /> */}
              </Switch>
        </>
      )
    // }
  }

    return (
    <HashRouter basename='/'>
            {renderLoad()}      
    </HashRouter>
    );
}


export default App;
