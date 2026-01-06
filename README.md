- Muita dificuldade em saber as dúvidas dos alunos
- Tenho que responder os alunos e eu me perco em quais dúvidas já foram respondidas


# DDD

### WatchedList

Quando vamos criar uma pergunta, enviamos:

- Título
- Conteúdo
- Anexos (3)

Caso seja solicitado uma edição da pergunta enviando novos dados:

- Título
- Conteúdo
- Anexos (2)

Eu preciso verificar nos anexos os casos abaixo:

- Adicionar um novo anexo (create)
- Remover o segundo anexo que tinha sido criado previamente (delete)
- Editar um anexo existente (update)

Então basicamente, é um array com qualquer conteúdo aonde é possível identificar se aquele item é novo, foi deletado ou atualizado, com informações extras. Mapear operações no que fazer na lista

### Aggregate

- Entidades que trabalham em conjuntos

- Question -> Attachment[]

Aqui preciso criar a pergunta anexando arquivos, então será duas criações de entidades simultâneas (Agregado)

# Subdominios

- Core: O que dá dinheiro
- Supporting: Dá suporte para o core funcionar
- Generic: Você precisa deles, mas não são tão importantes

## Exemplos

### Core
- Compra
- Catálogo
- Pagamento
- Entrega

### Supporting

- Estoque

### Generic

- Notificação ao cliente
- Promoções
- Chat
