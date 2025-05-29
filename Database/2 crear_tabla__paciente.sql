CREATE TABLE proyecto1.Paciente(
  PacienteID INT PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(50) NOT NULL,
  Apellido VARCHAR(50) NOT NULL,
  FechaNacimiento DATE,
  Telefono VARCHAR(15),
  Direccion VARCHAR(100),
  Email VARCHAR(50)
) ENGINE = innoDB;
