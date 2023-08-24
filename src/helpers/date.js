import {parse, formatISO, parseISO, format } from 'date-fns'
import es from 'date-fns/locale/es'

export function convertirToIso(strDate){
    console.log('entro a format iso')
    const newDate = parse(strDate, 'dd/MM/yyyy', new Date())
    return formatISO(newDate)
}

export function displayDate(date){

    const newDate = parseISO(date)
    const formattedDate = format(newDate, 'PPPP', {locale: es})
    return formattedDate
}