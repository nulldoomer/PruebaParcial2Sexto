import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IArtistas } from 'src/app/Interfaces/Iartistas';
import { ArtistasService } from 'src/app/Services/artistas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevoartista',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './nuevoartista.component.html',
  styleUrl: './nuevoartista.component.scss'
})
export class NuevoartistaComponent {
  fmr_Artista = new FormGroup({
    Nombre : new FormControl("",Validators.required),
    Apellido : new FormControl("",Validators.required),
    Fecha_Nacimiento : new FormControl("",Validators.required),
    Nacionalidad : new FormControl("",Validators.required),
  });
  artista_id = 0;
  titulo = "Nuevo Artista";

  constructor(
    private artistasService: ArtistasService,
    private navegacion: Router,
    private ruta : ActivatedRoute
  ){}

  ngOnInit():void{
    this.artista_id = parseInt(this.ruta.snapshot.paramMap.get("id"));
    if (this.artista_id > 0) {
      this.artistasService.uno(this.artista_id).subscribe((unartista) => {
        console.log(unartista);
        this.fmr_Artista.controls["Nombre"].setValue(unartista.nombre);
        this.fmr_Artista.controls["Apellido"].setValue(unartista.apellido);
        this.fmr_Artista.controls["Fecha_Nacimiento"].setValue(unartista.fecha_nacimiento.toString());
        this.fmr_Artista.controls["Nacionalidad"].setValue(unartista.nacionalidad);


        this.titulo = "Editar Artista";
      });
    }
  }
  grabar() {
    let fecha_nacimiento = new Date(this.fmr_Artista.controls["Fecha_Nacimiento"].value);
    let artista: IArtistas = {
      artista_id: this.artista_id,
      nombre: this.fmr_Artista.controls["Nombre"].value,
      apellido: this.fmr_Artista.controls["Apellido"].value,
      fecha_nacimiento : fecha_nacimiento.toISOString().split('T')[0].toString(),
      nacionalidad: this.fmr_Artista.controls["Nacionalidad"].value,
      
    };
    Swal.fire({
      title: 'Artista',
      text: 'Desea guardar el artista ' + this.fmr_Artista.controls['Nombre'].value,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Grabar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.artista_id > 0) {
          this.artistasService.actualizar(artista).subscribe((res: any) => {
            Swal.fire({
              title: 'Artistas',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/artistas']);
          });
        } else {
          this.artistasService.insertar(artista).subscribe((res: any) => {
            console.log(res);
            Swal.fire({
              title: 'Artistas',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/artistas']);
          });
        }
      }
    });
  }

}
