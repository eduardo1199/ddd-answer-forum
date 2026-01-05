import { Entity } from '@/core/entities/entity'

interface AnswerAttachmentProps {
  answerId: string
  attachmentId: string
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
  get answerId() {
    return this.props.answerId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: AnswerAttachmentProps) {
    const answerAttachment = new AnswerAttachment(props)
    return answerAttachment
  }
}
