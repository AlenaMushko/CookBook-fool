const CONFIG = {
  BUILD_PATH: import.meta.env.VITE_BUILD_PATH || "",
  API_URL: import.meta.env.VITE_API_URL || "",
  API_SECRET_KEY: import.meta.env.VITE_API_SECRET_KEY,
  API_KEY: import.meta.env.VITE_API_KEY,
};

export default CONFIG;
