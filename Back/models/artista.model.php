<?php
require_once('../config/config.php');

class Artista{
    public function todos(){
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `artistas`";
        $datos = mysqli_query($con, $cadena);

        $con->close();
        
        
        return $datos;
    }
    public function uno($artista_id){
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `artistas` WHERE `artista_id`=$artista_id";
        $datos = mysqli_query($con, $cadena);

        $con->close();


        return $datos;
    }

    public function insertar($nombre, $apellido, $fecha_nacimiento, $nacionalidad) {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            
            // Usar consultas preparadas para prevenir inyecciones SQL
            $stmt = $con->prepare("INSERT INTO `artistas` (`nombre`, `apellido`, `fecha_nacimiento`, `nacionalidad`) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $nombre, $apellido, $fecha_nacimiento, $nacionalidad);
            
            if ($stmt->execute()) {
                return  "insertado";
            } else {
                return $stmt->error;
            }
        } catch (Exception $th) {
            return $th->getMessage(); 
        } finally {
                $con->close(); 
        }
    }
    

    public function actualizar($artista_id, $nombre, $apellido, $fecha_nacimiento, $nacionalidad) {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            
            // Usar consultas preparadas para prevenir inyecciones SQL
            $stmt = $con->prepare("UPDATE `artistas` SET `nombre` = ?, `apellido` = ?, `fecha_nacimiento` = ?, `nacionalidad` = ? WHERE `artista_id` = ?");
            $stmt->bind_param("ssssi", $nombre, $apellido, $fecha_nacimiento, $nacionalidad, $artista_id);
            
            if ($stmt->execute()) {
                return "actualizado";
            } else {
                return $stmt->error;
            }
        } catch (Exception $th) {
            return $th->getMessage(); 
        } finally {
                $con->close(); 
        }
    }


    public function eliminar($artista_id){
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `artistas` WHERE `artista_id`= $artista_id";
            if (mysqli_query($con, $cadena)) {
                return "Eliminado";
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }






}