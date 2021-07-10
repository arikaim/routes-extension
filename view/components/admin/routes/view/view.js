/**
 *  Arikaim
 *  @copyright  Copyright (c) Konstantin Atanasov <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
 */
'use strict';

function RoutesView() {
    var self = this;

    this.init = function() {  
        $('.status-filter').dropdown({});
    };

    this.initRows = function() {
        arikaim.ui.button('.route-details',function(element) {
            var uuid = $(element).attr('uuid');            
            self.loadDetails(uuid);
        });
        $('.status-dropdown').dropdown({
            onChange: function(value) {               
                var uuid = $(this).attr('uuid');
                usersAdmin.setStatus(uuid,value);
            }
        });
    };

    this.loadDetails = function(uuid) {    
        return arikaim.page.loadContent({
            id: 'route_details',           
            component: 'routes::admin.routes.details',
            params: { uuid: uuid }            
        });  
    }
}

var routesView = createObject(RoutesView,ControlPanelView);

arikaim.component.onLoaded(function() {
    routesView.init();
    routesView.initRows();
});