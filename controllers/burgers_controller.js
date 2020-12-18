const express = require('express');
const router = express.Router();
const burger = require('../models/burger.js');

// create the routes & set up logic within the routes.
router.get('/', (req, res) => {
    burger.selectAll((data) => {
        let hdlbrObj = {
            burgers: data
        }
        res.render('index', hdlbrObj);
    });
});

router.post('/burgers', (req, res) => {
    burger.insertOne(['burger_name'],[req.body.burger_name], () => {
        res.redirect('/');
    });
});

router.put('/burger/:id', (req, res) => {
    let condition = 'id = ' + req.params.id;
    console.log('condition', condition);

    burger.updateOne({devoured: true}, condition, () => {
        res.redirect('/'); 
    });
});

router.delete('/burgers/:id', (req, res) => {
    let condition = 'id = ' + req.params.id;
    console.log('condition', condition);

    burger.deleteOne(condition, (result) => {
        if(result.changedRows === 0) {
            // if no rows were changed, the ID likely does not exist, 404 not found
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// export the router
module.exports = router; 