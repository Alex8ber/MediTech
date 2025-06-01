CREATE TABLE proyecto1.Medico (
  MedicoID INT PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(50) NOT NULL,
  Apellido VARCHAR(50) NOT NULL,
  Especialidad VARCHAR(50) NOT NULL,
  Telefono VARCHAR(15),
  Cedula VARCHAR(20) NOT NULL UNIQUE,
  Edad INT,
  Email VARCHAR(100) NOT NULL UNIQUE,
  DepartamentoID INT,
  FOREIGN KEY (DepartamentoID) REFERENCES Departamento(DepartamentoID)
)ENGINE = innoDB;
