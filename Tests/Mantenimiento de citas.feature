Feature: Mantenimiento de citas

  Rules:
  -  Es cuando una cita ya está realizada, pero se desean modificar detalles
  -  El cliente ya está registrado


  Scenario: Llega tarde a su cita
    Given El paciente ya tiene una cita planificada
    When El paciente llega 20 minutos después de la hora de cita
    Then No se le puede atender dado que no hay tiempo suficiente
    And Se agenda una nueva cita en el horario disponible
    And El paciente se trata como <Reagendado> en esa hora
    Examples:
      | Descripción               | Reagendado   |
      | Ambos disponibles         | si           |
      | Solo Doctor disponible    | no           |
      | Solo Paciente disponible  | no           |
      | Ninguno disponible        | no           |

  Scenario: El doctor no está disponible para atender a un paciente
    Given Una ausencia del doctor a un cierto horario
    When Ya haya una cita agendada
    Then Se llama para cancelar la cita
    And Se le ofrecen horarios alternativos de cita al paciente


  Scenario Outline: El cliente quiere cambiar su cita a otro día
    Given Un paciente con una cita planificada
    |Paciente Id| Estado Cita|
    |Paciente   | Confirmada |
    When Existe horario disponible para reagendar su cita
    Then Se verifica la disponibilidad en el horario solicitado
    And El paciente se trata como <Reagendado>
    Examples:
      | Descripción               | Reagendado   |
      | Ambos disponibles         | si           |
      | Solo Doctor disponible    | no           |
      | Solo Paciente disponible  | no           |
      | Ninguno disponible        | no           |
