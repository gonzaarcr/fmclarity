export type Settings =
  | {
      src: "remote";
      url: string;
    }
  | {
      src: "local";
    };
