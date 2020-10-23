import React, { Component } from 'react';
import { getCompanies } from './UserFunctions';

class CompaniesList extends Component {
  constructor() {
    super()
    this.state = {
      companies: []
    }
  }

  componentDidMount() {
    getCompanies().then(res => {
      this.setState({ companies: res })
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row my-3">
          <h2>Visiting Companies</h2>
        </div>

        <div className="row">
          <table className="table table-hover table-bordered">
            <thead>
              <tr className="bg-info">
                <th scope="col">Company Name</th>
                <th scope="col">Category</th>
                <th scope="col">Branch</th>
                <th scope="col">Min. CGPA</th>
                <th scope="col">Backlog</th>
                <th scope="col">CTC</th>
                <th scope="col">Date Open</th>
                <th scope="col">Date Close</th>
                <th scope="col">Link</th>
              </tr>
            </thead>
            <tbody>
              {this.state.companies.map((listValue, index) => {
                return (
                  <tr key={index} scope="row">
                    <td>{listValue.company_name}</td>
                    <td>{listValue.category}</td>
                    <td>{listValue.branch}</td>
                    <td>{listValue.min_cgpa}</td>
                    <td>{listValue.backlog}</td>
                    <td>{listValue.ctc}</td>
                    <td>{new Date(listValue.date_open).toString()}</td>
                    <td>{new Date(listValue.date_close).toString()}</td>
                    <td><a href={listValue.link}>{listValue.link}</a></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    )
  }
}

export default CompaniesList
