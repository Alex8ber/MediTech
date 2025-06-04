-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS Proyecto1;
USE Proyecto1;

-- Tabla: Tipo_Usuario
CREATE TABLE Tipo_Usuario (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(100) NOT NULL
);

-- Tabla: Email
CREATE TABLE Email (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Direccion VARCHAR(150) NOT NULL
);

-- Tabla: Telefono
CREATE TABLE Telefono (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Numero VARCHAR(20) NOT NULL
);

-- Tabla: Ocupacion
CREATE TABLE Ocupacion (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL
);

-- Tabla: Genero
CREATE TABLE Genero (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Tipo VARCHAR(50) NOT NULL
);

-- Tabla: Patologia
CREATE TABLE Patologia (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL
);

-- Tabla: Condicion 
CREATE TABLE Condicion (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(100) NOT NULL
);

-- Tabla: Estado_civil
CREATE TABLE Estado_civil (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Estado VARCHAR(50) NOT NULL
);

-- Tabla: Tipo_de_Sangre
CREATE TABLE Tipo_de_Sangre (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Tipo VARCHAR(10) NOT NULL
);

-- Tabla: Ubicacion
CREATE TABLE Ubicacion (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(100) NOT NULL
);

-- Tabla: Estado
CREATE TABLE Estado (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(100) NOT NULL
);

-- Tabla: Sintomas
CREATE TABLE Sintomas (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(255) NOT NULL
);

-- Tabla: Diagnostico
CREATE TABLE Diagnostico (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(255) NOT NULL
);

-- Tabla: Tratamiento
CREATE TABLE Tratamiento (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Dosis VARCHAR(50),
    PrincipioActivo VARCHAR(100),
    NombreComercial VARCHAR(100),
    Tratamiento VARCHAR(255)
);

-- Tabla: Alojamiento
CREATE TABLE Alojamiento (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Fecha_IN DATE,
    Fecha_OUT DATE,
    Paciente_ID INT,
    Ubicacion_ID INT,
    FOREIGN KEY (Ubicacion_ID) REFERENCES Ubicacion(Id)
);

-- Tabla: Usuario
CREATE TABLE Usuario (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Email_ID INT NOT NULL,
    Contrasena VARCHAR(100) NOT NULL,
    Tipo_usuario_ID INT NOT NULL,
    FOREIGN KEY (Email_ID) REFERENCES Email(Id),
    FOREIGN KEY (Tipo_usuario_ID) REFERENCES Tipo_Usuario(Id)
);

-- Tabla: Personal
CREATE TABLE Personal (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombres VARCHAR(100) NOT NULL,
    Apellidos VARCHAR(100) NOT NULL,
    Cedula VARCHAR(20) NOT NULL,
    Edad INT,
    Ocupacion_ID INT,
    Email_ID INT,
    Telefono_ID INT,
    FOREIGN KEY (Ocupacion_ID) REFERENCES Ocupacion(Id),
    FOREIGN KEY (Email_ID) REFERENCES Email(Id),
    FOREIGN KEY (Telefono_ID) REFERENCES Telefono(Id)
);

-- Tabla: Doctores
CREATE TABLE Doctores (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombres VARCHAR(100) NOT NULL,
    Apellidos VARCHAR(100) NOT NULL,
    Cedula VARCHAR(20) NOT NULL,
    Edad INT,
    Genero_ID INT,
    Ocupacion_ID INT,
    Email_ID INT,
    Telefono_ID INT,
    Usuario_ID INT,
    FOREIGN KEY (Genero_ID) REFERENCES Genero(Id),
    FOREIGN KEY (Ocupacion_ID) REFERENCES Ocupacion(Id),
    FOREIGN KEY (Email_ID) REFERENCES Email(Id),
    FOREIGN KEY (Telefono_ID) REFERENCES Telefono(Id),
    FOREIGN KEY (Usuario_ID) REFERENCES Usuario(Id)
);

-- Tabla: Pacientes
CREATE TABLE Pacientes (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombres VARCHAR(100) NOT NULL,
    Apellidos VARCHAR(100) NOT NULL,
    Cedula VARCHAR(20) NOT NULL,
    Edad INT,
    Genero_ID INT,
    Telefono_ID INT,
    Email_ID INT,
    Patologia_ID INT,
    Direccion VARCHAR(150),
    Ocupacion_ID INT,
    Condicion_ID INT,
    Estado_Civil_ID INT,
    Tipo_de_Sangre_ID INT,
    Historia_Medica_ID INT,
    Alojamiento_ID INT,
    FOREIGN KEY (Genero_ID) REFERENCES Genero(Id),
    FOREIGN KEY (Telefono_ID) REFERENCES Telefono(Id),
    FOREIGN KEY (Email_ID) REFERENCES Email(Id),
    FOREIGN KEY (Patologia_ID) REFERENCES Patologia(Id),
    FOREIGN KEY (Ocupacion_ID) REFERENCES Ocupacion(Id),
    FOREIGN KEY (Condicion_ID) REFERENCES Condicion(Id),
    FOREIGN KEY (Estado_Civil_ID) REFERENCES Estado_civil(Id),
    FOREIGN KEY (Tipo_de_Sangre_ID) REFERENCES Tipo_de_Sangre(Id),
    FOREIGN KEY (Alojamiento_ID) REFERENCES Alojamiento(Id)
);

-- Tabla: Historia_Medica
CREATE TABLE Historia_Medica (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Paciente_ID INT,
    Doctor_ID INT,
    Fecha DATE,
    Sintomas_ID INT,
    Diagnostico_ID INT,
    Tratamiento_ID INT,
    FOREIGN KEY (Paciente_ID) REFERENCES Pacientes(Id),
    FOREIGN KEY (Doctor_ID) REFERENCES Doctores(Id),
    FOREIGN KEY (Sintomas_ID) REFERENCES Sintomas(Id),
    FOREIGN KEY (Diagnostico_ID) REFERENCES Diagnostico(Id),
    FOREIGN KEY (Tratamiento_ID) REFERENCES Tratamiento(Id)
);

-- Tabla: Citas
CREATE TABLE Citas (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Paciente_ID INT,
    Doctor_ID INT,
    Fecha DATETIME,
    Estado_ID INT,
    Observaciones VARCHAR(255),
    FOREIGN KEY (Paciente_ID) REFERENCES Pacientes(Id),
    FOREIGN KEY (Doctor_ID) REFERENCES Doctores(Id),
    FOREIGN KEY (Estado_ID) REFERENCES Estado(Id)
);
