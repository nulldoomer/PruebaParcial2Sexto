<?php
require_once('../config/config.php');

class Album {
    // Obtener todos los álbumes
    public function todos() {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `albumes`";
        $datos = mysqli_query($con, $cadena);

        $con->close();
        
        return $datos;
    }

    // Obtener un álbum por ID
    public function uno($album_id) {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $stmt = $con->prepare("SELECT * FROM `albumes` WHERE `album_id` = ?");
            $stmt->bind_param("i", $album_id);
            $stmt->execute();
            $datos = $stmt->get_result();

            return $datos;
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    // Insertar un nuevo álbum asociado a un artista
    public function insertar($titulo, $genero, $año_lanzamiento, $discografica, $artista_id) {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $stmt = $con->prepare("INSERT INTO `albumes` (`titulo`, `genero`, `año_lanzamiento`, `discografica`, `artista_id`) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("ssisi", $titulo, $genero, $año_lanzamiento, $discografica, $artista_id);
            
            if ($stmt->execute()) {
                return "insertado";
            } else {
                return $stmt->error;
            }
        } catch (Exception $th) {
            return $th->getMessage(); 
        } finally {
            $con->close(); 
        }
    }

    // Actualizar un álbum incluyendo el artista asociado
    public function actualizar($album_id, $titulo, $genero, $año_lanzamiento, $discografica, $artista_id) {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $stmt = $con->prepare("UPDATE `albumes` SET `titulo` = ?, `genero` = ?, `año_lanzamiento` = ?, `discografica` = ?, `artista_id` = ? WHERE `album_id` = ?");
            $stmt->bind_param("ssisii", $titulo, $genero, $año_lanzamiento, $discografica, $artista_id, $album_id);
            
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

    // Eliminar un álbum por ID
    public function eliminar($album_id) {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $stmt = $con->prepare("DELETE FROM `albumes` WHERE `album_id` = ?");
            $stmt->bind_param("i", $album_id);
            
            if ($stmt->execute()) {
                return "Eliminado";
            } else {
                return $stmt->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}

