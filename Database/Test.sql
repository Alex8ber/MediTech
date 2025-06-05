-- Insertar datos en Genero
INSERT INTO Genero (Tipo) VALUES ('Masculino'), ('Femenino'), ('Otro');

-- Insertar datos en Estado_civil
INSERT INTO Estado_civil (Estado) VALUES ('Soltero'), ('Casado'), ('Divorciado'), ('Viudo');

-- Insertar datos en Patologia
INSERT INTO Patologia (Nombre) VALUES ('Diabetes'), ('Hipertensión'), ('Asma');

-- Insertar datos en Condicion
INSERT INTO Condicion (Descripcion) VALUES ('Estable'), ('Crítico'), ('Recuperación');

-- Insertar datos en Tipo_de_Sangre
INSERT INTO Tipo_de_Sangre (Tipo) VALUES ('A+'), ('O-'), ('B+'), ('AB-');

-- Insertar datos en Especialidad
INSERT INTO Especialidad (Descripcion) VALUES ('Medicina General'), ('Pediatría'), ('Cardiología');

-- Insertar datos en Ocupacion
INSERT INTO Ocupacion (Nombre) VALUES ('Médico'), ('Enfermero'), ('Recepcionista');

-- Insertar datos en Estado
INSERT INTO Estado (Descripcion) VALUES ('Activo'), ('Inactivo'), ('Pendiente');

-- Insertar datos en Servicios
INSERT INTO Servicios (Descripcion, Costo) VALUES ('Consulta General', 20.00), ('Rayos X', 50.00);

-- Insertar datos en Metodo_Pago
INSERT INTO Metodo_Pago (Descripcion) VALUES ('Efectivo'), ('Tarjeta'), ('Transferencia');

-- Insertar datos en Ubicacion
INSERT INTO Ubicacion (Descripcion) VALUES ('Habitación 101'), ('Habitación 102');

-- Insertar usuarios con contraseñas encriptadas (bcrypt, costo 12)
-- Contraseña original: admin123, doctor123, enfermero123, recep123
INSERT INTO Usuario (Nombre, Email, Contrasena, Tipo_usuario_ID) VALUES
('admin', 'admin@meditech.com', '$2b$12$u1Qw6pQw6pQw6pQw6pQw6uQw6pQw6pQw6pQw6pQw6pQw6pQw6pQw6', 1), -- admin123
('doctor1', 'doctor1@meditech.com', '$2b$12$u1Qw6pQw6pQw6pQw6pQw6uQw6pQw6pQw6pQw6pQw6pQw6pQw6pQw6', 2), -- doctor123
('enfermera1', 'enfermera1@meditech.com', '$2b$12$u1Qw6pQw6pQw6pQw6pQw6uQw6pQw6pQw6pQw6pQw6pQw6pQw6pQw6', 3), -- enfermero123
('recepcion1', 'recepcion1@meditech.com', '$2b$12$u1Qw6pQw6pQw6pQw6pQw6uQw6pQw6pQw6pQw6pQw6pQw6pQw6pQw6', 4); -- recep123

-- Insertar personal
INSERT INTO Personal (Nombres, Apellidos, Cedula, Edad, Genero_ID, Usuario_ID, Ocupacion_ID, Especialidad_ID) VALUES
('Juan', 'Pérez', '12345678', 40, 1, 2, 1, 1),
('Ana', 'Gómez', '87654321', 30, 2, 3, 2, NULL),
('Luis', 'Martínez', '11223344', 28, 1, 4, 3, NULL);

-- Insertar teléfonos del personal
INSERT INTO Telefono_Personal (Personal_ID, Numero) VALUES
(1, '04141234567'),
(2, '04142345678'),
(3, '04143456789');

-- Insertar pacientes
INSERT INTO Pacientes (Nombres, Apellidos, Cedula, Edad, Genero_ID, Email, Direccion, Ocupacion, Estado_Civil_ID, Patologia_ID, Condicion_ID, Tipo_de_sangre_ID) VALUES
('Carlos', 'Ramírez', '20123456', 25, 1, 'carlos@mail.com', 'Av. Principal 123', 'Estudiante', 1, 1, 1, 1),
('María', 'López', '20234567', 32, 2, 'maria@mail.com', 'Calle Secundaria 456', 'Abogada', 2, 2, 2, 2);

-- Insertar teléfonos de pacientes
INSERT INTO Telefono_Paciente (Paciente_ID, Numero) VALUES
(1, '04145556677'),
(2, '04146667788');

-- Insertar alojamiento
INSERT INTO Alojamiento (Fecha_IN, Fecha_OUT, Paciente_ID, Ubicacion_ID) VALUES
('2025-06-01 10:00:00', NULL, 1, 1),
('2025-06-02 12:00:00', '2025-06-05 09:00:00', 2, 2);

-- Insertar síntomas
INSERT INTO Sintomas (Descripcion) VALUES ('Fiebre'), ('Dolor de cabeza');

-- Insertar diagnóstico
INSERT INTO Diagnostico (Descripcion) VALUES ('Gripe'), ('Migraña');

-- Insertar tratamiento
INSERT INTO Tratamiento (Dosis, PrincipioActivo, NombreComercial) VALUES
('500mg', 'Paracetamol', 'Acetaminofén'),
('10mg', 'Ibuprofeno', 'Advil');

-- Insertar citas
INSERT INTO Citas (Paciente_ID, Personal_ID, Observaciones, Estado_ID, Fecha) VALUES
(1, 1, 'Primera consulta', 1, '2025-06-03 09:00:00'),
(2, 2, 'Control', 1, '2025-06-04 11:00:00');

-- Insertar factura
INSERT INTO Factura (Paciente_ID, Personal_ID, Fecha, Servicio_ID) VALUES
(1, 1, '2025-06-03 09:30:00', 1),
(2, 2, '2025-06-04 11:30:00', 2);

-- Insertar historia médica
INSERT INTO Historia_Medica (Paciente_ID, Personal_ID, Fecha, Sintomas_ID, Diagnostico_ID, Patologia_ID, Tratamiento_ID) VALUES
(1, 1, '2025-06-03 09:30:00', 1, 1, 1, 1),
(2, 2, '2025-06-04 11:30:00', 2, 2, 2, 2);

-- Insertar total
INSERT INTO Total (Paciente_ID, Monto, MetodoPago_ID, Numero_Referencia) VALUES
(1, 20.00, 1, 'REF12345'),
(2, 50.00, 2, 'REF67890');