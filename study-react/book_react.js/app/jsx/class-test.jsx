function A(a) {
    this.a = a;
}
A.prototype.printA = function() {
    console.log(this.a);
}

class B extends A
{
    constructor(a, b) {
        super(a);
        this.b = b;
    }

    printB() {
        console.log(this.b);
    }

    // prototype 영역이 아닌 함수 자신에게 추가됨.
    static sayHello() {
        console.log('안녕하세요.')
    }
}

class C extends B
{
    constructor(a, b, c) {
        super(a, b);
        this.c = c;
    }
    printC() {
        console.log(this.c);
    }

    printAll() {
        this.printC();
        this.printB();
        this.printA();
    }
}
