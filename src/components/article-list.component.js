import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Article = (props) => (
  <tr>
    <td>{props.article.title}</td>
    <td>{props.article.subtitle}</td>
    <td>{props.article.content}</td>
    <td>
      {" "}
      <img
        style={{ width: 100, height: 100 }}
        src={props.article.imageURL}
        alt={props.article.title}
      ></img>
    </td>
    <td>
      <Link to={"/edit/" + props.article._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteArticle(props.article._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class ArticleList extends Component {
  constructor(props) {
    super(props);

    this.deleteArticle = this.deleteArticle.bind(this);

    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/articles/")
      .then((response) => {
        this.setState({ articles: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteArticle(id) {
    axios.delete("http://localhost:5000/articles/" + id).then((res) => {
      console.log(res.data);
    });
    this.setState({
      articles: this.state.articles.filter((el) => el._id !== id),
    });
  }
  articleList() {
    return this.state.articles.map((currentarticle) => {
      return (
        <Article
          article={currentarticle}
          deleteArticle={this.deleteArticle}
          key={currentarticle._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Articles</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Subtitle</th>
              <th>Content</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>{this.articleList()}</tbody>
        </table>
      </div>
    );
  }
}
