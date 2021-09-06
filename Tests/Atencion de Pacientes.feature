Feature: Atencion de pacientes

    Rules:
    -  Las radiografías del paciente deben aparecer en la ficha
    -  El presupuesto es proporcional a la cantidad de tratamientos

    Scenario: Primeras radiografías
        Given El paciente no tiene radiografías
        When Se desea agregar una radiografía de un paciente
        Then Se agrega mediante un botón

    Scenario: Edición de radiografías viejas
        Given Radiografía vieja o desactualizada
        When Se desea quitar una radiografía para agregar una nueva
        Then Se presiona el botón de eliminar radiografía y se agrega una nueva en el botón de agregar

    Scenario: Ingresar tratamiento
        Given Se realizó un tratamiento basado en una de las 5 secciones de un diente
        When Se quiere guardar la información sobre el tratamiento realizado en una de las secciones
        Then Se hace click izquierdo en la seccion del diente para agregarlo

    Scenario: Obtener presupuesto
        Given Se tiene un resumen de la cuenta de tratamiento y precio
        When Se acaba de finalizar una evaluación
        Then Se imprime presionando un botón

    Scenario: Mostrar tratamientos realizados
        Given Tratamiento o tratamientos realizados en la cita
        When Se finalizó la cita y se guardó la información del tratamiento
        Then Se muestran en el odontograma
