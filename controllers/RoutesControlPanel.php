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

use Arikaim\Core\Db\Model;
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
     * Set status
     *
     * @param \Psr\Http\Message\ServerRequestInterface $request
     * @param \Psr\Http\Message\ResponseInterface $response
     * @param Validator $data
     * @return Psr\Http\Message\ResponseInterface
    */
    public function setStatusController($request, $response, $data) 
    {    
        $this->onDataValid(function($data) {
            $uuid = $data->get('uuid');
         
            $result = false;
            $this->setResponse($result,function() {
             
                $this
                    ->message('update');
                   // ->field('uuid',$model->uuid);   
            },'errors.update');
        });
        $data      
            ->addRule('text:min=2','uuid')           
            ->validate();    
    }
}
