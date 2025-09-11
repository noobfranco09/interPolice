export const filtrarCampos = (data, camposPermitidos) => {
  let ciudadano = {};
  if (
    Array.isArray(camposPermitidos) &&
    camposPermitidos.length > 0 &&
    typeof data === "object" &&
    data !== null &&
    !Array.isArray(data)
  ) {
    for (let campo of camposPermitidos) {
      if (data[campo]!== undefined) {
        ciudadano[campo]=data[campo];
      }
    }
    return ciudadano;
  } else {
    return false;
  }
};
