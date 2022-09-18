export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONTRACT_NAME: string;
      ENV: "test" | "dev" | "prod";
    }
  }
}
