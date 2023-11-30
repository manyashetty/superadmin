import "./dist/output.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import LoginForm from "./Pages/Login";
import Registration from "./Pages/Register";
import ContactForm from "./components/ContactForm";


import ProjectForm from "./components/ProjectForm";

import Projects from "./Pages/Projects";

import FeedsPage from "./Pages/Feed";
import FeedForm from "./components/feedsForm";
import SuperAdminPage from "./Pages/SuperAdminPage";
import ContactList from "./Pages/contacts";
import Userupdate from "./components/userUpdate";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/contacts" element={<ContactForm />}></Route>
     
         
          <Route path="/projectform" element={<ProjectForm />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
          <Route path="/projects/:projectId/update" element={<ProjectForm />} />

          

          <Route path="/feeds" element={<FeedsPage />}></Route>
          <Route path="/feedform" element={<FeedForm />}></Route>
          <Route path="/feeds/:feedId/update" element={<FeedForm />} />

          <Route path="/superAdmin" element={<SuperAdminPage />}></Route>

          <Route path="/contactspage" element={<ContactList />}></Route>

          <Route path="/user/:userId/update" element={<Userupdate />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
