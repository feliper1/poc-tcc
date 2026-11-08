# Diário de pesquisa
## Contexto do TCC
O projeto propõe e testa um ecossistema autônomo baseado em Internet das Coisas (IoT) e Inteligência Artificial para a identificação automática da avifauna urbana. A solução integra hardware de baixo custo energizado por energia solar e conexão 4G a modelos de redes neurais convolucionais (Inception v3) para classificar espécies e exibir estatísticas em um aplicativo móvel.
## Pergunta de pesquisa
Estou fazendo o meu TCC: um comedouro inteligente que identifica aves via InceptionV3. Preciso de notificar o utilizador no celular quando uma nova ave é detetada. O app é feito com React Native e Expo, em TypeScript. Quais são as alternativas para resolver isso nesse ecossistema? Para cada uma, diga em uma frase quando ela é a melhor escolha e quando não é, e indique a página da documentação oficial que eu devo ler. Não escreva código ainda.
## Alternativas consideradas
| Opção | Serve para | Decisão |
|-------------|-----------------------|----------------------------|
| Notificações Locais (Expo) | Alertas periódicos e protótipos sem servidor, usando tarefas em background. | **Sim.** Tem custo zero, não requer backend contínuo e roda 100% no Expo Go, sendo ideal para validar a interface no protótipo do TCC.|
| Firebase Cloud Messaging (FCM) | Notificações push remotas robustas e integradas ao ecossistema Google. | **Não.** Exige configuração complexa de backend, credenciais nativas e não funciona no Expo Go sem criar um Custom Dev Client (EAS Build), o que foge do escopo atual. |
| OneSignal | Campanhas de marketing, envio massivo de push e segmentação de usuários com painel visual. | **Não.** Traz um overhead desnecessário de um SDK de terceiros para um projeto focado apenas em alertas de hardware. |
| AWS SNS | Mensageria corporativa em larga escala altamente integrada com infraestrutura em nuvem AWS. | **Não.** Alta complexidade de configuração de tópicos e permissões (IAM) para disparar um alerta simples de avistamento. |
| Pusher Beams | Alertas transacionais de baixa latência frequentemente integrados a WebSockets. | **Não.** Dependência de infraestrutura externa e limite de dispositivos no plano gratuito, sem benefícios claros sobre as notificações locais para esta PoC. |
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
- **Resultado da PoC:** A Prova de Conceito comprovou que é viável alertar o usuário de forma imediata e nativa utilizando notificações locais no ecossistema Expo. Vencemos o desafio das restrições nativas do Expo Go (como a falha de criação de canais no Android) e validamos a interface do alerta sem incorrer em custos de infraestrutura de nuvem nesta fase.
- **Próximos passos no TCC:** O passo seguinte será substituir o "botão de simulação" pela integração real com a borda. Quando a Raspberry Pi 3B capturar a foto, a rede InceptionV3 identificar a espécie e o dado for recebido pelo aplicativo (via polling no backend ou WebSocket), o app acionará o agendamento local (scheduleNotificationAsync) de forma autônoma para avisar o usuário que a ave está no comedouro.
