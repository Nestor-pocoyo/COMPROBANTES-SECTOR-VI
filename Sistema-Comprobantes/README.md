# Sistema de comprobantes - Sector VI

Sistema estático para emitir comprobantes de pago de Sector VI - Privada Huinalá. Está preparado para publicarse en GitHub Pages sin servidor ni base de datos externa.

## Funciones

- Padrón integrado de 169 viviendas: Calipso, Clio, Olimpia, Orión y París.
- Importes preconfigurados: mensualidad $340, anualidad $3,500 y tarjeta $150 MXN.
- Folio, fecha de pago, emisión, concepto, vivienda, método de pago y referencia.
- Campos condicionales para código de tarjeta y adeudo anterior.
- Vista previa en tamaño carta, firma de Tesorería y guardado mediante la ventana **Guardar como PDF**.
- No captura nombre de propietario ni observaciones.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube el contenido completo de esta carpeta.
2. En **Settings > Pages**, selecciona **Deploy from a branch**.
3. Elige la rama `main` y la carpeta `/ (root)`.
4. Guarda los cambios; GitHub mostrará la dirección pública del sistema.

> Importante: este proyecto es estático. El último folio se guarda únicamente en el navegador del equipo que lo usa. No publiques en GitHub datos personales, historiales de pagos reales ni archivos con información sensible.

## Estructura

- `src/comprobantes/`: interfaz, estilos, lógica y catálogo de viviendas.
- `src/pagos/`: espacio reservado para el historial de pagos cuando exista un servicio protegido.
- `src/usuarios/`: espacio reservado para control de accesos.
- `src/reportes/`: espacio reservado para reportes y exportaciones.
- `assets/`: logotipo y plantilla visual.
- `docs/`: manual y capturas.
- `examples/`: comprobante ficticio de referencia.
- `datos-ejemplo/`: pagos ficticios para pruebas.
