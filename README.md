생활코딩 강의 내용 필기

- 4. npm? npx? -

npm: 프로그램을 설치하는 프로그램
방법: npm install -g(컴퓨터 어디서든 지 실행할 수 있게) create-react-app

npx: 프로그램을 임시로 설치해서 딱 한 번만 실행시키고 지우는 애(공간을 낭비하지 않는다. 실행할 때 마다 새로 다운받기 때문에 최신상태를 유지할 수 있다.)
방법: npx create-react-app

- 9. 배포하는 법 -

- 9.1 배포 -

create-react-app의 개발환경은 상당히 파일의 무게가 무겁다.(여러가지 기능을 많이 포함하고 있기 때문에)
-> 사용자들에게 이대로 배포해서는 않된다.
-> npm run build (용량을 줄일 수 있음\_배포용, 최종적으로 쓸 때는 빌드한 것을 사용해야한다.)
-> build 디렉터리가 생성됨(루트 폴더에 반드시 위치시켜야한다.)
-> build 디렉터리 안의 파일의 내용이 뭔가 이상??
-> 실제 production 환경에서 사용되는 app을 만들기 위해 이미 가지고 있는 파일에서 불필요하게 용량을 차지하는 부분(like 공백, 에러처리?, 심미적으로 보지 좋지 않은 부분?)을 삭제시켰기 때문

- 9.2 서버 -
  -> npm install -g serve or npx serve(얘는 일회용으로 사용할 때): npm을 통해 간단하게 설치할 수 있는 웹 서버

-> npx serve -s build: serve라는 웹서버를 다운로드 받아서 실행시킬 때 build라는 우리가 생성한 디렉터리를 document root로 하겠다.
-> 여기서 생성된 주소로 들어가서 확인해 보면 다운 받은 용량이 준 것을 확인할 수 있다.

- 10. -

public 디렉터리: npm run start를 했을 때 찾는 다큐먼트 루트?

- 12. props와 state의 핵심 내용 -

사용하는 쪽과 구현하는 쪽에 철철히 구분시켜서 양 쪽의 편의성을 각자 도모하기 위한 것
※ 사용하는 쪽(props), 구현하는 쪽(state)

- 16. 이벤트 -

  - 16.1 이벤트 state props 그리고 render 함수 -
    -> 이벤트를 무작정 추가하기 보다는 관련 state 처리후 이벤트를 달자!
    -> state에 대해 꼭 알아야 할 상식!
    -> state가 변경되면(물론 props도!) 그 컴포넌트 및 하위 컴포넌트의 render함수가 다시 호출된다.
    -> render가 다시 호출되는 이유:
    -> render 함수는 어떤 HTML을 그릴 것인가를 결정하는 함수이기 때문에 그릴 것이 바뀌면 다시 호출되는 것
  - 16.2 이벤트 설치 -
    -> event.preventDefault: 이벤트가 발생한 테그의 기본적인 동작을 막는 것!

- 17.3 컴포넌트 이벤트 만들기 -

-> event 객체의 target: 이벤트가 발생한 테그를 나타냄, 이를 통해 이것이 기리키는 테그의 속성 값을 얻을 수 있따.

-> e.target.dataset 이용법
-> https://velog.io/@hwang-eunji/React-HTML-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%84%B8%ED%8A%B8dataset-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
-> 이를 통해 값을 받아올 경우 string 값으로 값을 받아오게 된다. = 형변환이 필요하다.

- 18. 베이스 캠프 -

-> props는 read only, props를 받아쓰는 컴포넌트에서 수정할 수 없다.
-> props와 state 모두 render라는 함수를 유발하기 때문에

- 부모 컴포넌트와 자식 컴포넌트의 데이터 주고 받기

1. 부모 -> 자식: props로 state 정보를 넘겨줌
2. 자식 -> 부모: event를 통해 setstate를 사용해서 수정

- 19. CRUD -

- 19.1 create -

- 19.6 create 구현: contents 변경 -
  -> 무엇을 state로 정의하고 무엇을 변수로 정의할 것인가
  -> state는 UI에 직접적으로 영향을 주는 녀석들
  -> 변수는 UI에는 직접적으로 영향을 주지 않는 녀석들(아무것이나 state로 처리해버리면 불필요한 렌더링이 발생할 수 있다.)

-19.7 성능향상 -
shouldComponentUpdate():
-> 성능향상을 위해서 컴포넌트의 렌더 함수가 실행될 지 않을 지를 개발자가 제어할 수 있게 해주는 것
-> render 함수 이전에 선언되어져야 한다.
-> return 값이 true면 render 함수 호출, false면 render 함수를 호출하지 않음
-> 인자로 newProps와 newState를 받는다.
ex)
shouldComponentUpdate(newProps, newState){
console.log('===>TOC render shouldComponentUpdate', newProps.data, this.props.data);
// 성능 향상 방법
if (newProps.data === this.props.data){
return false;
}
return true;

        }
