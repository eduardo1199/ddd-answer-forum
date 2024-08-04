import { AnswerRepository } from '@/domain/forum/application/repositories/answer-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = []

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async delete(answer: Answer): Promise<void> {
    const filtered = this.items.filter((item) => item.id !== answer.id)

    this.items = filtered
  }

  async findById(id: string): Promise<Answer | null> {
    const findAnswer = this.items.find((answer) => answer.id.toString() === id)

    if (!findAnswer) {
      return null
    }

    return findAnswer
  }

  async save(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[itemIndex] = answer
  }
}
