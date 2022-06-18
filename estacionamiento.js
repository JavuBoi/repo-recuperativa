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

function ingresar(patente) {
    let tr = document.createElement("tr")
    let patente_td = agregar_td(patente)
    let entrada_td = agregar_td(tiempo_actual())
    let salida_td = agregar_td("----")
    let monto_td = agregar_td("$0")

    tr.appendChild(entrada_td)
    tr.appendChild(patente_td)
    tr.appendChild(salida_td)
    tr.appendChild(monto_td)
    tr.appendChild(btn_salir())

    return tr
}

function salir(tr) {
    let cols = tr.childNodes
    let salida_td = cols[2]
    let monto_td = cols[3]
    let btn_content = agregar_td("----")

    salida_td.textContent = tiempo_actual()

    tr.replaceChild(btn_content, cols[4])

}

function registrar_ingreso() {
    let registros = document.getElementById("registros")
    let patente = document.getElementById("patente").value

    registros.appendChild(ingresar(patente))
}