/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { getData } from "../services/UserFunctions";

interface IVideo {
  _id: string;
  topic: string;
  subtopic: string;
  link: string;
}

export default function VideosList() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [currentVideo, setCurrentVideo] = useState<IVideo>();

  useEffect(() => {
    let spinner = false;
    getData("videos").then((result: IVideo[]) => {
      if (!spinner) {
        setVideos(result);
      }
    });

    return () => {
      spinner = true;
    };
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md mt-5">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <ReactPlayer url={currentVideo?.link} controls={true} />
              </div>
            </div>
            <div className="card-body text-center bg-primary text-white">
              <h5 className="card-title ">{currentVideo?.topic}</h5>
              <hr style={{ border: "1px solid black" }} />
              <p className="card-text">{currentVideo?.subtopic}</p>
            </div>
          </div>
        </div>
        <div className="col-md mt-5">
          {videos.map((value) => (
            <div key={value._id} role="button" tabIndex={0} className="col btn" onClick={() => setCurrentVideo(value)} onKeyUp={() => setCurrentVideo(value)}>
              <div className="card onHover">
                <div className="card-header bg-info text-white">
                  <h5>{value.topic}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">{value.subtopic}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
