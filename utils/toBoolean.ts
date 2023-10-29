//Code to convert string or number values to boolean
const toBoolean = (dataStr) => {
    return !!(dataStr?.toLowerCase?.() === 'true' || dataStr === true ||  Number.parseInt(dataStr, 10) === 1);
};

export default toBoolean;
