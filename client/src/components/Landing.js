import React, { Component } from 'react'

class Landing extends Component {
  render() {
    return (
      <div className="row">
        <div className="col col-sm-6 align-self-center">
          <div className="container text-center">
            <h1 className="font-weight-bold">PLACEMENT CELL</h1>
            <p className="font-italic">Placement Cell plays a crucial role in locating job opportunities for Under Graduates and Post Graduates passing out from the college by keeping in touch with reputed firms and industrial establishments.</p>
          </div>

        </div>
        <div className="col-sm-6">
          <img src={require('../assets/img/placement-services.png')} className="img-fluid" alt="Placement" />
        </div>
      </div>
    )
  }
}

export default Landing
