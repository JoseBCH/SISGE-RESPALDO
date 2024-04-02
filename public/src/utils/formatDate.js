// formatData.js

import Vue from 'vue';
import moment from 'moment';

Vue.prototype.$formatFecha = function (fechaISO) {
  const fecha = moment(fechaISO, 'DD-MM-YYYY');

  if (!fecha.isValid()) {
    return 'Fecha inválida';
  }

  return fecha.format('DD MMM YYYY');
};

Vue.prototype.$formatDate = function (fechaISO) {
  const fecha = new Date(fechaISO);
  const opcionesFormato = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return fecha.toLocaleDateString('es-ES', opcionesFormato);
};

Vue.prototype.$formatHora = function (horaISO) {
  const hora = moment(horaISO, 'HH:mm');

  if (!hora.isValid()) {
    return 'Hora inválida';
  }

  return hora.format('h:mm A');
}