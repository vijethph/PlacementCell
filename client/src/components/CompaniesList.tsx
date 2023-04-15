import { useEffect, useState } from "react";
import { getData } from "../services/UserFunctions";

interface ICompany {
  companyName: string;
  category: string;
  branch: string;

  minCGPA: number;
  backlog: number;

  CTC: string;
  dateOpen: Date;
  dateClose: Date;
  link: string;
}

const CompaniesList = () => {
  const [companies, setCompanies] = useState<ICompany[]>([]);

  useEffect(() => {
    let spinner = false;
    getData("companies").then((result: ICompany[]) => {
      if (!spinner) {
        setCompanies(result);
      }
    });

    return () => {
      spinner = true;
    };
  }, []);

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
            {companies.map((listValue, index) => {
              return (
                <tr key={index}>
                  <td>{listValue.companyName}</td>
                  <td>{listValue.category}</td>
                  <td>{listValue.branch}</td>
                  <td>{listValue.minCGPA}</td>
                  <td>{listValue.backlog}</td>
                  <td>{listValue.CTC}</td>
                  <td>{new Date(listValue.dateOpen).toString()}</td>
                  <td>{new Date(listValue.dateClose).toString()}</td>
                  <td>
                    <a href={listValue.link}>{listValue.link}</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompaniesList;
