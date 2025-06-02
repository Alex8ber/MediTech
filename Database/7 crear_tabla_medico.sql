CREATE TABLE proyecto1.Medico (
  MedicoID INT PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(50) NOT NULL,
  Apellido VARCHAR(50) NOT NULL,
  EspecialidadID INT NOT NULL,
    FOREIGN KEY (EspecialidadID) REFERENCES proyecto1.Especialidad(EspecialidadID),
  Telefono VARCHAR(15),
  Cedula VARCHAR(20) NOT NULL UNIQUE,
  Edad INT,
  Email VARCHAR(100) NOT NULL UNIQUE,
  DepartamentoID INT,
  FOREIGN KEY (DepartamentoID) REFERENCES Departamento(DepartamentoID)
)ENGINE = innoDB;