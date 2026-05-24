interface ScoringAlgorithmProps {
    previousScore: number,
    isCorrect: boolean,
    progress: number,
    subProgress: number,
    maxHints: number,
}

export const ScoringAlgorithm = {
    Simple: ({ previousScore, isCorrect }: Pick<ScoringAlgorithmProps, 'previousScore' | 'isCorrect'>) => {
        return isCorrect ? previousScore + 1 : previousScore
    },
    WithPenalty: ({ previousScore, isCorrect }: Pick<ScoringAlgorithmProps, 'previousScore' | 'isCorrect'>) => {
        return isCorrect ? previousScore + 1 : previousScore - 1
    },
    WithPartials: ({ previousScore, isCorrect, subProgress, maxHints }: Omit<ScoringAlgorithmProps, 'progress'>) => {
        return isCorrect ? previousScore + 1 - (subProgress / (maxHints || 1)) : previousScore
    },
    WithPartialsAndPenalty: ({ previousScore, isCorrect, subProgress, maxHints }: Omit<ScoringAlgorithmProps, 'progress'>) => {
        return isCorrect ? previousScore + 1 - (subProgress / (maxHints || 1)) : previousScore - 1
    }
}

export const PassingScore = {
    None: 0,
    Reduced: 40,
    Default: 50,
}

export const QuizLength = {
    Demo: 3,
    Default: 10,
    Long: 30,
}