<?php
require_once('../models/album.model.php');
error_reporting(0);
$Albumes = new Album();

switch ($_GET["op"]) {
    case 'todos':
        $datos = array();
        $datos = $Albumes->todos();

        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno':
        $album_id = $_POST["album_id"];
        $datos = $Albumes->uno($album_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar':
        $titulo = $_POST["titulo"];
        $genero = $_POST["genero"];
        $año_lanzamiento = $_POST["año_lanzamiento"];
        $discografica = $_POST["discografica"];
        $artista_id = $_POST["artista_id"];  // Captura del artista_id
        
        $datos = $Albumes->insertar($titulo, $genero, $año_lanzamiento, $discografica, $artista_id);
        echo json_encode($datos);
        break;

    case 'actualizar':
        $album_id = $_POST["album_id"];
        $titulo = $_POST["titulo"];
        $genero = $_POST["genero"];
        $año_lanzamiento = $_POST["año_lanzamiento"];
        $discografica = $_POST["discografica"];
        $artista_id = $_POST["artista_id"];  // Captura del artista_id

        $result = $Albumes->actualizar($album_id, $titulo, $genero, $año_lanzamiento, $discografica, $artista_id);
        echo json_encode($result);
        break;

    case 'eliminar':
        $album_id = $_POST["album_id"];
        $datos = $Albumes->eliminar($album_id);
        echo json_encode($datos);
        break;
}

