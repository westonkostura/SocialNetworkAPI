const dateFormat = date => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1; 
    const year = newDate.getFullYear();
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    const seconds = newDate.getSeconds();

    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
};

module.exports = dateFormat;