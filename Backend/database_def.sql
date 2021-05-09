--creación de la base de datos
Create database proyecto_odontologia;
-----------------------------------------
--Banco de datos de las condiciones preexistentes
Create table if not exists condiciones_medicas(
    id_condicion serial primary key,
    nombre_condicion varchar(30));


-- contiene un diccionario de cada diente existente
-- también se puede colocar la boca completa

Create table if not exists piezas_dentales(
    no_pieza varchar(10) primary key,--formato universal
    nombre_pieza varchar(30));

--tabla que contiene los datos de cada paciente
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
    contacto_emergencia text,
    telefono_emergencia varchar(30)
);
--contiene que diagnostico preeexistente tiene cada paciente
create table if not exists condiciones_paciente(
    id_paciente int,
    id_condicion int,
    primary key (id_paciente, id_condicion),
    foreign key (id_paciente) references paciente(id_paciente),
    foreign key (id_condicion) references condiciones_medicas(id_condicion)
);

--condiciones dentales que se encuentren la cita
Create table if not exists diagnostico_dental(
    id_diagnostico serial primary key,
    nombre_diagnostico varchar(30));


--diagnostico dental de cada paciente
Create table if not exists diagnostico_paciente(
    id_paciente int,
    id_diagnostico int,
    no_pieza varchar(10),
    primary key (id_paciente,id_diagnostico,no_pieza),
    foreign key (id_paciente) references paciente(id_paciente),
    foreign key (id_diagnostico) references diagnostico_dental(id_diagnostico),
    foreign key (no_pieza) references piezas_dentales(no_pieza)
    );

--cualquier empleado dentro de la clínica
create table if not exists empleado(
    id_empleado varchar(20) primary key,
    password varchar(40),
    nombre text

);
drop table if exists doctor;
drop table if exists asistente;


/*--doctor de la clínica
Create table if not exists doctor(
    id_empleado varchar(30) primary key,
    email varchar(60),
    foreign key (id_empleado) references empleado(id_empleado)
);


--asistente dental de la clínica
Create table if not exists asistente(
    id_empleado varchar(30) primary key,
    email varchar(60),
    foreign key (id_empleado) references empleado(id_empleado)
);*/

--tratamientos a realizar
Create table if not exists tratamiento(
    id_tratamiento serial primary key,
    nombre text,
    precio float
);

--inventario de la clínica
Create table if not exists inventario(
    id_item serial primary key,
    nombre_item varchar(32),
    cantidad int,
    ultima_fecha date
);


--Borrar tabla vieja
drop table utilizacion_inventario;

--Cuanto inventario utiliza cada tratamiento
Create table if not exists utilizacion_inventario(
    id_item int,
    id_cita int,
    cantidad_utilizada int,
    primary key(id_item, id_cita),
    foreign key (id_cita) references cita(id_cita),
    foreign key (id_item) references inventario(id_item)
);

select * from utilizacion_inventario;



--La cita, hace falta fecha y hora
Create table if not exists cita(
    id_cita serial primary key,
    paciente int,
    fecha date,
    hora_inicio time,
    hora_final time,
    cita_activa bool,
    foreign key (paciente) references paciente(id_paciente)
);

--tabla que relaciona las citas con los tratamientos
Create table if not exists tratamientos_cita(
    tratamiento int,
    id_cita int,
    primary key (tratamiento, id_cita),
    foreign key (tratamiento) references tratamiento(id_tratamiento),
    foreign key (id_cita) references cita(id_cita)
);

---participantes en la cita
create table if not exists participantes_cita(
    id_cita int,
    id_empleado varchar(20),
    primary key (id_cita, id_empleado),
    foreign key (id_cita) references cita(id_cita),
    foreign key (id_empleado) references empleado(id_empleado)
    );


--validación de login

create or replace function validate_login (id_attemp varchar, pass_attemp varchar)
returns bool as
    $BODY$
    declare existencia bigint;
    begin
        select count(*) into existencia from empleado
        where id_empleado = id_attemp and password = pass_attemp;
        return existencia = 1;
    end;
    $BODY$
language 'plpgsql';

insert into empleado values('123@gmail.com', '123', 'xd', 'xd@gmail.com','Doctor')

select validate_login('123@gmail.com','123')