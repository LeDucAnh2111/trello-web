import Home from "./Pages/Home";
import Boards from "./Pages/Boards";
import LayoutOnlyHeader from "./components/layout/LayoutOnlyHeader";
let Route = [
  { path: "/", component: Home, page: LayoutOnlyHeader },
  { path: "/boards/:id", component: Boards },
];

export default Route;
