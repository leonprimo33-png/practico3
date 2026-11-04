// Simulador de compra - ZONAGRIS

// Variables globales: se usan desde varias funciones y no cambian
const NOMBRE_TIENDA = "ZONAGRIS";
const MINIMO_PARA_DESCUENTO = 100000;
const PORCENTAJE_DESCUENTO = 10;

// Función declarada: recibe la opción del menú y retorna el nombre del producto
function obtenerNombreProducto(opcion) {
  switch (opcion) {
    case "1":
      return "Auriculares Bluetooth";
    case "2":
      return "Mochila inteligente";
    case "3":
      return "Lámpara LED RGB";
    case "4":
      return "Botella térmica";
    default:
      return "";
  }
}

// Función declarada: recibe la opción del menú y retorna el precio del producto
function obtenerPrecioProducto(opcion) {
  switch (opcion) {
    case "1":
      return 45000;
    case "2":
      return 60000;
    case "3":
      return 25000;
    case "4":
      return 30000;
    default:
      return 0;
  }
}

// Función declarada: pide la cantidad hasta que sea válida.
// Retorna 0 si el usuario cancela.
function pedirCantidad(nombreProducto) {
  let cantidad = 0;

  while (cantidad <= 0 || !Number.isInteger(cantidad)) {
    const respuesta = prompt("¿Cuántas unidades de " + nombreProducto + " querés?");

    if (respuesta === null) {
      return 0;
    }

    cantidad = Number(respuesta);

    if (cantidad <= 0 || !Number.isInteger(cantidad)) {
      alert("Ingresá un número entero mayor a 0.");
    }
  }

  return cantidad;
}

// Función flecha: calcula el subtotal de un producto
const calcularSubtotal = (precio, cantidad) => precio * cantidad;

// Función expresada: calcula el descuento según el total de la compra
const calcularDescuento = function (total) {
  if (total >= MINIMO_PARA_DESCUENTO) {
    return (total * PORCENTAJE_DESCUENTO) / 100;
  }
  return 0;
};

// Función declarada: muestra el resultado final por consola y alert
function mostrarResumen(cliente, total) {
  if (total === 0) {
    console.log(cliente + " no realizó ninguna compra.");
    alert("No agregaste productos. ¡Gracias por visitarnos, " + cliente + "!");
    return;
  }

  const descuento = calcularDescuento(total);
  const totalFinal = total - descuento;

  console.log("----- RESUMEN DE COMPRA -----");
  console.log("Cliente: " + cliente);
  console.log("Total: $" + total);
  console.log("Descuento: $" + descuento);
  console.log("Total a pagar: $" + totalFinal);

  alert(
    "Gracias por tu compra, " + cliente + "!\n" +
    "Total: $" + total + "\n" +
    "Descuento: $" + descuento + "\n" +
    "Total a pagar: $" + totalFinal
  );
}

// Función declarada: controla el recorrido completo del simulador
function iniciarSimulador(nombreTienda) {
  const cliente = prompt("Bienvenido a " + nombreTienda + ". ¿Cómo te llamás?") || "cliente";
  let total = 0;
  let seguirComprando = true;

  console.log("Simulador de " + nombreTienda + " iniciado. Cliente: " + cliente);

  while (seguirComprando) {
    const opcion = prompt(
      "Elegí un producto:\n" +
      "1 - Auriculares Bluetooth ($45000)\n" +
      "2 - Mochila inteligente ($60000)\n" +
      "3 - Lámpara LED RGB ($25000)\n" +
      "4 - Botella térmica ($30000)\n" +
      "0 - Terminar compra\n\n" +
      "Total actual: $" + total
    );

    if (opcion === "0" || opcion === null) {
      seguirComprando = false;
    } else {
      const precio = obtenerPrecioProducto(opcion);

      if (precio === 0) {
        alert("Opción no válida. Probá de nuevo.");
      } else {
        const nombreProducto = obtenerNombreProducto(opcion);
        const cantidad = pedirCantidad(nombreProducto);

        if (cantidad > 0) {
          const subtotal = calcularSubtotal(precio, cantidad);
          total = total + subtotal;
          console.log(cantidad + " x " + nombreProducto + " = $" + subtotal);
          alert("Agregaste " + cantidad + " x " + nombreProducto + ". Subtotal: $" + subtotal);
        }
      }
    }
  }

  mostrarResumen(cliente, total);
}

// Llamada que arranca el simulador
iniciarSimulador(NOMBRE_TIENDA);
