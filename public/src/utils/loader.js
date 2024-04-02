import Swal from 'sweetalert2';
import '../assets/css/loader.css';

let loadingAlert = null;

export const showLoadingAlert = (title, text) => {
  loadingAlert = Swal.fire({
    title: title || 'Cargando',
    text: text || 'Por favor, espera...',
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
      document.body.classList.add('loading');
    },
  });
};

export const closeLoadingAlert = () => {
  if (loadingAlert) {
    loadingAlert.close();
    document.body.classList.remove('loading');
  }
};

export const warnignAlert = (title, text) => {
  Swal.fire({
    title: title || '',
    text: text,
    icon: 'warning',
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#7267EF',
  })
}

export const warningAlertWithCancel = (title, text, onConfirm, onCancel) => {
  Swal.fire({
    title: title || '',
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#7267EF',
  }).then((result) => {
    if (result.isConfirmed) {
      if (onConfirm && typeof onConfirm === 'function') {
        onConfirm();
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      if (onCancel && typeof onCancel === 'function') {
        onCancel();
      }
    }
  });
};

export const successAlert = (title, text) => {
  Swal.fire({
    title: title || '',
    text: text,
    icon: 'success',
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#17C666',
  })
}

export const errorAlert = (title, text) => {
  Swal.fire({
    title: title || '',
    text: text,
    icon: 'error',
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#EA4D4D',
  })
}