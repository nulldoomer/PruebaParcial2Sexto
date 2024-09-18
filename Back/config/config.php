<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}
class ClaseConectar
{
    public $conexion;
    protected $db;
    private $host = "localhost";
    private $usuario = "root";
    private $pass = "";
    private $base = "prueba_parcial2";
    public function ProcedimientoParaConectar()
    {
        $this->conexion = mysqli_connect($this->host, $this->usuario, $this->pass, $this->base);
        mysqli_query($this->conexion, "SET NAMES 'utf8'");
        if ($this->conexion->connect_error) {
            die("Error al conectar con el servidor: " . $this->conexion->connect_error);
        }
        $this->db = $this->conexion;
        if ($this->db == false) die("Error al conectar con la base de datos: " . $this->conexion->connect_error);

        return $this->conexion;
    }
}
