create table paciente
(
	id_paciente serial not null
		constraint paciente_pkey
			primary key,
	nombre text,
	email varchar,
	telefono_casa varchar(30),
	telefono_celular varchar(30),
	fecha_nacimiento date,
	estado_civil varchar(20),
	ocupacion varchar(30),
	direccion varchar(60),
	recomendado_por text,
	visita_anterior_dentista date,
	motivo_consulta text,
	medico text,
	telefono_medico varchar(30),
	contacto_emergencia text,
	telefono_emergencia varchar(30),
	presupuesto double precision
);

create table empleado
(
	id_empleado varchar(20) not null
		constraint empleado_pkey
			primary key,
	password varchar(40),
	nombre text,
	email text,
	tipo varchar(30)
);

create table inventario
(
	id_item serial not null
		constraint inventario_pkey
			primary key,
	nombre_item varchar(32),
	cantidad integer,
	ultima_fecha date
);

create table piezas_dentales
(
	no_pieza varchar(10) not null
		constraint piezas_dentales_pkey
			primary key,
	nombre_pieza varchar(30)
);

create table tratamiento
(
	id_tratamiento serial not null
		constraint tratamiento_pkey
			primary key,
	nombre text,
	precio double precision
);

create table cita
(
	id_cita serial not null
		constraint cita_pkey
			primary key,
	paciente integer
		constraint cita_paciente_fkey
			references paciente,
	fecha date,
	hora_inicio time,
	hora_final time,
	cita_activa boolean
);

create table abonos
(
	id_abono serial not null
		constraint abonos_pkey
			primary key,
	paciente integer
		constraint abonos_paciente_fkey
			references paciente,
	fecha date,
	abono double precision
);

create table condiciones_medicas
(
	id_condicion serial not null
		constraint condiciones_medicas_pkey
			primary key,
	nombre_condicion varchar(30)
);

create table condiciones_paciente
(
	id_paciente integer not null
		constraint condiciones_paciente_id_paciente_fkey
			references paciente,
	id_condicion integer not null
		constraint condiciones_paciente_id_condicion_fkey
			references condiciones_medicas,
	constraint condiciones_paciente_pkey
		primary key (id_paciente, id_condicion)
);

create table participantes_cita
(
	id_cita integer not null
		constraint participantes_cita_id_cita_fkey
			references cita,
	id_empleado varchar(20) not null
		constraint participantes_cita_id_empleado_fkey
			references empleado,
	constraint participantes_cita_pkey
		primary key (id_cita, id_empleado)
);

create table tratamientos_cita
(
	tratamiento integer not null
		constraint tratamientos_cita_tratamiento_fkey
			references tratamiento,
	id_cita integer not null
		constraint tratamientos_cita_id_cita_fkey
			references cita,
	constraint tratamientos_cita_pkey
		primary key (tratamiento, id_cita)
);

create table tratamientos_paciente
(
	id_tratamiento_paciente serial not null
		constraint tratamientos_paciente_pkey
			primary key,
	no_pieza varchar(10)
		constraint tratamientos_paciente_no_pieza_fkey
			references piezas_dentales,
	id_tratamiento integer
		constraint tratamientos_paciente_id_tratamiento_fkey
			references tratamiento,
	id_paciente integer
		constraint tratamientos_paciente_id_paciente_fkey
			references paciente,
	fecha_realizacion date
);

create table utilizacion_inventario
(
	id_item integer not null
		constraint utilizacion_inventario_id_item_fkey
			references inventario,
	id_cita integer not null
		constraint utilizacion_inventario_id_cita_fkey
			references cita,
	cantidad_utilizada integer,
	constraint utilizacion_inventario_pkey
		primary key (id_item, id_cita)
);

