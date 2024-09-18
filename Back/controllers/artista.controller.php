<?php
require_once('../models/artista.model.php');

$artistas = new Artista();


switch ($_GET["op"]) {
    case 'todos':
        $datos = array();
        $datos = $artistas->todos();

        while ($row = mysqli_fetch_assoc($datos)) 
        {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

     
        case 'uno':
            $artista_id = $_POST["artista_id"];
            $datos = $artistas->uno($artista_id);
            $res = mysqli_fetch_assoc($datos);
            echo json_encode($res);
            break;


            case 'insertar':
                $nombre = $_POST["nombre"];
                $apellido = $_POST["apellido"];
                $fecha_nacimiento = $_POST["fecha_nacimiento"];
                $nacionalidad = $_POST["nacionalidad"];
                
                $datos = $artistas->insertar($nombre, $apellido, $fecha_nacimiento, $nacionalidad);
                echo json_encode($datos);
                break;


                case 'actualizar':
                    $artista_id = $_POST["artista_id"];
                    $nombre = $_POST["nombre"];
                    $apellido = $_POST["apellido"];
                    $fecha_nacimiento = $_POST["fecha_nacimiento"];
                    $nacionalidad = $_POST["nacionalidad"];
                    
                    $result = $artistas->actualizar($artista_id, $nombre, $apellido, $fecha_nacimiento, $nacionalidad);
                    
                    echo json_encode($result);
                    break;

                    case 'eliminar':
                        $artista_id = $_POST["artista_id"];
                        $datos = $artistas->eliminar($artista_id);
                        echo json_encode($datos);
        break;      
            
}