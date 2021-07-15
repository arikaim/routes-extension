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
        arikaim.ui.button('.install-middlware',function(element) {
            var name = $(element).attr('package-name');

            return middlewareControlPanel.add(name,function(result) {
                self.loadInstalled();
            });
        });

        arikaim.ui.button('.uninstall-middlware',function(element) {
            var middlewareClass = $(element).attr('middleware-class');

            return middlewareControlPanel.delete(middlewareClass,function(result) {
                self.loadInstalled();
            });
        });
    };   
    
    this.loadInstalled = function() {
        return arikaim.page.loadContent({
            id: 'installed_list',           
            component: 'routes::admin.middleware.installed',          
        },function(result) {
            self.initRows();             
        }); 
    }
}

var middlewareView = createObject(MiddlewareView,ControlPanelView);

arikaim.component.onLoaded(function() {
    middlewareView.init();
    middlewareView.initRows();
});