import Header from "@components/Header/Header";
import { router } from "@routing/router";
import React from "react";
import { RouterProvider } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
