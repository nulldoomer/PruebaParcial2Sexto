-- Crear la tabla Artistas
CREATE TABLE Artistas (
    artista_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    nacionalidad VARCHAR(100) NOT NULL
);

-- Crear la tabla Albumes
CREATE TABLE Albumes (
    album_id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    genero VARCHAR(50) NOT NULL,
    año_lanzamiento INT NOT NULL,
    discografica VARCHAR(100),
    artista_id INT,
    FOREIGN KEY (artista_id) REFERENCES Artistas(artista_id)
);
