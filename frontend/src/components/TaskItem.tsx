import { Dialog } from "@tritonse/tse-constellation";
import React, { useState } from "react"; // update this line
import { type Task, updateTask } from "src/api/tasks";
import { CheckButton } from "src/components";
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

    const updatedTask = { ...task, isChecked: !task.isChecked };

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
        {
          <CheckButton
            checked={task.isChecked}
            onPress={handleToggleCheck}
            disabled={isLoading}
          ></CheckButton>
        }
        <div className={containerClass}>
          <span className={styles.title}>{task.title}</span>
          {task.description && <span className={styles.description}>{task.description}</span>}
        </div>
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
