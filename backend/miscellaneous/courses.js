// Node.js + Express kurzus projekt
import express from 'express';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const app = express();
app.use(express.json());

const PORT = 3030;

const students = [];
const subjects = [];
const classmembers = [];

function loadCSV(file, target) {
  return new Promise((resolve) => {
    fs.createReadStream(file)
      .pipe(csv())
      .on('data', (data) => target.push(data))
      .on('end', resolve);
  });
}

await loadCSV('./students.csv', students);
await loadCSV('./subjects.csv', subjects);
await loadCSV('./classmembers.csv', classmembers);

// GET /students/:id
app.get('/students/:id', (req, res) => {
  const student = students.find(s => s.id === req.params.id);
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  res.json(student);
});

// GET /subjects
app.get('/subjects', (req, res) => {
  const sorted = [...subjects].sort((a, b) => a.name.localeCompare(b.name));
  res.json(sorted);
});

// GET /students?class=
app.get('/students', (req, res) => {
  const cls = req.query.class;
  if (!cls) return res.json([]);

  const result = students
    .filter(s => s.class === cls)
    .sort((a, b) =>
      a.lastname.localeCompare(b.lastname) || a.firstname.localeCompare(b.firstname)
    )
    .map(s => `${s.lastname} ${s.firstname}`);

  res.json(result);
});

// POST /courses
app.post('/courses', (req, res) => {
  const { firstname, lastname, class: cls, subject } = req.body;

  if (!firstname || !lastname || !cls || !subject) {
    return res.status(400).json({ message: 'Missing data' });
  }

  let student = students.find(
    s => s.firstname === firstname && s.lastname === lastname && s.class === cls
  );

  if (!student) {
    const newId = (students.length + 1).toString();
    student = { id: newId, firstname, lastname, class: cls };
    students.push(student);
  }

  let subj = subjects.find(s => s.name === subject);
  if (!subj) {
    const newSubjId = (subjects.length + 1).toString();
    subj = { id: newSubjId, name: subject };
    subjects.push(subj);
  }

  const exists = classmembers.find(
    cm => cm.student_id === student.id && cm.subject_id === subj.id
  );

  if (exists) {
    return res
      .status(400)
      .json({ message: `${firstname} ${lastname} already study ${subject}.` });
  }

  classmembers.push({
    id: (classmembers.length + 1).toString(),
    student_id: student.id,
    subject_id: subj.id
  });

  res.json({ message: `${firstname} ${lastname} from ${cls} study ${subject}` });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
