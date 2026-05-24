export default interface Quiz {
    id: string
    title: string
    image: string
    description: string
    type: QuizType
    questions: string[]
}

export enum QuizType {
    Uma= "uma",
    TrueFalse = "truefalse",
    Match = "match",
}