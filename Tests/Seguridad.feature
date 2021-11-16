Feature: Seguridad de los datos
  Rules:
  -  Las vulnerabilidades de código se detectan en cada commit con codeql
  -  Cada login está autenticado mediante un token
  -  Las dependencias deberán estar autenticadas en una versión segura

  Scenario: Hay vulnerabilidades críticas en un commit
    Given Un commit que contenga altas vulnerabilidades de datos
    When Codeql analice el commit
    Then Se detectan las vulnerabilidades críticas de datos
    And No se sube al ambiente de producción los cambios
    And Se notifica al equipo de desarrollo mediante github

  Scenario: Hay vulnerabilidades medias en un commit
    Given Un commit con vulnerabilidades medianas
    When Codeql analice el commit
    Then Se detectan las vulnerabilidades medianas de datos 
    And se sube al ambiente el commit pero se notifica al equipo de desarrollo mediante github

  Scenario: Un commit no tiene vulnerabilidades
    Given un commit con código seguro
    When Codeql analice el commit
    Then No se detectan vulnerabilidades de datos
    And Se sube al ambiente de producción sin advertencias
    
  Scenario: Se utilizan credenciales correctas en el login
    Given un login de un miembro de la clínica odontológica
    When se hace un login correcto
    Then se obtiene un token de acceso válido
    And se accede al sistema y a sus datos durante 24 horas
    And el api responderá correctamente

  Scenario: No Se utilizan credenciales correctas en el login
    Given un login de un miembro de la clínica odontológica
    When se hace un login con usuario o contraseña incorrecto
    Then No se obtiene un token de acceso
    And no se accede al sistema 
    And si se intenta acceder al api dará error 401

  Scenario: Se venve un token de login a un usuari0
    Given un inicio de sesión con un token de acceso válido
    When hayan pasado 24 horas despues del login
    Then el token de acceso se vencerá
    And no se puede acceder al sistema
    And si se intenta acceder al api dará error 401

  Scenario: Se utilizan dependencias altamente vulnerables en un commit
    Given Un commit que contenga altas vulnerabilidades de dependencias
    When dependabot analice el arbol de dependencias commit
    Then Se detectan las vulnerabilidades críticas de dependencias
    And hace un pull request con las modificaciones para arreglar las vulnerabilidades

    Scenario: Se utilizan dependencias medianemente vulnerables en un commit
    Given un commit que contenga vulnerabilidades de dependencias medianas
    When dependabot analice el arbol de dependencias commit
    Then Se detectan las vulnerabilidades medianas de dependencias
    And notificará al equipo de desarrollo mediante github en el apartado de security
    And dará la opción de hacer un pull request con las modificaciones para arreglar las vulnerabilidades

    Scenario: Un commit no tiene vulnerabilidades de dependencias
    Given un commit con código seguro
    When dependabot analice el arbol de dependencias en el commit
    Then No se detectan vulnerabilidades de dependencias

    Scenario: Dependabot no puede arreglar las dependencias automaticamente
    Given un commit con vulnerabilidades de dependencias
    When dependabot encuentre una vulnerabilidad no posible de arreglar automaticamente	
    Then Se notificará al equipo de desarrollo mediante github en el apartado de security
    And mostrará cual es la dependencia que se debe de arreglar
    And no dará la opción de hacer un pull request con las modificaciones para arreglar las vulnerabilidades




