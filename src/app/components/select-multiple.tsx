import { useEffect, useState } from "react";
import styles from "./select-multiple.module.css";

export type Option = {
  text: string;
  id: string;
};

export default function SelectMultiple({
  options,
  initialValue,
  value,
  onChange,
  title,
}: {
  options: Option[];
  initialValue: Option[];
  value: Option[];
  onChange: (val: string[]) => void;
  title: string;
}) {
  const [selection, setSelection] = useState(initialValue ?? []);

  useEffect(() => {
    setSelection(value);
  }, [value]);

  return (
    <div>
      <label htmlFor="select" className={styles.label}>
        {title}
      </label>
      <select
        id="select"
        className={styles.input_text}
        onChange={(e) =>
          e.target.value !== "" && onChange([...selection.map((s) => s.id), e.target.value])
        }
        value={""}
      >
        <option value="">Please choose</option>
        {options
          .filter((value) => !selection.map((s) => s.id).includes(value.id))
          .map((o) => (
            <option key={o.id} value={o.id}>
              {o.text}
            </option>
          ))}
      </select>
      <div className={styles.pill_container}>
        {selection.map((sel) => (
          <span
            key={sel.id}
            className={styles.pill}
            onClick={() => onChange(selection.filter((s) => s.id !== sel.id).map((s) => s.id))}
          >
            {sel.text} {"✖"}
          </span>
        ))}
      </div>
    </div>
  );
}
