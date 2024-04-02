import axios from 'axios';

export function badgeClass(estado) {
    return {
        'badge': true,
        'badge tramite': estado === 'En Tramite',
        'badge ejecucion': estado === 'En Ejecucion',
        'badge archivado': estado === 'Archivado'
    };
}

export function badgeClassOficio(estado) {
    return {
        'badge': true,
        'badge tramite': estado === 'P',
        'badge ejecucion': estado === 'F',
    };
}

export function handleApiError(error, functionName) {
    console.error(`Error en la función ${functionName}:`, error);

    if (axios.isAxiosError(error)) {
        if (error.response) {
            console.error('Respuesta del servidor:', error.response.data);
            console.error('Código de estado HTTP:', error.response.status);
        } else if (error.request) {
            console.error('No se recibió respuesta del servidor:', error.request);
        } else {
            console.error('Error al realizar la solicitud:', error.message);
        }
    } else {
        console.error('Otro tipo de error:', error.message);
    }
}

export const waitForDataTableDraw = async (vm, refName) => {
    await vm.$nextTick();
    await vm.initDataTable();
    await new Promise((resolve) => {
        $(vm.$refs[refName]).on('draw.dt', () => {
            resolve();
        });
    });
};

