import React, { useState } from 'react';

import { HashRouter, Route, Switch} from 'react-router-dom';
import Cable from 'actioncable';

import RoomPage from './containers/RoomPage'
import LobbyPage from './containers/LobbyPage';
import Header from './components/header'
import './App.css';
import Landing from './containers/landing'

// export const LOBBY_ID = 267
// export const BASE_URL = "http://localhost:3000/";
export const LOBBY_ID = 1
export const BASE_URL = "https://damp-eyrie-01599.herokuapp.com/";




function App() {
  // const [cable] = useState(Cable.createConsumer('ws://localhost:3000/cable'))
  const [cable] = useState(Cable.createConsumer('wss://damp-eyrie-01599.herokuapp.com/cable'))
  
  // const [isBusy, setBusy] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false);
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
