import React, { Component } from 'react'
import { postDiscussion } from './UserFunctions'
import { getDiscussion } from './UserFunctions'
//import { putDiscussion } from './UserFunctions'
import { deleteDiscussion } from './UserFunctions'
import { postComment } from './UserFunctions'
import { deleteComment } from './UserFunctions'
//import swal from '@sweetalert/with-react'
import ReactTimeAgo from 'react-time-ago'
class Forum extends Component {
    constructor() {
        super()
        this.state = {
            title: "",
            description: "",
            editTitle: "",
            editDescription: "",
            comment: "",
            discussions: [],
            currentDiscussion: "",
            currentComment: ""

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        //this.handleEditChange = this.handleEditChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.DeleteDiscusssion = this.DeleteDiscusssion.bind(this);
        //this.EditDisplay = this.EditDisplay.bind(this);
        //this.EditDiscusssion = this.EditDiscusssion.bind(this);
        this.AddComment = this.AddComment.bind(this);
        this.DeleteComment = this.DeleteComment.bind(this);
    }
    componentDidMount() {
        getDiscussion().then(res => {
            console.log(res)
            this.setState({ discussions: res })
            //this.props.history.push(`/discussion`)
        })

    }



    handleInputChange(event) {
        //console.log("Testing handleInputChange()");
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        }
        );
    }

    // handleEditChange(event) {
    //     //console.log("Testing handleEditChange()");
    //     const value = event.target.value;
    //     const name = event.target.name;
    //     var data = { [name]: value }
    //     console.log(data);
    //     this.setState({ currentDiscussion: "" });
    //     //Object.assign(this.state.currentDiscussion, data);
    //     event.preventDefault();
    // }

    handleSubmit(event) {
        const newDiscussion = {
            "title": this.state.title,
            "description": this.state.description,
        }
        postDiscussion(newDiscussion).then(res => {
            //console.log(res)
            this.props.history.push(`/discussion`)
            window.location.reload();
        })
        event.preventDefault();
    }
    // EditDiscusssion(event) {
    //     const value = event.target.value;
    //     const name = event.target.name;
    //     const data = {
    //         [name]: value,
    //     }
    //     console.log(name);
    //     putDiscussion(data).then(res => {
    //         console.log(res);
    //     })
    //     this.setState({ currentDiscussion: "" });
    //     event.preventDefault();
    // }
    // EditDisplay(event) {
    //     console.log(this.state.currentDiscussion.title);
    //     var title = this.state.currentDiscussion.title;
    //     this.setState({ editTitle: title });
    //     console.log(this.state.editTitle)
    //     this.setState({ editDescription: this.state.currentDiscussion.description });
    //     swal({
    //         content: <div>
    //             <form onSubmit={this.EditDiscusssion}>
    //                 <div className="form-group">
    //                     <label className="text-muted">Title</label>
    //                     <input type="text" className="form-control" name="editTitle" value={this.state.currentDiscussion.title} onChange={this.handleInputChange} />
    //                 </div>

    //                 <div className="form-group">
    //                     <label className="text-muted">Description</label>
    //                     <textarea className="form-control" name="editDescription" value={this.state.editDescription} rows="7" onChange={this.handleInputChange}></textarea>
    //                 </div>

    //                 <div className="text-center">
    //                     <button type="submit" className="btn btn-primary">
    //                         Edit
    //                 </button>
    //                 </div>
    //             </form>
    //         </div>,
    //         button: false
    //     });
    //     event.preventDefault();
    // }

    DeleteDiscusssion(event) {
        console.log(this.state.currentDiscussion._id);
        //console.log(this.state.currentDiscussion.description);
        deleteDiscussion(this.state.currentDiscussion).then((res) => {
            //console.log(res);
            this.props.history.push(`/discussion`)
            window.location.reload();
        })
        this.setState({ currentDiscussion: "" });
        event.preventDefault();
    }

    AddComment(event) {
        event.preventDefault();
        const newComment = {
            "comment": this.state.comment,
            "discussionId": this.state.currentDiscussion._id,
        }
        //console.log(newComment);
        postComment(newComment).then(res => {
            //console.log(res)
            this.props.history.push(`/discussion`)
            window.location.reload();
        })
    }

    DeleteComment(event) {
        // console.log(this.state.currentDiscussion._id);
        //console.log(event.target.id);
        var data = { "discussionId": this.state.currentDiscussion._id, "commentId": event.target.id }
        deleteComment(data).then((res) => {
            //console.log(res);
            this.props.history.push(`/discussion`)
            window.location.reload();
        })
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
                            <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.handleInputChange}/>
                        </div>

                        <div className="form-group m-3">
                            <label className="text-muted font-weight-bold">Description</label>
                            <textarea className="form-control" name="description" value={this.state.description} rows="7" onChange={this.handleInputChange}></textarea>
                        </div>

                        <div className="text-center m-3">
                            <button type="submit" className="btn btn-primary">
                                Post
                            </button>
                        </div>
                        
                    </form>
                </div>
                <br></br>


                <div className="row">
                    <h1>Discussions</h1>
                </div>
                <div className="row-12">
                    <div className="mt-5">
                        {
                            this.state.discussions.map((value) => {
                                return (
                                    <div className="row-12">
                                        <div className="card border-primary onHover">
                                            <button className="btn"
                                                data-toggle="collapse"
                                                data-target={"#" + value._id}
                                                onClick={() => { this.setState({ currentDiscussion: value }) }} >

                                                <div className="card-header bg-info text-white">
                                                    <span>
                                                        <h5 className="text-uppercase font-weight-bold">{value.title}</h5>
                                                    </span>

                                                </div>
                                                <div className="card-body">
                                                    <blockquote className="blockquote mb-0">
                                                        <p>{value.description}</p>
                                                        <footer className="blockquote-footer"> By <cite title="Source Title">{value.first_name + " " + value.last_name}</cite></footer>
                                                        {/* <button class="btn float-right" onClick={this.EditDisplay}><i class="fas fa-pencil-alt"></i></button> */}
                                                        <button class="btn float-right" onClick={this.DeleteDiscusssion}><i class="fa fa-trash"></i></button>
                                                        <button class="btn float-right"
                                                            data-toggle="collapse"
                                                            data-target={"#" + value._id}
                                                            onClick={() => { this.setState({ currentDiscussion: value }) }}><i class="fas fa-sort-down"></i>
                                                        </button>

                                                    </blockquote>
                                                </div>
                                            </button>
                                            <div id={value._id} className="collapse">
                                                <div class="card-footer" >
                                                    {
                                                        value.comments.map((com) => {
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
                                                                        <small className="float-right text-muted">{
                                                                           <ReactTimeAgo date={new Date(com.updatedAt)}/>
                                                                        }</small>
                                                                        <h6 className="mt-0 mb-1 text-muted">{com.first_name + " " + com.last_name}</h6>
                                                                        {com.comment}
                                                                        <button class="btn float-right" id={com._id} onClick={this.DeleteComment}><i class="fa fa-trash"></i></button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })

                                                    }
                                                </div>
                                                <div className="row mx-5">
                                                    <div className="col form-group">
                                                        <input type="text" className="col-8" name="comment" value={this.state.comment} placeholder="Enter comment" onChange={this.handleInputChange} />
                                                        <button type="submit" className="btn btn-primary col-3 offset-1" onClick={this.AddComment}>
                                                            Send
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <br></br>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>


            </div>
        );
    }
}

export default Forum

