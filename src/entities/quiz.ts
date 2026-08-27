export default interface Quiz {
  id: string
  title: string
  title_en: string
  image: string
  description: string
  description_en: string
  type: QuizType
  questions: string[]
}

export enum QuizType {
  Uma = "uma",
  TrueFalse = "truefalse",
  Match = "match",
}
