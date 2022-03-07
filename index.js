const express = require('express');
const redis = require('redis');
const proc = require('process');

const app = express();

const dbcon = redis.createClient({
    host: 'db',
    port: 6379
});

if (!dbcon.get('visits')) {
    console.log('Set initial visits to 1');
    dbcon.set('visits', 1);
}

app.get('/', (req, res) => {
    dbcon.get('visits', (err, visits) => {
        console.log('WebApp visits: ' +  visits);
        res.send("You Are: " + visits);
        dbcon.set('visits', parseInt(visits) + 1);
        if ((parseInt(visits) % 10) == 0) {
            proc.exit(parseInt(visits));
        }
    });
});

app.listen(8081, () => {
    console.log('WebApp started and Serving on 8081 with pid: ' + proc.pid);
});
