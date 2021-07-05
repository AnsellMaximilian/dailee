import React, { useState } from "react";
import { auth } from "../firebase/config";

import TaskForm from "../components/TaskForm";
import { Message, Task } from "../types";
import TaskList from "../components/TaskList";
import { Box, Fab, Grid, makeStyles, Typography } from "@material-ui/core";
import { ListAlt } from "@material-ui/icons";
import TaskReserve from "../components/TaskReserve";

import heroImg from "../images/hero.svg";
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

  mainContainer: {
    minHeight: "100vh",
    backgroundColor: theme.palette.grey[200],
  },

  heroImg: {
    maxWidth: "100%",
    width: 400,
  },

  cta: {
    display: "inline-block",
    padding: theme.spacing(1, 5),
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    fontSize: "1.25rem",
    fontWeight: "bold",
    "&:hover": {
      textDecoration: "none",
      filter: "brightness(0.9)",
    },
  },

  hero: {
    padding: theme.spacing(5),
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  hero__title: {
    marginBottom: theme.spacing(3),
    "& span": {
      fontWeight: "bold",
      color: theme.palette.primary.main,
    },
  },

  heroLeft: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3),
    },
  },

  heroRight: {
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    "&> div > h2": {
      fontSize: "3rem",
    },
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
}));

export default function Home({ tasks, reserveTasks, setMessage }: Props) {
  const classes = useStyles();

  const [isTaskReserveOpen, setIsTaskReserveOpen] = useState(false);

  return (
    <div>
      {auth.currentUser ? (
        <div className={classes.mainContainer}>
          <Grid container justify="center">
            <Grid item xs={12} md={5}>
              <TaskForm user={auth.currentUser} />
            </Grid>
            <Grid item xs={12} md={7}>
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
        <Box m={2} className={classes.hero}>
          <Box className={classes.heroLeft}>
            <img src={heroImg} alt="hero" className={classes.heroImg} />
          </Box>
          <Box className={classes.heroRight}>
            <div>
              <Typography variant="h2" className={classes.hero__title}>
                Start managing your <span>tasks</span>.
              </Typography>
              <NavLink
                to={process.env.PUBLIC_URL + "/signup"}
                className={classes.cta}
              >
                Sign Up
              </NavLink>
            </div>
          </Box>
        </Box>
      )}
    </div>
  );
}
