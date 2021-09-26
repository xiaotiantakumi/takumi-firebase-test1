import React, { useState } from "react";
import styles from "./TaskItem.module.css";
import { ListItem, TextField, Grid } from "@mui/material/";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { db } from "./firebase";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

interface PROPS {
  id: string;
  title: string;
}
const TaskItem: React.FC<PROPS> = (props) => {
  const [title, setTitle] = useState(props.title);
  const editTask = () => {
    setDoc(doc(db, "tasks", props.id), { title: title });
  };
  const deleteTask = () => {
    deleteDoc(doc(db, "tasks", props.id));
  };
  return (
    <ListItem>
      <h2>{props.title}</h2>
      <Grid container justifyContent="flex-end">
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="Edit task"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        ></TextField>
      </Grid>
      <button className={styles.taskitem__icon} onClick={editTask}>
        <EditOutlinedIcon></EditOutlinedIcon>
      </button>
      <button className={styles.taskitem__icon} onClick={deleteTask}>
        <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
      </button>
    </ListItem>
  );
};
export default TaskItem;
