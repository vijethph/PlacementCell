import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { getVideos } from './UserFunctions'

class VideosList extends Component {
  constructor() {
    super()
    
    this.state = {
      videos: [],
      currentVideo: {
        topic: "Quantitative Aptitude",
        subtopic: "Simple Interest and Compound Interest",
        link: "https://youtu.be/E3lJmCwUWZE"
      }
    }
  }
  componentDidMount(){
    getVideos().then(res=>{
      this.setState({videos:res})
    })
  }

  render(){
    return(
      <div className="container">
        <div className="row">

          <div className="col-md mt-5">

            <div className="card">
              <div className="card-header">
                <div className="row">
                  <ReactPlayer url={this.state.currentVideo.link} controls='true' />
                </div> 
              </div>
              <div className="card-body text-center text-white" style={{backgroundColor: 'grey'}}>
                <h5 className="card-title">{this.state.currentVideo.topic}</h5>
                <p className="card-text">{this.state.currentVideo.subtopic}</p>
              </div>
            </div>

          </div>

          <div className="col-md mt-5">

          {
            this.state.videos.map((value)=>{
              return (
                <div className="col btn" onClick={()=>{this.setState({currentVideo:value})}} >
                  <div className="card text-white" style={{backgroundColor: 'grey'}} >
                    <div className="card-body">
                      <h5 className="card-title">{value.topic}</h5>
                      <p className="card-text">{value.subtopic}</p>
                     </div>
                  </div>
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

export default VideosList
