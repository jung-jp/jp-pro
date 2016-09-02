function CommonComponent(elTarget, htOption) {
    this.htOption = htOption;
    this.htCacheData = {};
    this.elTarget = elTarget;
    this.init(htOption);

    this.COMPONENT_CONFIG = function(){

        return {
          PLUGINS: ['RecentWordPlugin', 'TTViewPlugin'],
            SELECTOR: {
        	  inputFieldWrap: '.input-wrap',
        	  inputField: '.input-field',
        	  autoCompleteWrap: '.auto-complete-wrap',
        	  closeLayer: '.close-layer',
        	  clearQueryBtn: '.clear-query',
        	  autoULWrap: '.auto-complete-wrap .ul-wrap',
        	  realForm: '#search-form'
        	},
        	DEFAULT_COMPONENT_EVENT: [
        	  'FN_AFTER_INSERT_AUTO_WORD',
        	  'FN_AFTER_SELECT_AUTO_WORD',
        	  'FN_AFTER_FOCUS',
        	  'FN_RUN_AJAX_EXECUTE'
        	],
        	DEFAULT_PLUGIN_EVENT: [
        	  'FN_AFTER_FOCUS',
        	  'FN_AFTER_INPUT',
        	  'FN_AFTER_SUBMIT',
        	  'FN_AFTER_AC_SHOW',
        	  'FN_AFTER_AC_NONE'
        	],
        	DEFAULT_OPTION: {
        	  'AjaxRequestType': 'jsonp',
        	  'sAutoCompleteURL': '',
        	  'jsonp_callbackName': ''
        	}
        }
    };
    
    this.init = function(htOption) {
        this.setInitValue();
        this.setOption(htOption, this._htDefaultOption, this.option);
        this.initValue();
        this.registerEvents();
    }

    this.setInitValue() {
        let DEFAULT_CORE_EVENT = ['FN_COMPONENT_DID_LOAD'];
        let _d = this.COMPONENT_CONFIG();
        this.bMainComponent = !!_d.PLUGINS;
        this._htDefaultOption = _d.DEFAULT_OPTION;
        this.aMyPluginName = _d.PLUGINS;
        this.htDefaultFn = this.getDefaultCallbackList(DEFAULT_CORE_EVENT.concat(_d.DEFAULT_COMPONENT_EVENT));

        if (this.bMainComponent) {
            this.htDefaultPluginFn = this.getDefaultCallbackList(DEFAULT_CORE_EVENT.concat(_d.DEFAULT_PLUGIN_EVENT));
        }

        this.htUserFn = {};
        this.htPluginFn = {};
        this.option = {};
    }


}
