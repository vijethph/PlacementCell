/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { deleteComment, deleteDiscussion, getData, getTimeAgo, IComment, IDiscussion, postComment, postDiscussion, putComment, putDiscussion } from "../services/UserFunctions";

const Forum = () => {
  const [discussionState, setDiscussionState] = useState({
    currentTitle: "",
    editTitle: "",
    currentDescription: "",
    editDescription: "",
    currentComment: {},
    editComment: "",
  });

  const [currentDiscussion, setCurrentDiscussion] = useState<IDiscussion>();
  const [count, setCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [discussions, setDiscussions] = useState<IDiscussion[]>([]);
  // const navigate = useNavigate();

  useEffect(() => {
    let spinner = false;
    getData("discussions").then((result: IDiscussion[]) => {
      if (!spinner) {
        setDiscussions(result);
      }
    });

    return () => {
      spinner = true;
    };
  }, []);

  const submitDiscussion = (event: React.FormEvent) => {
    event.preventDefault();
    postDiscussion({
      title: discussionState.currentTitle,
      description: discussionState.currentDescription,
    })
      .then((response: IDiscussion) => {
        setCurrentDiscussion(response);
        // navigate(0); // refresh the page
      })
      .catch((error) => {
        console.error(error);
        swal("Error", error as string, "error");
      });
  };

  const editDiscussion = (event: React.FormEvent) => {
    event.preventDefault();
    putDiscussion({
      _id: currentDiscussion?._id,
      title: discussionState.editTitle,
      description: discussionState.editDescription,
    })
      .then((response: IDiscussion) => {
        setCurrentDiscussion(undefined);
        // navigate(0); // refresh the page
      })
      .catch((error) => {
        console.error(error);
        swal("Error", error as string, "error");
      });
  };

  const removeDiscussion = (event: React.FormEvent) => {
    event.preventDefault();
    if (currentDiscussion) {
      deleteDiscussion(currentDiscussion)
        .then((response) => {
          setCurrentDiscussion(undefined);
          // navigate(0); // refresh the page
        })
        .catch((error) => {
          console.error(error);
          swal("Error", error as string, "error");
        });
    } else {
      console.warn("Discussion not found");
      swal("Discussion not found", "error");
    }
  };

  const removeComment = (event: React.MouseEvent, commentId: string) => {
    event.preventDefault();
    if (currentDiscussion) {
      setCurrentDiscussion({
        ...currentDiscussion,
        focusedComment: currentDiscussion.comments?.find((comment) => comment._id === commentId),
      });
      deleteComment(currentDiscussion)
        .then((response) => {
          setDiscussionState({
            ...discussionState,
            currentComment: {},
          });
          // navigate(0); // refresh the page
        })
        .catch((error) => {
          console.error(error);
          swal("Error", error as string, "error");
        });
    } else {
      console.warn("Discussion not found");
      swal("Discussion not found", "error");
    }
  };

  const editComment = (event: React.FormEvent, commentId: string, updatedComment: string) => {
    event.preventDefault();
    if (currentDiscussion) {
      setCurrentDiscussion({
        ...currentDiscussion,
        focusedComment: currentDiscussion.comments?.find((comment) => comment._id === commentId),
      });
      putComment(currentDiscussion, updatedComment)
        .then((response: IDiscussion) => {
          setCurrentDiscussion(undefined);
          // navigate(0); // refresh the page
        })
        .catch((error) => {
          console.error(error);
          swal("Error", error as string, "error");
        });
    } else {
      console.warn("Discussion not found");
      swal("Discussion not found", "error");
    }
  };

  const addComment = (event: React.MouseEvent, comment: string) => {
    event.preventDefault();
    if (currentDiscussion) {
      postComment(currentDiscussion, comment)
        .then((response: IDiscussion) => {
          setCurrentDiscussion(undefined);
          // navigate(0); // refresh the page
        })
        .catch((error) => {
          console.error(error);
          swal("Error", error as string, "error");
        });
    } else {
      console.warn("Discussion not found");
      swal("Discussion not found", "error");
    }
  };

  return (
    <div className="container ">
      <div className="row text-center">
        <h1>Post a query:</h1>
      </div>
      <br></br>

      <div className="row-sm-12 border border-primary rounded">
        <form onSubmit={(event) => submitDiscussion(event)}>
          <div className="form-group m-3">
            <label className="text-muted font-weight-bold">
              Title
              <input
                type="text"
                className="form-control"
                name="title"
                value={discussionState.currentTitle}
                onChange={(event) =>
                  setDiscussionState({
                    ...discussionState,
                    currentTitle: event.target.value,
                  })
                }
              />
            </label>
          </div>

          <div className="form-group m-3">
            <label className="text-muted font-weight-bold">
              Description
              <textarea
                className="form-control"
                name="description"
                value={discussionState.currentDescription}
                rows={7}
                onChange={(event) =>
                  setDiscussionState({
                    ...discussionState,
                    currentDescription: event.target.value,
                  })
                }></textarea>
            </label>
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
          {discussions.map((discussion) => {
            return (
              <div className="row-12" key={discussion._id}>
                <div className="card border-primary">
                  <button className="btn" data-bs-toggle="collapse" data-bs-target={`#${discussion._id}`} onClick={() => setCurrentDiscussion(discussion)}>
                    <div className="media-body card-header bg-dark text-white">
                      <h4 className="card-title text-left">{discussion.title}</h4>
                      <p className="text-right">
                        <i className="fa fa-user"></i> By {`${discussion.firstName} ${discussion.lastName}`}
                      </p>
                    </div>
                    <div className="card-body">
                      <blockquote className="blockquote text-left card-text mb-0">
                        <p>{discussion.description}</p>

                        <button
                          className="btn btn-primary btn-sm m-2 float-right"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${count}${discussion._id}`}
                          onClick={() =>
                            setDiscussionState({
                              ...discussionState,
                              editTitle: discussion.title,
                              editDescription: discussion.description,
                            })
                          }>
                          Edit Discussion <i className="fas fa-pencil-alt"></i>
                        </button>
                        {
                          <div>
                            <form onSubmit={(event) => editDiscussion(event)} id={`${count}${discussion._id}`} className="collapse">
                              <div className="form-group">
                                <label className="text-muted">
                                  Title
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="editTitle"
                                    value={discussionState.editTitle}
                                    onChange={(event) =>
                                      setDiscussionState({
                                        ...discussionState,
                                        editTitle: event.target.value,
                                      })
                                    }
                                  />
                                </label>
                              </div>

                              <div className="form-group">
                                <label className="text-muted">
                                  Description
                                  <textarea
                                    className="form-control"
                                    name="editDescription"
                                    value={discussionState.editDescription}
                                    rows={7}
                                    onChange={(event) =>
                                      setDiscussionState({
                                        ...discussionState,
                                        editDescription: event.target.value,
                                      })
                                    }></textarea>
                                </label>
                              </div>

                              <div className="text-center">
                                <button type="submit" className="btn btn-primary">
                                  Edit
                                </button>
                              </div>
                            </form>
                          </div>
                        }
                        <button className="btn btn-danger btn-sm m-2 float-right" onClick={(event) => removeDiscussion(event)}>
                          Delete Discussion <i className="fa fa-trash"></i>
                        </button>
                        <button className="btn btn-warning btn-sm m-2 float-right" data-bs-toggle="collapse" data-bs-target={`#${discussion._id}`} onClick={() => setCurrentDiscussion(discussion)}>
                          View Comments <i className="fas fa-chevron-down"></i>
                        </button>
                      </blockquote>
                    </div>
                  </button>
                  <div id={discussion._id} className="collapse">
                    <div className="card-footer">
                      {discussion.comments
                        ? discussion.comments.map((comment) => {
                            return (
                              <div className="media mb-3" key={comment._id}>
                                <img className="mr-3 bg-light rounded" width="48" height="48" src={`https://ui-avatars.com/api/?name=${comment.firstName.toLowerCase()}+${comment.lastName.toLowerCase()}`} alt={`${comment.firstName} ${comment.lastName}`} />

                                <div className="media-body p-2 shadow-sm rounded bg-light border">
                                  <small className="float-right text-muted">
                                    <i className="fa fa-calendar"></i> {getTimeAgo(comment.updatedAt)}
                                  </small>
                                  <h5 className="mt-0 mb-1 text-muted">
                                    <i className="fa fa-user"></i> {`${comment.firstName} ${comment.lastName}`}
                                  </h5>
                                  {comment.comment}
                                  <button className="btn btn-danger btn-sm m-2 float-right" id={comment._id} onClick={(event) => removeComment(event, comment._id)}>
                                    Delete Comment <i className="fa fa-trash"></i>
                                  </button>
                                  <button
                                    className="btn btn-info btn-sm m-2 float-right"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#${commentCount}${comment._id}`}
                                    onClick={() =>
                                      setDiscussionState({
                                        ...discussionState,
                                        currentComment: comment,
                                        editComment: comment.comment,
                                      })
                                    }
                                    id={comment._id}>
                                    Edit Comment <i className="fas fa-pencil-alt"></i>
                                  </button>
                                  {
                                    <div>
                                      <form onSubmit={(event) => editComment(event, comment._id, discussionState.editComment)} id={`${commentCount}${comment._id}`} className="collapse">
                                        <div className="form-group">
                                          <label className="text-muted">
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="editComment"
                                              value={discussionState.editComment}
                                              onChange={(event) =>
                                                setDiscussionState({
                                                  ...discussionState,
                                                  editComment: event.target.value,
                                                })
                                              }
                                            />
                                          </label>
                                        </div>

                                        <div className="text-center">
                                          <button type="submit" className="btn btn-primary">
                                            Edit
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  }
                                </div>
                              </div>
                            );
                          })
                        : ""}
                    </div>
                    <div className="row mx-5">
                      <div className="col form-group">
                        <input
                          type="text"
                          className="col-8"
                          name="comment"
                          value={discussionState.editComment}
                          placeholder="Enter comment"
                          onChange={(event) =>
                            setDiscussionState({
                              ...discussionState,
                              editComment: event.target.value,
                            })
                          }
                        />
                        <button type="submit" className="btn btn-primary col-3 offset-1" onClick={(event) => addComment(event, discussionState.editComment)}>
                          <i className="fa fa-paper-plane"></i> Send
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
};

export default Forum;
