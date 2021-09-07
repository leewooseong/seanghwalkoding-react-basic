import { Component } from "react";
import "./App.css";
import Subject from "./component/subject";
import Control from "./component/control";
import TOC from "./component/toc";
import ReadContent from "./component/readcontent";
import CreateContent from "./component/createcontent";
import UpdateContent from "./component/updatecontent";

// 컴포넌트 코드(not js code)
// 최신 js에선 class 안에 쓰인 function은 앞에 function을 생략해서 사용한다.
// 컴포넌트를 만들 때는 하나의 최상위 테그만 사용한다.
// 웹브라우저에서는 리액트가 최종적으로 html코드를 제공하기 때문에 react코드가 표시되지는 않는다.
class App extends Component {
  // 컴포넌트가 실행될 때 render함수보다 먼저 실행이 되면서 컴포넌트를 초기화하기 위한 코드를 여기에 작성
  constructor(props) {
    super(props);
    this.state = {
      mode: "read",
      subject: { title: "WEB", sub: "World wide web!" },
      selected_content_id: 2,
      contents: [
        { id: 1, title: "HTML", desc: "HTML is for imformation" },
        { id: 2, title: "CSS", desc: "CSS is for design" },
        { id: 3, title: "JavaScript", desc: "JavaScript is for interactive" },
      ],
      welcome: { title: "welcome", desc: "Hello, React!!!" },
    };
  }

  // 안되는 내코드..
  // onChangeUpdate = function (selected_id, selected_title, selected_desc) {
  //   this.setState(function (state) {
  //     console.log(state.contents, "in onChangeUpdate function");
  //     return {
  //       contents: [
  //         ...state.contents,
  //         { id: selected_id, title: selected_title, desc: selected_desc },
  //       ],
  //     };
  //   });
  // };

  getReadContent() {
    let i = 0;
    while (i < this.state.contents.length) {
      let data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
        break;
      }
      i = i + 1;
    }
  }

  getContent() {
    let _title,
      _desc,
      _article = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc} />;
    } else if (this.state.mode === "read") {
      let _content = this.getReadContent();
      console.log(
        _content,
        _content.title,
        _content.desc,
        "content 확인중입니다."
      );
      _article = <ReadContent title={_content.title} desc={_content.desc} />;
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContent
          doCreate={function (title, desc) {
            // 생활코딩 코드
            // newContentID = newContentID + 1;
            // let newContents = this.state.contents.concat({
            //   id: newContentID,
            //   title,
            //   desc,
            // });
            // this.setState({ contents: newContents });

            // 내 코드_concat 대신 push를 쓰는 경우 1. setState가 두 번 되는? 에러 발생 2. shouldComponentUpdate와 같이 shallow하게 비교하게 되면 같은 것으로 취급하게 된다.
            this.setState((state) => {
              console.log("in app component", title, desc);
              console.log(state);
              return {
                mode: "read",
                selected_content_id: state.contents.length + 1,
                contents: state.contents.concat({
                  id: state.contents.length + 1,
                  title: title,
                  desc: desc,
                }),
              };
            });
          }.bind(this)}
          stateContentData={this.state.contents}
        />
      );
    } else if (this.state.mode === "update") {
      let _content = this.getReadContent();
      _article = (
        <UpdateContent
          data={_content}
          selected_content_id={this.state.selected_content_id}
          contents={this.state.contents}
          onChangeUpdate={this.onChangeUpdate}
          doUpdate={function (id, title, desc) {
            this.setState({
              mode: "read",
              selected_content_id: id,
              contents: this.state.contents.map((item) => {
                if (item.id === id) {
                  return { id, title, desc };
                }
                return item;
              }),
            });
          }.bind(this)}
        />
      );
    }
    return _article;
  }

  render() {
    console.log("App render");

    return (
      // App의 하위 컴포넌트들에 상위 컴포넌트의 state를 props로 전달
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: "welcome" });
          }.bind(this)}
        />
        <Control
          onChangeMode={function (_mode) {
            this.setState({ mode: _mode });
          }.bind(this)}
          onDeleteContent={function () {
            let newContents = Array.from(this.state.contents);
            // let newContents = this.state.contents.remove({
            //   id: this.state.selected_content_id,
            //   title: this.state.contents[this.state.selected_content_id].title,
            //   desc: this.state.contents[this.state.selected_content_id].desc,
            // });

            newContents.splice(
              newContents.findIndex(
                (item) => item.id === this.state.selected_content_id
              ),
              1
            );

            this.setState((state) => ({
              mode: "welcome",
              contents: newContents,
            }));
          }.bind(this)}
        />
        <TOC
          onChangePage={function (id) {
            this.setState({ mode: "read", selected_content_id: Number(id) });
          }.bind(this)}
          data={this.state.contents}
        />
        {this.getContent()}
      </div>
    );
  }
}

export default App;
