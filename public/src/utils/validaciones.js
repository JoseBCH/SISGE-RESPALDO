// validaciones.js

export function validarCampo(objeto, campo, errores) {
    errores[campo] = !objeto[campo].trim();
  }
  
  export function validarCampos(objeto, errores) {
    Object.keys(errores).forEach(campo => validarCampo(objeto, campo, errores));
  
    return !Object.values(errores).some(Boolean);
  }
  