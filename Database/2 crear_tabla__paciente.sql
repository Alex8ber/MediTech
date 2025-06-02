CREATE TABLE proyecto1.Paciente(
  PacienteID INT PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(50) NOT NULL,
  Apellido VARCHAR(50) NOT NULL,
  FechaNacimiento DATE,
  Telefono VARCHAR(15),
  Direccion VARCHAR(100),
  Cedula VARCHAR(20) NOT NULL UNIQUE,
  Genero ENUM('Masculino', 'Femenino', 'Otro') NOT NULL,
  PatologiaID INT,
   FOREIGN KEY (PatologiaID) REFERENCES proyecto1.Patologia(PatologiaID);
  Edad INT,
) ENGINE = innoDB;