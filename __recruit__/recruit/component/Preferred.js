/**
 * Created by PhpStorm.
 * User: jp
 * Date: 2016-09-08
 */
define([
    'require', 'jquery', 'Component'
], function (require) {

    return require('Component').create({

        name : 'Preferred',

        init : function () {
            console.log('preferred init()');
        },

        render : function () {
            console.log('preferred render()');
        }
    });
});
