import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Delete, Publish } from "@material-ui/icons";
import React, { useState } from "react";
import { firestore } from "../firebase/config";
import { Task, Message } from "../types";
import firebase from "firebase";

interface Props {
  reserveTask: Task;
  user: firebase.User;
  setOpenTaskDetail: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<Message | null>>;
}

const useStyles = makeStyles((theme) => ({
  reserveTaskItem: {
    transition: "all 0.5s",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  deleted: {
    transform: "translateX(-200%)",
    position: "relative",
  },
}));

export default function TaskReserveItem({
  reserveTask,
  user,
  setOpenTaskDetail,
  setMessage,
}: Props) {
  const classes = useStyles();

  const [deleted, setDeleted] = useState(false);

  const deleteReserveTask: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setDeleted(true);

    setTimeout(() => {
      firestore.collection("reserveTasks").doc(reserveTask.id).delete();
    }, 500);
  };

  const transferReserveTask: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.stopPropagation();
    firestore
      .collection("tasks")
      .add({
        title: reserveTask.title,
        description: reserveTask.description,
        timeFrame: reserveTask.timeFrame,
        importance: reserveTask.importance,
        user: user.uid,
      })
      .then(() => {
        setMessage({
          type: "success",
          content: `Reserve Task "${reserveTask.title}" Transferred to Tasks`,
        });
      });
  };

  return (
    <ListItem
      button
      className={`${classes.reserveTaskItem} ${deleted && classes.deleted}`}
      onClick={() => setOpenTaskDetail(reserveTask.id)}
    >
      <ListItemIcon>
        <IconButton color="primary" onClick={transferReserveTask}>
          <Publish />
        </IconButton>
      </ListItemIcon>
      <ListItemText>{reserveTask.title}</ListItemText>
      <ListItemSecondaryAction>
        <IconButton style={{ color: "red" }} onClick={deleteReserveTask}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
