-- Insertar datos iniciales en la tabla Tipo_Usuario
INSERT INTO Tipo_Usuario (Descripcion) VALUES
('Administrador'),
('Medico'),
('Recepcionista');
-- Insertar datos en Genero
INSERT INTO Genero (Tipo) VALUES ('Masculino'), ('Femenino'), ('Otro');

-- Insertar datos en Estado_civil
INSERT INTO Estado_civil (Estado) VALUES ('Soltero'), ('Casado'), ('Divorciado'), ('Viudo');

-- Insertar datos en Condicion
INSERT INTO Condicion (Descripcion) VALUES ('Estable'), ('Crítico'), ('Recuperación');

-- Insertar datos en Tipo_de_Sangre
INSERT INTO Tipo_de_Sangre (Tipo) VALUES ('A+'), ('O-'), ('B+'), ('AB-');

-- Insertar datos en Especialidad
INSERT INTO Especialidad (Descripcion) VALUES ('Medicina General'), ('Pediatría'), ('Cardiología'), ('No Aplicable');

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
('admin', 'admin@meditech.com', '$2a$12$ySpfTgHM2u43RDxhbmbl.uZzuXQ8AagoViNFO9QF/Ze18cy0GjXba', 1), -- admin123
('doctor1', 'doctor1@meditech.com', '$2a$12$Lg0fRfqK9TQHtdBNvf.xluiii3X57tTD089K485C0zP8A8z1wopXi', 2), -- doctor123
('recepcion1', 'recepcion1@meditech.com', '$2a$12$JtTcl6iAsJrOi5jSr0pP4uCCr2oV1Q4DEAyi8L45Dq5ayHEc4q1lO', 3); -- recep123

-- Insertar personal
INSERT INTO Personal (Nombres, Apellidos, Cedula, Edad, Genero_ID, Usuario_ID, Tipo_usuario_ID, Especialidad_ID) VALUES
('Juan', 'Pérez', '12345678', 40, 1, 1, 1, 4),
('Ana', 'Gómez', '87654321', 30, 2, 3, 2, 1),
('Luis', 'Martínez', '11223344', 28, 1, 3, 3, 4);

-- Insertar teléfonos del personal
INSERT INTO Telefono_Personal (Personal_ID, Numero) VALUES
(1, '04141234567'),
(2, '04142345678'),
(3, '04143456789');

-- Insertar pacientes
INSERT INTO Pacientes (Nombres, Apellidos, Cedula, Edad, Genero_ID, Email, Direccion, Ocupacion, Estado_Civil_ID, Patologia, Condicion_ID, Tipo_de_sangre_ID) VALUES
('Carlos', 'Ramírez', '20123456', 25, 1, 'carlos@mail.com', 'Av. Principal 123', 'Estudiante', 1, 'Asma', 1, 1),
('María', 'López', '20234567', 32, 2, 'maria@mail.com', 'Calle Secundaria 456', 'Abogada', 2, 'Hipertensión', 2, 2);

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
INSERT INTO Historia_Medica (Paciente_ID, Personal_ID, Fecha, Sintomas_ID, Diagnostico_ID, Patologia, Tratamiento_ID) VALUES
(1, 1, '2025-06-03 09:30:00', 1, 1, 'Asma', 1),
(2, 2, '2025-06-04 11:30:00', 2, 2, 'Hipertensión', 2);

-- Insertar total
INSERT INTO Total (Paciente_ID, Monto, MetodoPago_ID, Numero_Referencia) VALUES
(1, 20.00, 1, 'REF12345'),
(2, 50.00, 2, 'REF67890');