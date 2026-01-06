import { Either, right } from '@/core/either'
import { NotificationRepository } from '../repositories/notification-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Notification } from '../../enterprise/entities/notification'

interface SendNotificationUseCaseRequest {
  recipientId: string
  title: string
  message: string
}

type SendNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification
  }
>

export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute({
    message,
    recipientId,
    title,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      message,
      recipientId: new UniqueEntityID(recipientId),
      title,
    })

    await this.notificationsRepository.create(notification)

    return right({ notification })
  }
}
