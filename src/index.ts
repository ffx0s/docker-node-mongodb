import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import express from 'express'

const app = express();

// connect to Mongo daemon
mongoose
  .connect(
    'mongodb://mongo:27017/test-docker-mongodb',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// DB schema
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Item = mongoose.model('item', ItemSchema);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) =>{
  Item.find((err, items) => {
    if (err) throw err;
    res.render("index", { items, env: process.env.NODE_ENV });
  });
})


//Post route
app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.redirect('/'));
});


const port = 8080;
app.listen(port, () => console.log('Server running...'));
