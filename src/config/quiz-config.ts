import { PassingScore, QuizLength, ScoringAlgorithm } from "@/features/quiz/util/scoring"

const QuizConfig = {
    ScoringAlgorithm: ScoringAlgorithm.WithPartials,
    PassingScore: PassingScore.Default,
    QuizLength: QuizLength.Demo,
}

export default QuizConfig