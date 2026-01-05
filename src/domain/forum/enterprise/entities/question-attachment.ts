import { Entity } from '@/core/entities/entity'

interface QuestionAttachmentProps {
  questionId: string
  attachmentId: string
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
  get questionId() {
    return this.props.questionId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: QuestionAttachmentProps) {
    const questionAttachment = new QuestionAttachment(props)
    return questionAttachment
  }
}
