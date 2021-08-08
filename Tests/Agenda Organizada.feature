Feature: Agenda Organizada

  Rules:
  -  No pueden haber más de 2 Pacientes por cita por doctor
  -  El doctor puede ver la agenda de todos los doctores
  -  Se contempla un tiempo de limpieza entre cita por unidad
  
  Scenario: Cita individual
  Given Un a cita agendada en donde solo contempla un paciente 
  When El paciente llegue a su cita 
  Then Se le atenderá de una manera paciente y no se tendra escasez de tiempo

  Scenario: Multiples pacientes en una cita
  Given Una cita en dental en donde llegan varios paciente
  When Haya un error en la calendarización u organización de citas
  Then se tendrá que atender rapidamente a ambos pacientes
  And se reducirá el tiempo de limpieza haciendola más rápido

Scenario: La agenda está muy cargada
  Given Un día en donde este llena la agenda
  When Se empiecen a acumular los pacientes y a atrasar las citas
  Then Los pacientes tendran que esperar en la sala de espera
  And Se tendrá que limpiar cada unidad mucho más rápido

Scenario: Acuerdo de doctores en equipo a utilizar
  Given 2 doctores dandose cuenta que tienen 2 citas simultaneas
  When los 2 necesiten un aparato unico al mismo tiempo
  Then se pondrán de acuerdo en que parte de la cita lo utilizará cada quien
  And al final de utilizar el aparato, uno se lo cederá al otro
