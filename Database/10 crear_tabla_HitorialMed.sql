CREATE TABLE proyecto1.HistorialMedico (
  HistorialID INT PRIMARY KEY AUTO_INCREMENT,
  PacienteID INT NOT NULL,
  MedicoID INT NOT NULL,
  Fecha DATE NOT NULL,
  Diagnostico TEXT NOT NULL,
  Tratamiento TEXT,
  FOREIGN KEY (PacienteID) REFERENCES proyecto1.Paciente(PacienteID),
  FOREIGN KEY (MedicoID) REFERENCES proyecto1.Medico(MedicoID)
)ENGINE = InnoDB;