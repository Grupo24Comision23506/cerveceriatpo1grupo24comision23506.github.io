const { log } = console;

export function renderData(data, dataDolar) {
    const reemplazarComaXPunto = dataDolar.replace(',', '.')
    let item;
    let items = "";
    let precio;

    if (!data) {
        log("No hay data");
        return null;
    }
    if (!dataDolar) {
        log("No hay data del dolar");
        return null;
    }

    for (item of data) {
        precio = item.price;
        const precioSinSigno = parseFloat(precio.replace("$", ""));
        const multiplication = precioSinSigno * reemplazarComaXPunto;
        const numeroFormateado = multiplication.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS'
          })
        let patter = `
            <div>
                <img src="${item.image}">
                <div>
                    <h2>Precio: ${numeroFormateado}
                      </h2>
                    <p>${item.name}</p>
                </div>
            </div>
        `;

        items += patter;
    }

    return items;
}
