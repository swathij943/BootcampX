const { Pool } = require('pg')

const params = {
  port: '5432',
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
}

const pool = new Pool(params)
pool.connect 

pool.query(`
SELECT teachers.name as teacher, cohorts.name as cohort
FROM assistance_requests 
JOIN students ON students.id = student_id 
JOIN cohorts ON cohorts.id = cohort_id 
JOIN teachers ON teachers.id = teacher_id
WHERE cohorts.name LIKE '%${process.argv[2]}%'
GROUP BY teacher, cohort
ORDER BY teacher;`)
    .then(res => {
      res.rows.forEach(row => {
        console.log(`${row.cohort}: ${row.teacher}`);
      });
    })
    .catch(err => {
      console.log('query error', err.stack);
    });