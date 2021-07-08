import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { Task } from "../types";

interface Props {
  open: boolean;
  task: Task;
  handleClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  saveChange: (task: Task) => void;
}

export default function TaskDetail({
  open,
  task,
  handleClose,
  saveChange,
}: Props) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [timeFrame, setTimeFrame] = useState(task.timeFrame);

  const handleChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    let value = e.target.value;

    if (e.target.name === "title") setTitle(value);
    else if (e.target.name === "description") setDescription(value);
    else if (e.target.name === "time-frame") setTimeFrame(value);
  };

  const handleClick = () => {
    saveChange({
      id: task.id,
      user: task.user,
      title,
      description,
      timeFrame,
      importance: 1,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <div>
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
                color="primary"
                onClick={handleClick}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
    </Dialog>
  );
}
