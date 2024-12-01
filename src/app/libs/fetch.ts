import { Settings } from "../types/settings";

function randomHexString(size: number) {
  return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");
}

function postItem(tableName: string, item: object) {
  const generatedId = randomHexString(16);
  let table = getTable(tableName);
  if (table === null) {
    table = [];
  }
  const newItem = { ...item, _id: generatedId };
  table = [...table, newItem];
  localStorage.setItem(`/${tableName}`, JSON.stringify(table));
  return newItem;
}

function putItem(tableName: string, id: string, item: any) {
  let table = getTable(tableName) ?? [];
  const oldItem = table.filter((e) => e._id === id)?.[0];
  if (!oldItem) {
    return false;
  }
  table = [{ ...item, _id: id }, ...table.filter((e) => e._id !== id)];
  localStorage.setItem(`/${tableName}`, JSON.stringify(table));
  return true;
}

function getTable(tableName: string): any[] | null {
  return JSON.parse(localStorage.getItem(`/${tableName}`) ?? "null");
}

export async function fetch_middleware(settings: Settings, path: string, init?: RequestInit) {
  if (settings.src === "remote") {
    return await fetch(`${settings.url}${path}`, init);
  } else {
    const method = init?.method;
    const [_, tableName, id] = path.split("/");
    let response: BodyInit | null = null;
    let dataHeaders = { status: 200, headers: { "Content-Type": "application/json" } };
    if (method === "POST") {
      const body = JSON.parse(init?.body?.toString() ?? "null") ?? {};
      response = JSON.stringify(postItem(tableName, body));
    } else if (method === "PUT") {
      const body = JSON.parse(init?.body?.toString() ?? "null") ?? {};
      putItem(tableName, id, body);
      // localStorage.setItem(`/${tableName}`, { ...body, _id: id });
    } else if (method === "DELETE") {
    } else {
      // GET
      const table = getTable(tableName);
      if (id) {
        const item = table?.filter((e) => e._id === id)?.[0];
        if (!item) {
          dataHeaders = { status: 404, headers: { "Content-Type": "application/json" } };
          response = null;
        } else {
          response = JSON.stringify(item);
        }
      } else {
        if (!table) {
          response = "[]";
        } else {
          response = JSON.stringify(table);
        }
      }
    }
    return new Response(response, dataHeaders);
  }
}
