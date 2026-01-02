import { Dialog } from "@tritonse/tse-constellation";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTask } from "src/api/tasks";
import { Page, TaskForm, TaskList } from "src/components";

import styles from "./TaskDetail.module.css";

import type { Task } from "src/api/tasks";

export function TaskDetail() {
  const [task, setTask] = useState<Task | null>();
  const [errorModalMessage, setErrorModalMessage] = useState<string | null>(null);

  const params = useParams();
  const taskID = params.id;

  useEffect(() => {
    if (!taskID) return;

    getTask(taskID)
      .then((result) => {
        if (result.success) {
          setTask(result.data);
        } else {
          setTask(null);
        }
      })
      .catch(setErrorModalMessage);
  }, [taskID]);

  return (
    <Page>
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          Back to home
        </Link>

        {task === undefined && errorModalMessage === null && <p>Loading...</p>}

        {task === null && <h2 className={styles.notFound}>This task doesn't exist!</h2>}

        {task && (
          <>
            <div className={styles.headerRow}>
              <h2 className={styles.title}>{task.title}</h2>
              <button className={styles.editButton}>Edit task</button>
            </div>

            <p className={styles.section}>
              {task.description && task.description.trim() !== ""
                ? task.description
                : "(No description)"}
            </p>

            <p className={styles.section}>
              <span className={styles.label}>Assignee</span>
              {task.assignee ? task.assignee.name : "Not assigned"}
            </p>

            <p className={styles.section}>
              <span className={styles.label}>Status</span>
              {task.isChecked ? "Done" : "Not done"}
            </p>

            <p className={styles.section}>
              <span className={styles.label}>Date created</span>
              {task.dateCreated.toLocaleString()}
            </p>
          </>
        )}
      </div>
    </Page>
  );
}
