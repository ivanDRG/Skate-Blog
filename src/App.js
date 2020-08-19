import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ArticleList from "./components/article-list.component";
import EditArticle from "./components/edit-article.component";
import CreateArticle from "./components/create-article.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <div className="container">
        <Route path="/" exact component={ArticleList} />
        <Route path="/edit/:id" component={EditArticle} />
        <Route path="/create" component={CreateArticle} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
