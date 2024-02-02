export function formatDate(dateString) {
    const options = { month: 'short', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}