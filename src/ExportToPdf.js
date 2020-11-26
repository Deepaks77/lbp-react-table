import React, { Component } from "react";

class ExportToPdf extends Component {
  render() {
    return (
      <div>
        <table class="w3-table-all">
          <thead>
            <tr class="w3-light-grey">
              <th width="8px">User ID</th>
              <th>ID</th>
              <th>Title </th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {this.props.posts.map((post) => {
              return (
                <tr key={post.id}>
                  <td width="100px">{post.userId}</td>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ExportToPdf;
