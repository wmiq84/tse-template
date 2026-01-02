import { Dialog } from "@tritonse/tse-constellation";
import React, { useState } from "react"; // update this line
import { Link } from "react-router-dom";
import { type Task, updateTask } from "src/api/tasks";
import { CheckButton, UserTag } from "src/components";
import styles from "src/components/TaskItem.module.css";

export type TaskItemProps = {
  task: Task;
};

export function TaskItem({ task: initialTask }: TaskItemProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorModalMessage, setErrorModalMessage] = useState<string | null>(null);

  const handleToggleCheck = () => {
    setLoading(true);

    const updatedTask = {
      ...task,
      isChecked: !task.isChecked,
      assignee: task.assignee?._id,
    };

    updateTask(updatedTask)
      .then((result) => {
        if (result.success) {
          setTask(result.data);
        } else {
          setErrorModalMessage(result.error);
        }
        setLoading(false);
      })
      .catch(setErrorModalMessage)
      .finally(() => {
        setLoading(false);
      });
  };

  let containerClass = styles.textContainer;
  if (task.isChecked) {
    containerClass = `${containerClass} ${styles.checked}`;
  }
  return (
    <div>
      <div className={styles.item}>
        <CheckButton checked={task.isChecked} onPress={handleToggleCheck} disabled={isLoading} />

        <div className={containerClass}>
          <Link to={`/task/${task._id}`} className={styles.title}>
            {task.title}
          </Link>

          {task.description && <span className={styles.description}>{task.description}</span>}
        </div>

        <UserTag user={task.assignee} className={styles.userTag} />
      </div>

      <Dialog
        styleVersion="styled"
        variant="error"
        title="An error occurred"
        content={<p className={styles.errorModalText}>{errorModalMessage}</p>}
        isOpen={errorModalMessage !== null}
        onClose={() => setErrorModalMessage(null)}
      />
    </div>
  );
}
