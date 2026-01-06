import { Either, left, right } from '@/core/either'
import { NotAllowError } from '@/core/errors/not-allow-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { NotificationRepository } from '../repositories/notification-repository'

interface ReadNotificationUseCaseRequest {
  notificationId: string
  recipientId: string
}
type ReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowError,
  object
>

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute({
    notificationId,
    recipientId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationsRepository.findById(notificationId)

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    if (notification.recipientId.toString() !== recipientId) {
      return left(new NotAllowError())
    }

    notification.markAsRead()

    await this.notificationsRepository.save(notification)

    return right({})
  }
}
