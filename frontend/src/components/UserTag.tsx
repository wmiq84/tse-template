import styles from "./UserTag.module.css";

import type { User } from "src/api/users";

type UserTagProps = {
  user?: User | null;
  className?: string;
};

export function UserTag({ user, className }: UserTagProps) {
  if (!user) {
    return (
      <div className={styles.container}>
        <img src="/userDefault.svg" alt="Not assigned" className={styles.avatar} />
        <span className={styles.notAssigned}>Not assigned</span>
      </div>
    );
  }

  const profileSrc =
    user.profilePictureURL && user.profilePictureURL.trim() !== ""
      ? user.profilePictureURL
      : "/userDefault.svg";

  return (
    <div className={`${styles.container} ${className ?? ""}`}>
      <img src={profileSrc} alt={user.name} className={styles.avatar} />
      <span className={styles.name}>{user.name}</span>
    </div>
  );
}
