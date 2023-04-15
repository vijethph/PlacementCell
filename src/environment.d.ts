declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?: string;
    NODE_ENV: "development" | "production";
    MONGO_URI: string;
    JWT_SECRET_KEY: string;
    HACKEREARTH_API_KEY: string;
  }
}
