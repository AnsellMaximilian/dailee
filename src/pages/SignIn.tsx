import React, { useState } from "react";
import { auth } from "../firebase/config";
import {
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Message } from "../types";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "3rem",
  },

  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
  },

  button: {
    marginTop: theme.spacing(2),
  },
}));

interface Props {
  setMessage: React.Dispatch<React.SetStateAction<Message | null>>;
}

export default function SignIn({ setMessage }: Props) {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() =>
        setMessage({
          type: "success",
          content: `Successfully signed in as ${email}`,
        })
      )
      .catch((err: { message: string }) =>
        setMessage({ type: "error", content: err.message })
      );
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.name === "email") setEmail(e.target.value);
    else if (e.target.name === "password") setPassword(e.target.value);
  };

  return (
    <Container maxWidth="xs" className={classes.container}>
      <Typography className={classes.heading}>Sign In</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          type="email"
          margin="normal"
          variant="outlined"
          label="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          type="password"
          margin="normal"
          variant="outlined"
          label="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <Button
          className={classes.button}
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
        >
          Sign In
        </Button>
      </form>
    </Container>
  );
}
