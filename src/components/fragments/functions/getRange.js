import getMonthName from "./monthName";

export default function getRangeMessage(mesInicio, mesFin, añoInicio, añoActual) {
  if (mesInicio === 1 && mesFin === 12) {
    // Mostrar solo el año actual
    return `Debe desde ${añoActual}`;
  } else if (mesInicio < mesFin) {
    // Mostrar solo el año actual
    return `Debe de ${getMonthName(mesInicio)} a ${getMonthName(mesFin)} de ${añoActual}`;
  } else {
    // Mostrar el año del mes de inicio y el año actual
    return `Debe de ${getMonthName(mesInicio)} de ${añoInicio} a ${getMonthName(mesFin)} de ${añoActual}`;
  }
}