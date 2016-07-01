### CSS 트랜지션과 애니메이션의 기초

CSS를 이용한 애니메이션에는 CSS 트랜지션과 CSS 키프레임 애니메이션 두 가지 범주가 있다.
- CSS 트랜지션은 시작 상태와 종료상태의 두 가지 고유한 상태 간에 값을 보간하는 애니메이션 기법이다.
- CSS 키프레임 애니메이션은 시작과 종료 외에도 키프레임을 이용해 중간 단계를 제어하는 방법으로 더 복잡한 애니메이션을 만들 수 있게 해준다.

#### CSS 트랜지션
css 트랜지션은 tansition 속성을 이용해 제어한다.
이 속성은 브라우저가 해당 셀렉터 내의 속성 값을 지정한 시간 동안 보간해 에니메이션 효과를 만들게 한다.
- 애니메이션을 적용할 요소 속성 이름(예 color 또는 width). 생략하면 애니메이션 가능한 모든 속성이 대상이 된다.
- 애니메이션 지속 시간
- 가속 곡선을 제어할 선택적 타이밍 함수 (예 ease-in 및 ease-out)
- 애니메이션을 시작하기 전 선택적 지연 시간

```html
<!DOCTYPE html>
<html lang="kr">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
    a{
        font-family: Helvetica, Arial, sans-serif;
        text-decoration: none;
        color:#fff;
    }
    .button{
        padding: 0.75rem 1rem;
        border-radius:0.3rem;
        box-shadow:0;
        background-color: #bbb;
    }
    .button:hover{
        background-color: #e22;
        box-shadow: 0 4px #900;
        transition: 0.5s;
    }

    body {
        text-align: center;
    }
    @keyframes pulsing-heart {
        0% {transform : none;}
        50% {transform : scale(1.4);}
        100% {transform : none;}
    }
    .heart {
        font-size: 10rem;
        color: #f00;
        border : 1px solid red;
    }
    .heart:hover{
        animation : pulsing-heart .5s infinite;
        transform-origin: center;
    }
    </style>
</head>
<body>
    <a href="#" class="button">Hover Me!</a>
    <dir class="heart">&hearts;</dir>
</body>
</html>
```

#### 키프레임 애니메이션
브라우져가 모든 것을 처리하는 트랜지션 기법에 비해 애니메이션 시퀀스의 중간 단계를 훨씬 세부적으로 제어.
```css
@keyframes pulsing-heart {
    0% {transform : none;}
    50% {transform : scale(1.4);}
    100% {transform : none;}
}
```

#### 프로그래밍 방식으로 CSS 트랜지션과 애니메이션 시작

CSS 트랜지션과 애니메이션을 트리거하는 시점을 더 유연하게 제어하려면 자바스크립트를 이용해야 한다.
일반적으로 클래스 스와핑 기법을 사용한다.

#### ReactCSSTransitionGroup
애니메이션에 포한할 모든 컨포넌트를 래핑하며 컴포넌트 수명주기(예: 마운팅과 언마운팅)와 연관된 특정한 시점에 CSS 애니메이션과 트랜지션을 트리거하는 간단한 요소다.  
