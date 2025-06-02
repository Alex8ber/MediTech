
CREATE TABLE proyecto1.EstadoCita (
    EstadoCitaID INT AUTO_INCREMENT PRIMARY KEY,
    Estado VARCHAR(20) NOT NULL UNIQUE
) ENGINE = InnoDB;

INSERT INTO proyecto1.EstadoCita (Estado) VALUES ('programada'), ('cancelada'), ('completada');