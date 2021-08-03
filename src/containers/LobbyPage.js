import { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";

import ElapsedTime from "../components/elapsedTime"
import ChatContainer from "./ChatContainer"
import { BASE_URL, LOBBY_ID} from '../App'


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

function LobbyPage(props) {
  
  const classes = useStyles();
  const [waiting, setWaiting] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [games, setGames] = useState([])
  const { loggedIn, cable } = props
  const history = useHistory()


  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const createRoom = () => {
        let config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${sessionStorage.jwt}`
            },
        }

        fetch(BASE_URL+"rooms", config)
        .then(res => res.json())
        .then(res => {
        props.history.push(`/room/${res.id}`)
        })
  }

  useEffect(() => {
    let config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${sessionStorage.jwt}`
        },
    }

    fetch(BASE_URL+"rooms", config)
    .then(res => res.json())
    .then(res => {
    setGames(res)
    })
  },[])

  return (
    <Container>
      <Grid container spacing={2} className={classes.mainGrid}>
        <Box clone order={{ xs: 3, md: 1 }} className={classes.chatColumn}>
          <Grid item xs={12} sm={12} md={3}>
            <Paper className={classes.chatColumnPaper}>
              <ChatContainer setGames={setGames} cable={cable} loggedIn={loggedIn} title={"Lobby Chat"} roomId={LOBBY_ID}/>
            </Paper>
          </Grid>
        </Box>
        <Box clone order={{ xs: 1, md: 2 }}>
          <Grid item xs={12} sm={8} md={6}>
            <Tabs
              className={classes.lobbyTabs}
              indicatorColor="secondary"
              textColor="secondary"
              variant="fullWidth"
              value={tabValue}
              onChange={handleTabChange}
            >
              <Tab label="Lobby" />
              <Tab label="Your games" />
            </Tabs>
            <TableContainer component={Paper} className={classes.gamesTable}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Host</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {games.map( (game) => {
                        return (
                            <TableRow key={game.id} 
                                    onClick={() => {
                                        history.push(`/room/${game.id}`);
                              }}>
                                <TableCell>
                                    {game.name}
                                </TableCell>
                                <TableCell>
                                    <ElapsedTime value={game.created_at} />
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Box>
        <Box clone order={{ xs: 2, md: 3 }} className={classes.buttonColumn}>
          <Grid item xs={12} sm={4} md={3}>
            <div className={classes.actionButtons}>
              <Tooltip
                arrow
                placement="top"
                title="Create a new game, which will appear in the lobby. You can also invite your friends to join by link!"
              >
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={createRoom}
                  disabled={waiting}
                >
                  Create a Room
                </Button>
              </Tooltip>
            </div>
          </Grid>
        </Box>
      </Grid>
      <Typography variant="body1" align="center" style={{ padding: "16px 0" }}>
        Links
      </Typography>
    </Container>
  );
}

export default LobbyPage;
