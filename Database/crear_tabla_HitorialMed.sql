CREATE TABLE proyecto1.HistorialMedico (
  HistorialID INT PRIMARY KEY AUTO_INCREMENT,
  PacienteID INT NOT NULL,
  MedicoID INT NOT NULL,
  Fecha DATE NOT NULL,
  Diagnostico TEXT NOT NULL,
  Tratamiento TEXT,
  FOREIGN KEY (PacienteID) REFERENCES Paciente(PacienteID),
  FOREIGN KEY (MedicoID) REFERENCES Medico(MedicoID)
)ENGINE = InnoDB;