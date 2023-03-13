const express = require('express'),
    cors = require('cors'),
    app = express(),
    port = 8000,
    routes = require('./routes')

app.use(cors())
app.use(routes)
app.listen(port, () => {
    console.log(`Server exposed to port ${port}`)
})