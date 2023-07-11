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

pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort_name
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${process.argv[2]}%'
LIMIT ${process.argv[3] || 5};`)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort_name} cohort`)
    });
  })
  .catch(err => {
    console.log('query error', err.stack);
  });
