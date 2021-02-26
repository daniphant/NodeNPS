declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
    NODE_ENV: "dev" | "prod" | "test";
  }
}
