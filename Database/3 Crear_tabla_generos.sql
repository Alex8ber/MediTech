CREATE TABLE proyecto1.Genero (
    GeneroID INT AUTO_INCREMENT PRIMARY KEY,
    Codigo VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO proyecto1.Genero (Codigo) VALUES
('Masculino'),
('Femenino'),
('Otro');