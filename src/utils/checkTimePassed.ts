import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export default function checkTimePassed(time: string) {
    try {
        const createdDate = new Date(time);
        
        const timeAgo = formatDistanceToNow(createdDate, { locale: ptBR });
        
        let timeAgoText = '';

        if (isToday(createdDate)) {
            timeAgoText = `${timeAgo} atrás`;
        } else if (isYesterday(createdDate)) {
            timeAgoText = `ontem`;
        } else {
            timeAgoText = `${timeAgo} atrás`;
        }

        return timeAgoText;
    } catch (error) {
        console.error('Error parsing date:');
        return 'Data inválida';
    }
}
