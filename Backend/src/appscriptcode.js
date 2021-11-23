function saveData(e) {
    const info = e.namedValues;

    const nombre = info['Nombre'][0];
    const email = info['Correo electrónico'][0];
    const telefono_casa = info['Telefono de Casa'][0];
    const telefono_celular = info['Celular'][0];
    const fecha_nacimiento = info['Fecha de nacimiento'][0];
    const estado_civil = info['Estado Civil'][0];
    const ocupacion = info['Ocupación'][0];
    const direccion = info['Dirección'][0];
    const recomendado_por = info['Recomendado por'][0];
    const visita_anterior_dentista = info['Ultima visita al Dentista  *aproximadamente*'][0];
    const motivo_consulta = info['Motivo de consulta'][0];
    const medico = info['Doctor personal'][0];
    const telefono_medico = info['Telefono del doctor personal'][0];
    const contacto_emergencia = info['Contacto de emergencias'][0];
    const telefono_emergencia = info['Número de contacto de emergencias'][0];
    const medicamentos = info['Si está tomando algún medicamento, por favor colóquelo'][0];
    const condicionesMedicas = info['Marque las condiciones médicas que padece. Si no padece de ninguna, deje en blanco.'];
    const condicionesDentales = info['Marque las condiciones dentales que padece. Si no padece de ninguna, deje los espacios en blanco'];

    let data = {
        nombre,
        email,
        telefono_casa,
        telefono_celular,
        fecha_nacimiento,
        estado_civil,
        ocupacion,
        direccion,
        recomendado_por,
        visita_anterior_dentista,
        motivo_consulta,
        medico,
        telefono_medico,
        contacto_emergencia,
        telefono_emergencia,
        medicamentos
    }

    var params = {
        'method': 'POST',
        'payload': data
    }

    const res = UrlFetchApp.fetch('http://198.211.103.50:5000/api/paciente/addPaciente2', params)

    var idPaciente = JSON.parse(res.getContentText()).result.id_paciente;
    idPaciente = parseInt(idPaciente)

    var data2 = {
        conditionsArray: condicionesMedicas[0]
    }

    var params2 = {
        'method': 'POST',
        'payload': data2
    }

    const res2 = UrlFetchApp.fetch('http://198.211.103.50:5000/api/condiciones_paciente/getConditionID', params2)

    var condicionesMedicasIDArray = JSON.parse(res2.getContentText()).arrayIds;

    var data3 = {
        conditionsArray: condicionesDentales[0]
    }

    var params3 = {
        'method': 'POST',
        'payload': data3
    }

    const res3 = UrlFetchApp.fetch('http://198.211.103.50:5000/api/condiciones_paciente/getConditionID', params3)

    var condicionesDentalesIDArray = JSON.parse(res3.getContentText()).arrayIds;

    var condicionesIDArray = condicionesMedicasIDArray.concat(condicionesDentalesIDArray);

    var condiciones = []

    for (var i = 0; i < condicionesIDArray.length; i++) {
        condiciones.push({ "id_condicion": condicionesIDArray[i] })
    }

    condiciones = JSON.stringify(condiciones)

    var data4 = {
        id_paciente: idPaciente,
        condiciones
    }

    var params4 = {
        'method': 'POST',
        'payload': data4
    }

    const res4 = UrlFetchApp.fetch('http://198.211.103.50:5000/api/condiciones_paciente/addCondicionesPaciente2', params4)

    Logger.log(JSON.parse(res4.getContentText()))
}

function permisos() {
    FormApp.getActiveForm();
}
