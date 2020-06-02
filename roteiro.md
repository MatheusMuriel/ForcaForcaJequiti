# Implementação com middlewares

Trabalho em duplas.

O objetivo deste trabalho é praticar implementação com diversas modalidades de middlewares para construção de sistemas distribuídos. Para tal, seguiremos a temática de implementar um jogo de forca, em sua variante multijogador como nos programas de televisão. A cada etapa, mudaremos o middleware utilizado e, com isso, habilitaremos novas capacidades.

Assista a uma rodada de jogo do [Roda Roda Jequiti](https://youtu.be/UWZkdGjzsn0?t=219), nesse vídeo a partir de 3:39), para saber exatamente o que você deverá implementar.

## Roteiro

Utilize uma plataforma de controle de projetos e versões de software, e a cada etapa desse roteiro, crie uma tag que marca a atividade completada.

1. Escolha uma linguagem de programação qualquer, e implemente o jogo de forca para três jogadores. Nessa versão, o jogo será totalmente local, baseado em um único processo. Apesar disso, recomendo já utilizar uma arquitetura lógica de cliente/servidor, para tratar as regras de negócio (o jogo) e a interface do usuário, que pode ser CLI, GUI ou HTML (Electron).

O jogo deverá ter um banco de palavras (pode ser um arquivo simples, ou um banco completo) de onde sorteia as três palavras da partida. O jogo deverá implementar o sorteio dos pontos (como a roleta do programa de TV) de forma lógica, não é necessária uma representação gráfica elaborada. Tag `v1.0`.


2. Primeira versão do jogo multiprocessada, em redes. A interface de cada jogador deve ter seu próprio processo, que se comunicam com o processo servidor (que contém as palavras secretas, controla a pontuação e sorteia o prêmio). Nesta etapa, a comunicacão deverá ser com o protocolo de troca de mensagens Berkeley. Se estiver utilizando Java, trata-se do emprego das classes `ServerSocket` e `Socket`.

Quão difícil seria implementar uma modalidade de jogo em que cada jogador pode responder ao mesmo tempo, aquele que responder certo primeiro ganha o prêmio, e os que responderem errado perdem pontos? Tag `v2.0`.


3. Dessa vez, converta seu jogo para uma implementação baseada em RPC. A escolha do middleware é livre, mas encontrei essas alternativas que me parecem de fácil uso, configuração e aprendizado: [Apache Thrift](https://thrift.apache.org/) e [Apache Avro](https://avro.apache.org/docs/current/gettingstartedjava.html).

Novamente, quão complicado seria implementar a versão em tempo real do jogo, utilizando RPC? Tag `v3.0`.


4. Finalmente, implemente uma versão do jogo em tempo real, e capaz de abrigar quantos jogadores quiserem participar. Nessa modalidade, o jogo deverá ser infinito, cada vez que as três palavras são reveladas, o jogo sorteia novas três palavras, mas os jogadores continuam pontuando de onde estavam. Um jogador pode se desconectar e reconectar, mas continuar com a pontuação que tinha antes. Nessa implementação, utilize um middleware, a sua escolha, orientado a mensagens (MOM). Recomendo a utilização do [RabbitMQ](https://www.rabbitmq.com/), empregando o protocolo STOMP, mais simples, e perfeitamente adequado a esse caso, que o AMQP. Tag `v4.0`.

Opcional: implemente cliente e servidor em linguagens de programação distintas (eg. Java/Ruby/Python/Node/Go/Rust).

## Entrega

Submeta o link para a página do projeto e controle de versão de sua plataforma favorita. O projeto deve ser aberto ao público. O projeto deve ter um `README.md` com instruções de como instalar e rodar cada uma das versões do jogo.

Submeta ainda um vídeo com 2 minutos de duração, apresentando o projeto (tecnologias utilizadas, arquitetura, etc) e demonstrando em funcionamento a versão mais complexa que tiver conseguido implementar.