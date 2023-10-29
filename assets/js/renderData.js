const { log, error } = console;

export function renderData(data, dataDolar) {
    const reemplazarComaXPunto = dataDolar.replace(",", ".");
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
    try {
        const validItems = data.filter(item => item.image && item.image !== '404 (Not Found)');
        for (item of validItems) {
            precio = item.price;
            const precioSinSigno = parseFloat(precio.replace("$", ""));
            const multiplication = precioSinSigno * reemplazarComaXPunto;
            const numeroFormateado = multiplication.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
            });
            let patter = `
                    <div>
                        <img src="${item.image}" onerror="this.style.display='none'" title="${item.name}">
                        <div class="seccion">
                            <h2 class="n-seccion">Precio: ${numeroFormateado}
                                </h2>
                            <p>${item.name}</p>
                        </div>
                    </div>
                    `;
            items += patter;

        }
    } catch (error) {
        error('Error: ', error);
    }

    return items;
}
