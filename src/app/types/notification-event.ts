import { Contractor } from "./contractor";

export type NotificationEvent = {
  type: "CONTRACTOR_ADDED_SUCCESS";
  id: string;
  payload: Contractor;
};
