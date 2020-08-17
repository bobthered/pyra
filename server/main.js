import dotenv from 'dotenv';
import express from 'express';
import lessMiddleware from 'less-middleware';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 5500;

app.use(
  lessMiddleware(path.join(__dirname, '../src'), {
    debug: true,
    dest: path.join(__dirname, '../public'),
    // force: true,
    preprocess: {
      path: function (pathname) {
        return pathname.replace(/\\css/g, '\\less').replace(/\/css/g, '/less');
      },
    },
    render: {
      javascriptEnabled: true,
    },
  })
);
app.use('/', express.static(path.join(__dirname, '../public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../public/views/pages'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
