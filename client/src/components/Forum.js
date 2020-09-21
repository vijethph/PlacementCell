import React, { Component } from 'react'
import { postDiscussion } from './UserFunctions'
import { getDiscussion } from './UserFunctions'

class Forum extends Component {
    constructor() {
        super()
        this.state = {
            title: "",
            description: "",
            comment: "",
            discussions: [],
            currentDiscussion: {
                _id: "",
                title: "",
                description: "",
                first_name: "",
                last_name: "",
                email: "",
                comments: []
            }

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        getDiscussion().then(res => {
            console.log(res)
            this.setState({ discussions: res })
            //this.props.history.push(`/discussion`)
        })
    }



    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        }
        );
    }
    handleSubmit(event) {
        const newDiscussion = {
            "title": this.state.title,
            "description": this.state.description,
        }
        //alert('A name was submitted: ' + newDiscussion.title + " " + newDiscussion.description);
        postDiscussion(newDiscussion).then(res => {
            console.log(res)
            this.props.history.push(`/discussion`)
        })
        event.preventDefault();
    }



    render() {
        return (
            <div className="container">
                <div className="row text-center">
                    <h1>Post a query:</h1>
                </div>
                <br></br>

                <div className="row-12">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="text-muted">Title</label>
                            <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Description</label>
                            <textarea className="form-control" name="description" value={this.state.description} rows="7" onChange={this.handleInputChange}></textarea>
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">
                                Publish
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
                                        <div className="card border-primary">
                                            <button className="btn"
                                                data-toggle="collapse"
                                                data-target={"#" + value._id}
                                                onClick={() => { this.setState({ currentDiscussion: value }) }}
                                            >
                                                <div className="card-header bg-info text-white">
                                                    <h5 className="text-uppercase font-weight-bold">{value.title}</h5>
                                                </div>
                                                <div className="card-body">
                                                    <blockquote className="blockquote mb-0">
                                                        <p>{value.description}</p>
                                                        <footer className="blockquote-footer"> By <cite title="Source Title">{value.first_name + " " + value.last_name}</cite></footer>
                                                        <button class="btn "><i class="fas fa-pencil-alt"></i></button>
                                                        <button class="btn "><i class="fa fa-trash"></i></button>
                                                    </blockquote>
                                                </div>
                                            </button>
                                            <div id={value._id} className="collapse">
                                                <div class="card-footer">
                                                    {
                                                        value.comments.map((com) => {
                                                            return (
                                                                <div className="card">
                                                                    <div className="card-header">
                                                                        <p>{com.first_name + com.last_name}</p>
                                                                    </div>
                                                                    <div className="card-body">
                                                                        <div className="row">
                                                                            <div className="col-10"><p>{com.comment}</p></div>
                                                                            <button class="btn "><i class="fas fa-pencil-alt"></i></button>
                                                                            <button class="btn "><i class="fa fa-trash"></i></button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })

                                                    }
                                                </div>
                                                <div className="row mx-5">
                                                    <div className="col form-group">
                                                        <input type="text" className="col-8" name="comment" value={this.state.comment} placeholder="Enter comment" onChange={this.handleInputChange} />
                                                        <button type="submit" className="btn btn-primary col-3 offset-1">
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

