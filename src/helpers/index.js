export const formatCurrency = price =>
    Number(price).toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP'
    })