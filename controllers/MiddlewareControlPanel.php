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
use Arikaim\Core\Utils\Factory;

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
        $this->onDataValid(function($data) {
            $name = $data->get('name');
        
            $packageManager = $this->get('packages')->create('module');
            $package = $packageManager->createPackage($name);
            if (\is_object($package) == false) {
                $this->error('errors.middleware.name');
                return false;
            }

            $fullClass = Factory::getModuleClass($name,$package->getClass());
            $middlewares = $this->get('config')->get('middleware',[]);
            $middlewares[] = $fullClass;
            $middlewares = \array_unique($middlewares);
            $this->get('config')['middleware'] = $middlewares;
            $this->get('config')->save();
            $this->get('cache')->clear();
           
            $this->setResponse(true,function() {             
                $this
                    ->message('middleware.add');                  
            },'errors.middleware.add');
        });
        $data      
            ->addRule('text:min=2','name')           
            ->validate();    
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
        $this->onDataValid(function($data) {
            $class = $data->get('class');
           
            $middlewares = $this->get('config')->get('middleware',[]);
            
            if (($key = \array_search($class,$middlewares)) !== false) {
                unset($middlewares[$key]);
            }

            $this->get('config')['middleware'] = $middlewares;
            $this->get('config')->save();
            $this->get('cache')->clear();
            
            $this->setResponse(true,function() {             
                $this
                    ->message('middleware.delete');                  
            },'errors.middleware.delete');
        });
        $data      
            ->addRule('text:min=2','class')           
            ->validate();    
    }
}
