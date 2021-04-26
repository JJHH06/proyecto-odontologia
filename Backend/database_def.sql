Create database proyecto_odontologia;

Create table if not exists condiciones_medicas(
    id_condicion serial primary key,
    nombre_condicion varchar(30));

Create table if not exists dientes(
    no_pieza varchar(10) primary key,--formato universal
    no_pieza_fda varchar(10),
    nombre_pieza varchar(30));