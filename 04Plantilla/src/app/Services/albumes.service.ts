import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IAlbumes } from "../Interfaces/Ialbumes";

@Injectable({
    providedIn: "root"
})
export class AlbumesService {
    apiurl = "http://localhost/UNIANDES/PruebaParcial2/Back/controllers/albumes.controller.php?op="
    constructor(private http: HttpClient){}
    
    buscar(text: string): Observable<IAlbumes>{
        const formData = new FormData();
        formData.append("texto", text);
        return this.http.post<IAlbumes>(this.apiurl + "uno", formData);
    }

    todos(): Observable<IAlbumes[]>{
        return this.http.get<IAlbumes[]>(this.apiurl + "todos");
    }
    
    uno(album_id: number): Observable<IAlbumes>{
        const formData = new FormData();
        formData.append("album_id", album_id.toString());
        return this.http.post<IAlbumes>(this.apiurl + "uno", formData);
    }

    insertar(album: IAlbumes): Observable<string>{
        const formData = new FormData();
        formData.append("titulo", album.titulo);
        formData.append("genero", album.genero);
        formData.append("año_lanzamiento", album.año_lanzamiento.toString());
        formData.append("discografica", album.discografica);
        formData.append("artista_id", album.artista_id.toString());
        console.log(album);
        return this.http.post<string>(this.apiurl + "insertar", formData);
    }

    actualizar(album: IAlbumes): Observable<string>{
        const formData = new FormData();
        formData.append("album_id", album.album_id.toString());
        formData.append("titulo", album.titulo);
        formData.append("genero", album.genero);
        formData.append("año_lanzamiento", album.año_lanzamiento.toString());
        formData.append("discografica", album.discografica);
        formData.append("artista_id", album.artista_id.toString());
        return this.http.post<string>(this.apiurl + "actualizar", formData);
    }

    eliminar(album_id:number): Observable<number>{
        const formData = new FormData();
        formData.append("album_id", album_id.toString());
        return this.http.post<number>(this.apiurl + "eliminar", formData);
    }

}