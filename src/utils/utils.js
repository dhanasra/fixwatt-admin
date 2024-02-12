export function formatDate(dateString) {
    const options = { month: 'short', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

export function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    
    let hour = parseInt(hours, 10);
    const meridiem = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12 || 12;
    return `${hour}:${minutes} ${meridiem}`;
};