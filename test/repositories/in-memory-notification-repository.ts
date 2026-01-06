import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachment-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'
import { NotificationRepository } from '@/domain/notification/application/repositories/notification-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationRepository implements NotificationRepository {
  public items: Notification[] = []

  async create(notification: Notification) {
    this.items.push(notification)
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.items.find(
      (item) => item.id.toString() === notificationId,
    )

    if (!notification) {
      return null
    }

    return notification
  }

  async save(notification: Notification): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === notification.id.toString(),
    )

    if (index >= 0) {
      this.items[index] = notification
    }
  }
}
