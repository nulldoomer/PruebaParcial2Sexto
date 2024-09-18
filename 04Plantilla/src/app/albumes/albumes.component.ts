import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../theme/shared/shared.module';
import { IAlbumes } from '../Interfaces/Ialbumes';
import { AlbumesService } from '../Services/albumes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-albumes',
  standalone: true,
  imports: [RouterLink,SharedModule],
  templateUrl: './albumes.component.html',
  styleUrl: './albumes.component.scss'
})
export class AlbumesComponent {
  listaAlbumes : IAlbumes[] = [];
  constructor(private albumesService : AlbumesService){}
  ngOnInit(){
    this.cargarTabla();
  }

  cargarTabla(){
    this.albumesService.todos().subscribe((data)=>{
      console.log(data);
      this.listaAlbumes = data;
    });
  }

  eliminar(album_id){
    Swal.fire({
      title: 'Albumes',
      text: 'Esta seguro que desea eliminar el album!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Emliminar Album'
    }).then((result) => {
      if (result.isConfirmed) {
        this.albumesService.eliminar(album_id).subscribe((data) => {
          Swal.fire('Albumes', 'El album ha sido eliminado.', 'success');
          this.cargarTabla();
        });
      }
    });
  }

}
