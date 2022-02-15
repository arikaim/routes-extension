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
        paginator.init('routes_items',"routes::admin.routes.view.items",'routes');  

        $('.status-filter').dropdown({
            onChange: function(value) {
                var searchData = self.createSearchFilter();            
                search.setSearch(searchData,'routes',function(result) {                  
                    self.loadList();
                });  
            }
        });
        
        $('.route-type-dropdown').dropdown({
            onChange: function(value) {
                var searchData = self.createSearchFilter();           
                search.setSearch(searchData,'routes',function(result) {                  
                    self.loadList();
                });  
            }
        });

        $('#extensions_dropdown').dropdown({
            onChange: function(value) {               
                var searchData = self.createSearchFilter();
                search.setSearch(searchData,'routes',function(result) {                  
                    self.loadList();
                });             
            }
        });
    };

    this.createSearchFilter = function() {
        var status = $('.status-filter').dropdown('get value');
        var extension = $('#extensions_dropdown').dropdown('get value');
        var type = $('.route-type-dropdown').dropdown('get value');

        return {
            search: {
                type: type,
                extension: extension,
                status: status
            }
        };
    };

    this.loadList = function() {
        return arikaim.page.loadContent({
            id: 'routes_items',           
            component: 'routes::admin.routes.view.items',          
        },function(result) {
            self.initRows();          
            paginator.reload(); 
        });  
    };

    this.initRows = function() {
        arikaim.ui.button('.route-details',function(element) {
            var uuid = $(element).attr('uuid');            
            self.loadDetails(uuid);
        });

        arikaim.ui.button('.route-middleware',function(element) {
            var uuid = $(element).attr('uuid');  
                      
            return arikaim.page.loadContent({
                id: 'route_details',           
                component: 'routes::admin.routes.middleware',
                params: { uuid: uuid }            
            }); 
        });

        $('.status-dropdown').dropdown({
            onChange: function(value) {               
                var uuid = $(this).attr('uuid');
                routesControlPanel.setStatus(uuid,value);
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