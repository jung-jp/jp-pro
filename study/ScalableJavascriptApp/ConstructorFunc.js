var ConstructorFunc = function() {
    var _privateMember = 'private member';
}

ConstructorFunc.prototype.publicMember = 'public member';
ConstructorFunc.prototype.privilegedMethod = function() {
    return _privateMember;
};

var ConcreteClass = function() {
    // Constructor`s job
    var _privateMember = 'private member';
    return {
        __extends__ : AbstractClass,
        __implements__: [Countable, Traversable],
        __mixin__ : [Trait],
        publicMember : 'public member',
        privilegedMethod : function() {
            return _privateMember;
        }
    }
}


(function( global ) {
    "use strict";

    /**
    * Create instance of a given type and pass arguments to its constructor
    *
    * @see xObject.create
    * @param {function} constr - class object || {object} proto
    * @param {array} args - array of arguments
    * @return {object} instance
    */
    var createInstance = function( constr, args, props ) {
        var instance,
            members = ( typeof constr === 'function' ? constr.apply( constr.prototype, args || [] ) : constr ),
            Fn = funcion() {};

        // mix-in properties if any given
        xObject.mixin( members || {}, props || {} );

        // Inherit from a super type if any specified in __extends__ property
        if ( members.hasOwnProperty('__extends__') && members.__extends__ ) {
            constr.prototype = createInstance( members.__extends__, args );
        }

        // Copy given type prototype linking to a new constructor
        Fn.prototype = constr.prototype || {};
        // Mix-in members of given type to the new constructor's prototype
        xObject.mixin( Fn.prototype, members );
        instance = new Fn();
        // Call constructor function if any specified in __constructor__ property

        members.hasOwnProperty("__constructor__")
            && members.__constructor__.apply( instance, args || [] );

        return instance;
    }

    /**
    * Core factory method implementing controlled instation
    * xObject.create( constructor || proto [, argumentsArray, propertiesObject ])
    *
    * @param {function} constructor || {object} prototype
    * [@param {array} constructor arguments array]
    * [@param {object} properties object to mix-in]
    * @return (object) instance
    */
    xObject.create = function (constr, args, props) {
        // Plus few lines to validate input, and infer arguments by given type. E.g. if second parameter is an object that goes to props and means args = []
        return createInstance( constr, args, props );
    };

    global.xObject = xObject;

    return xObject;

})( this );
