const path = require(`path`);
const express = require(`express`);
const hbs = require(`hbs`);
const geocode = require(`./utils/geocode`);
const forecast = require(`./utils/forecast`);

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, `../public`);
const viewsPath = path.join(__dirname, `../templates/views`);
const partialsPath = path.join(__dirname, `../templates/partials`);

// Set handlebars engine and views location
app.set(`view engine`, `hbs`);
app.set(`views`, viewsPath);
hbs.registerPartials(partialsPath);

// Define static directory
app.use(express.static(publicDirectoryPath));


app.get(``, (req, res) => {
    res.render(`index`, {
        title: `Weather`,
        name: `Andrew Mead`
    });
});

app.get(`/About`, (req, res) => {
    res.render(`about`, {
        title: `About`,
        name: `Andrew Mead`
    });
});

app.get(`/help`, (req, res) => {
    res.render(`help`, {
        title: `Help`,
        message: `Please help in resolving 404 page error`,
        name: `Andrew Mead`
    });
});

app.get(`/help/*`, (req, res) => {
    res.render(`404`, {
        title: 404,
        errorMessage: `Help article not found`,
        name: `Andrew Mead`
    });
});

app.get(`/weather`, (req, res) => {
    if(!req.query.address) {
        return res.send({
            errorMessage: `Please provide the address query`
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error });
            }
            
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        });
    });
});

app.get(`/products`, (req, res) => {
    if(!req.query.search) {
        return res.send({
            message: `Please provide the search request`
        });
    }
    res.send({
        products: []
    });
});

app.get(`*`, (req, res) => {
    res.render(`404`, {
        title: 404,
        errorMessage: `404 Page not found`,
        name: `Andrew Mead`
    });
});



app.listen(3000, () => {
    console.log(`Server is up at port 3000`);
});