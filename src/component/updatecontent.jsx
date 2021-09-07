import React, { Component } from "react";

class UpdateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.data.title,
      desc: this.props.data.desc,
    };
    // 바인드 설정을 한 번에 해줄 수 있다.
    this.onChange = this.onChange.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <article>
        <h1>Update</h1>
        {/* form tag에선 submit 버튼을 눌렀을 시에 action에 작성한 페이지로 화면이 이동되기 때문에 preventDefault 작업이 필요(리엑트에서 화면전환 없이 모든 일을 할 수 있는 어플리케이션을 만들기 위해) */}
        <form
          action="/create_process"
          method="post"
          onSubmit={function (event) {
            event.preventDefault();
            alert("update submit!!!");
            this.props.doUpdate(
              this.props.data.id,
              this.state.title,
              this.state.desc
            );
          }.bind(this)}
        >
          <p>
            <input
              type="text"
              name="title"
              placeholder="title"
              value={
                this.state.title
                // this.props.contents[this.props.selected_content_id - 1].title
              }
              onChange={this.onChange}
            ></input>
          </p>
          <p>
            <textarea
              type="text"
              name="desc"
              placeholder="desc"
              value={
                this.state.desc
                // this.props.contents[this.props.selected_content_id - 1].desc
              }
              onChange={this.onChange}
              // onChange={this.props.onChangeUpdate(
              //   this.props.selected_content_id,
              //   this.props.contents[this.props.selected_content_id - 1].title,
              //   this.props.contents[this.props.selected_content_id - 1].desc
              // )}
            ></textarea>
          </p>
          <p>
            <input type="submit"></input>
          </p>
        </form>
      </article>
    );
  }
}

export default UpdateContent;
