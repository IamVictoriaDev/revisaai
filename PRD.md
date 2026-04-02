# Mini PRD — RevisaAí

## Problema

Quem estuda sozinho acaba perdendo o controle do que já viu e do que ainda precisa revisar. As dúvidas que aparecem durante o estudo somem porque a gente não anota em lugar nenhum. Daí passa a semana e não lembra mais o que tinha ficado confuso.

Esse problema é específico de quem não tem grupo de estudos e depende só de si mesmo pra manter a organização.

## Usuário

Estudante universitário ou de concurso que estuda em casa, sem grupo, e precisa de um lugar simples pra registrar o que estudou e o que ainda tem dúvida.

Não é pra quem quer cronograma automático ou plano de estudos elaborado. É pra quem precisa de um caderninho digital.

## Objetivo

Ter um lugar onde o usuário anota o que estudou, marca o que já revisou e guarda as dúvidas que aparecem no caminho.

## O que o sistema faz

- Registrar conteúdos estudados e marcar se já foi revisado ou se ainda tá pendente
- Anotar dúvidas e marcar quando resolver
- Registrar sessões de estudo com tempo e matéria
- Usar IA como apoio pra gerar perguntas de revisão ou explicar uma dúvida

## Por que essas funcionalidades?

Se tirar o registro de conteúdos, o usuário não sabe o que estudou. Se tirar as dúvidas, elas se perdem. Sessões ajudam a ter noção de quanto tempo está dedicando. A IA é bônus — se tirar, o sistema continua funcionando do mesmo jeito.

## O que o sistema não faz

Não tem login, não gera plano de estudos, não tem calendário, não mostra gráficos avançados. Isso tudo seria outro produto.

## Estrutura da API

Três entidades: `contents`, `doubts` e `sessions`.

Operações:
- GET pra listar tudo
- POST pra criar
- PATCH pra atualizar status ou editar
- DELETE pra remover

## Decisões técnicas

- json-server como backend local pras três entidades
- Backend Node/Express separado só pra IA, pra não misturar com os dados
- React + TypeScript no front
- Tailwind pra estilização
- useMemo no dashboard pra calcular totais sem recalcular toda vez
