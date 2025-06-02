CREATE TABLE proyecto1.Cita (
  CitaID INT PRIMARY KEY AUTO_INCREMENT,
  PacienteID INT NOT NULL,
  MedicoID INT NOT NULL,
  FechaHora DATETIME NOT NULL,
  EstadoCitaID INT,
  FOREIGN KEY (EstadoCitaID) REFERENCES proyecto1.EstadoCita(EstadoCitaID),
  Observaciones TEXT,
  FOREIGN KEY (PacienteID) REFERENCES proyecto1.Paciente(PacienteID),
  FOREIGN KEY (MedicoID) REFERENCES proyecto1.Medico(MedicoID)
)ENGINE = InnoDB;