/**
 * Created by PhpStorm.
 * User: jp
 * Date: 2016-09-08
 */
define([
    'require', 'jquery', 'Component'
], function (require) {
    return require('Component').create({

        name : 'Career',

        init : function () {
            console.log('Career init()');
            this.watchComponent(['JobCategory', 'Test']);
            this.registerEvent();
        },

        shouldUpdate : function() {

        },

        registerEvent : function() {
            $('#career').on('click', 'input[type=checkbox]', function(e) {
                var career = [];
                $(e.delegateTarget).find(':checkbox:checked').each(function() {
                    career.push(this.value);
                });
                this.setState(career);
                this.pullTrigger('test');
            }.bind(this));
        },

        render : function () {
            var state = this.getState();

            $('#career').find(':checkbox').each(function() {
                if ( state.indexOf(this.value) > -1 ) {
                    this.checked = true;
                }
            });

        }
    });
});























