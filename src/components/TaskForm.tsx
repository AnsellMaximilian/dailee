import React, { useState } from "react";
import { firestore } from "../firebase/config";
import firebase from "firebase";
import importanceValues from "../utils/importance";
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  FormControl,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  InputLabel,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";

interface Props {
  user: firebase.User;
}

const useStyles = makeStyles((theme) => ({
  toggleButton: {
    backgroundColor: theme.palette.grey[50],
    borderRadius: 0,
  },
  container: {
    backgroundColor: theme.palette.background.default,
    paddingBottom: theme.spacing(1),
    boxShadow: theme.shadows[3],
    position: "sticky",
    top: 0,
  },

  header: {
    padding: theme.spacing(1),
    textTransform: "uppercase",
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.shape.borderRadius,
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
  const [importance, setImportance] = useState(1);
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
      importance,
    };

    firestore.collection(formMode).add(task).then().catch();

    setTitle("");
    setDescription("");
    setTimeFrame("");
  };

  return (
    <Box m={3} className={classes.container}>
      <Typography className={classes.header}>Create Tasks</Typography>
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
              {/* <TextField
                fullWidth
                variant="outlined"
                type="time"
                name="time-frame"
                onChange={handleChange}
                value={timeFrame}
              /> */}
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Importance</InputLabel>
                <Select
                  label="Importance"
                  fullWidth
                  value={importance}
                  onChange={(e) => {
                    setImportance(parseInt(e.target.value as string));
                  }}
                >
                  <MenuItem value={1} style={{ color: importanceValues[1] }}>
                    Trivial
                  </MenuItem>
                  <MenuItem value={2} style={{ color: importanceValues[2] }}>
                    Dismissable
                  </MenuItem>
                  <MenuItem value={3} style={{ color: importanceValues[3] }}>
                    Normal
                  </MenuItem>
                  <MenuItem value={4} style={{ color: importanceValues[4] }}>
                    Important
                  </MenuItem>
                  <MenuItem value={5} style={{ color: importanceValues[5] }}>
                    Urgent
                  </MenuItem>
                </Select>
              </FormControl>
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
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
}
