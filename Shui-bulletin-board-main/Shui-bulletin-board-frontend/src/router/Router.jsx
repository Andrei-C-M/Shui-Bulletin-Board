// src/router/Router.jsx
import { createHashRouter } from "react-router-dom";
import FlowPage from "../pages/FlowPage/FlowPage";
import AddMsgPage from "../pages/AddMsgPage/AddMsgPage";
import EditMsgPage from "../pages/EditMsgPage/EditMsgPage";
import MessagePage from "../pages/MessagePage/MessagePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

export default createHashRouter([
  { path: "/", element: <FlowPage />, errorElement: <ErrorPage /> },
  { path: "/add", element: <AddMsgPage /> },
  { path: "/message/:id", element: <MessagePage /> },
    { path: "/edit/:id", element: <EditMsgPage /> },

]);
