'use strict';

arikaim.component.onLoaded(function() {
    safeCall('middlewareView',function(obj) {
        obj.initRows();
    },true);   
});