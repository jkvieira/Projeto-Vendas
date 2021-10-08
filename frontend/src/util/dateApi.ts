import { format } from 'date-fns';

export const dateMax=()=>{
const dateToday = new Date();
return dateToday.getFullYear() + '-' + (("0" + (dateToday.getMonth() + 1)).substr(-2)) + '-' + ("0" + dateToday.getDate()).substr(-2);
}

export const formatLocalDate = (date: string, pattern: string) => {
    const dt = new Date(date);
    const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
    return format(dtDateOnly, pattern);
}