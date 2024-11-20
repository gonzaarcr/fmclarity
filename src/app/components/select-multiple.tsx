import { useEffect, useState } from "react";

export type Option = {
  text: string;
  id: string;
};

export default function SelectMultiple({
  options,
  initialValue,
  value,
  onChange,
}: {
  options: Option[];
  initialValue: Option[];
  value: Option[];
  onChange: (val: string[]) => void;
}) {
  const [selection, setSelection] = useState(initialValue ?? []);

  useEffect(() => {
    setSelection(value);
  }, [value]);

  return (
    <div>
      <label
        htmlFor="select"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select an option
      </label>
      <select
        id="select"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
      <div>
        {selection.map((sel) => (
          <span
            key={sel.id}
            className="h-7 py-1 px-4 m-1 text-xs font-semibold bg-blue-500 rounded-md text-white cursor-pointer"
            onClick={() => onChange(selection.filter((s) => s.id !== sel.id).map((s) => s.id))}
          >
            {sel.text} {"✖"}
          </span>
        ))}
      </div>
    </div>
  );
}
