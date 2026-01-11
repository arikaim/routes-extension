<?php
/**
 * Arikaim
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
 * 
*/
namespace Arikaim\Extensions\Routes\Controllers;

use Arikaim\Core\Controllers\ControlPanelApiController;

/**
 * Routes control panel controler
*/
class RoutesControlPanel extends ControlPanelApiController
{
    /**
     * Init controller
     *
     * @return void
     */
    public function init()
    {
        $this->loadMessages('routes::admin.messages');
    }
    
    /**
     * Set route status
     *
     * @param \Psr\Http\Message\ServerRequestInterface $request
     * @param \Psr\Http\Message\ResponseInterface $response
     * @param \Arikaim\Core\Validator\Validator $data
     * @return mixed
    */
    public function setStatusController($request, $response, $data) 
    {    
        $data      
            ->addRule('text:min=2','uuid')           
            ->validate(true);    
     
        $uuid = $data->get('uuid');
        $status = $data->get('status');

        $result = $this->get('routes')->setRoutesStatus(['uuid' => $uuid],$status);   
        if ($result == false) {
            $this->error('errors.status');
            return;
        }
        
        $this->get('cache')->clear();    
        $this
            ->message('status')
            ->field('status',$status)
            ->field('uuid',$uuid);   
    }
}
