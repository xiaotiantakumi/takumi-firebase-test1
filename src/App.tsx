import { FormControl, TextField, List } from "@mui/material";
import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import TaskItem from "./TaskItem";
import styles from "./App.module.css";
import { auth } from "./firebase";
import ExsitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const App: React.FC = (props: any) => {
  const [tasks, setTasks] = useState([{ id: "", title: "" }]);
  const [input, setInput] = useState("");
  const newTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    addDoc(collection(db, "tasks"), {
      title: input,
    });
    setInput("");
  };
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      !user && props.history.push("login");
    });
    return () => unsub();
  });

  useEffect(() => {
    const c = collection(db, "tasks");
    const unsub = onSnapshot(c, (snapShot) => {
      setTasks(
        snapShot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
    });
    return () => unsub();
  }, []);
  return (
    <div className={styles.app__root}>
      <h1>Todo App by React/Firebase</h1>
      <br />
      <FormControl>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="New task ?"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
      </FormControl>
      <button className={styles.app__icon} disabled={!input} onClick={newTask}>
        <AddToPhotosIcon />
      </button>
      <List>
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title} />
        ))}
      </List>
    </div>
  );
};

export default App;
