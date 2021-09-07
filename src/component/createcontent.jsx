import React, { Component } from "react";

class CreateContent extends Component {
  render() {
    return (
      <article>
        <h1>Create</h1>
        {/* form tag에선 submit 버튼을 눌렀을 시에 action에 작성한 페이지로 화면이 이동되기 때문에 preventDefault 작업이 필요(리엑트에서 화면전환 없이 모든 일을 할 수 있는 어플리케이션을 만들기 위해) */}
        <form
          action="/create_process"
          method="post"
          onSubmit={function (event) {
            event.preventDefault();
            alert("create submit!!!");
            console.log(
              "in create content",
              event.target[0].value,
              event.target[1].value
            );
            this.props.doCreate(event.target[0].value, event.target[1].value);
            console.log("stateContentData", this.props.stateContentData);
          }.bind(this)}
        >
          <p>
            <input type="text" name="title" placeholder="title"></input>
          </p>
          <p>
            <input type="text" name="desc" placeholder="desc"></input>
          </p>
          <p>
            <input type="submit"></input>
          </p>
        </form>
      </article>
    );
  }
}

export default CreateContent;
