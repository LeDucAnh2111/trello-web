import { Fragment } from "react";
import DefaultLayout from "./components/layout/DefaultLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./output.css";
import route from "./Router";
function App() {
  let Layout = DefaultLayout;

  return (
    <Router>
      <div>
        <Routes>
          {route.map((item, index) => {
            let Page = item.component;
            if (item.page === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={item.path}
                element=<Layout>
                  <Page />
                </Layout>
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
  // return <DefaultLayout></DefaultLayout>;
}

export default App;
