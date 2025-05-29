CREATE TABLE proyecto1.Cita (
  CitaID INT PRIMARY KEY AUTO_INCREMENT,
  PacienteID INT NOT NULL,
  MedicoID INT NOT NULL,
  FechaHora DATETIME NOT NULL,
  Estado ENUM('Programada', 'Cancelada', 'Completada') DEFAULT 'Programada',
  Observaciones TEXT,
  FOREIGN KEY (PacienteID) REFERENCES Paciente(PacienteID),
  FOREIGN KEY (MedicoID) REFERENCES Medico(MedicoID)
)ENGINE = InnoDB;