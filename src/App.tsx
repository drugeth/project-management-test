import { Route, Switch } from "wouter";
import ProjectList from "@/pages/ProjectList";
import Page404 from "@/pages/Page404";
import NewProject from "@/pages/NewProject";
import ProjectDetails from "@/pages/ProjectDetails";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <RecoilRoot>
      <Switch>
        <Route path="/" component={ProjectList} />
        <Route path="/new-project" component={NewProject} />
        <Route path="/project-details/:id" component={ProjectDetails} />
        <Route path="/:rest*" component={Page404} />
      </Switch>
    </RecoilRoot>
  );
};

export default App;
