import { SendNotificationUseCase } from './../use-cases/send-notification'
import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { AnswerRepository } from '@/domain/forum/application/repositories/answer-repository'
import { QuestionRepository } from '@/domain/forum/application/repositories/questions-repository'
import { AnswerCreatedEvent } from '@/domain/forum/enterprise/events/answer-created-event'
import { QuestionBestAnswerEvent } from '@/domain/forum/enterprise/events/question-best-answer'

export class OnQuestionBestAnswer implements EventHandler {
  constructor(
    private answerRepository: AnswerRepository,
    private sendNotificationUseCase: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this),
      QuestionBestAnswerEvent.name,
    )
  }

  private async sendQuestionBestAnswerNotification({
    bestAnswerId,
  }: QuestionBestAnswerEvent) {
    const answer = await this.answerRepository.findById(bestAnswerId.toString())

    if (answer) {
      await this.sendNotificationUseCase.execute({
        recipientId: answer.authorId.toString()!,
        title: 'Sua resposta foi escolhida',
        message:
          'A resposta que você criou foi selecionada como a melhor resposta para a pergunta que você respondeu.',
      })
    }
  }
}
