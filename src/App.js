import React, { useState } from 'react';
import Header from './components/header'
import './App.css';
import Landing from './containers/landing'
import { HashRouter, Route, Link, Switch} from 'react-router-dom';
import Play from './containers/play'
import LobbyPage from './containers/LobbyPage';


function App() {
  const [isBusy, setBusy] = useState(true)
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
                            <LobbyPage {...props} loggedIn={loggedIn} />
                            )}
                            />
                {/* <Route exact path="/room/:id" component={RoomPage} />
                <Route exact path="/game/:id" component={GamePage} />
                <Route component={NotFoundPage} /> */}
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
