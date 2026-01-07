import { SendNotificationUseCase } from './../use-cases/send-notification'
import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { QuestionRepository } from '@/domain/forum/application/repositories/questions-repository'
import { AnswerCreatedEvent } from '@/domain/forum/enterprise/events/answer-created-event'

export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionRepository: QuestionRepository,
    private sendNotificationUseCase: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotifications.bind(this),
      AnswerCreatedEvent.name,
    )
  }

  private async sendNewAnswerNotifications({ answer }: AnswerCreatedEvent) {
    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (question) {
      await this.sendNotificationUseCase.execute({
        recipientId: question.authorId.toString()!,
        title: `Nova resposta em ${question.title}`,
        message: answer.excerpt,
      })
    }
  }
}
