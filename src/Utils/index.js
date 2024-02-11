function formatDateToISO(dateString) {
    const date = new Date(dateString);

    // Get components of the date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    const timezoneOffset = -date.getTimezoneOffset(); // Convert to positive value

    // Construct the ISO 8601 formatted date string
    const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezoneOffset >= 0 ? '+' : '-'}${String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0')}:${String(Math.abs(timezoneOffset) % 60).padStart(2, '0')}`;

    return isoString;
}

const convertToTitleCase = (str) => {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

export default {
    formatDateToISO,
    convertToTitleCase
}