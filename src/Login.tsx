import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { auth } from "./firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { jaJP } from "@mui/material/locale";
import Link from "@mui/material/Link";
const theme = createTheme({}, jaJP);

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login: React.FC = (props: any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      props.history.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    //Firebase ver9 compliant (modular)
    const unSub = onAuthStateChanged(auth, (user) => {
      user && props.history.push("/");
    });
    return () => unSub();
  }, [props.history]);
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.login__root}>
        <h1>{isLogin ? "Login" : "Register"}</h1>
        <br />
        <FormControl>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            name="email"
            label="E-mail"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
        </FormControl>
        <br />
        <FormControl>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
        </FormControl>
        <br />
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={
            isLogin
              ? async () => {
                  try {
                    //Firebase ver9 compliant (modular)
                    await signInWithEmailAndPassword(auth, email, password);
                    props.history.push("/");
                  } catch (error: any) {
                    alert(error.message);
                  }
                }
              : async () => {
                  try {
                    //Firebase ver9 compliant (modular)
                    await createUserWithEmailAndPassword(auth, email, password);
                    props.history.push("/");
                  } catch (error: any) {
                    alert(error.message);
                  }
                }
          }
        >
          {isLogin ? "login" : "register"}
        </Button>
        <br />
        <Typography align="center">
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create new account ?" : "Back to login"}
          </span>
        </Typography>
      </div>
    </ThemeProvider>
  );
};

export default Login;
