
//  CURRENT DATE WITH 'DD-MM-YYYY HH:MM:SS' FORMATE
let currentDate = new Date();
const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // Use 24-hour format
};

currentDate = currentDate.toLocaleString('en-IN', options);
currentDate = currentDate.replace(/[/]/g, '-'); // Replace forward slashes with hyphens
currentDate = currentDate.replace(/[,]/g, ''); // Replace comma

module.exports = { currentDate };
