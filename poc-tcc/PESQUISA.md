# Diário de pesquisa
## Contexto do TCC
O projeto propõe e testa um ecossistema autônomo baseado em Internet das Coisas (IoT) e Inteligência Artificial para a identificação automática da avifauna urbana. A solução integra hardware de baixo custo energizado por energia solar e conexão 4G a modelos de redes neurais convolucionais (Inception v3) para classificar espécies e exibir estatísticas em um aplicativo móvel.
## Pergunta de pesquisa
Como as Notificações Locais (Expo) resolvem o alerta imediato de avistamento na condição de orçamento zero e restrição nativa do Expo Go?
## Alternativas consideradas
| Opção | Serve para | Decisão |
|-------------|-----------------------|----------------------------|
| Firebase Cloud Messaging (FCM) | Notificações push remotas robustas e integradas ao ecossistema Google. | **Não.** Exige configuração complexa de backend, credenciais nativas e não funciona no Expo Go sem criar um Custom Dev Client (EAS Build), o que foge do escopo atual. |
| OneSignal | Campanhas de marketing, envio massivo de push e segmentação de usuários com painel visual. | **Não.** Traz um overhead desnecessário de um SDK de terceiros para um projeto focado apenas em alertas de hardware. |
| Notificações Locais (Expo) | Alertas periódicos e protótipos sem servidor, usando tarefas em background. | **Sim.** Tem custo zero, não requer backend contínuo e roda 100% no Expo Go, sendo ideal para validar a interface no protótipo do TCC.|

## Fontes oficiais lidas
- Documentação da API expo-notifications (https://docs.expo.dev/versions/latest/sdk/notifications/)
- Firebase Cloud Messaging (https://firebase.google.com/docs/cloud-messaging?hl=pt-br)
- OneSignal (https://documentation.onesignal.com/docs/en/react-native-expo-sdk-setup)


## Onde a IA errou

**1. Alteração fora de escopo (ESLint)**
- **Pedido:** Adicionar permissão de notificação no `App.tsx` e rodar validações.
- **O que veio:** O agente executou `npx expo lint`, o que disparou a configuração automática do ESLint, alterando dependências e criando arquivos fora do escopo pedido.
- **Como percebi:** Lendo o *diff* antes de aceitar e notando arquivos de configuração extras modificando o `package.json`.
- **O certo:** Reverter as alterações de lint geradas pelo agente e manter apenas a instalação do `expo-notifications` e a edição lógica do `App.tsx`.

**2. Alucinação de tipagem vs. Tempo de execução (NullPointerException)**
- **Pedido:** Corrigir erro de importação ao definir a importância da notificação no Android.
- **O que veio:** O agente insistiu em usar o enum `AndroidImportance` (tanto nomeado quanto via namespace). O TypeScript aprovou o código, mas o enum retornava `undefined` no runtime do Expo Go, causando o erro fatal `java.lang.NullPointerException` no Java.
- **Como percebi:** O código compilou perfeitamente no terminal, mas o aplicativo "quebrou" com uma tela vermelha de erro nativo ao ser testado no celular físico.
- **O certo:** Forçar o agente a abandonar as constantes do SDK e usar o valor numérico bruto (`importance: 4`) para contornar a falha da biblioteca.

**3. Ignorância sobre restrições do ambiente (Canais no Expo Go)**
- **Pedido:** Configurar o canal de notificação para o Android.
- **O que veio:** O agente gerou o código padrão da documentação usando `setNotificationChannelAsync`, o que continuava quebrando a ponte nativa.
- **Como percebi:** O erro persistia no aplicativo físico porque o agente desconhecia que o Expo Go tem restrições rigorosas para criação dinâmica de canais via JavaScript.
- **O certo:** Remover completamente o bloco de configuração de canal gerado pela IA e deixar o Android utilizar o canal padrão nativo do próprio Expo Go.

## Resultado e próximos passos no TCC
- **Resultado da PoC:** A Prova de Conceito comprovou que é viável alertar o usuário de forma imediata e nativa utilizando notificações locais no ecossistema Expo. Vencemos o desafio das restrições nativas do Expo Go (como a falha de criação de canais no Android) e validamos a interface do alerta sem incorrer em custos de infraestrutura de nuvem nesta fase.
- **Próximos passos no TCC:** O passo seguinte será substituir o "botão de simulação" pela integração real com a borda. Quando a Raspberry Pi 3B capturar a foto, a rede InceptionV3 identificar a espécie e o dado for recebido pelo aplicativo, o app acionará o agendamento local (scheduleNotificationAsync) de forma autônoma para avisar o usuário que a ave está no comedouro.
