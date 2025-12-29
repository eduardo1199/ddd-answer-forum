import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteCommentAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

export class DeleteCommentAnswerUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteCommentAnswerUseCaseRequest): Promise<void> {
    const answerComment = await this.answerCommentRepository.findById(answerId)

    if (!answerComment) {
      throw new Error('Answer comment not found.')
    }

    if (authorId !== answerComment.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.answerCommentRepository.delete(answerComment)
  }
}
