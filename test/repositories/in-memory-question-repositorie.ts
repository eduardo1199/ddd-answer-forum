import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionRepository {
  public items: Question[] = []

  async create(question: Question) {
    this.items.push(question)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  async delete(question: Question): Promise<void> {
    const filtered = this.items.filter((item) => item.id !== question.id)

    this.items = filtered
  }

  async findById(id: string): Promise<Question | null> {
    const findQuestion = this.items.find((item) => item.id.toString() === id)

    if (!findQuestion) {
      return null
    }

    return findQuestion
  }

  async save(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items[itemIndex] = question
  }
}
