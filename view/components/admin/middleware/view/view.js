/**
 *  Arikaim
 *  @copyright  Copyright (c) Konstantin Atanasov <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
 */
'use strict';

function MiddlewareView() {
    var self = this;

    this.init = function() {     
    };

    this.initRows = function() {
        arikaim.ui.button('.content-type-details',function(element) {
           
        });
    };    
}

var middlewareView = MiddlewareView(MiddlewareView,ControlPanelView);

arikaim.component.onLoaded(function() {
    middlewareView.init();
    middlewareView.initRows();
});