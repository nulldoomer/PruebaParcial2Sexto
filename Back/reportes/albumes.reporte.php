<?php
// require("fpdf/fpdf.php");
// require_once("../models/album.model.php");
// require_once("../models/artista.model.php");
// $pdf = new FPDF();
// $pdf->AddPage();  

// $album = new Album();
// $artista = new Artista();

// $id = 0;
// $id_artista = 0;

// $Album = mysqli_fetch_assoc($album->uno($id));
// $Artista = mysqli_fetch_assoc($artista->uno($id_artista));
// if($id>0){

// }

// $pdf->SetFont("Arial", "B", 16);
// $pdf->Cell(0, 10, "Nuevo Album", 0, 1, 'C'); 

// $pdf->Ln(10);

// $pdf->SetFont("Arial", "", 12);

// $pdf->Cell(0, 10, "Titulo:". $Album["titulo"],0, 1);

// // Género Musical
// $pdf->Cell(0, 10, "Genero Musical:".$Album["genero"], 0, 1);

// // Año de Lanzamiento
// $pdf->Cell(0, 10, "Ano Lanzamiento:". $Album["año_lanzamiento"], 0, 1);

// // Discográfica
// $pdf->Cell(0, 10, "Discografica:". $Album["discografica"], 0, 1);

// // Artista
// $pdf->Cell(0, 10, "Artista:".$Artista["nombre"], 0, 1);
// // Configurar fuente

// $pdf->Output("I", "Nuevo_Album.pdf");

