<?php

class Libros 
{
    public $id;
    public $titulo;
    public $fecha_publicacion;
    public $genero;
    public $num_paginas;
    public $sinopsis;
    public $autor;
    public $editorial;

    public function __construct($id=null,$titulo,$fecha_publicacion,$genero,$num_paginas=null,$sinopsis=null,$autor=null,$editorial=null)
    {
        $this->id=$id;
        $this->titulo=$titulo;
        $this->fecha_publicacion=$fecha_publicacion;
        $this->genero=$genero;
        $this->num_paginas=$num_paginas;
        $this->sinopsis=$sinopsis;
        $this->autor=$autor;
        $this->editorial=$editorial;

    }

    public static function fromArray($data)
    {
        return new self
        (
            $data['id'] ?? null,
            $data['titulo'] ?? null,
            $data['fecha_publicacion'] ?? null,
            $data['genero'] ?? null,
            $data['num_paginas'] ?? null,
            $data['sinopsis'] ?? null,
            $data['autor'] ?? null,
            $data['editorial'] ?? null                                   
        );

        
    }

    public function toArray()
    {
        return get_object_vars($this);
    }
}
?>