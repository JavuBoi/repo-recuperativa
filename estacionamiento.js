function agregar_td(text) {
    let td = document.createElement("td")
    let td_text = document.createTextNode(text)

    td.appendChild(td_text)

    return td
}

function btn_salir() {
    let btn = document.createElement("button")
    let btn_text = document.createTextNode("Salida")

    btn.appendChild(btn_text)
    btn.setAttribute("class", "btn bg-primary text-light")
    btn.setAttribute("onclick", "salir(this.parentElement);")

    return btn
}

function formato_tiempo(parte) {
    parte = parte < 10 ? "0" + parte.toString() : parte

    return parte
}

function tiempo_actual() {
    let fecha = new Date(Date.now())
    let yyyy = fecha.getFullYear()
    let mm = formato_tiempo(fecha.getMonth())
    let dd = formato_tiempo(fecha.getDay())
    let hh = formato_tiempo(fecha.getHours())
    let mi = formato_tiempo(fecha.getMinutes())
    let full = `${yyyy}-${mm}-${dd} ${hh}:${mi}`

    return full
}

function ingresar(registro) {
    let tr = document.createElement("tr")
    let patente_td = agregar_td(registro["patente"])
    let entrada_td = agregar_td(registro["hora_entrada"])
    let salida_td = agregar_td(registro["hora_salida"])
    let monto_td = agregar_td(`$${registro["monto"]}`)

    tr.appendChild(entrada_td)
    tr.appendChild(patente_td)
    tr.appendChild(salida_td)
    tr.appendChild(monto_td)
    tr.appendChild(btn_salir())

    return tr
}

function calcular_monto(hr_entrada, hr_salida) {
    let hr_e = parseInt(hr_entrada.split(":")[0])
    let min_e = parseInt(hr_entrada.split(":")[1])
    let hr_s = parseInt(hr_salida.split(":")[0])
    let min_s = parseInt(hr_salida.split(":")[1])
    let hr_estadia = hr_s - hr_e
    let min_estadia = min_s - min_e > 0
    let monto = 500 * min_estadia + 500 * hr_estadia

    console.log(hr_estadia, min_estadia, monto)

    return monto
}

function salir(tr) {
    let total = document.getElementById("total")
    let tiempo = tiempo_actual()
    let cols = tr.childNodes
    let salida_td = cols[2]
    let monto_td = cols[3]
    let btn_content = agregar_td("----")

    let hr_entrada = cols[0].textContent.slice(11, 16)
    let hr_salida = tiempo.slice(11, 16)
    let monto = calcular_monto(hr_entrada, hr_salida)
    console.log(hr_entrada, hr_salida)

    salida_td.textContent = tiempo
    monto_td.textContent = "$" + monto.toString()
    total.textContent = parseInt(total.textContent) + monto

    tr.replaceChild(btn_content, cols[4])

}

function registrar_ingreso() {
    let registros = document.getElementById("registros")
    let patente = document.getElementById("patente").value
    let registro = {
        "patente" : patente,
        "hora_entrada" : tiempo_actual(),
        "hora_salida" : "----",
        "monto" : 0
    }

    if (patente != "") {
        registros.appendChild(ingresar(registro))
    } else {
        alert("No se ha ingresado una patente.")
    }
}