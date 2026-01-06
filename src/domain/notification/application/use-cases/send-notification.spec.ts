import { SendNotificationUseCase } from './send-notification'
import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notification-repository'

let inMemoryNotificationRepository: InMemoryNotificationRepository

let sut: SendNotificationUseCase
describe('Create Notification', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationRepository)
  })

  it('should be able create a new notification', async () => {
    const result = await sut.execute({
      message: 'Conteúdo da notificação',
      title: 'Nova notificação',
      recipientId: 'recipient-1',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationRepository.items[0].id).toEqual(
      result.value?.notification.id,
    )
  })
})
