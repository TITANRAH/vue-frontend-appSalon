import {parse, formatISO } from 'date-fns'

export function convertirToIso(strDate){
    console.log('entro a format iso')
    const newDate = parse(strDate, 'dd/MM/yyyy', new Date())
    return formatISO(newDate)
}