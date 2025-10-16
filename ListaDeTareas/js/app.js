document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.nombre');
    const boton = document.querySelector('.btnGuardar');
    const lista = document.querySelector('.tareas');

    const guardarTareas = () => {
        const tareasParaGuardar = [];
        lista.querySelectorAll('.tarea-item').forEach(item => {
            const checkbox = item.querySelector('input');
            const texto = item.querySelector('label').textContent;
            tareasParaGuardar.push(`${texto}::${checkbox.checked}`);
        });
        localStorage.setItem('mis_tareas_string', tareasParaGuardar.join('|'));
    };

    const crearElementoTarea = (texto, estaMarcada) => {
        if (!texto) return;

        const divTarea = document.createElement('div');
        divTarea.className = 'tarea-item';
        divTarea.innerHTML = `
            <input type="checkbox" ${estaMarcada ? 'checked' : ''}>
            <label class="${estaMarcada ? 'marcada' : ''}">${texto}</label>
        `;

        divTarea.querySelector('input').addEventListener('change', (e) => {
            divTarea.querySelector('label').classList.toggle('marcada', e.target.checked);
            guardarTareas();
        });

        lista.appendChild(divTarea);
    };

    const tareasGuardadas = localStorage.getItem('mis_tareas_string') || '';
    if (tareasGuardadas) {
        tareasGuardadas.split('|').forEach(tareaString => {
            const [texto, estado] = tareaString.split('::');
            crearElementoTarea(texto, estado === 'true');
        });
    }

    const agregarNuevaTarea = () => {
        const textoTarea = input.value.trim();
        if (textoTarea) {
            crearElementoTarea(textoTarea, false);
            input.value = '';
            input.focus();
            guardarTareas();
        }
    };
    
    boton.addEventListener('click', agregarNuevaTarea);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            agregarNuevaTarea();
        }
    });
});