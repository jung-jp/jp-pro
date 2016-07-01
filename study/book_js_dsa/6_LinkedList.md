## 연결리스트

### 6.1 배열의 단점
배열의 단점
- 대부분의 프로그래밍 언어에서 배열은 길이가 정해져 있어 배열이 꽉 차면 추가로 데이터를 입력하기 어렵다.
- 배열에 데이터를 추가 삭제시 나머지 요소를 이동해야 하므로 느리다.
- 자바스크립트 배열은 객체 이므로 c++등의 비해 효율이 떨어진다.
(연결 리스트는 리스트 요소의 임의 접근을 지원하지 않는다. 임의의 요소에 접근해야 할 때는 연결 리스트보다 배열이 좋다.)

### 6.2 연결 리스트 정의
노드(node)라 불리는 객체가 모여 연결 리스트를 구성한다. 각 노드는 객체 레퍼런스를 통해 리스트의 다른 노드와 연결된다.  
다른 노드를 참조하는 레퍼런스를 링크(link)라 한다.

인덱스로 요소를 참조할 수있는 배열과 달리, 연결 리스트는 다른 요소와의 관계를 통해 원하는 요소를 참조 할 수 있다.  
첫번째 노드에서 마지막 노드로 이동하는 방식으로 전체 요소를 확인할 수 있다.  
연결 리스트의 마지막은 Null로 끝나는데 이는 연결 리스트의 마지막을 가리킨다.

- 혜더 : **보통 연결 리스트를 어디서부터 시작할 것인가 하는 문제가 생기는데 헤더라고 불리는 특별한 노드를 이용해 연결 리스트의 시작 을 표현한다.**
- 추가 : 새노드 추가시 삽입하려는 노드의 이전노드 previous node 링크가 새 노드를 가리키도록 바꾸고, 새 노드의 링크는 이전 노드가 가리키도록 설정 한다.
- 삭제 : 삭제하려는 노드의 이전에 있는 노드 링크를 삭제하려는 노드가 가리키는 노드로 바꾼 다음. 삭제하려는 노드의 링크를 Null로 설정 한다.

### 6.3 객체 기반 연결 리스트 설계
연결리스트는 두 클래스를 만들어야 한다.
1. Node : 연결 리스트에 노드 정보를 담는 클래스
2. LinkedList : 노드의 삽입, 삭제, 리스트 출력, 기타 연결 리스트에 필요한 기능을 제공.

#### 6.3.1 Node 클래스
노드의 데이터를 저장하는 element와 연결 리스트의 다음 노드 링크 저장 하는 next 프로퍼티를 갖는다.
```js
function Node(element) {
    this.element = element;
    this.next = null;
}
```

#### 6.3.2 LList 연결 리스트 클래스
연결리스트 기능 제공.  
새노드의 삽입, 기존 노드의 삭제, 리스트의 특정 데이터 검색 등의 기능 제공.
연결 리스트에 프로퍼티는 리스트의 헤드를 나타내는 노드인 헤드 프로퍼티 하나만 포함한다.
```js
function LList() {
    this.head = new Node('head');
    this.find = function() {

    }
    this.insert = function() {

    }
    this.remove = function() {

    }
    this.display = function() {

    }
}
```

초기에는 head 노드의 next 프로퍼티를 null로 설정한다. 그리고 리스트에 노드가 추가되면 나중에 next 프로퍼티의 값을 바꾼다.

#### 6.3.3 새로운 노드 삽입하기
기존 노드의 뒤에 새 노드를 추가하려면 '기존' 노드를 찾아야 한다.  
특정 데이터를 포함하는 노드를 검색하는 헬퍼 함수 find()를 구현한다.  
데이터를 찾으면 find()함수는 해당 데이터를 저장하는 노드를 반환한다.

```js
function find(item) {
    var currNode = this.head;
    while (currNode.element != item) {
        currNode = currNode.next;
    }
    return currNode
}
```
새 노드를 만들고 head 노드로 설정 후 다음 노드로 반복 이동하면서 현재 노드의 element 프로퍼티가 탐색하려는 값과 같은 값을 포함 하는지 확인.

```js
function insert(newElement, item) {
    var newNode = new Node(newElement);
    var current = this.find(item);
    newNode.next = current.next;
    current.next = newNode;
}

function display() {
    var current = this.head;
    while ( !(currNode.next == null) ) {
        console.log(currNode.next.element);
        currNode = currNode.next;
    }
}
```

#### 6.3.4 연결 리스트에서 노드 삭제하기
노드에 이전 노드의 링크를 저장하는 프로퍼티를 추가한다.  
링크를 하나 더 추가하면 리스트에 노드를 추가할 때 더 많은 작업이 필요하다.  
대신 삭제할 때는 더 이상 이전 노드를 찾을 필요가 없으므로 삭제 과정은 더 간단해 진다.

```js

function Node(element) {
    this.element = element;
    this.next = null;
}
function LList() {
    this.head = new Node("head");
    this.find = function(item) {
        var currNode = this.head;
        while (currNode.element != item) {
            currNode = currNode.next;
        }
        return currNode
    }
    this.insert = function(newElement, item) {
        var newNode = new Node(newElement);
        var current = this.find(item);
        newNode.next = current.next;
        current.next = newNode;
    }
    this.remove = function(item) {
        var prevNode = this.findPrevious(item);
        if ( !(prevNode.next == null) ) {
            prevNode.next = prevNode.next.next;
        }
    }
    this.display = function() {
        var currNode = this.head;
        while ( !(currNode.next == null) ) {
            console.log(currNode.next.element);
            currNode = currNode.next;
        }
    }
    this.findPrevious = function(item) {
        var currNode = this.head;        
        while ( !(currNode.next == null)  
            && currNode.next.element != item) {
                currNode =  currNode.next;
        }
        return currNode;
    }
}

// 추가 테스트
var cities = new LList();
cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Alma", "Russellville");


// 삭제 테스트
var cities = new LList();
cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Carlisle", "Russellville");
cities.insert("Alma", "Carlisle");
cities.display();
console.log('-------------');

cities.remove("Carlisle");
cities.display();

```



### 6.4 양방향 연결 리스트

```js
function Node(element) {
    this.element = element;
    this.next = null;
    this.prev = null;
}

function insert(newElement, item) {
    var newNode = new Node(newElement);
    var currNode = this.find(item);
    newNode.next = currNode.next;
    newNode.prev = currNode.prev;
    currNode.next = newNode;
}

function remove(item) {
    var currNode = this.find(item);
    currNode.prev.next =  currNode.next;
    currNode.next.prev =  currNode.prev;
    currNode.next = null;
    currNode.prev = null;
}

function findLast() {
    var currNode = this.head;
    while ( !(currNode.next == null) ) {
        currNode = currNode.next;
    }
    return currNode;
}

function dispReverse() {
    currNode = this.head;
    currNode = this.findLsat();
    while( !(currNode.prev == null) ) {
        console.log(currNode.element);
        currNode = currNode.prev;
    }
}
```

양방향 령결리스트 전체 코드
```js

function Node(element) {
    this.element = element;
    this.next = null;
    this.previous = null;
}

function LList() {
    this.head = new Node('head');
    this.find = find;
    this.insert = insert;
    this.display = display;
    this.remove = remove;
    this.findLast = findLast;
    this.findPrevious = findPrevious;
    this.dispReverse = dispReverse;
}

function dispReverse() {
    var currNode = this.head;
    currNode = this.findLast();
    while (!(currNode.previous == null)) {
        console.log(currNode.element);
        currNode = currNode.previous;
    }   
}

function findLast() {
    var currNode = this.head;
    while (!(currNode.next == null)) {
        currNode = currNode.next;
    }
    return currNode;
}

function remove(item) {
    var currNode = this.find(item);
    if (!(currNode.next == null)) {
        currNode.previous.next = currNode.next;
        currNode.next.previous = currNode.previous;
        currNode.next = null;
        currNode.previous = null;
    }
}

//findPrevious는 더 이상 사용하지 않는다.
function findPrevious(item) {
    var currNode = this.head;
    while (!(currNode.next == null) && (currNode.next.element != item)) {
        currNode = currNode.next;
    }
    return currNode;
}

function display() {
    var currNode = this.head;
    while (!(currNode.next == null)) {
        console.log(currNode.next.element);
        currNode = currNode.next;
    }
}

function find(item) {
    var currNode = this.head;
    while (currNode.element != item) {
        currNode = currNode.next;
    }
    return currNode;
}

function insert(newElement, item) {
    var newNode = new Node(newElement);
    var current = this.find(item);
    newNode.next = current.next;
    newNode.previous = current;
    current.next = newNode;
}

var cities = new LList();
cities.insert('Conway','head');
cities.insert('Russellville','Conway');
cities.insert('Carlisle','Russellville');
cities.insert('Alma','Carlisle');
cities.display();
console.log();
cities.remove('Carlisle');
cities.display();
console.log();
cities.dispReverse();
```

### 6.5 순환형 연결 리스트
단방향 연결리스트와 비슷, 순환형 연결 리스트에서는 헤드의 next 프로퍼티가 자신을 가리킨다.
복잡한 양방향 연결 리스트를 만들지 않고도 간단하게 역방향으로 탐색할 수 있다는 것이 순환형 연결 리스트의 강점이다.

```js
function LList() {
    this.head = new Node('head');
    this.head.next = this.head;
}

// 순환형 연결리스트에 맞게 display 수정
function display() {
    var currNode = this.head;
    while( currNode != null && !(currNode.next.element == 'head') ) {
        currNode = currNode.next;
    }
}
```
