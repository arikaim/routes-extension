'use strict';

arikaim.component.onLoaded(function() {
    var routeUuid = $('#middleware_classes').attr('route-uuid');
    var type = $('#middleware_classes').attr('middleware-type');

    $('#extensions').on('change',function() {
        var name = $(this).val();
                 
        arikaim.page.loadContent({
            id: 'middleware_classes',
            component: "routes::admin.middleware.view.items",
            params: { 
                package_name : name,  
                route_uuid: routeUuid,
                type: type,                   
                package_type : 'extension' 
            }
        },function() {
            middlewareView.initRows();
        });           
    });  
    
    $('#modules').on('change',function() {
        var name = $(this).val();

        arikaim.page.loadContent({
            id: 'middleware_classes',
            component: "routes::admin.middleware.view.items",
            params: { 
                package_name: name,   
                route_uuid: routeUuid,
                type: type,                    
                package_type : 'module' 
            }
        },function() {
            middlewareView.initRows();
        });             
    }); 
});