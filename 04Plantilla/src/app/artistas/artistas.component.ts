import { Component } from '@angular/core';
import { IArtistas } from '../Interfaces/Iartistas';
import { ArtistasService } from '../Services/artistas.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../theme/shared/shared.module';

@Component({
  selector: 'app-artistas',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './artistas.component.html',
  styleUrl: './artistas.component.scss'
})
export class ArtistasComponent {
  listaArtistas : IArtistas [] = [];
  constructor(private artistasService : ArtistasService){}
  ngOnInit(){
    this.cargarTabla();
  }

  cargarTabla(){
    this.artistasService.todos().subscribe((data)=>{
      console.log(data);
      this.listaArtistas = data;
    });
  }
  eliminar(album_id){
    Swal.fire({
      title: 'Artistas',
      text: 'Esta seguro que desea eliminar el artista!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Emliminar Album'
    }).then((result) => {
      if (result.isConfirmed) {
        this.artistasService.eliminar(album_id).subscribe((data) => {
          Swal.fire('Artistas', 'El artista ha sido eliminado.', 'success');
          this.cargarTabla();
        });
      }
    });
  }
}
