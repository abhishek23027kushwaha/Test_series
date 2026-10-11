// Run with: npm run seed
// Populates subjects, ~90 real interview questions across all subjects (each with
// MCQ options + a correct answer for Mock Test grading, plus a written explanation
// for the Questions browsing page), and a demo admin account.
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Subject = require('../models/Subject');
const Question = require('../models/Question');
const User = require('../models/User');
const reactQuestions = require("../data/react");
const nodeQuestions = require("../data/node");
const expressQuestions = require("../data/express");
const mongodbQuestions = require("../data/mongodb");
const javascriptQuestions = require("../data/javascript");
const javaQuestions = require("../data/java");
const sqlQuestions = require("../data/sql");
const htmlQuestions = require("../data/html");
const cssQuestions = require("../data/css");
const bootstrapQuestions = require("../data/bootstrap");
const angularQuestions = require("../data/angular");
const springbootQuestions = require("../data/springboot");

const subjects = [
  'React', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript',
  'Java', 'SQL', 'HTML', 'CSS', 'Bootstrap', 'Angular', 'Spring Boot',
];

const companies = ['TCS', 'Infosys', 'Accenture', 'Capgemini', 'Cognizant', 'Wipro', 'IBM', 'Tech Mahindra', 'Persistent', 'Others'];

const pick = (arr, i) => arr[i % arr.length];

// Each entry: [title, description, explanation, difficulty, options[4], correctOptionIndex]
const QUESTION_BANK = {
  React: reactQuestions,
  "Node.js": nodeQuestions,
  "Express.js": expressQuestions,
  MongoDB: mongodbQuestions,
  JavaScript: javascriptQuestions,
  Java: javaQuestions,
  SQL: sqlQuestions,
  HTML: htmlQuestions,
  CSS: cssQuestions,
  Bootstrap: bootstrapQuestions,
  Angular: angularQuestions,
  "Spring Boot": springbootQuestions,
};


const run = async () => {
  await connectDB();

  // 1. Seed subjects
  for (const name of subjects) {
    await Subject.updateOne({ name }, { name }, { upsert: true });
  }
  console.log(`Seeded ${subjects.length} subjects`);

  // 2. Seed a demo account to own the sample content
  let demoUser = await User.findOne({ email: 'demo@interviewprep.com' });
  if (!demoUser) {
    demoUser = await User.create({
      name: 'Demo Admin',
      email: 'demo@interviewprep.com',
      password: 'demo1234',
      role: 'admin',
      securityQuestion: 'What is your favorite subject?',
      securityAnswer: 'react',
      bio: 'Demo account preloaded with sample interview prep content.',
      college: 'Demo University',
      experience: 'Fresher',
      skills: ['React', 'Node.js', 'MongoDB'],
    });
    console.log('Created demo account -> email: demo@interviewprep.com / password: demo1234');
  } else {
    console.log('Demo account already exists, reusing it');
  }

  // 3. Seed questions (with MCQ options + correct answer for Mock Test grading)
  let questionCount = 0;
let companyIdx = 0;

for (const subject of Object.keys(QUESTION_BANK)) {
  console.log(
    subject,
    Array.isArray(QUESTION_BANK[subject]),
    typeof QUESTION_BANK[subject]
  );
}

for (const subject of Object.keys(QUESTION_BANK)) {
  for (const [title, description, explanation, difficulty, options, correctOption] of QUESTION_BANK[subject]) {

    const exists = await Question.findOne({ title, subject });

    if (exists) continue;

    await Question.create({
      title,
      description,
      answer: explanation,
      subject,
      company: pick(companies, companyIdx++),
      difficulty,
      tags: [subject.toLowerCase().replace('.', '')],
      options,
      correctOption,
      createdBy: demoUser._id,
    });

    questionCount++;
  }
}


  console.log('\nDone! Log in with:');
  console.log('  email:    demo@interviewprep.com');
  console.log('  password: demo1234');

  mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
