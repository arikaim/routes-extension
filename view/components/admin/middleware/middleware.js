/**
 *  Arikaim
 *  @copyright  Copyright (c) Konstantin Atanasov <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
 */
'use strict';

function MiddlewareControlPanel() {

    this.addRouteMiddleware = function(roudeUuid, className, onSuccess, onError) {
        var data = {
            class: className,
            uuid: roudeUuid
        };

        return arikaim.post('/api/admin/routes/middleware/route/add',data,onSuccess,onError);   
    }

    this.add = function(className, onSuccess, onError) {
        var data = {
            class: className
        };

        return arikaim.post('/api/admin/routes/middleware/add',data,onSuccess,onError);   
    }

    this.delete = function(middlewareClass, onSuccess, onError) {
        var data = {
            class: middlewareClass
        };

        return arikaim.put('/api/admin/routes/middleware/delete',data,onSuccess,onError);   
    }
}

var middlewareControlPanel = new MiddlewareControlPanel();
