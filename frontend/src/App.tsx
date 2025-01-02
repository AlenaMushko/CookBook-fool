import { router } from "@routing/router";
import React from "react";
import { RouterProvider } from "react-router-dom";

import { Loader, Toast } from "./shared/index";

const App: React.FC = () => {
  return (
    <>
      <Toast />
      <Loader />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
