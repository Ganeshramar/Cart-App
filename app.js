const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const rootDir = require('./utils/path')
const homeRoutes = require('./routes/home');
const adminRoutes = require('./routes/admin');

app.set('view engine','ejs');
app.set('views','views');

//static files
app.use(express.static(path.join(rootDir,'public')));
app.use('/css',express.static(path.join(rootDir,'node_modules','bootstrap','dist','css'))); //OS independent
app.use(bodyParser.urlencoded({extended: false}));

//routes
app.use(homeRoutes);
app.use('/products', adminRoutes);

app.use((req,res) => {
    // res.send('<h2>Page not found</h2>');
    // res.status(404).sendFile(path.join(rootDir,'views','404.html'));
    const viewData = {
        pageTitle: 'Page not found'
    }
    res.status(404).render('404', viewData);
});

app.listen(3000, () => {
    console.log('Server started at port 3000')
});