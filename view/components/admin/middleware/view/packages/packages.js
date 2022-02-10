'use strict';

arikaim.component.onLoaded(function() {
    $('#extensions_dropdown').dropdown({
        onChange: function(name) {                      
            arikaim.page.loadContent({
                id: 'middleware_classes',
                component: "routes::admin.middleware.view.items",
                params: { 
                    package_name : name,                  
                    package_type : 'extension' 
                },
                useHeader: true
            });     
        }
    });  
    
    $('#modules_dropdown').dropdown({
        onChange: function(name) {              
            arikaim.page.loadContent({
                id: 'middleware_classes',
                component: "routes::admin.middleware.view.items",
                params: { 
                    package_name : name,                  
                    package_type : 'module' 
                },
                useHeader: true
            });      
        }
    }); 
});