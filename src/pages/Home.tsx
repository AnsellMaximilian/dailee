import React, { useState } from "react";
import { auth } from "../firebase/config";

import TaskForm from "../components/TaskForm";
import { Message, Task } from "../types";
import TaskList from "../components/TaskList";
import { Box, Button, Fab, Grid, makeStyles } from "@material-ui/core";
import { ListAlt } from "@material-ui/icons";
import TaskReserve from "../components/TaskReserve";

import logoWithText from "../images/logo-with-text.png";
import { NavLink } from "react-router-dom";

interface Props {
  tasks: Task[];
  reserveTasks: Task[];
  setMessage: React.Dispatch<React.SetStateAction<Message | null>>;
}

const useStyles = makeStyles((theme) => ({
  taskReserveButton: {
    position: "fixed",
    bottom: 15,
    right: 15,
  },

  logoWithText: {
    maxWidth: "100%",
    width: 300,
  },

  link: {
    fontWeight: "bold",
    "&:hover": {
      textDecoration: "none",
    },
  },
}));

export default function Home({ tasks, reserveTasks, setMessage }: Props) {
  const classes = useStyles();

  const [isTaskReserveOpen, setIsTaskReserveOpen] = useState(false);

  return (
    <div>
      {auth.currentUser ? (
        <div>
          <Grid container justify="center">
            <Grid item md={5}>
              <TaskForm user={auth.currentUser} />
            </Grid>
            <Grid item md={7}>
              <TaskList tasks={tasks} />
            </Grid>
          </Grid>

          <TaskReserve
            reserveTasks={reserveTasks}
            open={isTaskReserveOpen}
            user={auth.currentUser}
            setMessage={setMessage}
            setIsTaskReserveOpen={setIsTaskReserveOpen}
          />
          <Fab
            color="primary"
            aria-label="add"
            title="Task Reserve"
            className={classes.taskReserveButton}
            onClick={() => setIsTaskReserveOpen((state) => !state)}
          >
            <ListAlt />
          </Fab>
        </div>
      ) : (
        <Box m={2}>
          <img
            src={logoWithText}
            alt="logo with text"
            className={classes.logoWithText}
          />
          <h2>
            <Button variant="contained" color="primary">
              <NavLink
                to={process.env.PUBLIC_URL + "/signup"}
                className={classes.link}
              >
                Sign Up
              </NavLink>
            </Button>{" "}
            or{" "}
            <Button variant="contained" color="primary">
              <NavLink
                to={process.env.PUBLIC_URL + "/signin"}
                className={classes.link}
              >
                Sign In
              </NavLink>
            </Button>
          </h2>
        </Box>
      )}
    </div>
  );
}
