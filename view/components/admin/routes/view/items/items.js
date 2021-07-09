'use strict';

arikaim.component.onLoaded(function() {
    safeCall('routesView',function(obj) {
        obj.initRows();
    },true);   
});