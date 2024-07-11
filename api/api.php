<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';
include 'libros.php';

$method=$_SERVER['REQUEST_METHOD'];

switch($method)
{
    case 'GET':
        handleGet($conn);
        break;
    case 'POST':
        handlePost($conn);
        break;
    case 'PUT':
        handlePut($conn);
        break;
    case 'DELETE':
        handleDelete($conn);
        break;
    default:
        echo json_encode(['message'=>'Método no válido']);
        break;
}

function handleGet($conn)
{
    $id=isset($_GET['id']) ? intval($_GET['id']) : 0;

    if($id>0)
    {
        $smtp=$conn->prepare("SELECT * FROM libros WHERE ID=?");
        $smtp->execute([$id]);
        $libro=$smtp->fetch(PDO::FETCH_ASSOC);
        if($libro)
        {
            $libroObj=Libros::fromArray($libro);
            echo json_encode($libroObj->toArray());
        }
        else
        {
            http_response_code(404);
            echo json_encode(['message'=>'Libro no encontrado']);
        }
    } 
    else 
    {
        $smtp=$conn->query("SELECT * FROM libros");
        $libro=$smtp->fetchAll(PDO::FETCH_ASSOC);
        $librosObj=array_map(fn($libro)=>Libros::fromArray($libro)->toArray(),$libro);
        echo json_encode(['libros'=>$librosObj]);
    }

}

function handlePost($conn)
{
    $data=json_decode(file_get_contents('php://input'),true);
    $requiredFields=['titulo','fecha_publicacion','genero'];

    foreach($requiredFields as $field)
    {
        if(!isset($data[$field]))
        {
            echo json_encode(['message'=>'Faltan datos']);
            return;
        }       
    }

    $libro=Libros::fromArray($data);
    try
    {
        $smtp=$conn->prepare("INSERT INTO libros (titulo, fecha_publicacion, genero, num_paginas, sinopsis, autor, editorial)
        VALUES (?,?,?,?,?,?,?)");
        $smtp->execute([
            $libro->titulo,
            $libro->fecha_publicacion,
            $libro->genero,
            $libro->num_paginas,
            $libro->sinopsis,
            $libro->autor,
            $libro->editorial,
        ]);
        
        
        echo json_encode(['message'=>'Libro ingresado correctamente']);
    }
    catch(PDOException $e)
    {
        echo json_encode(['message'=>'Error ingresando el libro','error'=>$e->getMessage()]);        
    }
}

function handlePut($conn)
{
    $id=isset($_GET['id']) ? intval($_GET['id']) : 0;
    if($id>0)
    {
        $data=json_decode(file_get_contents('php://input'),true);
        $libro=Libros::fromArray($data);
        $libro->id=$id;

        $fields=[];
        $params=[];

        if($libro->titulo !== null)
        {
            $fields[]='titulo=?';
            $params[]=$libro->titulo;
        }
        if($libro->fecha_publicacion !== null)
        {
            $fields[]='fecha_publicacion=?';
            $params[]=$libro->fecha_publicacion;
        }
        if($libro->genero !== null)
        {
            $fields[]='genero=?';
            $params[]=$libro->genero;
        }
        if($libro->num_paginas !== null)
        {
            $fields[]='num_paginas=?';
            $params[]=$libro->num_paginas;
        }
        if($libro->sinopsis !== null)
        {
            $fields[]='sinopsis=?';
            $params[]=$libro->sinopsis;
        }
        if($libro->autor !== null)
        {
            $fields[]='autor=?';
            $params[]=$libro->autor;
        }
        if($libro->editorial !== null)
        {
            $fields[]='editorial=?';
            $params[]=$libro->editorial;
        }
        if(!empty($fields))
        {
            $params[]=$id;
            $smtp=$conn->prepare("UPDATE libros SET " . implode(',',$fields) . "WHERE ID=?");
            $smtp->execute($params);
            echo json_encode(['message' => 'Libro actualizado con éxito.']);
        }
        else
        {
            echo json_encode(['message' => 'No hay campos para actualizar.']);
        }
    }
    else
    {
        echo json_encode(['message'=>'Id no encontrado.']);
    }
}

function handleDelete($conn)
{
    $id=isset($_GET['id']) ? intval($_GET['id']) : 0;

    if($id>0)
    {
        $smtp=$conn->prepare("DELETE FROM libros WHERE ID=?");
        $smtp->execute([$id]);
        echo json_encode(['message'=>'Libro eliminido con éxito.']);
    }
    else
    {
        echo json_encode(['message'=>'Id no encontrado.']);
    }

}

?>