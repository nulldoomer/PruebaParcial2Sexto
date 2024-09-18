import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IArtistas } from "../Interfaces/Iartistas";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class ArtistasService{
    apiurl = "http://localhost/UNIANDES/PruebaParcial2/Back/controllers/artista.controller.php?op="
    constructor(private http:HttpClient){}
    buscar(text:string): Observable<IArtistas>{
        const formData = new FormData();
        formData.append("texto", text);
        return this.http.post<IArtistas>(this.apiurl + "uno",formData);
    }

    uno(artista_id: number): Observable<IArtistas>{
        const formData = new FormData();
        formData.append("artista_id", artista_id.toString());
        return this.http.post<IArtistas>(this.apiurl + "uno", formData);
    }
    todos(): Observable<IArtistas[]>{
        return this.http.get<IArtistas[]>(this.apiurl + "todos");
    }

    insertar(artista: IArtistas): Observable<string>{
        const formData = new FormData();
        formData.append("nombre", artista.nombre);
        formData.append("apellido", artista.apellido);
        formData.append("fecha_nacimiento",artista.fecha_nacimiento.toString());
        formData.append("nacionalidad", artista.nacionalidad);
        console.log(artista);
        return this.http.post<string>(this.apiurl + "insertar", formData);
    }
    actualizar(artista : IArtistas): Observable<string>{
        const formData = new FormData();
        formData.append("artista_id", artista.artista_id.toString());
        formData.append("nombre", artista.nombre);
        formData.append("apellido", artista.apellido);
        formData.append("fecha_nacimiento",artista.fecha_nacimiento.toString());
        formData.append("nacionalidad", artista.nacionalidad);
        return this.http.post<string>(this.apiurl + "actualizar", formData);
    }


    eliminar(artista_id:number):Observable<number>{
        const formData = new FormData();
        formData.append("artista_id", artista_id.toString());
        return this.http.post<number>(this.apiurl + "eliminar", formData);
    }

}