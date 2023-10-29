const logToServer = (message: object) => fetch('/api/log', {
    method: 'post',
    headers: { 'Content-Type': 'application/json; charset=utf8' },
    body: JSON.stringify(message)
});

export default logToServer;
