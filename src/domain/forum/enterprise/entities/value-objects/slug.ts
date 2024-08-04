export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(slug: string): Slug {
    return new Slug(slug)
  }

  /**
   * Receives a sting and normalize it as slug
   *
   * Example: "An example title" => "an-example-title"
   *
   * @param text {string}
   */
  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w]+/g, '-')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')

    return new Slug(slugText)
  }

  /***
   * replace(/\s+/g, 'qualquer espaço em branco')
   * replace(/[^\w]+/g, 'pegar tudo que não são palavras')
   * replace(/_/g, 'Remover qualquer  _')
   * replace(/--/g, 'Remover qualquer  --')
   * replace(/-$/g, 'se no final da string tem -, substitutir')
   */
}
