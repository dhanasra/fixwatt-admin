import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import * as XLSX from 'xlsx';

export function formatDate(dateString) {
    const options = { month: 'short', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}


export function formatDateOnly(dateString) {
  const options = { day: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export function formatDayOnly(dateString) {
  const options = { weekday: 'short' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export function formatFilterDate(dateString) {

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


export function checkCookies(){
  const accessToken = Cookies.get('token');
  const refreshToken = Cookies.get('refreshToken');

  if (accessToken && refreshToken) {
      return true; 
  } else {
      return false; 
  }
}

export function clearCookies(){
  Cookies.remove('token');
  Cookies.remove('refreshToken');
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

export const exportData = async (data, filename, sheetName) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName ?? 'Sheet1');
  XLSX.writeFile(workbook, filename + '.xlsx');
};

export const groupByCategory = (data, field) => {
  return data.reduce((acc, item) => {
    const key = item[field];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
};

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};