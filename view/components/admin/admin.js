/**
 *  Arikaim
 *  @copyright  Copyright (c)  <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
 */
 'use strict';

 function MiddlewareControlPanel() {
 
     this.addRouteMiddleware = function(roudeUuid, className, onSuccess, onError) {
        return arikaim.post('/api/admin/routes/middleware/route/add',{
             class: className,
             uuid: roudeUuid
        },onSuccess,onError);   
     }
 
     this.add = function(className, onSuccess, onError) {
        return arikaim.post('/api/admin/routes/middleware/add',{
            class: className
        },onSuccess,onError);   
     }
 
     this.delete = function(middlewareClass, onSuccess, onError) {
        return arikaim.put('/api/admin/routes/middleware/delete',{
            class: middlewareClass
        },onSuccess,onError);   
     }
 }
 
var middlewareControlPanel = new MiddlewareControlPanel();
