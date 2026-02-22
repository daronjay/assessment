import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";

import HomePage from "./routes/HomePage.tsx";
import ErrorPage from "./routes/ErrorPage.tsx";
import AddAccount from "./routes/AddAccount.tsx";

import { AccountProvider } from "./providers/accountProvider";

const basePath = `${import.meta.env.BASE_URL}`;

const errorLoader = async () => {
  return { status: 404 };
};

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: basePath,
      element: <App />,
      children: [
        { path: "", element: <HomePage /> },
        { path: "add-account", element: <AddAccount /> },
        // {
        //   path: `${ROUTE_CONTENT}/:contentSlug`,
        //   element: <ContentPage />,
        // },
        // {
        //   path: `${ROUTE_PILLAR_DETAILS}/:pillar`,
        //   element: <PillarDetailsPage />,
        // },
        // {
        //   path: `${ROUTE_PILLAR_DETAILS}/:pillar/:programmeId`,
        //   element: <PillarProgrammePage />,
        // },
      ],
    },
    {
      path: "*",
      element: <ErrorPage />,
      loader: errorLoader,
    },
  ]);

  return (
    <AccountProvider>
      <RouterProvider router={router} />
    </AccountProvider>
  );
};

export default Routes;
