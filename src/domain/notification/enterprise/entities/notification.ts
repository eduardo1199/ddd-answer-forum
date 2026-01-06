import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface NotificationProps {
  title: string
  message: string
  createdAt: Date
  recipientId: UniqueEntityID
  readAt?: Date | null
}

export class Notification extends Entity<NotificationProps> {
  get title() {
    return this.props.title
  }

  get message() {
    return this.props.message
  }

  get createdAt() {
    return this.props.createdAt
  }

  get recipientId() {
    return this.props.recipientId
  }

  get readAt() {
    return this.props.readAt ?? null
  }

  set title(title: string) {
    this.props.title = title
  }

  set message(message: string) {
    this.props.message = message
  }

  set readAt(readAt: Date | null) {
    this.props.readAt = readAt
  }

  markAsRead() {
    this.props.readAt = new Date()
  }

  static create(
    props: Optional<NotificationProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const notification = new Notification(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return notification
  }
}
