import { Box, List, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { firestore } from "../firebase/config";
import { Task } from "../types";
import TaskDetail from "./TaskDetail";
import TaskItem from "./TaskItem";

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(1),
    textTransform: "uppercase",
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.shape.borderRadius,
  },

  container: {
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[3],
  },
}));

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const classes = useStyles();
  // which task is expanded -- details are revealed
  const [openTask, setOpenTask] = useState("");
  const [openTaskDetail, setOpenTaskDetail] = useState("");

  const handleTaskDetailClose = () => setOpenTaskDetail("");

  const saveChange = (task: Task) => {
    firestore.collection("tasks").doc(task.id).update(task);
    setOpenTaskDetail("");
  };

  const taskItems = tasks.map((task) => (
    <TaskItem
      task={task}
      key={task.id}
      isOpen={openTask === task.id}
      setOpenTask={setOpenTask}
      setOpenTaskDetail={setOpenTaskDetail}
    />
  ));

  return (
    <Box m={3} className={classes.container}>
      <Typography className={classes.header}>Your Tasks</Typography>
      <List style={{ overflowX: "hidden" }}>{taskItems}</List>
      {!!openTaskDetail && (
        <TaskDetail
          task={tasks.filter((task) => task.id === openTaskDetail)[0]}
          open={!!openTaskDetail}
          handleClose={handleTaskDetailClose}
          saveChange={saveChange}
        />
      )}
    </Box>
  );
}
