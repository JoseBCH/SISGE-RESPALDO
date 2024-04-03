<template>
  <nav class="pc-sidebar" :class="{ 'open': sidebarOpen }">
    <div class="navbar-wrapper">
      <div class="m-header">
        <a href="#" class="b-brand">
          <img src="@/assets/images/logo-unprg.png" alt="" class="img-fluid">
        </a>
      </div>
      <div class="navbar-content">
        <ul class="pc-navbar py-2">
          <li class="pc-item pc-caption"  v-if="showOption('ADMIN', 'ABOGADO')">
            <label class="text-white">Gestion Judicial</label>
          </li>
          <li class="pc-item pc-hasmenu" v-if="showOption('ADMIN', 'ABOGADO')" @click="toggleMenu('home')">
            <router-link to="/home" class="pc-link" :class="{ 'bg-primary text-white rounded': getRouteHome() }">
              <span class="pr-3">
                <i data-feather="box"></i>
              </span>
              <span class="pc-mtext">Inicio</span>
            </router-link>
          </li>
          <li class="pc-item pc-hasmenu" v-if="showOption('ADMIN', 'ABOGADO')">
            <a href="javascript:void(0)" class="pc-link " @click="toggleMenu('expediente')"
              :class="{ 'selected': isOpen === 'expediente' && !getRouteExpediente(), 'bg-primary text-white rounded': getRouteExpediente() }">
              <span class="pr-3">
                <i data-feather="layers"></i>
              </span>
              <span class="pc-mtext"
                :class="{ 'text-primary': isOpen === 'expediente', 'text-white': getRouteExpediente() }">Expediente</span>
              <span class="pc-arrow" :class="{ 'rotate-down': isOpen === 'expediente' }">
                <i data-feather="chevron-right"></i>
              </span>
            </a>
            <ul class="pc-submenu" v-show="isOpen === 'expediente'">
              <li class="pc-item">
                <router-link to="/expediente/registro/civil-laboral" class="pc-link"
                  :class="{ 'text-white': getRouteExpedienteRegistro() }">
                  Registrar
                </router-link>
              </li>
              <li class="pc-item">
                <router-link to="/expediente/busqueda" class="pc-link"
                  :class="{ 'text-white': getRouteExpedienteBuscar() }">
                  Buscar
                </router-link>
              </li>
              <li class="pc-item">
                <router-link to="/expediente/archivados" class="pc-link"
                  :class="{ 'text-white': getRouteExpedienteArchivados() }">
                  Archivados
                </router-link>
              </li>
            </ul>
          </li>
          <li class="pc-item pc-hasmenu" v-if="showOption('ADMIN', 'ABOGADO')" @click="toggleMenu('personas')">
            <router-link to="/personas" class="pc-link" :class="{ 'bg-primary text-white rounded': getRoutePersonas() }">
              <span class="pr-3">
                <i data-feather="box"></i>
              </span>
              <span class="pc-mtext">Personas</span>
            </router-link>
          </li>
          <li class="pc-item pc-hasmenu" v-if="showOption('ADMIN')" @click="toggleMenu('equipo')">
            <router-link to="/equipo" class="pc-link" :class="{ 'bg-primary text-white rounded': getRouteEquipo() }">
              <span class="pr-3">
                <i data-feather="box"></i>
              </span>
              <span class="pc-mtext">Equipo UNPRG</span>
            </router-link>
          </li>
          <li class="pc-item pc-hasmenu" v-if="showOption('ADMIN', 'ABOGADO')">
            <a href="javascript:void(0)" class="pc-link" @click="toggleMenu('agenda')"
              :class="{ 'selected': isOpen === 'agenda' && !getRouteAgenda(), 'bg-primary text-white rounded': getRouteAgenda() }">
              <span class="pr-3">
                <i data-feather="calendar"></i>
              </span>
              <span class="pc-mtext"
                :class="{ 'text-primary': isOpen === 'agenda', 'text-white': getRouteAgenda() }">Agenda</span>
              <span class="pc-arrow" :class="{ 'rotate-down': isOpen === 'agenda' }">
                <i data-feather="chevron-right"></i>
              </span>
            </a>
            <ul class="pc-submenu" v-show="isOpen === 'agenda'">
              <li class="pc-item">
                <router-link to="/calendario" class="pc-link" :class="{ 'text-white': getRouteCalendario() }">
                  Calendario
                </router-link>
              </li>
              <li class="pc-item">
                <router-link to="/audiencias" class="pc-link" :class="{ 'text-white': getRouteAudiencia() }">
                  Audiencias
                </router-link>
              </li>
              <li class="pc-item">
                <router-link to="/alertas" class="pc-link" :class="{ 'text-white': getRouteAlerta() }">
                  Alertas
                </router-link>
              </li>
            </ul>
          </li>
          <li class="pc-item pc-hasmenu" v-if="showOption('ADMIN')" @click="toggleMenu('reporte')">
            <router-link to="/reportes" class="pc-link" :class="{ 'bg-primary text-white': getRouteReporte() }">
              <span class="pr-3">
                <i data-feather="file-text"></i>
              </span>
              <span class="pc-mtext">Reportes</span>
            </router-link>
          </li>
          <li class="pc-item pc-hasmenu" v-if="showOption('ADMIN')">
            <a href="javascript:void(0)" class="pc-link" @click="toggleMenu('mantenimiento')"
              :class="{ 'selected': isOpen === 'mantenimiento' && !getRouteMantenimiento(), 'bg-primary text-white rounded': getRouteMantenimiento() }">
              <span class="pr-3">
                <i data-feather="settings"></i>
              </span>
              <span class="pc-mtext"
                :class="{ 'text-primary': isOpen === 'mantenimiento', 'text-white': getRouteMantenimiento() }">Mantenimiento</span>
              <span class="pc-arrow" :class="{ 'rotate-down': isOpen === 'mantenimiento' }">
                <i data-feather="chevron-right"></i>
              </span>
            </a>
            <ul class="pc-submenu" v-show="isOpen === 'mantenimiento'">
              <li class="pc-item">
                <router-link to="/mantenimiento/distritos-judiciales" class="pc-link">
                  Distrito Judicial
                </router-link>
              </li>
              <li class="pc-item">
                <router-link to="/mantenimiento/instancia" class="pc-link">
                  Instancias
                </router-link>
              </li>
              <li class="pc-item">
                <router-link to="/mantenimiento/fiscalia" class="pc-link">
                  Fiscalia
                </router-link>
              </li>
              <li class="pc-item">
                <router-link to="/mantenimiento/especialidad" class="pc-link">
                  Especialidad
                </router-link>
              </li>
              <li class="pc-item">
                <router-link to="/mantenimiento/materias" class="pc-link">
                  Materias
                </router-link>
              </li>
              <li class="pc-item">
                <router-link to="/mantenimiento/pretension" class="pc-link">
                  Pretensiones
                </router-link>
              </li>
              <li class="pc-item">
                <router-link to="/mantenimiento/delito" class="pc-link">
                  Delitos
                </router-link>
              </li>
              <li class="pc-item">
                <router-link to="/mantenimiento/pretensionArbitral" class="pc-link">
                  Pretensión Arbitral
                </router-link>
              </li>
              <li class="pc-item">
                <router-link to="/mantenimiento/organo-jurisdiccional" class="pc-link">
                  Organo Jurisdiccional
                </router-link>
              </li>
              <li class="pc-item">
                <router-link to="/mantenimiento/juzgado-penal" class="pc-link">
                  Juzgado Penal
                </router-link>
              </li>
              <li class="pc-item">
                <router-link to="/mantenimiento/tribunal-arbitral" class="pc-link">
                  Tribunal Arbitral
                </router-link>
              </li>
              <li class="pc-item">
                <router-link to="/mantenimiento/cambio-abogado" class="pc-link">
                  Cambio de Abogado
                </router-link>
              </li>
              <li class="pc-item">
                <router-link to="/mantenimiento/eliminar-expediente" class="pc-link">
                  Eliminar Expediente
                </router-link>
              </li>
            </ul>
          </li>
          <li class="pc-item pc-caption">
            <label class="text-white">Gestion Administrativa</label>
          </li>
          <li class="pc-item pc-hasmenu" v-if="showOption('ADMIN', 'ABOGADO', 'SECRETARIA', 'ASISTENTE')"
            @click="toggleMenu('panel')">
            <router-link to="/panel" class="pc-link" :class="{ 'bg-primary text-white rounded': getRoutePanel() }">
              <span class="pr-3">
                <i data-feather="box"></i>
              </span>
              <span class="pc-mtext">Panel</span>
            </router-link>
          </li>
          <li class="pc-item pc-hasmenu" v-if="showOption('ADMIN', 'ABOGADO', 'SECRETARIA', 'ASISTENTE')">
            <a href="javascript:void(0)" class="pc-link " @click="toggleMenu('oficio')"
              :class="{ 'selected': isOpen === 'oficio' && !getRouteOficio(), 'bg-primary text-white rounded': getRouteOficio() }">
              <span class="pr-3">
                <i data-feather="layers"></i>
              </span>
              <span class="pc-mtext"
                :class="{ 'text-primary': isOpen === 'oficio', 'text-white': getRouteOficio() }">Expediente</span>
              <span class="pc-arrow" :class="{ 'rotate-down': isOpen === 'oficio' }">
                <i data-feather="chevron-right"></i>
              </span>
            </a>
            <ul class="pc-submenu" v-show="isOpen === 'oficio'">
              <li class="pc-item" v-if="showOption('ADMIN','SECRETARIA')">
                <router-link to="/oficio/registro" class="pc-link"
                :class="{ 'text-primary': getRouteOficioRegistro() }">
                  Registrar
                </router-link>
              </li>
              <li class="pc-item" v-if="showOption('ADMIN','SECRETARIA')">
                <router-link to="/oficio/buscar" class="pc-link"
                :class="{ 'text-primary': getRouteOficioBuscar() }">
                  Buscar
                </router-link>
              </li>
              <li class="pc-item" v-if="showOption('ABOGADO', 'ASISTENTE')">
                <router-link to="/oficio/asignados" class="pc-link">
                  Asignados
                </router-link>
              </li>
            </ul>
          </li>
          <li class="pc-item pc-hasmenu" v-if="showOption('ADMIN', 'ABOGADO', 'SECRETARIA')"
            @click="toggleMenu('informe')">
            <router-link to="/informes" class="pc-link">
              <span class="pr-3">
                <i data-feather="file-text"></i>
              </span>
              <span class="pc-mtext">Informes</span>
            </router-link>
          </li>
        </ul>
        <div class="col-md-12 py-4 px-4">
          <button class="btn btn-danger w-100 rounded" @click="mtdLogout">Salir
            <span class="text-white px-2">
              <i data-feather="log-out"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
  
<script>
import feather from 'feather-icons';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

export default {
  name: 'LayoutSidebar',
  data() {
    return {
      isOpen: null,
      sidebarOpen: false,
    };
  },
  computed: {
    rol() {
      return this.$store.getters.get__user.usu_rol;
    },
  },
  created() {
    this.loadSelect();
    this.$root.$on('toggle-sidebar', this.toggleSidebar);
  },

  mounted() {
    const container = document.querySelector('.navbar-content');
    const ps = new PerfectScrollbar(container);

    this.$once('hook:beforeDestroy', () => {
      ps.destroy();
    });

    this.$nextTick(() => {
      feather.replace();
    });
  },
 
  methods: {

    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },

    showOption(...allowedRoles) {
      return allowedRoles.includes(this.rol);
    },

    toggleMenu(menu) {
      this.isOpen = this.isOpen === menu ? null : menu;
      this.saveSelected();
    },

    saveSelected() {
      localStorage.setItem('isOpen', this.isOpen);
    },

    loadSelect() {
      const isOpen = localStorage.getItem('isOpen');
      if (isOpen !== null) {
        this.isOpen = isOpen;
      }
    },

    clearLocalStorage() {
      localStorage.removeItem('isOpen');
    },

    mtdLogout() {
      this.$store.commit('mt_logout_auth');
      this.$router.replace({ path: '/' });
      this.clearLocalStorage();
    },

    getRouteHome() {
      return this.$route.path === '/home';
    },

    getRouteExpedienteRegistro() {
      const routesToCheck = [
        '/expediente/registro/civil-laboral',
        '/expediente/registro/penal',
        '/expediente/registro/arbitral',
        '/expediente/registro/indecopi'
      ];
      return routesToCheck.some(route => this.isRouteActive(route));
    },

    getRouteExpedienteActualizacion() {
      const routesToCheck = [
        '/expediente/actualizacion/civil-laboral/',
        '/expediente/actualizacion/penal/',
        '/expediente/actualizacion/arbitral/',
        '/expediente/actualizacion/indecopi/'
      ];
      return routesToCheck.some(route => this.isRouteActive(route));
    },

    getRouteExpedienteBuscar() {
      const routesToCheck = [
        '/expediente/busqueda',
        '/expediente/detalle/',
        '/expediente/lista',
        '/expediente/actualizacion/',
        '/eventos/',
        '/expediente/archivados'
      ];
      return routesToCheck.some(route => this.isRouteActive(route));
    },

    getRouteExpedienteArchivados() {
      const routesToCheck = [
        '/expediente/archivados',
      ];
      return routesToCheck.some(route => this.isRouteActive(route));
    },

    getRouteExpediente() {
      if (this.getRouteExpedienteRegistro() || this.getRouteExpedienteBuscar() || this.getRouteExpedienteActualizacion()) {
        return true;
      }
    },

    isRouteActive(route) {
      const regex = new RegExp(`^${route}\\d*$`);
      return regex.test(this.$route.path);
    },

    getRouteDemandante() {
      const routesToCheck = [
        '/demandantes',
        '/historial/registro-demandante/',
        '/demandante/informacion/'
      ]
      return routesToCheck.some(route => this.isRouteActive(route));
    },

    getRouteDemandado() {
      const routesToCheck = [
        '/demandados',
        '/historial/registro-demandado/',
        '/demandado/informacion/'
      ]
      return routesToCheck.some(route => this.isRouteActive(route));
    },

    getRoutePersonas() {
      const routesToCheck = [
        '/personas'
      ]
      return routesToCheck.some(route => this.isRouteActive(route));
    },

    getRouteAbogado() {
      const routesToCheck = [
        '/abogados'
      ]
      return routesToCheck.some(route => this.isRouteActive(route));
    },

    getRouteEquipo() {
      const routesToCheck = [
        '/equipo'
      ]
      return routesToCheck.some(route => this.isRouteActive(route));
    },

    getRouteCalendario() {
      return this.$route.path === '/calendario';
    },

    getRouteAudiencia() {
      return this.$route.path === '/audiencias';
    },

    getRouteAlerta() {
      return this.$route.path === '/alertas';
    },
    getRouteAgenda() {
      if (this.getRouteCalendario() || this.getRouteAudiencia() || this.getRouteAlerta()) {
        return true;
      }
    },

    getRouteReporte() {
      return this.$route.path === '/reportes';
    },

    getRouteMantenimiento() {
      const currentRoute = this.$route.path;
      return currentRoute.includes('/mantenimiento');
    },

    getRoutePanel() {
      return this.$route.path === '/panel';
    },

    getRouteEmail() {
      return this.$route.path === '/email/auth';
    },

    getRouteOficioBuscar() {
      const routesToCheck = [
        '/oficio/buscar',
        'oficio/lista',
        'oficio/detalle'
      ];
      return routesToCheck.some(route => this.isRouteActive(route));
    },

    getRouteOficioRegistro() {
      const routesToCheck = [
        '/oficio/registro'
      ];
      return routesToCheck.some(route => this.isRouteActive(route));
    },

    getRouteOficio() {
      if (this.getRouteOficioRegistro() || this.getRouteOficioBuscar()) {
        return true;
      }
    },
  }
}
</script>
  
  
<style scoped>
@media (max-width: 1024px) {
  .pc-sidebar {
    left: -280px;
  }
}

.open {
  left: 0px !important;
}

.rotate-down {
  transform: rotate(90deg);
}

.selected {
  background-color: #ffffff !important;
  color: #0d6efd !important;
  border-radius: 4px;
}

.navbar-content::-webkit-scrollbar {
  width: 6px;
}

.navbar-content::-webkit-scrollbar-thumb {
  background-color: #888 !important;
  ;
}

.navbar-content::-webkit-scrollbar-thumb {
  height: 20px !important;
}</style>
  