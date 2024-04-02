<template>
  <section class="pc-container pb-4">
    <div class="pcoded-content">
      <div class="row mb-4">
        <h5 class="text-dark fw-bold">Calendario de eventos</h5>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card shadow border-0">
            <div class="card-body">
              <FullCalendar class="demo-app-calendar" :options="calendarOptions">
                <template v-slot:eventContent="arg">
                  <b>{{ arg.timeText }}</b>
                  <i>{{ arg.event.title }}</i>
                </template>
              </FullCalendar>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es';


export default {
  components: {
    FullCalendar
  },
  created() {
    this.leer();
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        weekends: true,
        themeSystem: 'bootstrap',
        dayMaxEvents: true,
        locale: esLocale,
        events: []
      },
      audiencias: [],
      audiencias_list: [],
      alertas: [],
      alertas_list: []
    }
  },
  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends
    },
    async leer() {
      if(this.$store.getters.get__user.usu_rol=='ADMIN') {
            try {
            this.$showLoadingAlert();
            const result = await this.$getData('calendario', this);
            this.audiencias = result.audiencias;
            this.alertas = result.alertas;
            this.formatEvents();
            
            this.$closeLoadingAlert();
          } catch (error) {
            this.$handleApiError(error, 'leer calendario');
          }
        }else{
            try {
                this.$showLoadingAlert();
                const params = {
                    abo_id:this.$store.getters.get__aboid,
                }
                const response = await this.$postData('lawyer/calendario', this, params);
                
                  this.audiencias = response.audiencias;
                  this.alertas = response.alertas;
                  this.formatEvents();
                this.$closeLoadingAlert();
            } catch (error) {
                this.$closeLoadingAlert();
                this.$handleApiError(error, 'listaralerts');
            }
        }
    },
    formatEvents() {
      const events = [];
      let contador = 1;

      this.audiencias.forEach((audiencia) => {
        let porcentaje = audiencia.porcentaje;
        let backgroundColor = '';

        if (porcentaje <= 1 && porcentaje > 0.67) {
          backgroundColor = '#17C666'; // Porcentaje mayor o igual a 1.0
        } else if (porcentaje <= 0.67 && porcentaje > 0.33) {
          backgroundColor = '#fd7e14'; // Porcentaje mayor o igual a 0.67 y menor que 1.0
        } else {
          backgroundColor = '#EA4D4D'; // Porcentaje menor que 0.67
        }

        events.push({
          id: contador,
          title: `Audiencia: Expediente :: ${audiencia.exp_numero}`,
          start: audiencia.au_fecha,
          backgroundColor: backgroundColor
        });
        contador++;
      });

      this.alertas.forEach((alerta) => {
        let porcentaje = alerta.ale_porcentaje;
        let backgroundColor = '';

        if (porcentaje <= 1 && porcentaje > 0.67) {
          backgroundColor = '#17C666'; // Porcentaje mayor o igual a 1.0
        } else if (porcentaje <= 0.67 && porcentaje > 0.33) {
          backgroundColor = '#fd7e14'; // Porcentaje mayor o igual a 0.67 y menor que 1.0
        } else {
          backgroundColor = '#EA4D4D'; // Porcentaje menor que 0.67
        }

        events.push({
          id: contador,
          title: `Alerta: Expediente :: ${alerta.ale_expediente}`,
          start: alerta.ale_fecha_vencimiento,
          backgroundColor: backgroundColor // Color de fondo basado en el porcentaje
        });
        contador++;
      });

      this.calendarOptions.events = events;
    },
    getBackgroundColor(porcentaje) {
      if (porcentaje <= 1 && porcentaje > 0.67) {
        return 'bg-success'; // Verde
      } else if (porcentaje <= 0.67 && porcentaje > 0.33) {
        return 'bg-warning'; // Naranja
      } else {
        return 'bg-danger text-white'; // Rojo (con texto blanco)
      }
    }

  }
}
</script>

<style>
.event-start {
  font-size: 12px;
}

.event-start {
  font-weight: 500;
}

.event-title {
  color: #7267EF;
}

.event-title,
.event-description {
  margin-left: 10px;
  font-size: 11px;
}

.fc {
  background-color: #fff;
}

.fc-event,
.fc-event-start,
.fc-event-end,
.fc-event-future,
.fc-daygrid-event,
.fc-daygrid-block-event,
.fc-h-event {
  border: none !important;
}

.fc-toolbar-title {
  font-size: 13px;
  color: #495057;
}

.fd .tr {
  background-color: #f5f5f5;
  color: #000;
}

.fc-scroller-harness {
  height: 25px;
  border-bottom: 1px solid #f1f1f1;
}

.fc-day {
  width: 50px;
  height: 50px;
}

.fc-col-header-cell-cushion {
  color: #495057;
  list-style: none;
  text-decoration: none;
  font-size: 13px;

}

.fc-daygrid-day-number {
  color: #495057;
  list-style: none;
  text-decoration: none;
  font-size: 13px;
}

.fc-next-button,
.fc-button,
.fc-button-primary {
  background-color: #7267EF !important;
  border-color: #7267EF !important;
  color: #fff !important;
  /* border-radius: 7px !important; */
}

.d-grid {
  border-radius: 4px !important;
}

.fc-popover-header {
  width: 365px;
  background-color: #7267EF !important;
  color: #fff;
  padding: 5px 10px !important;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
}

.fc-popover-body {
  width: 365px;
  background-color: #fff;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

.fc-event,
.fc-event-draggable,
.fc-event-resizable,
.fc-event-start,
.fc-event-end,
.fc-event-future,
.fc-daygrid-event,
.fc-daygrid-dot-event {
  padding-top: 7.5px !important;
  padding-bottom: 7.5px !important;
  border-radius: 4px;
}
</style>
