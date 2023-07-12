const { Pool } = require('pg');

const params = {
  port: '5432',
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
};

const pool = new Pool(params);
pool.connect();

const queryString = `
SELECT students.id as student_id, students.name as name, cohorts.name as cohort_name
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;`
const cohortName = process.argv[2]
const limit = process.argv[3] || 5
const values = [`%${cohortName}%`, limit]

pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort_name} cohort`)
    });
  })
  .catch(err => {
    console.log('query error', err.stack);
  });