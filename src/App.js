import "./App.css";
import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import axios from "axios";

function App() {
  const [records, setRecords] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(10);
  const [totalItemsCount, setTotalItemsCount] = useState(200);
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(10);

  const fetchData = async (pageNumber) => {
    await axios
      .get(
        `https://api.instantwebtools.net/v1/passenger?page=${pageNumber}` +
          "&size=10"
      )
      .then((res) => {
        setRecords(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = async (pageNumber) => {
    await fetchData(pageNumber);
  };

  const covidData = records.map(function (item, index) {
    return (
      <tr key={item._id}>
        <td> {item.airline.country}</td>
        <td> {item.airline.established}</td>
        <td> {item.airline.head_quaters}</td>

        <td> {item.airline.name}</td>
        <td> {item.airline.slogan}</td>
        <td> {item.airline.website}</td>

        <td> {item.trips}</td>
      </tr>
    );
  });

  return (
    <div className="App">
      <h1>Pagination Example</h1>
      <div className="row justify-content-center">
        <div className="col-auto">
          <table className="table table-responsive">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Country</th>
                <th scope="col">Established</th>
                <th scope="col">Head Quaters</th>

                <th scope="col">Name</th>
                <th scope="col">Slogan</th>
                <th scope="col">Website</th>
                <th scope="col">Trips</th>
              </tr>
            </thead>
            <tbody> {covidData} </tbody>
          </table>

          <div className="container-fluid mb-2 mt-1 ">
            <div className="row align-items-center">
              <div className="col-md-4 col-sm-12">
                {/* <h6>
                    Showing {this.state.currentPage} to{" "}
                    {this.state.totalPages + " "}
                    of {this.state.totalItems} entries
                  </h6> */}
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="float-md-right">
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={totalItemsCount}
                    pageRangeDisplayed={pageRangeDisplayed}
                    onChange={(e) => handlePageChange(e)}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
