import Vue from 'vue';
import Router from "vue-router";

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/modules/auth/AuthLogin.vue'),
  },
  {
    path: '/adminlte',
    name: 'adminlte',
    component: () => import('@/modules/legal_v2/dashboardV2.vue'),
    children : [
      {
        path: '/',
        component: () => import('@/modules/legal_v2/Home.vue')
      },
      {
        path: 'generalElements',
        name: 'generalElements',
        component: () => import('@/modules/legal_v2/generalElements.vue')
      }
    ]
  },
  { 
    path: '/', redirect: '/home' 
  },

  {
    path: '/',
    component: () => import('@/components/dashboard/Dashboard.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/components/home/Home.vue'),
      },
      {
        path: 'expediente/registro',
        component: () => import('@/modules/legal/expedientes/registro/RegistroHome.vue'),
        children: [
          { path: '/', redirect: '/civil-laboral' },
          {
            path: 'civil-laboral',
            name: 'civil-laboral',
            component: () => import('@/modules/legal/expedientes/registro/RegistroCivilLaboral.vue')
          },
          {
            path: 'penal',
            name: 'penal',
            component: () => import('@/modules/legal/expedientes/registro/RegistroPenal.vue')
          },
          {
            path: 'arbitral',
            name: 'arbitral',
            component: () => import('@/modules/legal/expedientes/registro/RegistroArbitral.vue')
          },
          {
            path: 'indecopi',
            name: 'indecopi',
            component: () => import('@/modules/legal/expedientes/registro/RegistroIndecopi.vue')
          }
        ],
      },
      {
        path: 'expediente/busqueda',
        name: 'expediente/busqueda',
        component: () => import('@/modules/legal/expedientes/busqueda/AllSearch.vue')
      },
      {
        path: 'expediente/detalle/:id',
        name: 'expediente/detalle',
        component: () => import('@/modules/legal/expedientes/detalle/Detalles.vue')
      },
      {
        path: 'expediente/actualizacion/civil-laboral/:id',
        name: 'expediente/actualizacion/civil-laboral',
        component: () => import('@/modules/legal/expedientes/actualizacion/ActualizacionCivilLaboral.vue'),
        props: true,
      },
      {
        path: 'expediente/actualizacion/penal/:id',
        name: 'expediente/actualizacion/penal',
        component: () => import('@/modules/legal/expedientes/actualizacion/ActualizacionPenal.vue'),
        props: true,
      },
      {
        path: 'expediente/actualizacion/arbitral/:id',
        name: 'expediente/actualizacion/arbitral',
        component: () => import('@/modules/legal/expedientes/actualizacion/ActualizacionArbitral.vue'),
        props: true,
      },
      {
        path: 'expediente/actualizacion/indecopi/:id',
        name: 'expediente/actualizacion/indecopi',
        component: () => import('@/modules/legal/expedientes/actualizacion/ActualizacionIndecopi.vue'),
        props: true,
      },
      {
        path: 'expediente/lista',
        name: 'expediente/lista',
        component: () => import('@/modules/legal/expedientes/lista/Lista.vue'),
        props: true,
      },
      {
        path: 'expediente/archivados',
        name: 'expediente/archivados',
        component: () => import('@/modules/legal/expedientes/lista/Archivados.vue'),
      },
      {
        path: 'expediente/archivos/agregar/:id',
        name: 'expediente/archivos/agregar',
        component: () => import('@/components/expedientes_mantenimiento/civil_laboral/Archivos.vue')
      },

      {
        path: 'expediente/eventos/planificar/:id',
        name: 'expediente/eventos/planificar',
        component: () => import('@/components/expedientes_mantenimiento/civil_laboral/Eventos.vue')
      },

      {
        path: 'personas',
        name: 'personas',
        component: () => import('@/modules/legal/personas/CrudPersonas.vue'),
      },

      {
        path: 'equipo',
        name: 'equipo',
        component: () => import('@/modules/legal/colaboradores/Equipo.vue'),
      },

      {
        path: 'demandantes',
        name: 'demandantes',
        component: () => import('@/modules/legal/procesales/demandante/Lista.vue'),
      },
      {
        path: 'demandante/informacion/:id',
        name: 'demandante/informacion',
        component: () => import('@/modules/legal/procesales/demandante/Informacion.vue')
      },
      {
        path: 'demandante/historial/nuevo/:doc',
        name: 'demandante/historial/nuevo',
        component: () => import('@/modules/legal/historial/registroDemandante.vue'),
      },
      {
        path: 'demandados',
        name: 'demandados',
        component: () => import('@/modules/legal/procesales/demandado/Lista.vue'),
      },
      {
        path: 'demandado/informacion/:doc',
        name: 'demandado/informacion',
        component: () => import('@/modules/legal/procesales/demandado/Informacion.vue'),
        props: true,
      },
      {
        path: 'demandado/historial/nuevo/:doc',
        name: 'demandado/historial/nuevo',
        component: () => import('@/modules/legal/historial/registroDemandado.vue'),
      },
      //actividades
      {
        path: 'calendario',
        name: 'calendario',
        component: () => import('@/modules/legal/actividades/Calendario.vue')
      },

      {
        path: 'audiencias',
        name: 'audiencias',
        component: () => import('@/modules/legal/actividades/Audiencias.vue')
      },
      {
        path: 'alertas',
        name: 'alertas',
        component: () => import('@/modules/legal/actividades/Alertas.vue')
      },

      //datos
      {
        path: 'reportes',
        name: 'reportes',
        component: () => import('@/modules/legal/datos/Reportes.vue')
      },
    
      // -- matenimientos
      {
        path: 'mantenimiento/cambio-abogado',
        name: 'mantenimiento/cambio-abogado',
        component: () => import('@/modules/legal/mantenimiento/CambioAbogado.vue')
      },
      {
        path: 'mantenimiento/distritos-judiciales',
        name: 'mantenimiento/distritos-judiciales',
        component: () => import('@/modules/legal/mantenimiento/DistritoJudicial.vue')
      },
      {
        path: 'mantenimiento/instancia',
        name: 'mantenimiento/instancia',
        component: () => import('@/modules/legal/mantenimiento/Instancia.vue')
      },
      {
        path: 'mantenimiento/fiscalia',
        name: 'mantenimiento/fiscalia',
        component: () => import('@/modules/legal/mantenimiento/Fiscalia.vue')
      },
      {
        path: 'mantenimiento/especialidad',
        name: 'mantenimiento/especialidad',
        component: () => import('@/modules/legal/mantenimiento/Especialidad.vue')
      },
      {
        path: 'mantenimiento/materias',
        name: 'mantenimiento/materias',
        component: () => import('@/modules/legal/mantenimiento/Materia.vue')
      },
      {
        path: 'mantenimiento/pretension',
        name: 'mantenimiento/pretension',
        component: () => import('@/modules/legal/mantenimiento/Pretension.vue')
      },
      {
        path: 'mantenimiento/delito',
        name: 'mantenimiento/delito',
        component: () => import('@/modules/legal/mantenimiento/Delito.vue')
      },
      {
        path: 'mantenimiento/pretensionArbitral',
        name: 'mantenimiento/pretensionArbitral',
        component: () => import('@/modules/legal/mantenimiento/PretensionArbitral.vue')
      },
      {
        path: 'mantenimiento/organo-jurisdiccional',
        name: 'mantenimiento/organo-jurisdiccional',
        component: () => import('@/modules/legal/mantenimiento/Juzgado.vue')
      },
      {
        path: 'mantenimiento/juzgado-penal',
        name: 'mantenimiento/juzgado-penal',
        component: () => import('@/modules/legal/mantenimiento/JuzgadoPenal.vue')
      },
      {
        path: 'mantenimiento/tribunal-arbitral',
        name: 'mantenimiento/tribunal-arbitral',
        component: () => import('@/modules/legal/mantenimiento/TribunalArbitral.vue')
      },
      {
        path: 'mantenimiento/eliminar-expediente',
        name: 'mantenimiento/eliminar-expediente',
        component: () => import('@/modules/legal/mantenimiento/EliminarExpediente.vue')
      },
      //GESTION ADMINISTRATIVA
      //panel
      {
        path: 'panel',
        name: 'panel',
        component: () => import('../modules/administrative/Panel.vue'),
      },
      {
        path: 'oficio/registro',
        name: 'oficio/registro',
        component: () => import('../modules/administrative/views/Trade/RegistroGeneral.vue'),
      },
      {
        path: 'oficio/buscar',
        name: 'oficio/buscar',
        component: () => import('@/modules/administrative/views/Trade/AllSearch.vue'),
      },
      {
        path: 'oficio/detalle/:id',
        name: 'oficio/detalle',
        component: () => import('@/modules/administrative/views/Trade/Detalles.vue'),
        props: true,
      },
      {
        path: 'oficio/asignados',
        name: 'oficio/asignados',
        component: () => import('../modules/administrative/views/Trade/Asignados.vue'),
      },
      {
        path: 'trade/lista',
        name: 'trade/lista',
        component: () => import('@/modules/administrative/views/Trade/Lista.vue'),
        props: true,
      },
      {
        path: 'informes',
        name: 'informes',
        component: () => import('../modules/administrative/views/Trade/Informes.vue')
      },
    ]
  },

]
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'hash',
  linkActiveClass:  "open active",
  scrollBehavior: () => ({ y: 0 }),
  routes
})
