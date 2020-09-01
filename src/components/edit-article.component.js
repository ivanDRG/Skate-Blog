import React, { Component } from "react";
import axios from "axios";

export default class ArticleEdit extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeSubtitle = this.onChangeSubtitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeImageURL = this.onChangeImageURL.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //Create vars in react
    this.state = {
      title: "",
      subtitle: "",
      content: "",
      image: "",
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/articles/" + this.props.match.params.id)
      .then((response) =>
        this.setState({
          title: response.data.title,
          subtitle: response.data.subtitle,
          content: response.data.content,
          image: response.data.imageURL,
        })
      );
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }
  onChangeSubtitle(e) {
    this.setState({
      subtitle: e.target.value,
    });
  }
  onChangeContent(e) {
    this.setState({
      content: e.target.value,
    });
  }
  onChangeImageURL(e) {
    this.setState({
      image: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const article = {
      title: this.state.title,
      subtitle: this.state.subtitle,
      content: this.state.content,
      image: this.state.image,
    };
    console.log(article);
    axios
      .post(
        "http://localhost:5000/articles/update/" + this.props.match.params.id,
        article
      )
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Edit Article Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </div>
          <div className="form-group">
            <label>Subtitle: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.subtitle}
              onChange={this.onChangeSubtitle}
            />
          </div>
          <div className="form-group">
            <label>Content: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.content}
              onChange={this.onChangeContent}
            />
          </div>
          <div className="form-group">
            <label>Image URL: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.image}
              onChange={this.onChangeImageURL}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Edit Article"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
