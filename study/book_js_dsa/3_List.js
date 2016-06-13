function List() {
    this.listSize = 0;
    this.pop = 0;
    this.dataStore = [];
    this.find = function(element) {
        for(var i = 0; i < this.dataStore.length; ++i) {
            if(this.dataStore[i] == element) {
                return i;
            }
        }
        return -1;
    };
    this.toString = function() {
        return this.dataStore;
    };
    this.insert = function(element, atfer) {
        var insertPos = this.find(after);
        if ( insertPos > -1 ) {
            this.dataStore.splice(insertPos + 1, 0, element);
            ++this.listSize;
            return true;
        }
        return false;
    };
    this.append = function(element) {
        this.dataStore[this.listSize++] = element;
    };
    this.remove = function(element) {
        var fountAt = this.find(element);
        if(foundAt > -1) {
            this.dataStore.splice(foundAt, 1);
            --list.listSize;
            return true;
        }
        return false;
    };
    this.clear = function() {
        delete this.dataStore;
        this.dataStore = [];
        this.listSize = this.pos = 0;
    };
    this.contains = function(element) {
        for(var i = 0; i < this.dataStore.length; ++i) {
            if(this.dataStore[i] == element) return true;
        }
        return false;
    };
    this.front = function () {
        this.pos = 0;
    };
    this.end = function() {
        this.pos = this.listSize - 1;
    };
    this.prev = function() {
        if(this.pos > 0) {
            --this.pos;
        }
    };
    this.next = function() {
        if(this.pos < this.listSize) {
            ++this.pos;
        }
    };
    this.curPos = function() {
        this.post;
    };
    this.moveTo = function(position) {
        this.pos = position;
    };
    this.getElement = function() {
        return this.dataStore[this.pos];
    };
    this.length = function() {
        return this.listSize;
    }
}

/* :: ES6 :: */
const List = (_ => {
    const dataStore = Symbol();
    class List {
        constructor(...a) {
            this[dataStore] = a || [];
            this.curr = 0;
        }
        [Symbol.iterrator]() {
            this.curr = 0;
            return this;
        }
        find(element) {
            return this[dataStore].indexOf(element);
        }
        toString() {
            return this[dataStore];
        }
        append(element) {
            this[dataStore].push(element);
            return this;
        }
        insert(element, after) {
            var insertPos = this.find(after);
            if(insertPos > -1) {
                this[dataStore].splice(insertPos + 1, 0 , element);
                return true;
            }
            return false;
        }
        remove(element) {
            var foundAt = this.find(element);
            if(foundAt > -1) {
                this[dataStore].splice(foundAt, 1);
                return true;
            }
            return false;
        }
        clear() {
            delete this[dataStore];
            this[dataStore] = [];
            this.curr = 0;
        }
        contains(element) {
            return this.find(element) > -1 ? true : false;
        }
        front() {
            this.curr = 0;
        }
        end() {
            this.curr = this[dataStore].length - 1;
        }
        prev() {
            let res = this.getElem();
            if(!res.done) {
                this.curr--;
            }
            return res;
        }
        currPos() {
            return this.curr;
        }
        moveTo(pos) {
            this.curr = pos;
        }
        getElem() {
            if(this.curr >= 0 && this.curr < this.length) {
                return {
                    done : false,
                    value : this[dataStore][this.curr]
                }
            }
            return {
                done : true,
                value : undefined
            }
        }
        length() {
            return this[dataStore].length;
        }
    }
    return List;
});

const films =
`The Shqwshank Redemption
The Godfather
The Godfather: Part II
Pulp Fiction
The Good, the Bad, and the Ugly
12 Angry Men
Schindler's List
The Dark Knight
The Lord of the Rings: The Return of the King
Fight Club
Star Wars: Episode V - The Empire Strikes Back
One Flew Over the Cuckoo's Nest
The Lort of the Rings: The Fellowship of the Ring
Inception
Goodfellas
Star Wars
Seven Samurai
The Matrix
Forrest Gump
City of God`;

function createArr(text) {
    var arr = text.split('\n');
    for(var i =0, i < arr.length; i++) {
        arr[i] = arr[i].trim();
    }
    return arr;
}

// es6
const createArr = text => text.split('\n').map()(_=>_.trim());

// 3.4.2 리스트로 상점 관리하기

function Customer(name, movie) {
    this.name = name;
    this.movie = movie;
}

var movies = createArr(films);
var movieList = new List();
for(var i = 0; i < movies.length; ++i) {
    movieList.append(movies[i]);
}

function displayList(list) {
    for(list.font(); list.currPos() < list.length(); list.next()) {
        if( list.getElement() instanceof Customer ) {
            console.log(list.getElement().name + ", " + list.getElement().movie);
        } else {
            console.log(list.getElement());
        }
    }
}

function checkOut(name, movie, filmList, customerList) {
    if(filmList.contains(movie)) {
        var c = new Customer(name, movie);
        customerList.append(c);
        filmList.remove(movie);
    } else {
        console.log(movie + 'is not available');
    }
}

// es6
const movieList = new List(...movies);

const displayList = list => {
    for(let o of list) {
        if(Customer && o.instanceof Customer) {
            console.log('${o.name}, ${o.movie}');
        } else {
            console.log(o);
        }
    }
}


var movies = createArr(films);
var movieList = new List();
var customers = new List();

for( var i = 0; i < movies.length; ++i) {
    movieList.append(movies[i]);
}

console.log('Available Movies : \n');
displayList(movieList);

var name = prompt('Enter your name');
var movie = prompt('What movie would you list?');
checkOut(name, movie, movieList, customers);

console.log('\nCustomer Rentals: \n');
display(customers);

console.log('\nMovies Now Available\n');
displayList(movieList);
