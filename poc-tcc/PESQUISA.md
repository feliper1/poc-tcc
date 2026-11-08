# Diário de pesquisa
## Contexto do TCC
O projeto propõe e testa um ecossistema autônomo baseado em Internet das Coisas (IoT) e Inteligência Artificial para a identificação automática da avifauna urbana. A solução integra hardware de baixo custo energizado por energia solar e conexão 4G a modelos de redes neurais convolucionais (Inception v3) para classificar espécies e exibir estatísticas em um aplicativo móvel.
## Pergunta de pesquisa
Estou fazendo o meu TCC: um comedouro inteligente que identifica aves via InceptionV3. Preciso de notificar o utilizador no celular quando uma nova ave é detetada. O app é feito com React Native e Expo, em TypeScript. Quais são as alternativas para resolver isso nesse ecossistema? Para cada uma, diga em uma frase quando ela é a melhor escolha e quando não é, e indique a página da documentação oficial que eu devo ler. Não escreva código ainda.
## Alternativas consideradas
| Opção | Serve para | Decisão |
|-------------|-----------------------|----------------------------|
| Notificações Locais (Expo) | Alertas periódicos e protótipos sem servidor, usando tarefas em background. | **Sim.** Tem custo zero, não requer um backend contínuo, funciona offline e roda 100% no Expo Go, sendo a recomendação ideal para um protótipo de TCC.|
| [pacote B] | [uso típico] | [sim ou não, e por quê] |
| [pacote B] | [uso típico] | [sim ou não, e por quê] |
| [pacote B] | [uso típico] | [sim ou não, e por quê] |
| [pacote B] | [uso típico] | [sim ou não, e por quê] |
| [pacote B] | [uso típico] | [sim ou não, e por quê] |
## Fontes oficiais lidas
- Documentação da API expo-notifications (https://docs.expo.dev/versions/latest/sdk/notifications/)
- Firebase Cloud Messaging (https://firebase.google.com/docs/cloud-messaging?hl=pt-br)
- OneSignal (https://documentation.onesignal.com/docs/en/react-native-expo-sdk-setup)
- AWS SNS (https://docs.aws.amazon.com/sns/latest/dg/sns-mobile-application-as-subscriber.html)
- Pusher Beams (https://pusher.com/beams/ios-push-notifications/)


## Onde a IA errou
- Pedido: Adicionar permissão de notificação no App.tsx e rodar validações.
- O que veio: O agente executou npx expo lint, o que disparou a configuração automática do ESLint, alterando dependências e criando arquivos fora do escopo pedido.
- Como percebi: Lendo o diff antes de aceitar e notando arquivos de configuração extras.
- O certo: Reverter as alterações de lint geradas pelo agente e manter apenas a instalação do expo-notifications e a edição do App.tsx
-----------------------------------------
O agente insistiu em usar o enum AndroidImportance (tanto nomeado quanto via namespace), mas ambos retornavam undefined no runtime do Expo Go e quebravam o app. A solução foi forçar o agente a usar o valor numérico bruto (importance: 4).
-------------------------------------------
O agente incluiu a criação de canais no Android que quebrou o Expo Go; a solução foi remover a configuração do canal e usar o padrão
------------------------------------------------
## Resultado e próximos passos no TCC
- [o que a prova de conceito demonstrou e o que muda no TCC]
