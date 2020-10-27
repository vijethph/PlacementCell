import React, { Component } from "react";
import { postDiscussion } from "./UserFunctions";
import { getDiscussion } from "./UserFunctions";
import { putDiscussion } from "./UserFunctions";
import { deleteDiscussion } from "./UserFunctions";
import { postComment } from "./UserFunctions";
import { putComment } from "./UserFunctions";
import { deleteComment } from "./UserFunctions";
import swal from "@sweetalert/with-react";
import ReactTimeAgo from "react-time-ago";
class Forum extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      editTitle: "",
      editDescription: "",
      comment: "",
      discussions: [],
      currentDiscussion: "",
      currentComment: "",
      editComment: "",
    };
    this.count = 0;
    this.commentCount = 0;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputChange1 = this.handleInputChange1.bind(this);
    this.handleInputChange2 = this.handleInputChange2.bind(this);
    this.handleInputChange3 = this.handleInputChange3.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.DeleteDiscusssion = this.DeleteDiscusssion.bind(this);
    this.EditDisplay = this.EditDisplay.bind(this);
    this.EditDiscusssion = this.EditDiscusssion.bind(this);
    this.AddComment = this.AddComment.bind(this);
    this.EditComment = this.EditComment.bind(this);
    this.DeleteComment = this.DeleteComment.bind(this);
  }
  componentDidMount() {
    getDiscussion().then((res) => {
      console.log(res);
      this.setState({ discussions: res });
      //this.props.history.push(`/discussion`)
    });
  }

  handleInputChange(event) {
    console.log("Testing handleInputChange()");
    const value = event.target.value;
    const name = event.target.name;
    console.log(value);
    this.setState({
      [name]: value,
    });
    //console.log(this.state);
  }

  handleInputChange1(event) {
    console.log("Testing handleInputChange()");
    const value = event.target.value;
    const name = event.target.name;
    console.log(name + " " + value);
    this.setState({
      editTitle: event.target.value,
    });
    console.log(this.state);
  }

  handleInputChange2(event) {
    console.log("Testing handleInputChange()");
    // const value = event.target.value;
    // const name = event.target.name;
    //console.log(value);
    this.setState({
      editDescription: event.target.value,
    });
    console.log(this.state);
  }

  handleInputChange3(event) {
    console.log("Testing handleInputChange()");
    // const value = event.target.value;
    // const name = event.target.name;
    //console.log(value);
    this.setState({
      editComment: event.target.value,
    });
    console.log(this.state);
  }

  handleEditChange(event) {
    //console.log("Testing handleEditChange()");
    const value = event.target.value;
    const name = event.target.name;
    var data = { [name]: value };
    console.log(data);
    this.setState({ currentDiscussion: "" });
    //Object.assign(this.state.currentDiscussion, data);
    event.preventDefault();
  }

  handleSubmit(event) {
    const newDiscussion = {
      title: this.state.title,
      description: this.state.description,
    };
    postDiscussion(newDiscussion).then((res) => {
      //console.log(res)
      this.props.history.push(`/discussion`);
      window.location.reload();
    });
    event.preventDefault();
  }
  EditDiscusssion(event) {
    // const value = event.target.value;
    // const name = event.target.name;
    var data = {
      _id: this.state.currentDiscussion._id,
      title: this.state.editTitle,
      description: this.state.editDescription,
    };
    // console.log(data);
    putDiscussion(data).then((res) => {
      //console.log(res);
      this.props.history.push(`/discussion`);
      window.location.reload();
    });
    this.setState({ currentDiscussion: "" });
    event.preventDefault();
  }
  EditDisplay(event) {
    // console.log(this.state.currentDiscussion.title+"bbbbbb");
    // console.log(this.state.currentDiscussion.description+"bbbbbb");
    // var title = this.state.currentDiscussion.title;
    // this.setState({ editTitle: title });
    // console.log(this)
    // this.setState({ editDescription: this.state.currentDiscussion.description });
    swal({
      content: (
        <div>
          <form onSubmit={this.EditDiscusssion}>
            <div className="form-group">
              <label className="text-muted">Title</label>
              <input
                type="text"
                className="form-control"
                name="editTitle"
                value={this.state.editTitle}
                onChange={this.handleInputChange1}
              />
            </div>

            <div className="form-group">
              <label className="text-muted">Description</label>
              <textarea
                className="form-control"
                name="editDescription"
                value={this.state.editDescription}
                rows="7"
                onChange={this.handleInputChange2}
              ></textarea>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Edit
              </button>
            </div>
          </form>
        </div>
      ),
      button: false,
    });
    console.log("After swal");
    event.preventDefault();
  }

  DeleteDiscusssion(event) {
    console.log(this.state.currentDiscussion._id);
    //console.log(this.state.currentDiscussion.description);
    deleteDiscussion(this.state.currentDiscussion).then((res) => {
      //console.log(res);
      this.props.history.push(`/discussion`);
      window.location.reload();
    });
    this.setState({ currentDiscussion: "" });
    event.preventDefault();
  }

  AddComment(event) {
    event.preventDefault();
    const newComment = {
      comment: this.state.comment,
      discussionId: this.state.currentDiscussion._id,
    };
    //console.log(newComment);
    postComment(newComment).then((res) => {
      //console.log(res)
      this.props.history.push(`/discussion`);
      window.location.reload();
    });
  }

  EditComment(event) {
    // const value = event.target.value;
    // const name = event.target.name;
    var data = {
      _id: this.state.currentDiscussion._id,
      comment: this.state.editComment,
      comment_id: this.state.currentComment._id,
    };
    console.log(data);
    putComment(data).then((res) => {
      //console.log(res);
      this.props.history.push(`/discussion`);
      window.location.reload();
    });
    this.setState({ currentComment: "" });
    event.preventDefault();
  }

  DeleteComment(event) {
    // console.log(this.state.currentDiscussion._id);
    //console.log(event.target.id);
    var data = {
      discussionId: this.state.currentDiscussion._id,
      commentId: event.target.id,
    };
    deleteComment(data).then((res) => {
      //console.log(res);
      this.props.history.push(`/discussion`);
      window.location.reload();
    });
    this.setState({ currentComment: "" });
    event.preventDefault();
  }

  render() {
    return (
      <div className="container ">
        <div className="row text-center">
          <h1>Post a query:</h1>
        </div>
        <br></br>

        <div className="row-sm-12 border border-primary rounded">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group m-3">
              <label className="text-muted font-weight-bold">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={this.state.title}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group m-3">
              <label className="text-muted font-weight-bold">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={this.state.description}
                rows="7"
                onChange={this.handleInputChange}
              ></textarea>
            </div>

            <div className="text-center m-3">
              <button type="submit" className="btn btn-primary">
                Post
              </button>
            </div>
          </form>
        </div>
        <br></br>
        <hr></hr>
        <div className="row">
          <h1>Discussions</h1>
        </div>
        <div className="row-12">
          <div className="mt-5">
            {this.state.discussions.map((value) => {
              return (
                <div className="row-12">
                  <div className="card border-primary">
                    <button
                      className="btn"
                      data-toggle="collapse"
                      data-target={"#" + value._id}
                      onClick={() => {
                        this.setState({ currentDiscussion: value });
                      }}
                    >
                      <div className="media-body card-header bg-dark text-white">
                        <h4 className="card-title text-left">{value.title}</h4>
                        <p className="text-right">
                          <i class="fa fa-user"></i> By{" "}
                          {value.first_name + " " + value.last_name}
                        </p>
                      </div>
                      <div className="card-body">
                        <blockquote className="blockquote text-left card-text mb-0">
                          <p>{value.description}</p>

                          <button
                            class="btn btn-primary btn-sm m-2 float-right"
                            data-toggle="collapse"
                            data-target={"#" + this.count}
                            onClick={() => {
                              this.setState({
                                editTitle: value.title,
                                editDescription: value.description,
                              });
                            }}
                          >
                            Edit Discussion <i class="fas fa-pencil-alt"></i>
                          </button>
                          {
                            <div>
                              <form
                                onSubmit={this.EditDiscusssion}
                                id={this.count++}
                                className="collapse"
                              >
                                <div className="form-group">
                                  <label className="text-muted">Title</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="editTitle"
                                    value={this.state.editTitle}
                                    onChange={this.handleInputChange1}
                                  />
                                </div>

                                <div className="form-group">
                                  <label className="text-muted">
                                    Description
                                  </label>
                                  <textarea
                                    className="form-control"
                                    name="editDescription"
                                    value={this.state.editDescription}
                                    rows="7"
                                    onChange={this.handleInputChange2}
                                  ></textarea>
                                </div>

                                <div className="text-center">
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                  >
                                    Edit
                                  </button>
                                </div>
                              </form>
                            </div>
                          }
                          <button
                            class="btn btn-danger btn-sm m-2 float-right"
                            onClick={this.DeleteDiscusssion}
                          >
                            Delete Discussion <i class="fa fa-trash"></i>
                          </button>
                          <button
                            class="btn btn-warning btn-sm m-2 float-right"
                            data-toggle="collapse"
                            data-target={"#" + value._id}
                            onClick={() => {
                              this.setState({ currentDiscussion: value });
                            }}
                          >
                            View Comments <i class="fas fa-chevron-down"></i>
                          </button>
                        </blockquote>
                      </div>
                    </button>
                    <div id={value._id} className="collapse">
                      <div class="card-footer">
                        {value.comments.map((com) => {
                          return (
                            // <div className="card">
                            //     <div className="card-header">
                            //         <p>{com.first_name + com.last_name}</p>
                            //     </div>
                            //     <div className="card-body">
                            //         <div className="row">
                            //             <div className="col-10"><p>{com.first_name + com.last_name +":" +com.comment}</p></div>
                            //             <button class="btn "><i class="fas fa-pencil-alt"></i></button>
                            //             <button class="btn" id={com._id} onClick={this.DeleteComment}><i class="fa fa-trash"></i></button>
                            //         </div>
                            //     </div>
                            // </div>
                            <div className="media mb-3">
                              <img
                                className="mr-3 bg-light rounded"
                                width="48"
                                height="48"
                                src={`https://api.adorable.io/avatars/48/${com.first_name.toLowerCase()}@adorable.io.png`}
                                alt={com.first_name}
                              />

                              <div className="media-body p-2 shadow-sm rounded bg-light border">
                                <small className="float-right text-muted">
                                  <i class="fa fa-calendar"></i>{" "}
                                  {
                                    <ReactTimeAgo
                                      date={new Date(com.updatedAt)}
                                    />
                                  }
                                </small>
                                <h5 className="mt-0 mb-1 text-muted">
                                  <i class="fa fa-user"></i>{" "}
                                  {com.first_name + " " + com.last_name}
                                </h5>
                                {com.comment}
                                <button
                                  class="btn btn-danger btn-sm m-2 float-right"
                                  id={com._id}
                                  onClick={this.DeleteComment}
                                >
                                  Delete Comment <i class="fa fa-trash"></i>
                                </button>
                                <button
                                  class="btn btn-info btn-sm m-2 float-right"
                                  data-toggle="collapse"
                                  data-target={"#" + this.commentCount}
                                  onClick={() => {
                                    this.setState({
                                      editComment: com.comment,
                                      currentComment: com,
                                    });
                                  }}
                                  id={com._id}
                                >
                                  Edit Comment <i class="fas fa-pencil-alt"></i>
                                </button>
                                {
                                  <div>
                                    <form
                                      onSubmit={this.EditComment}
                                      id={this.commentCount++}
                                      className="collapse"
                                    >
                                      <div className="form-group">
                                        <label className="text-muted"></label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="editComment"
                                          value={this.state.editComment}
                                          onChange={this.handleInputChange3}
                                        />
                                      </div>

                                      <div className="text-center">
                                        <button
                                          type="submit"
                                          className="btn btn-primary"
                                        >
                                          Edit
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                }
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="row mx-5">
                        <div className="col form-group">
                          <input
                            type="text"
                            className="col-8"
                            name="comment"
                            value={this.state.comment}
                            placeholder="Enter comment"
                            onChange={this.handleInputChange}
                          />
                          <button
                            type="submit"
                            className="btn btn-primary col-3 offset-1"
                            onClick={this.AddComment}
                          >
                            <i class="fa fa-paper-plane"></i> Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br></br>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Forum;
