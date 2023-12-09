import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export default function checkTimePassed(time: string) {
    const createdDate = new Date(time);
    const formattedDate = format(createdDate, 'dd/MM/yyyy HH:mm', { locale: ptBR });
    const timeAgo = formatDistanceToNow(createdDate, { locale: ptBR });

    let timeAgoText = '';

    if (isToday(createdDate)) {
        const splitedText = timeAgo.split(' ')
        timeAgoText = `${splitedText[2]} ${splitedText[3]} atrás`;
    } else if (isYesterday(createdDate)) {
        timeAgoText = `ontem`;
    } else {
        timeAgoText = `${timeAgo} atrás`;
    }

    return timeAgoText
}