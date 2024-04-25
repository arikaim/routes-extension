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
     * Add global middleware
     *
     * @param \Psr\Http\Message\ServerRequestInterface $request
     * @param \Psr\Http\Message\ResponseInterface $response
     * @param Validator $data
     * @return Psr\Http\Message\ResponseInterface
    */
    public function addController($request, $response, $data) 
    {    
        $data      
            ->addRule('text:min=2','class')           
            ->validate(true); 
    
        $class = $data->get('class');
        if (\class_exists($class) == false) {
            $this->error('Not vlaid class name');
            return;
        }
        
        $middlewares = $this->get('config')->get('middleware',[]);
        
        $handlers = \array_column($middlewares,'handler');
        if (($key = \array_search($class,$handlers)) !== false) {
            unset($middlewares[$key]);
        }

        $middlewares[] = [
            'handler' => $class,
            'options' => []
        ];

        $this->get('config')['middleware'] = $middlewares;
        $this->get('config')->save();
        $this->get('cache')->clear();
        
        $this->setResponse(true,function() {             
            $this
                ->message('middleware.add');                  
        },'errors.middleware.add');     
    }

    /**
     * Delete global middleware
     *
     * @param \Psr\Http\Message\ServerRequestInterface $request
     * @param \Psr\Http\Message\ResponseInterface $response
     * @param Validator $data
     * @return Psr\Http\Message\ResponseInterface
    */
    public function deleteController($request, $response, $data) 
    {    
        $data      
            ->addRule('text:min=2','class')           
            ->validate(true);    
      
        $class = $data->get('class');
        $middlewares = $this->get('config')->get('middleware',[]);
        $handlers = \array_column($middlewares,'handler');
        if (($key = \array_search($class,$handlers)) !== false) {
            unset($middlewares[$key]);
        }

        $this->get('config')['middleware'] = $middlewares;
        $this->get('config')->save();
        $this->get('cache')->clear();
        
        $this->setResponse(true,function() {             
            $this
                ->message('middleware.delete');                  
        },'errors.middleware.delete');       
    }
}
