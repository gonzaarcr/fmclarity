"use client";
import React, { useState } from "react";
import styles from "./table.module.css";

export type ColumnType<T> = {
  field: string;
  headerText?: string;
  valueGetter: (e: T) => string;
};

const ORDER_ICON = {
  asc: "⏶",
  desc: "⏷",
};

export default function Table<T>({
  elements,
  getKey,
  columns,
  action,
}: {
  elements: T[];
  getKey: (e: T) => string;
  columns: ColumnType<T>[];
  action: (e: T) => React.ReactNode;
}) {
  const [sortOrder, setSortOrder] = useState<{ field: string; ord: "asc" | "desc" }>();

  const changeSortOrder = (columnName: string) => {
    if (sortOrder?.field === columnName) {
      setSortOrder({ ...sortOrder, ord: sortOrder.ord === "desc" ? "asc" : "desc" });
    } else {
      setSortOrder({ field: columnName, ord: "asc" });
    }
  };

  const sortedElements =
    sortOrder === undefined
      ? elements
      : elements.sort((e1: T, e2: T) => {
          const getter = columns.find((col) => col.field === sortOrder.field)?.valueGetter;
          if (getter === undefined) {
            return 0;
          }
          const difference = getter(e1).localeCompare(getter(e2));
          return sortOrder.ord === "asc" ? difference : -difference;
        });

  return (
    <div className={styles.root}>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            {columns.map((col) => (
              <th key={col.field} className={styles.cell}>
                <a href="#" onClick={() => changeSortOrder(col.field)}>
                  {col.headerText ?? col.field}{" "}
                  {sortOrder?.field === col.field && ORDER_ICON[sortOrder.ord]}
                </a>
              </th>
            ))}
            <th className={styles.cell}></th>
          </tr>
        </thead>
        <tbody>
          {sortedElements.map((e) => (
            <tr key={getKey(e)} className={styles.row}>
              {columns.map((col) => (
                <td key={col.field} className={styles.cell}>
                  {col.valueGetter(e)}
                </td>
              ))}
              <td className={`${styles.cell} ${styles.edit_cell}`}>{action?.(e)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
