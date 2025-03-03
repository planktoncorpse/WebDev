const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // The build folder should be in the client directory
    app.use(express.static(path.join(__dirname, '../client/build')));

    // All other routes should serve the index.html from the build directory
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
