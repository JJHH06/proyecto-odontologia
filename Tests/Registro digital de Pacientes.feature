Feature: Registro digital de Pacientes
  Rules:
  -  Es antes de la primera evaluación del paciente
  -  Principalmente se debe hacer dentro de la clínica en una computadora por el paciente

  Scenario: Llega un paciente a su cita sin datos previos
    Given Un paciente nuevo que no tiene información en la clínica
    When Llegue a su primera cita a la clínica
    Then se le pasa una encuesta mediante una computadora
    And Llenará todos los campos medicos y personales que se le soliciten

  Scenario: Llega un paciente nuevo que no sabe usar computadora
    Given Un paciente, generalmente, de avanzada edad que no sabe usar computadora
    When llegue a su primera cita a la clínica
    Then La asistente procederá a hacerle una encuesta oral con sus datos

  Scenario: Llega un paciente recurrente
    Given Un paciente que ya tiene diagnostico
    When Llegue a su cita de seguimiento
    Then El asistente procede a buscarlo dentro del sistema
    And Le alista al doctor la ficha virtual del paciente dentro de la clínica

  Scenario: No hay señal
    Given Una falla de conectividad en el sistema
    When Se esten buscando los datos de un paciente recurrente
    Then Se espera a que la señal de internet vuelva
    And Se sigue buscando hasta que carguen los datos solicitados

  Scenario: Datos generales y dentales en un mismo lugar
    Given Una cita dental
    When El doctor desee ver el progreso dental de su paciente
    Then Accede solo a la ficha de datos del paciente
    And apareceran todos los datos unificados

  Scenario: Buscando a algun paciente en el sistema
    Given Una busqueda de datos de algun paciente
    When Se tenga que preparar la información de una cita recurrente al doctor
    Then La asistente buscará cualquier combinación del nombre del paciente
    And El paciente deseado aparecerá entre los primeros resultados de las busquedas

  Scenario: Llama por teléfono un paciente nuevo
    Given Un paciente nuevo sin datos registrados previamente en la clínica
    When Desea agendar una primera cita en la clínica dental por medio de llamada telefónica
    Then Se le indica al cliente que al presentarse el día de su cita se le tomaran sus datos