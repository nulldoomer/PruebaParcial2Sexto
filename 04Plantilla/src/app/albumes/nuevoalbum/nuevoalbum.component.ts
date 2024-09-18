import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { IAlbumes } from 'src/app/Interfaces/Ialbumes';
import { IArtistas } from 'src/app/Interfaces/Iartistas';
import { AlbumesService } from 'src/app/Services/albumes.service';
import { ArtistasService } from 'src/app/Services/artistas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevoalbum',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nuevoalbum.component.html',
  styleUrl: './nuevoalbum.component.scss'
})
export class NuevoalbumComponent {
  listaArtistas : IArtistas[] = [];
  fmr_Album = new FormGroup({
    Titulo: new FormControl("", Validators.required),
    Genero: new FormControl("", Validators.required),
    Año_Lanzamiento: new FormControl("", Validators.required),
    Discografica: new FormControl("", Validators.required),
    Artista_id: new FormControl("", Validators.required),
  });
  album_id = 0;
  titulo = "Nuevo Album";
  constructor(
    private albumesServicio: AlbumesService,
    private artistasService: ArtistasService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.album_id = parseInt(this.ruta.snapshot.paramMap.get("id"));
    if (this.album_id > 0) {
      this.albumesServicio.uno(this.album_id).subscribe((unalbum) => {
        console.log(unalbum);
        this.fmr_Album.controls["Titulo"].setValue(unalbum.titulo);
        this.fmr_Album.controls["Genero"].setValue(unalbum.genero);
        this.fmr_Album.controls["Año_Lanzamiento"].setValue(unalbum.año_lanzamiento.toString());
        this.fmr_Album.controls["Discografica"].setValue(unalbum.discografica);
        this.fmr_Album.controls["Artista_id"].setValue(unalbum.artista_id.toString());


        this.titulo = "Editar Album";
      });
    }
    this.artistasService.todos().subscribe({
      next:(data)=>{
        this.listaArtistas = data;
      },
      error:(e)=>{
        console.log(e);
      }
    })
  }
  grabar() {
    let album: IAlbumes = {
      album_id: this.album_id,
      titulo: this.fmr_Album.controls["Titulo"].value,
      genero: this.fmr_Album.controls["Genero"].value,
      año_lanzamiento: parseInt(this.fmr_Album.controls["Año_Lanzamiento"].value),
      discografica: this.fmr_Album.controls["Discografica"].value,
      artista_id: parseInt(this.fmr_Album.controls["Artista_id"].value)
    };
    Swal.fire({
      title: 'Albumes',
      text: 'Desea gurdar al Album ' + this.fmr_Album.controls['Titulo'].value,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Grabar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.album_id > 0) {
          this.albumesServicio.actualizar(album).subscribe((res: any) => {
            Swal.fire({
              title: 'Albumes',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/albumes']);
          });
        } else {
          this.albumesServicio.insertar(album).subscribe((res: any) => {
            Swal.fire({
              title: 'Albumes',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/albumes']);
          });
        }
      }
    });
  }

  cambio(objetoSleect: any){
    let artista_id = objetoSleect.target.value;
    this.fmr_Album.get("Artista_id")?.setValue(artista_id);
  }

  generarPDF() {
    const artistaId = parseInt(this.fmr_Album.value.Artista_id);
    this.artistasService.uno(artistaId).subscribe({
      next: (artista) => {
        const doc = new jsPDF();
  
        // Título del documento
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(18);
        doc.text('Nuevo Álbum', 105, 20, null, null);
  
        // Subtítulo o sección de información
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(12);
        doc.text('Detalles del Álbum', 20, 30);
  
        // Datos del Álbum
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(14);
        doc.text('Título:', 20, 40);
        doc.text('Género:', 20, 50);
        doc.text('Año de Lanzamiento:', 20, 60);
        doc.text('Discográfica:', 20, 70);
        doc.text('Artista:', 20, 80);
  
        // Valores del Álbum
        doc.setFont("Helvetica", "normal");
        doc.text(this.fmr_Album.value.Titulo, 70, 40);
        doc.text(this.fmr_Album.value.Genero, 70, 50);
        doc.text(this.fmr_Album.value.Año_Lanzamiento, 70, 60);
        doc.text(this.fmr_Album.value.Discografica, 70, 70);
        doc.text(artista.nombre, 70, 80);  // Usando el atributo 'nombre' del artista
  
        // Guardar el documento
        doc.save('nuevo-album.pdf');
      },
      error: (error) => console.error('Error al obtener el artista:', error)
    });
  }
  
}
