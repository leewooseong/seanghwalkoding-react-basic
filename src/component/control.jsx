import React, { Component } from "react";

class Control extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <a
              href=""
              onClick={function (event) {
                event.preventDefault();
                this.props.onChangeMode("create");
              }.bind(this)}
            >
              create
            </a>
          </li>
          <li>
            <a
              href=""
              onClick={function (event) {
                event.preventDefault();
                this.props.onChangeMode("update");
              }.bind(this)}
            >
              update
            </a>
          </li>
          <li>
            <a
              href=""
              onClick={function (event) {
                event.preventDefault();
                this.props.onChangeMode("welcome");
                console.log("onDeleteContent 함수 출력");
                this.props.onDeleteContent();
              }.bind(this)}
            >
              delete
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Control;
