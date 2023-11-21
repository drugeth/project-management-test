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
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { langDataState, projectListState } from "./atoms/atoms";
import { getLanguageData, getProjectData } from "./services/dataSourcesService";

const App = () => {
  const [projectData, setProjectData] = useRecoilState(projectListState);
  const [langData, setLangData] = useRecoilState(langDataState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!projectData.length) {
          const responseProject = await getProjectData();
          setProjectData(responseProject);

          if (!langData?.length) {
            const responseLanguage = await getLanguageData();
            setLangData(responseLanguage);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [projectData, langData]);

  return (
    <Switch>
      <Route path="/" component={ProjectList} />
      <Route path="/new-project" component={NewProject} />
      <Route path="/project-details/:id" component={ProjectDetails} />
      <Route path="/:rest*" component={Page404} />
    </Switch>
  );
};

export default App;
