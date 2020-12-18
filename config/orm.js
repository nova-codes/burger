const connection = require("../config/connection.js");

const printQuestionMarks = (num) => {
    let arr = [];
    for(let i = 0; i < num; i++) {
        arr.push('?');
    }

    return arr.toString();
}

const objectToSQL = (obj) => {
    let arr = [];
    for (let key in obj) {
        arr.push(key + '=' + obj[key]);
    }

    return arr.toString();
}

let orm = { // selectAll function
    selectAll: (tableInput, cb) => {
        let queryString = 'SELECT * FROM ' + tableInput + ';';
        connection.query(queryString, (err, result) => {
            if (err) throw err; 
            cb(result);
        });
    },

    // insertOne function
    insertOne: (table, cols, vals, cb) => {
        let queryString = 'INSERT INTO ' + table;
            queryString += ' (';
            queryString += cols.toString();
            queryString += ') ';
            queryString += 'VALUES (';
            queryString += printQuestionMarks(vals.length);
            queryString += ') ';

            console.log(queryString);

            connection.query(queryString, vals, (err, result) => {
                if (err) throw err;
                cb(result);
            });
    },

    // updateOne function
    updateOne: (table, objColVals, condition, cb) => {
        let queryString = 'UPDATE ' + table;
            queryString += ' SET ';
            queryString += objectToSQL(objColVals);
            queryString += ' WHERE ';
            queryString += condition;

            console.log(queryString);

            connection.query(queryString, (err, result) => {
                if (err) throw err;
                cb(result);
            });
    },

    // deleteOne function
    deleteOne: (table, condition, cb) => {
        let queryString = 'DELETE FROM ' + table;
            queryString += ' WHERE ';
            queryString += condition;

            console.log(queryString);

            connection.query(queryString, (err, result) => {
                if (err) throw err;
                cb(result);
            });
    }
}

module.exports = orm;