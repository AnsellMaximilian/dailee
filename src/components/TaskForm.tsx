import React, { useState } from "react";
import { firestore } from "../firebase/config";
import firebase from "firebase";
import {
  Button,
  Container,
  FormControlLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
// import { ExpandMore } from '@material-ui/icons';

interface Props {
  user: firebase.User;
}

const useStyles = makeStyles((theme) => ({
  toggleButton: {
    backgroundColor: theme.palette.grey[50],
    borderRadius: 0,
  },

  formContainer: {
    margin: theme.spacing(2, "auto"),
  },

  formMode: {
    display: "flex",
    justifyContent: "start",
    flexDirection: "row",
  },
}));

export default function TaskForm({ user }: Props) {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
  const [formMode, setformMode] = useState<"tasks" | "reserveTasks">("tasks");

  const handleChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    let value = e.target.value;

    if (e.target.name === "title") setTitle(value);
    else if (e.target.name === "description") setDescription(value);
    else if (e.target.name === "time-frame") setTimeFrame(value);
  };

  const handleFormModeChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    let value: "tasks" | "reserveTasks" =
      e.target.value === "reserveTasks" ? "reserveTasks" : "tasks";
    setformMode(value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    let task = {
      user: user.uid,
      title,
      description,
      timeFrame,
    };

    firestore.collection(formMode).add(task).then().catch();

    setTitle("");
    setDescription("");
    setTimeFrame("");
  };

  return (
    <div>
      <Container maxWidth="xs" className={classes.formContainer}>
        <RadioGroup
          aria-label="formMode"
          name="form-mode"
          value={formMode}
          onChange={handleFormModeChange}
          className={classes.formMode}
        >
          <FormControlLabel value="tasks" control={<Radio />} label="Tasks" />
          <FormControlLabel
            value="reserveTasks"
            control={<Radio />}
            label="Reserve Tasks"
          />
        </RadioGroup>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                variant="outlined"
                type="text"
                name="title"
                label="Task Title"
                onChange={handleChange}
                value={title}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                fullWidth
                variant="outlined"
                type="time"
                name="time-frame"
                onChange={handleChange}
                value={timeFrame}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                multiline
                name="description"
                placeholder="Task Description"
                onChange={handleChange}
                value={description}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}
