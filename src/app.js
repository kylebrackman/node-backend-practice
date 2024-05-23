const express  = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const customers = [
    {
        name: 'John Doe',
        industry: 'IT',
    },
    {
        name: 'Jane Doe',
        industry: 'Finance',
    },
    {
        name: 'Kyle',
        industry: 'Health',
    }
];

app.get('/api/customers', (req, res) => {
    res.send({"customers": customers})
});

app.get('/', (req, res) => {
    res.send('Welcome!');
});

app.post('/', (req, res) => {
    res.send('This is a post request.');
});

app.post('/api/customers', (req, res) => {
    console.log(req.body);
    res.send(req.body);
}),

app.listen(PORT, () => {
    console.log(
        `App listening on port ${PORT}!`
    )
})