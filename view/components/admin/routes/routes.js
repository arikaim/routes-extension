/**
 *  Arikaim
 *  @copyright  Copyright (c)  <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
 */
'use strict';

function RoutesControlPanel() {
   
    this.setStatus = function(uuid, status, onSuccess, onError) {    
        return arikaim.put('/api/admin/routes/status',{ 
            status: status,
            uuid: uuid 
        },onSuccess,onError);           
    };
}

var routesControlPanel = new RoutesControlPanel();
