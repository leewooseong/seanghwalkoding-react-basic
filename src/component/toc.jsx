import { Component } from "react";

// table of class
class TOC extends Component {
  //   shouldComponentUpdate():
  //    -> 성능향상을 위해서 컴포넌트의 렌더 함수가 실행될 지 않을 지를 개발자가 제어할 수 있게 해주는 것
  //    -> render 함수 이전에 선언되어져야 한다.
  //    -> return 값이 true면 render 함수 호출, false면 render 함수를 호출하지 않음
  //    -> 인자로 newProps와 newState를 받는다.
  // ex)
  shouldComponentUpdate(newProps, newState) {
    console.log(
      "===>TOC render shouldComponentUpdate",
      newProps.data,
      this.props.data
    );
    // 성능 향상 방법
    if (newProps.data === this.props.data) {
      return false;
    }
    return true;
  }
  render() {
    console.log("TOC render");
    let lists = [];
    let data = this.props.data;
    let i = 0;
    while (i < data.length) {
      lists.push(
        <li key={data[i].id}>
          {/* 
                i 값에 대한 고찰... 
                1. onChangePage 실행 시 변경된 i 값에 대한 data[i].id를 onChangePage의
            */}
          <a
            href={"content" + data[i].id}
            data-id={data[i].id}
            onClick={function (e) {
              //   console.log(i, "i 출력");
              //   debugger;
              e.preventDefault();
              this.props.onChangePage(e.target.dataset.id);
              //   this.props.onChangePage(data[i].id);
            }.bind(this)}
          >
            {data[i].title}
          </a>
        </li>
      );
      i = i + 1;
    }

    return (
      <nav>
        <ul>{lists}</ul>
      </nav>
    );
  }
}

export default TOC;
