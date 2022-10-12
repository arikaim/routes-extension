/**
 *  Arikaim
 *  @copyright  Copyright (c)  <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
 */
'use strict';

function MiddlewareView() {
    var self = this;

    this.initRows = function() {

        arikaim.ui.button('.install-middleware',function(element) {
            var className = $(element).attr('class-name');
            var type = $(element).attr('middleware-type');

            if (type == 'route') {
                var routeUuid = $(element).attr('route-uuid');
                return middlewareControlPanel.addRouteMiddleware(routeUuid,className,function(result) {
                   
                });
            } else {
                return middlewareControlPanel.add(className,function(result) {
                    self.loadInstalled();
                });
            }           
        });

        arikaim.ui.button('.uninstall-middlware',function(element) {
            var middlewareClass = $(element).attr('middleware-class');
            var type = $(element).attr('middleware-type');

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
    middlewareView.initRows();
});