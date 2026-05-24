import fs from 'fs';
import path from 'path';

const entryDir = path.join(process.cwd(), 'data-entry');
const outDir = path.join(process.cwd(), 'public', 'data');

if (!fs.existsSync(entryDir)) {
  fs.mkdirSync(entryDir, { recursive: true });
}

const quizzes = [];
const questions = [];
const answers = [];

const files = fs.readdirSync(entryDir).filter(f => f.endsWith('.json'));

for (const file of files) {
  const content = JSON.parse(fs.readFileSync(path.join(entryDir, file), 'utf-8'));

  if (content.quiz) {
    quizzes.push({
      id: content.quiz.id,
      title: content.quiz.title,
      image: content.quiz.image,
      description: content.quiz.description,
      type: content.quiz.type,
      questions: (content.questions || []).map(q => q.id)
    });
  }

  if (content.questions) {
    for (const q of content.questions) {
      const qObj = {
        id: q.id,
        text: q.text,
        images: q.images || [],
        answerId: q.id_answer
      };
      if (q.audio) {
        qObj.audio = q.audio;
      }
      questions.push(qObj);
    }
  }

  if (content.answers) {
    for (const a of content.answers) {
      answers.push({
        id: a.id,
        text: a.text,
        image: a.image
      });
    }
  }
}

fs.writeFileSync(path.join(outDir, 'quizzes.json'), JSON.stringify(quizzes, null, 2));
fs.writeFileSync(path.join(outDir, 'questions.json'), JSON.stringify(questions, null, 2));
fs.writeFileSync(path.join(outDir, 'answers.json'), JSON.stringify(answers, null, 2));

console.log('Successfully transpiled data to public/data!');

