import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Signup from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import { createClient } from "@supabase/supabase-js";
import AskQuestion from "./pages/AskQuestion.jsx";
import Questions from "./pages/Questions.jsx";
import DetailPage from "./pages/DetailPage.jsx";
export const supabase = createClient(
  "https://yhfjgnfaqxvplqyqpmsy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloZmpnbmZhcXh2cGxxeXFwbXN5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzQ3NTI5NCwiZXhwIjoyMDE5MDUxMjk0fQ.eeZ5FUv1jtt1LYRl4lnbQp9gx13qguDO1ammswUcG7Q"
);

import { loader as homeLoader } from "./pages/Home.jsx";
import { loader as questionLoader } from "./pages/Questions.jsx";
import { loader as detailLoader } from "./pages/DetailPage.jsx";
import { loader as TagsLoader } from "./pages/Tags.jsx";
import { loader as UsersLoader } from "./pages/Users.jsx";
import { loader as ProfileLoader } from "./pages/ProfilePage.jsx";

import Tags from "./pages/Tags.jsx";
import Error from "./pages/Error.jsx";
import Users from "./pages/Users.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/tags",
        element: <Tags />,
        loader: TagsLoader,
      },
      {
        path: "/users",
        element: <Users />,
        loader: UsersLoader,
      },
      {
        path: "/error",
        element: <Error />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/questions",
        element: <Questions />,
        loader: questionLoader,
      },
      {
        path: "/questions/askquestion",
        element: <AskQuestion />,
      },
      {
        path: "/questions/:id",
        element: <DetailPage />,
        loader: detailLoader,
      },
      {
        path: "/users/:username",
        element: <ProfilePage />,
        loader: ProfileLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
