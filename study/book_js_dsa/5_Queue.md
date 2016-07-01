# 5.큐
- 리스트의 일종으로 끝부분으로 데이터가 삽입되고 앞부분에서 데이터가 삭제되는 자료구조.
- 큐는 일어난 순서대로 데이터를 정장
- 선입선출(first in first out)

## 5.1 큐 동작
- 큐에 요소를 삽입하거나 삭제하는 것이 큐의 두가지 주요 동작이다.
- 인큐(enqueue) : 큐에 요소를 추가하는 동작
- 디큐(dequeue) : 큐에서 요소를 삭제하는 동작
- 기타 :
    - peek : 큐의 앞부분에 있는 요소 확인,
    - length : 큐에 얼마나 많은 요소가 있는 지확인
    - clear : 전체 삭제


 ## 5.2 배열 기반의 Queue 클래스 구현

 ```js
function Queue() {
    this.dataStore = [];
    this.enqueue = function(element) {
        this.dataStore.push(element);
    }
    this.dequeue = function() {
        return this.dataStore.shift();
    }
    this.front = function() {
        return this.dataStore[0];
    }
    this.back = function() {
        return this.dataStore[this.dataStore.length-1];
    }
    this.toString = function() {
        var retStr = "";
        for (var i = 0; i < this.dataStore.length; ++i) {
            retStr += this.dataStore[i] + "\n";
        }
        return retStr;
    }
    this.empty = function() {
        if ( this.dataStore.length == 0 ) {
            return true;
        } else {
            return false;
        }
    }
    this.count = function() {
        return this.dataStore.length;
    }
}
var q = new Queue();
q.enqueue('Meredith');
q.enqueue('Meredith22');
q.enqueue('Meredith33');
console.log(q.toString());
q.dequeue();
console.log(q.toString());
 ```

## 5.3 Queue클래스 사용하기: 스퀘어 댄스 파티에서 파트너 정하기.
- 줄을 선 첫 번째 남자와 여자가 파트너가 된다.
- 각각의 성별에서 다음으로 줄을 선 남녀가 앞으로 나오고,
- 줄이 줄어들면서 맨 앞줄에 남은 남자가 한 명도 없으면 이사실을 공지 한다.

## 댄서를 Dancer 객체에 저장한다.
```js
var dancerText = "
F Allison  McMillan
M Frank Opitz
M Mason McMillan
M Clyton Ruff
F Cheryl Fereback
";

function Dancer(name, sex) {
    this.name = name;
    this.sex = sex;
}

// 댄서 추가
function getDancers(males, femaales) {
    var names = dancerText.split("\n");
    for (var i = 0; i < names.length; ++i) {
        names[i] = names[i].trim();
    }

    for (var i = 0; i < names.length; ++i) {
        var dancer = names[i].split(" ");
        var sex = dancer[0];
        var name = dancer[1];
        if (sex == "F") {
            females.enqueue(new Dancer(name, sex));
        } else {
            males.enqueue(new Dancer(name, sex));
        }
    }
}

//남자 여자 짝을 찟고 이름 공표.
function dance(males, females) {
    console.log("The dance partners are : \n");
    var person = null;
    while ( !females.empty() && !males.empty() ) {
        person = females.dequeue();
        console.log("Females dancer is :" + person.name);

        person = males.dequeue();
        console.log("and males dancer is :" + males.name);
    }
}
```

## 5.4 큐로 데이터 정렬하기
- 데이터를 정렬할 때도 큐를 사용할 수 있다.
- 여러 큐를 이용해 펀치 카드 정렬을 시뮬레이션할 수 있다. 이와같은 정렬 기법을 기수 정렬(radix sort)라 한다.


```js
//큐를 이용한 기수정렬 구현.

function distribute(nums, queues, n, digit) {
    for ( var i = 0; i < n; ++i ) {
        if ( digit == 1 ) {
            queues[nums[i]%10].enqueue(nums[i]);
        } else {
            queues[Math.floor(nums[i] / 10)].enqueue(nums[i]);
        }
    }
}
function collect(queues, nums) {
    var i = 0;
    for ( var digit = 0; digit < 10; ++digit ) {
        while ( !queues[digit].empty() ) {
            nums[i++] = queues[digit].dequeue();
        }
    }
}
function dispArray(arr) {
    for ( var i = 0; i < arr.length; ++i ) {
        console.log(arr[i] + " ");
    }
}

var queues = [];
for ( var i = 0; i < 10; ++i ) {
    queues[i] = new Queue();
}

var nums = [];
for ( var i = 0; i < 10; ++i ) {
    nums[i] = Math.floor(Math.floor(Math.random() * 101));
}

dispArray(nums);
distribute(nums, queues, 10, 1);
collect(queues, nums);
distribute(nums, queues, 10, 10);
collect(queues, nums);
console.log('======sort======');
dispArray(nums);
```

## 5.5 우선순위 큐
- 보통 큐에서 요소를 삭제할 때는 먼저 삽입한 요소부터 삭제되지만, 우선순위 큐는 요소의 우선순위를 기준으로 삭제 순서를 결정한다.

```js
// code는 우선순위를 나타냄 (낮을수속 우선순위가 높다)
function Patient(name, code) {
    this.name = name;
    this.code = code;
}

function dequeue() {
    var entry = 0;
    for ( var i = 0; i < this.dataStore.length; ++i ) {
        if ( this.dataStore[0].code < this.dataStore[entry].code ) {
            entry = i;
        }
    }
    return this.dataStore.splice(entry, 1);
}

function toString() {
    var retStr = "";
    for ( var i = 0; i < this.dataStore.length; ++i ) {
        retStr += this.dataStore[i].name + " code : "
               +=  this.dataStore[i].code + "\n"
               ;
    }
    return retStr;
}
```
