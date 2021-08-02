import { useDispatch, useSelector } from 'react-redux'
import { joinGame, setPlayers, updateGame, updateStatus } from "../actions/gameActions";
import { useState, useEffect } from "react";
import { BASE_URL } from '../App'

import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";

import ChatContainer from "./ChatContainer"
import GameContainer from "./GameContainer";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    "--table-height": "400px", // responsive variable
    [theme.breakpoints.up("sm")]: {
      "--table-height": "480px",
    },
    [theme.breakpoints.up("md")]: {
      "--table-height": "calc(min(100vh - 140px, 720px))",
    },
  },
  gamesTable: {
    position: "relative",
    margin: "10px",
    height: "var(--table-height)",
    whiteSpace: "nowrap",
    "& td, & th": {
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 12,
      paddingRight: 12,
    },
    "& svg": {
      display: "block",
    },
    "& tbody > tr:hover": {
      background: theme.palette.action.hover,
      cursor: "pointer",
    },
  },
  lobbyTabs: {
    minHeight: 32,
    "& .MuiTab-root": {
      minHeight: 32,
      textTransform: "none",
      fontWeight: 400,
    },
  },
  gameCounters: {
    "& > p": {
      marginBottom: "0.2em",
    },
    [theme.breakpoints.up("sm")]: {
      position: "absolute",
      bottom: 4,
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: 4,
      display: "flex",
      justifyContent: "space-between",
    },
  },
  actionButtons: {
    [theme.breakpoints.up("sm")]: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      "& button": {
        margin: "12px 0",
      },
    },
    [theme.breakpoints.down("xs")]: {
      "& button": {
        marginBottom: theme.spacing(1),

      },
    },
  },
  chatColumn: {
    maxHeight: "calc(var(--table-height) + 16px)",
    [theme.breakpoints.up("md")]: {
      marginTop: 36,
    },
  },
  chatColumnPaper: {
    padding: 8,
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  chatPanel: {
    display: "flex",
    flexDirection: "column",
  },
  buttonColumn: {
    position: "relative",
    maxHeight: "calc(var(--table-height) + 16px)",
    [theme.breakpoints.up("sm")]: {
      marginTop: 36,
    },
  },
}));

// Add separators to a large number, every 3 digits, while also displaying in
// a span that is styled with equal width numerals.
//   humanize(12345) -> "12,345"
function humanize(number) {
  return (
    <span style={{ fontVariantNumeric: "tabular-nums" }}>
      {number.toLocaleString()}
    </span>
  );
}

function RoomPage(props) {
  
  const classes = useStyles();
  const [waiting, setWaiting] = useState(false);
  const [joining, setJoining] = useState(false);

  const { loggedIn, cable } = props
  const { id } = useParams();
  const dispatch = useDispatch();
  const players = useSelector(state => state.game.players);
  const status = useSelector(state => state.game.game.status);


  useEffect(() => {
    let config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${sessionStorage.jwt}`
        },
    }

    fetch(BASE_URL+`rooms/${id}`, config)
    .then(res => res.json())
    .then(res => {
    dispatch(setPlayers(res.players))
    dispatch(updateGame(res.game))

    if (res.players.player1 && res.players.player2 || Object.values(res.players).includes(sessionStorage.userName)) {
        setWaiting(true)
    }
    })
  },[])

  const clickStartGame = () => {
    dispatch(updateStatus("started"))
  }

  const clickJoinGame = () => {
    setWaiting(true)
    setJoining(true)
    dispatch(joinGame({userName: sessionStorage.userName}))
}

  return (
    <Container>
      <Grid container spacing={2} className={classes.mainGrid}>
        <Box clone order={{ xs: 3, md: 1 }} className={classes.chatColumn}>
          <Grid item xs={12} sm={12} md={3}>
            <Paper className={classes.chatColumnPaper}>
              <ChatContainer    joining={joining} 
                                setJoining={setJoining} 
                                waiting={waiting}
                                setWaiting={setWaiting}
                                cable={cable} loggedIn={loggedIn} title={`Game Room #${id}`} roomId ={id}/>
            </Paper>
          </Grid>
        </Box>
        <Box clone order={{ xs: 1, md: 2 }}>
          <Grid item xs={12} sm={8} md={6}>
            <Paper className={classes.gamesTable}>
              <GameContainer cable={cable} roomId={id} status={status} ></GameContainer>
            </Paper>
            
          </Grid>
        </Box>
        <Box clone order={{ xs: 2, md: 3 }} className={classes.buttonColumn}>
          <Grid item xs={12} sm={4} md={3}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="subtitle1" align="center" style={{ padding: "8px 0" }}>
                        Player 1: {players.player1}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle1" align="center" style={{ padding: "8px 0" }}>
                        Player 2: {players.player2}
                    </Typography>
                </Grid>
            </Grid>
            <div className={classes.actionButtons}>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  disabled={status === "started"}
                  onClick={clickJoinGame}
                >
                  {waiting ? "Leave Game" : "Join Game"}
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  disabled={status === "started"}
                  onClick={clickStartGame}
                >
                  Start Game
                </Button>
            </div>
          </Grid>
        </Box>
      </Grid>
      <Typography variant="body1" align="center" style={{ padding: "16px 0" }}>
        You're in Room {id}
      </Typography>
    </Container>
  );
}

export default RoomPage;
