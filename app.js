const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

//this is database shit, initiallisign ing it
const { Client } = require('pg');
const database = new Client({
  connectionString: 'postgres://keffkefffart_user:ifXjxZHNg8mkhKiQ1UxT39NWaAENCABY@dpg-ccdhjhcgqg4d3o4v56sg-a.oregon-postgres.render.com/keffkefffart?ssl=true',
})
database.connect(err => { //connect to db
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

app.get("/", (req, res) => {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (ip.substr(0, 7) == "::ffff:") {
    ip = ip.substr(7)
  }
  ip = ip.split(',')[0];

  const query = {
    text: `INSERT INTO ips(ip) VALUES($1,$2)`,
    values: [ip,String(Math.floor(Date.now() / 1000))]
  }

  database.query(query, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0])
    }
  })

  res.type('html').send(html)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Trans Rights!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section style="text-align: center;">
        Trans Rights!<br>
        <img src="https://c.tenor.com/ZZ_jkM0v28MAAAAC/wiggler-protest-wiggler.gif">
      </section>
  </body>
</html>
`
