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
 * Reports control panel controler
*/
class MiddlewareControlPanel extends ControlPanelApiController
{
    /**
     * Init controller
     *
     * @return void
     */
    public function init()
    {
        $this->loadMessages('reports::admin.messages');
    }
    
    /**
     * Update report
     *
     * @param \Psr\Http\Message\ServerRequestInterface $request
     * @param \Psr\Http\Message\ResponseInterface $response
     * @param Validator $data
     * @return Psr\Http\Message\ResponseInterface
    */
    public function updateController($request, $response, $data) 
    {    
        $this->onDataValid(function($data) {
            $uuid = $data->get('uuid');
           // $model = Model::Category('category')->findByid($uuid); 
           
            $result = false;
            $this->setResponse($result,function() {
               // $this->get('event')->dispatch('category.update',['uuid' => $model->uuid]);   
                $this
                    ->message('update');
                   // ->field('uuid',$model->uuid);   
            },'errors.update');
        });
        $data      
            ->addRule('text:min=2','title')
            ->addRule('text:min=2|max=2','language')
            ->validate();    
    }
}
