const tareas = cargarTareas()

const botonAgregar = document.getElementById("agregarTarea")

const inputTarea = document.getElementById("inputTarea")

const lista = document.getElementById("lista")


botonAgregar.addEventListener("click", function () { agregarTarea() })


inputTarea.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        agregarTarea()
    }
})

function agregarTarea() {
    const tarea = inputTarea.value
    if (tarea.length > 0) {
        
        tareas.push({ texto: tarea, completada: false })
        inputTarea.value = "" 
        guardarTareas()
        renderizarTareas()
    }
    else {
        alert("Debes ingresar una tarea")
    }

}

function renderizarTareas() {

    lista.innerHTML = ""
    tareas.forEach(function (tarea, index) {

        
        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.className = "checkboxTarea"
        checkbox.checked = tarea.completada
        checkbox.addEventListener("change", function () { alternarCompletada(index) })

        const textoTarea = document.createElement("span")
        textoTarea.textContent = tarea.texto
        textoTarea.className = "textoTarea"
        if (tarea.completada) {
            textoTarea.classList.add("completada")
        }

        const botonEliminar = document.createElement("button")
        botonEliminar.textContent = "X"
        botonEliminar.className = "botonEliminar"
        botonEliminar.addEventListener("click", function () { eliminarTarea(index) })

        const li = document.createElement("li")
        li.appendChild(checkbox)
        li.appendChild(textoTarea)
        li.appendChild(botonEliminar)

        lista.appendChild(li)
    })
}

function eliminarTarea(index) {
    tareas.splice(index, 1)
    guardarTareas()
    renderizarTareas()
}


function alternarCompletada(index) {
    tareas[index].completada = !tareas[index].completada
    guardarTareas()
    renderizarTareas()
}


function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas))
}


function cargarTareas() {
    const tareasGuardadas = localStorage.getItem("tareas")
    if (tareasGuardadas) {
        return JSON.parse(tareasGuardadas)
    }
    return []
}


renderizarTareas()
