"use client";

import styles from "./toast-notification.module.css";

export default function ToastNotification({
  text,
  onClose,
}: {
  text: string;
  onClose: () => void;
}) {
  return (
    <div className={styles.container} role="alert">
      <div className={styles.text}>{text}</div>
      <div className={styles.button_container}>
        <button type="button" onClick={onClose} className={styles.close_button} aria-label="Close">
          {"✖"}
        </button>
      </div>
    </div>
  );
}
