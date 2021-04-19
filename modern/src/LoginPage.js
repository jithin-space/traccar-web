import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { sessionActions } from "./store";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core";
import RegisterDialog from "./RegisterDialog";
import { useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";

import t from "./common/localization";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        RevitsOne
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(/login.gif)",
    backgroundRepeat: "no-repeat",
    backgroundColor: 'white',
      // theme.palette.type === "dark"
      //   ? theme.palette.grey[0]
      //   : theme.palette.grey[900],
    // backgroundSize: 'contain',
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(6, 6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const dispatch = useDispatch();

  const [failed, setFailed] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const registrationEnabled = useSelector((state) =>
    state.session.server ? state.session.server["registration"] : false
  );
  const [registerDialogShown, setRegisterDialogShown] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const classes = useStyles();
  const history = useHistory();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const submitDisabled = () => {
    return !name || !/(.+)@(.+)\.(.{2,})/.test(email) || !password;
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegisterShift = () => {
    setRegisterDialogShown(true);
  };

  const handleRegisterResult = () => {
    setRegisterDialogShown(false);
    setSnackbarOpen(false);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/session", {
      method: "POST",
      body: new URLSearchParams(`email=${email}&password=${password}`),
    });
    if (response.ok) {
      const user = await response.json();
      dispatch(sessionActions.updateUser(user));
      history.push("/");
    } else {
      setFailed(true);
      setPassword("");
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      setSnackbarOpen(true);
    } else {
      setFailed(true);
      setPassword("");
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img
            className={classes.logo}
            src="/revitsone_logo.png"
            alt="RevitsOne"
          />
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {registerDialogShown ? "Sign Up" : "Sign In"}
          </Typography>
          {!registerDialogShown && (
            <form onSubmit={handleLogin}>
              <TextField
                margin="normal"
                variant="outlined"
                required
                fullWidth
                error={failed}
                label={t("userEmail")}
                name="email"
                value={email}
                autoComplete="email"
                autoFocus
                onChange={handleEmailChange}
                helperText={failed && "Invalid username or password"}
              />

              <TextField
                margin="normal"
                variant="outlined"
                required
                fullWidth
                error={failed}
                label={t("userPassword")}
                name="password"
                value={password}
                type="password"
                autoComplete="current-password"
                onChange={handlePasswordChange}
              />

              <FormControl fullWidth margin="normal">
                <div className={classes.buttons}>
                  {/* <Button type='button' variant='contained' onClick={handleRegister} disabled={!registrationEnabled}>
                {t('loginRegister')}
              </Button> */}
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    className={classes.submit}
                    color="primary"
                    disabled={!email || !password}
                  >
                    {t("loginLogin")}
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Button
                        type="link"
                        onClick={handleRegisterShift}
                        disabled={!registrationEnabled}
                      >
                        {"Don't have an account?"}
                        {t("loginRegister")}
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </FormControl>
            </form>
          )}

          {snackbarOpen && (
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              open={snackbarOpen}
              autoHideDuration={1000}
              onClose={handleRegisterResult}
              message={t("loginCreated")}
            />
          )}
          {registerDialogShown && (
            //   <RegisterDialog showDialog={true} onResult={handleRegisterResult} />
            <form onSubmit={handleRegister}>
              <TextField
                margin="normal"
                required
                variant="outlined"
                fullWidth
                label={t("sharedName")}
                name="name"
                value={name || ""}
                autoComplete="name"
                autoFocus
                onChange={(event) => setName(event.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                variant="outlined"
                type="email"
                label={t("userEmail")}
                name="email"
                value={email || ""}
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
                helperText={failed && "Invalid or Duplicate Email"}
              />
              <TextField
                margin="normal"
                variant="outlined"
                required
                fullWidth
                label={t("userPassword")}
                name="password"
                value={password || ""}
                type="password"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />

              <FormControl fullWidth margin="normal">
                <div className={classes.buttons}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    className={classes.submit}
                    color="primary"
                    disabled={submitDisabled()}
                  >
                    {t("loginRegister")}
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Button
                        type="link"
                        onClick={handleRegisterResult}
                        disabled={!registrationEnabled}
                      >
                        {"Already have an account?"}
                        {t("loginLogin")}
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </FormControl>
            </form>
          )}
          <Box position={'fixed'} bottom={0} mb={1}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}
