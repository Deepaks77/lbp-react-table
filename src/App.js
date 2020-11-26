import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import ExportToExcel from "./ExportToExcel";
import "./App.css";
import ReactToPrint from "react-to-print";
import ExportToPdf from "./ExportToPdf";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/posts";

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((posts) => {
        this.setState({ posts: posts });
      });
  }

  deletePoste(id) {
    const index = this.state.posts.findIndex((post) => {
      return post.id === id;
    });
    this.state.posts.splice(index, 1);
    this.setState({ posts: this.state.posts });
  }

  render() {
    const data = this.state.posts;
    const columns = [
      {
        Header: "userID",
        accessor: "userId",
        style: {
          textAlign: "right",
        },
        width: 100,
      },
      {
        Header: "ID",
        accessor: "id",
        style: {
          textAlign: "right",
        },
        width: 50,
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Content",
        accessor: "body",
      },
      {
        Header: "Actions",
        filterable: false,
        sortable: false,
        resizable: false,
        Cell: (porps) => {
          return (
            <button
              style={{ background: "red", color: "#fefefe" }}
              onClick={(e) => {
                this.deletePoste(porps.original.id);
              }}
            >
              Delete
            </button>
          );
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100,
      },
    ];
    return (
      <div>
        <ReactTable
          className="-striped -highlight"
          data={data}
          filterable
          columns={columns}
          defaultPageSize={10}
        >
          {(state, makeTable, instance) => {
            this.reactTable = state.data.map((modem) => {
              return modem;
            });
            return (
              <div>
                {makeTable()}
                <ExportToExcel posts={this.reactTable} />
                <ReactToPrint
                  trigger={() => {
                    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                    // to the root node of the returned component as it will be overwritten.
                    return <a href="#">Print this out!</a>;
                  }}
                  content={() => this.componentRef}
                />
                <ExportToPdf
                  posts={this.reactTable}
                  ref={(el) => (this.componentRef = el)}
                />
              </div>
            );
          }}
        </ReactTable>
      </div>
    );
  }
}

export default App;
