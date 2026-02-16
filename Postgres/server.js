import express from 'express';

const app = express();
const port = 3000;

const router = express.Router();

app.use(express.json());

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next()
});

let cars = [
  { id: 1, make: 'Toyato', model: 'camry', year: 2022, price: 2000 },
  { id: 2, make: 'BMW', model: 'Area-47', year: 2026, price: 3500 },
];

app.get('/', (req, res) => {
  res.send('Hello from the car API!');
});

router.get('/', (req, res) => {
  res.send(cars);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const car = cars.find((car) => car.id === id);

  if (!car) return res.status(404).send('Car Not found');

  res.json(car);
});

router.post('/', (req, res) => {
  const { make, model, year, price } = req.body;

  if (!make || !model || !year || !price) {
    res.status(404).send('Missing values');
  }

  const newCar = {
    id: cars.length + 1,
    make,
    model,
    year: Number(year),
    price: Number(price),
  };

  cars.push(newCar);
  res.status(201).json(newCar);
});

app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
