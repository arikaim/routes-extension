/**
 *  Arikaim
 *  @copyright  Copyright (c)  <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
 */
'use strict';

function RoutesView() {
    var self = this;

    this.init = function() {  
       
        $('.status-filter').on('change', function() {
            var value= $(this).val();         
            var searchData = self.createSearchFilter();   

            search.setSearch(searchData,'routes',function(result) {                  
                self.loadList();
            });  
        });
        
        $('.route-type-dropdown').on('change', function() {
            var value = $(this).val();        
            var searchData = self.createSearchFilter();      

            search.setSearch(searchData,'routes',function(result) {                  
                self.loadList();
            });  
        });

        $('#extensions_dropdown').on('change', function() {
            var value = $(this).val();               
            var searchData = self.createSearchFilter();

            search.setSearch(searchData,'routes',function(result) {                  
                self.loadList();
            });                        
        });      
    };

    this.createSearchFilter = function() {
        return {
            search: {
                type: $('.route-type-dropdown').val(),
                extension: $('#extensions_dropdown').val(),
                status: $('.status-filter').val()
            }
        };
    };

    this.loadList = function() {
        return arikaim.page.loadContent({
            id: 'routes_items',           
            component: 'routes::admin.routes.view.items',          
        },function(result) {
            self.initRows();          
           // paginator.reload(); 
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

        $('.status-dropdown').on('change', function() {
            var value = $(this).val();            
            var uuid = $(this).attr('uuid');

            routesControlPanel.setStatus(uuid,value);
        });       
    };

    this.loadDetails = function(uuid) {    
        return arikaim.page.loadContent({
            id: 'route_details',           
            component: 'routes::admin.routes.details',
            params: { 
                uuid: uuid 
            }            
        });  
    }
}

var routesView = createObject(RoutesView,ControlPanelView);

arikaim.component.onLoaded(function() {
    routesView.init();
});