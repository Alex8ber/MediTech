CREATE TABLE proyecto1.Genero (
    GeneroID INT AUTO_INCREMENT PRIMARY KEY,
    Codigo CHAR(1) NOT NULL UNIQUE
);

INSERT INTO proyecto1.Genero (Codigo) VALUES
('M'),
('F'),
('Otro') ENGINE = innoDB;