import {
  Box,
  Collapse,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Edit as EditIcon } from "@material-ui/icons";
import React, { useState } from "react";
import { firestore } from "../firebase/config";
import { Task } from "../types";
import CheckBox from "./CheckBox";
import ImportanceBar from "./ImportanceBar";

interface Props {
  isOpen: boolean;
  task: Task;
  setOpenTask: React.Dispatch<React.SetStateAction<string>>;
  setOpenTaskDetail: React.Dispatch<React.SetStateAction<string>>;
}

const useStyles = makeStyles((theme) => ({
  taskItem: {
    transition: "transform 0.5s",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  deleted: {
    transform: "translateX(200%)",
    position: "relative",
  },

  detail: {
    whiteSpace: "pre-line",
    textAlign: "left",
    padding: theme.spacing(0, 4),
    borderRadius: theme.shape.borderRadius,
    border: `1.5px solid ${theme.palette.divider}`,
  },

  timeFrame: {
    color: theme.palette.grey[500],
    fontSize: "0.85rem",
  },
}));

export default function TaskItem({
  task,
  isOpen,
  setOpenTask,
  setOpenTaskDetail,
}: Props) {
  const classes = useStyles();

  const [checked, setChecked] = useState(false);

  const completeTask: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setChecked(true);
    new Promise<void>((resolve, reject) => {
      setTimeout(() => resolve(), 500);
    }).then(() => {
      firestore.collection("tasks").doc(task.id).delete();
    });
  };

  const toggleDetails = () => {
    // if details already open; close
    if (isOpen) setOpenTask("");
    else setOpenTask(task.id);
  };

  const primaryText = (
    <span>
      {task.title}
      {!!(task.timeFrame && task.timeFrame !== "00:00") && (
        <span className={classes.timeFrame}> - {task.timeFrame}</span>
      )}
    </span>
  );

  return (
    <>
      <ListItem
        button
        className={`${classes.taskItem} ${checked && classes.deleted}`}
        onClick={toggleDetails}
      >
        <ListItemIcon>
          <CheckBox checked={checked} completeTask={completeTask} />
        </ListItemIcon>
        <ListItemText primary={primaryText} />
        <ListItemSecondaryAction>
          <IconButton onClick={() => setOpenTaskDetail(task.id)}>
            <EditIcon color="primary" />
          </IconButton>
          <ImportanceBar importance={1} />
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={isOpen}>
        <Box className={task.description && classes.detail}>
          <Typography>{task.description}</Typography>
        </Box>
      </Collapse>
    </>
  );
}
