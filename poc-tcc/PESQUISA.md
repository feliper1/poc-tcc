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
- Pedido: [o que foi pedido]
- O que veio: [a resposta errada]
- Como percebi: [erro de compilação, documentação, teste no aparelho]
- O certo: [o que a documentação confirma]
## Resultado e próximos passos no TCC
- [o que a prova de conceito demonstrou e o que muda no TCC]
