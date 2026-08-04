# Sistema de comprobantes - Sector VI

Sistema estático para emitir comprobantes de pago de Sector VI - Privada Huinalá. Está preparado para publicarse en GitHub Pages sin servidor ni base de datos externa.

## Abrir correctamente en una computadora

> No abras `index.html` directamente desde dentro del archivo ZIP ni copies únicamente ese archivo. Si lo haces, el navegador no encontrará los estilos y el JavaScript; por eso se verá sin diseño y el botón de PDF no funcionará.

1. Descarga y **extrae todo** `Sistema-Comprobantes.zip`.
2. Abre la carpeta extraída y conserva juntos `index.html`, `src/` y `assets/`.
3. Abre `index.html` con Chrome o Edge.
4. Completa los campos y pulsa **Guardar como PDF**. En la ventana del navegador, selecciona **Guardar como PDF** y confirma el tamaño carta.

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

## Publicar en Vercel

También funciona en Vercel. Sube el contenido de esta carpeta a un repositorio y, al crear el proyecto en Vercel, deja el preset como **Other** y no configures un comando de compilación: Vercel sirve directamente los archivos HTML, CSS y JavaScript. La función **Guardar como PDF** abre la ventana de impresión del navegador; Vercel no genera ni almacena el PDF en un servidor.

## Estructura

- `src/comprobantes/`: interfaz, estilos, lógica y catálogo de viviendas.
- `src/pagos/`: espacio reservado para el historial de pagos cuando exista un servicio protegido.
- `src/usuarios/`: espacio reservado para control de accesos.
- `src/reportes/`: espacio reservado para reportes y exportaciones.
- `assets/`: logotipo y plantilla visual.
- `docs/`: manual y capturas.
- `datos/`: padrón real de las 169 viviendas, catálogo de importes y registro de pagos vacío.

## Datos incluidos

El archivo `datos/padron-sector-vi.xlsx` contiene únicamente el padrón real de viviendas y los importes aprobados. La hoja **Registro de pagos** no contiene movimientos precargados: debe llenarse solo con pagos reales, y no se debe publicar en GitHub si incluye información sensible.
