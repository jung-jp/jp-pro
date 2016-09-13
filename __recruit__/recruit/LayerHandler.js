/*jshint -W100*/
var LayerHandler = {
    truncateRules: {},
    layerOnDimmed: null,
    rootLayerSelector: 'body',
    bindRootClickEvent: function () {
        var self = this;
        jQuery(this.rootLayerSelector).on('click', function () {
            self.truncate();
        });

        $( document ).on( 'keydown', function (e) {
            if (self.layerOnDimmed) {
                var keyCode = e.keyCode || e.which;
                if (keyCode === 27) { // ESC
                    self.hideLayerOnDimmed();
                }
            }
        });

    },
    truncate : function () {
        var truncateRule;

        for (var i in this.truncateRules) {
            if (!this.truncateRules.hasOwnProperty(i)) {
                continue;
            }

            truncateRule = this.truncateRules[i];
            if (truncateRule.execute) {
                truncateRule.execute();
            }
        }
        this.truncateRules = {};
    },
    addTruncateFuntion: function (truncateRuleObj) {
        if (!this.truncateRules[truncateRuleObj.id]) {
            this.truncateRules[truncateRuleObj.id] = truncateRuleObj;
        }
    },
    hideLayerOnDimmed: function () {
        $('#dimmed').hide();
        if (this.layerOnDimmed) {
            this.layerOnDimmed.hide();
            this.layerOnDimmed = null;
        }
    },
    showLayerOnDimmed: function ($layer) {
        var self = this;

        $('#dimmed').show();

        this.layerOnDimmed = $layer;
        $layer.show();
        $layer.on('click', function (e) {
            if ($(e.target).hasClass('_close_layer')) {
                self.hideLayerOnDimmed();
            }
        });
    }
};

define && define(function(){return LayerHandler;});
