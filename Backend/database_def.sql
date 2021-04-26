Create database proyecto_odontologia;

Create table if not exists condiciones_medicas(
    id_condicion serial primary key,
    nombre_condicion varchar(30));

Create table if not exists dientes(
    no_pieza varchar(10) primary key,--formato universal
    no_pieza_fda varchar(10),
    nombre_pieza varchar(30));

Create table if not exists paciente(
    id_paciente serial primary key,
    nombre text,
    telefono_casa varchar(30),
    telefono_celular varchar(30),
    fecha_nacimiento date,
    estado_civil varchar(20),
    ocupacion varchar (30),
    direccion varchar (60),
    recomendado_por text,
    visita_anterior_dentista date,
    motivo_consulta text,
    medico text,
    telefono_medico varchar(30),
    contacto_mergencia text,
    telefono_emergencia varchar(30)
);

Create table if not exists diagnostico_dental(
    id_diagnostico serial primary key,
    nombre_diagnostico varchar(30)
);

Create table if not exists diagnostico_paciente(
    id_paciente int,
    id_diagnostico int,
    id_pieza int,
    primary key (id_paciente,id_diagnostico,id_pieza);


Create table if not exists doctor(
    nombre_usuario varchar(30) primary key,
    nombre text,
    contrasena varchar(30)
);

