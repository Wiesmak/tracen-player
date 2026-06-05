import fs from 'fs'
import path from 'path'

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
  const quizId = content.quiz ? content.quiz.id : null;

  if (content.quiz) {
    quizzes.push({
      id: content.quiz.id,
      title: content.quiz.title,
      image: content.quiz.image,
      description: content.quiz.description,
      type: content.quiz.type,
      questions: (content.questions || []).map(q => {
        return (quizId && !q.id.startsWith(`q_${quizId}_`))
            ? `q_${quizId}_${q.id}`
            : q.id;
      })
    });
  }

  if (content.questions) {
    for (const q of content.questions) {
      const qId = (quizId && !q.id.startsWith(`q_${quizId}_`))
          ? `q_${quizId}_${q.id}`
          : q.id;
      const aId = (quizId && q.id_answer && !q.id_answer.startsWith(`a_${quizId}_`))
          ? `a_${quizId}_${q.id_answer}`
          : q.id_answer;

      const qObj = {
        id: qId,
        text: q.text,
        images: q.images || [],
        answerId: aId
      };
      if (q.audio) {
        qObj.audio = q.audio;
      }
      questions.push(qObj);
    }
  }

  if (content.answers) {
    for (const a of content.answers) {
      const aId = (quizId && !a.id.startsWith(`a_${quizId}_`))
          ? `a_${quizId}_${a.id}`
          : a.id;

      answers.push({
        id: aId,
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
