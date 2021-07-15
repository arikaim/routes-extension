<?php
/**
 * Arikaim
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
 * 
*/
namespace Arikaim\Extensions\Routes;

use Arikaim\Core\Extension\Extension;

/**
 * Routes extension
*/
class Routes extends Extension
{
    /**
     * Install extension routes, events, jobs
     *
     * @return void
    */
    public function install()
    {         
        // Control Panel
        $this->addAdminApiRoute('PUT','/api/admin/routes/status','RoutesControlPanel','setStatus');   
        $this->addAdminApiRoute('POST','/api/admin/routes/middleware/add','MiddlewareControlPanel','add');  
        $this->addAdminApiRoute('PUT','/api/admin/routes/middleware/delete','MiddlewareControlPanel','delete');   
    }   

    /**
     * UnInstall extension
     *
     * @return void
    */
    public function unInstall()
    {  
    }
}
