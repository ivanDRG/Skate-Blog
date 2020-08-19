import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeCpassword = this.onChangeCpassword.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      password: "",
      cpassword: "",
      show: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeCpassword(e) {
    this.setState({
      cpassword: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.password === this.state.cpassword) {
      const user = {
        username: this.state.username,
        password: this.state.password,
      };
      console.log(user);
      axios
        .post("http://localhost:5000/users/add", user)
        .then((res) => console.log(res.data));
      this.setState({
        show: false,
        username: "",
        password: "",
        cpassword: "",
      });
    } else {
      this.setState({
        show: true,
      });
    }
  }
  handleClose() {
    this.setState({
      show: false,
      password: "",
      cpassword: "",
    });
  }
  render() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Passwords don´t match</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please try again</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password: </label>
            <input
              type="password"
              required
              className="form-control"
              value={this.state.cpassword}
              onChange={this.onChangeCpassword}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
