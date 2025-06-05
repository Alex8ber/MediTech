CREATE DATABASE IF NOT EXISTS Proyecto1;
USE Proyecto1;

-- Tabla Condicion
CREATE TABLE Condicion (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(100) NOT NULL
);

-- Tabla Tipo_de_Sangre
CREATE TABLE Tipo_de_Sangre (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Tipo VARCHAR(10) NOT NULL
);

-- Tabla Estado_civil
CREATE TABLE Estado_civil (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Estado VARCHAR(50) NOT NULL
);

-- Tabla Patologia
CREATE TABLE Patologia (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL
);

-- Tabla Especialidad
CREATE TABLE Especialidad (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(100) NOT NULL
);

-- Tabla Servicios
CREATE TABLE Servicios (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(100) NOT NULL,
    Costo DECIMAL(10,2) NOT NULL
);

-- Tabla Metodo_Pago
CREATE TABLE Metodo_Pago (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(100) NOT NULL
);

-- Tabla Ocupacion
CREATE TABLE Ocupacion (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL
);

-- Tabla Estado
CREATE TABLE Estado (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(100) NOT NULL
);

-- Tabla Genero
CREATE TABLE Genero (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Tipo VARCHAR(50) NOT NULL
);

-- Tabla Ubicacion
CREATE TABLE Ubicacion (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(100) NOT NULL
);


-- Tabla Tipo_Usuario
CREATE TABLE Tipo_Usuario (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(100) NOT NULL
);

-- Tabla Usuario
CREATE TABLE Usuario (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Contrasena VARCHAR(100) NOT NULL,
    Tipo_usuario_ID INT,
    FOREIGN KEY (Tipo_usuario_ID) REFERENCES Tipo_Usuario(Id),
);

-- Tabla Sintomas
CREATE TABLE Sintomas (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(255) NOT NULL
);

-- Tabla Diagnostico
CREATE TABLE Diagnostico (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(255) NOT NULL
);

-- Tabla Tratamiento
CREATE TABLE Tratamiento (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Dosis VARCHAR(100),
    PrincipioActivo VARCHAR(100),
    NombreComercial VARCHAR(100)
);

-- Tabla Personal
CREATE TABLE Personal (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombres VARCHAR(100) NOT NULL,
    Apellidos VARCHAR(100) NOT NULL,
    Cedula VARCHAR(20) NOT NULL,
    Edad INT NOT NULL,
    Genero_ID INT,
    Usuario_ID INT,
    Ocupacion_ID INT,
    Especialidad_ID INT,
    FOREIGN KEY (Genero_ID) REFERENCES Genero(Id),
    FOREIGN KEY (Usuario_ID) REFERENCES Usuario(Id),
    FOREIGN KEY (Ocupacion_ID) REFERENCES Ocupacion(Id),
    FOREIGN KEY (Especialidad_ID) REFERENCES Especialidad(Id)
);

-- Tabla Telefono_Personal
CREATE TABLE Telefono_Personal (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Personal_ID INT,
    Numero VARCHAR(20) NOT NULL,
    FOREIGN KEY (Personal_ID) REFERENCES Personal(Id)
);

-- Tabla Pacientes
CREATE TABLE Pacientes (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombres VARCHAR(100) NOT NULL,
    Apellidos VARCHAR(100) NOT NULL,
    Cedula VARCHAR(20) NOT NULL,
    Edad INT NOT NULL,
    Genero_ID INT,
    Email VARCHAR(100),
    Direccion VARCHAR(150),
    Ocupacion INT,
    Estado_Civil_ID INT,
    Patologia_ID INT,
    Condicion_ID INT,
    Tipo_de_sangre_ID INT,
    FOREIGN KEY (Genero_ID) REFERENCES Genero(Id),
    FOREIGN KEY (Ocupacion) REFERENCES Ocupacion(Id),
    FOREIGN KEY (Estado_Civil_ID) REFERENCES Estado_civil(Id),
    FOREIGN KEY (Patologia_ID) REFERENCES Patologia(Id),
    FOREIGN KEY (Condicion_ID) REFERENCES Condicion(Id),
    FOREIGN KEY (Tipo_de_sangre_ID) REFERENCES Tipo_de_Sangre(Id)
);

-- Tabla Alojamiento
CREATE TABLE Alojamiento (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Fecha_IN DATETIME NOT NULL,
    Fecha_OUT DATETIME,
    Paciente_ID INT,
    Ubicacion_ID INT,
    FOREIGN KEY (Paciente_ID) REFERENCES Pacientes(Id),
    FOREIGN KEY (Ubicacion_ID) REFERENCES Ubicacion(Id)
);

-- Tabla Telefono_Paciente
CREATE TABLE Telefono_Paciente (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Paciente_ID INT,
    Numero VARCHAR(20) NOT NULL,
    FOREIGN KEY (Paciente_ID) REFERENCES Pacientes(Id)
);

-- Tabla Citas
CREATE TABLE Citas (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Paciente_ID INT,
    Personal_ID INT,
    Observaciones VARCHAR(255),
    Estado_ID INT,
    Fecha DATETIME NOT NULL,
    FOREIGN KEY (Paciente_ID) REFERENCES Pacientes(Id),
    FOREIGN KEY (Personal_ID) REFERENCES Personal(Id),
    FOREIGN KEY (Estado_ID) REFERENCES Estado(Id)
);

-- Tabla Factura
CREATE TABLE Factura (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Paciente_ID INT,
    Personal_ID INT,
    Fecha DATETIME NOT NULL,
    Servicio_ID INT,
    FOREIGN KEY (Paciente_ID) REFERENCES Pacientes(Id),
    FOREIGN KEY (Personal_ID) REFERENCES Personal(Id),
    FOREIGN KEY (Servicio_ID) REFERENCES Servicios(Id)
);

-- Tabla Historia_Medica
CREATE TABLE Historia_Medica (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Paciente_ID INT,
    Personal_ID INT,
    Fecha DATETIME NOT NULL,
    Sintomas_ID INT,
    Diagnostico_ID INT,
    Patologia_ID INT,
    Tratamiento_ID INT,
    FOREIGN KEY (Paciente_ID) REFERENCES Pacientes(Id),
    FOREIGN KEY (Personal_ID) REFERENCES Personal(Id),
    FOREIGN KEY (Sintomas_ID) REFERENCES Sintomas(Id),
    FOREIGN KEY (Diagnostico_ID) REFERENCES Diagnostico(Id),
    FOREIGN KEY (Patologia_ID) REFERENCES Patologia(Id),
    FOREIGN KEY (Tratamiento_ID) REFERENCES Tratamiento(Id)
);

-- Tabla Total
CREATE TABLE Total (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Paciente_ID INT,
    Monto DECIMAL(20,2) NOT NULL,
    MetodoPago_ID INT,
    Numero_Referencia VARCHAR(20),
    FOREIGN KEY (Paciente_ID) REFERENCES Pacientes(Id),
    FOREIGN KEY (MetodoPago_ID) REFERENCES Metodo_Pago(Id)
);

-- Insertar datos iniciales en la tabla Tipo_Usuario
INSERT INTO Tipo_Usuario (Descripcion) VALUES
('Administrador'),
('Doctor'),
('Enfermero'),
('Recepcionista');

