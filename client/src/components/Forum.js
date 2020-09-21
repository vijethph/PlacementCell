import React, { Component } from 'react'

class Forum extends Component {
    constructor() {
        super()

        this.state = {
            discussions: [],
            currentDiscussion: {
                _id: "",
                title: "",
                description: "",
                email: "",
                comments: []
            }

        }
    }
    componentDidMount() {
        var demo = {
            title: "Demo title",
            description: "Demo desc",
            first_name: "first",
            last_name: "last",
            email: "demo@gmail.com",
            comments: [{
                comment: "Demo comment",
                email: "demousercomment@gmail.com"
            }]
        }
        var demo2 = {
            title: "Demo title2",
            description: "Demo desc2",
            first_name: "first2",
            last_name: "last2",
            email: "demo@gmail.com2",
            comments: [{
                comment: "Demo comment2",
                email: "demousercomment@gmail.com2"
            }]
        }
        this.setState({ discussions: [demo, demo2] })
        //   getDiscussions().then(res=>{
        //     this.setState({discussions:res})
        //   })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md mt-5">
                        {
                            this.state.discussions.map((value) => {
                                return (
                                    <div className="row-md">
                                        <div className="card border-primary">
                                            <button className="btn"
                                                data-toggle="collapse"
                                                data-target="#abc"
                                                onClick={() => { this.setState({ currentDiscussion: value }) }}
                                            >
                                                <div className="card-header bg-info text-white">
                                                    <h5 className="text-uppercase font-weight-bold">{value.title}</h5>
                                                </div>
                                                <div className="card-body">
                                                    <blockquote class="blockquote mb-0">
                                                        <p>{value.description}</p>
                                                        <footer class="blockquote-footer"> By <cite title="Source Title">{value.first_name + " " + value.last_name}</cite></footer>
                                                    </blockquote>
                                                </div>
                                            </button>
                                            <div id="abc" className="collapse">
                                                <div class="card-footer">
                                                    {
                                                        value.comments.map((com) => {
                                                            return (
                                                                <div className="card">
                                                                    <div className="card-header">
                                                                        <p>Name</p>
                                                                    </div>
                                                                    <div className="card-body">
                                                                        <div className="row justify-content-between">
                                                                            <div className="col-xs-6"><p>Comment</p></div>
                                                                            <div className="col-xs-6"><a className="btn">Edit</a></div>
                                                                        </div>
                                                                    </div>
                                                                    {/* <div>{com.comment}</div>
                                                            <div>{com.email}</div> */}
                                                                </div>
                                                            )
                                                        })

                                                    }                                              
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

