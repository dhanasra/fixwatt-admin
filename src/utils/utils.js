export function formatDate(dateString) {
    const options = { month: 'short', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

export function formatFilterDate(dateString) {

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatTime(timeString) {
    const [hours, minutes] = timeString?.split(':');
    
    let hour = parseInt(hours, 10);
    const meridiem = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12 || 12;
    return `${hour}:${minutes} ${meridiem}`;
};

export function MoneyConverter({ amount }) {
    const formattedAmount = (amount).toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    });
  
    return formattedAmount;
}

export function formatImage(originalUrl) {
  if (!originalUrl) {
    return null;
  }
  
  if (originalUrl.startsWith("http://13.233.244.254/")) {
    return originalUrl.replace("http://13.233.244.254/", "https://spiderlings.in/");
  }
  
  return originalUrl;
}