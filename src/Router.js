import Home from "./Pages/Home";
import Boards from "./Pages/Boards";
import LayoutOnlyHeader from "./components/layout/LayoutOnlyHeader";
import EmptyLayout from "./components/layout/EmptyLayout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Empty from "./Pages/Empty";
let Route = [
  { path: "/", component: Home, page: LayoutOnlyHeader },
  { path: "/boards/:id", component: Boards, background: true },
  { path: "/login", component: EmptyLayout, page: Login },
  { path: "/register", component: EmptyLayout, page: Register },
  { path: "/error", component: EmptyLayout, page: Empty },
  { path: "*", component: EmptyLayout, page: Empty },
];

export default Route;
