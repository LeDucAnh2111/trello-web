import { Fragment } from "react";
import DefaultLayout from "./components/layout/DefaultLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./output.css";
import route from "./Router";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          {route.map((item, index) => {
            let Layout = DefaultLayout;
            let Page = item.component;

            if (item.page === null) {
              Layout = Fragment;
            }

            if (item.page !== undefined) {
              Layout = item.page;
            }

            return (
              <Route
                key={index}
                path={item.path}
                element=<Layout background={item.background}>
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
