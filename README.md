# Passo a passo de como baixar as lives
O script vai te ajudar a baixar as lives da IPCS no seu computador.
 Após clonar ou baixar e descompactar o repostório na sua máquina, é preciso fazer alguns ajustes pra poder rodar o programa corretamente

## Node
O programa é um script node. Portando, precisamos instalar o NodeJS em nossa máquina para poder executá-lo
Você pode baixar o node [aqui](https://nodejs.org/en/download).
Após baixar e instalar o node, você pode checar se o node foi devidamente instalado rodando o seguinte comando no termimal:
``` node --version ```.
Este comando faz imprimir a versão do node instalada no seu computador.
Se algo como ```v18.19.1```  for imprimido no seu terminal, quer dizer que tá tudo certo.

## Dependências do projeto
Após instalar o node, o próximo passo é instalar as dependências necessárias pra rodar o projeto. No nosso caso, precisamos de apenas uma: o puppeteer. Pra baixar todas as dependências do projeto nós precisamos abrir o terminal no mesmo diretório onde o projeto foi instalado e, então, rodar o seguinte comando: ```npm install```.
Este comando vai instalar as depeendências necessárias. Após rodar o comando, você deve notar que um diretório novo chamado node_modules foi criado no projeto. É neste diretório onde ficam instaladas as dependências que acabamos de baixar.

## Abrindo o navegador
O script utiliza o navegador google chrome pra funcionar, portanto, certifique-se de
que ele esteja instalado no seu computador.
Antes de executar o script, precisamos abrir uma janela nova do chrome passando algumas informações extras para que o programa funcione corretamente.

### No windows
Caso você esteja usando windows, você precisa primeiro abrir o terminal no mesmo diretório em que o chrome está instalado.
Na maioria das vezes, ele está instalado no seguinte diretório ```C:\Program Files\Google\Chrome\Application\```.
Verifique se este é o seu caso também. Após abrir o terminal, execute o seguinte comando
```
"chrome.exe" ^
--remote-debugging-port=9222 ^
--no-sandbox ^
--disable-setuid-sandbox ^
--disable-gpu ^
--disable-dev-shm-usage ^
--user-data-dir="C:\chrome-profile-puppeteer"
```
Após rodar o comando, uma nova janela do google chrome deve ter sido aberta. 

### No linux
Caso você esteja usando o linux, deve encontrar o diretório onde o google chrome está instalado.
Geralmente nós o encontramos no diretório ```/usr/bin```
Após abrir o terminal no diretório correto, rode o seguinte comando para abrir uma janela nova do chrome
```
google-chrome \
--remote-debugging-port=9222 \
--no-sandbox \
--disable-setuid-sandbox \
--disable-gpu \
--disable-dev-shm-usage \
--user-data-dir=/tmp/chrome-profile-puppeteer
```

## Rodando o programa
Se você fez tudo certo, está com tudo pronto pra rodar o script. Para rodar o programa, basta abrir o terminal no diretório do projeto
e rodar o seguinte comando ```node downloader.js``` e pronto. Um novo diretório chamado video será criado e os vídeos serão baixados nele

## dicas
Ao rodar o script, você deve ter notado que um número é atribuído a cada vídeo (começando do 0) e os nomes dos videos baixados segue o seguinte padrão: video(número do vídeo).mp4.
Talvez você não queira iniciar os downloads no vídeo 0. Por exemplo, você baixou dos vídeos 0 até o 43 e, por algum motivo, teve que parar o script. Quando for rodar de novo, seria ideal continuar de onde parou, ou seja, no vídeo 44. Para fazer isso, você pode informar por qual vídeo gostaria que o script continue os downloads. Basta rodar o seguinte comando ```node downloader.js 44``` e os downlaods continuarão a partir do vídeo 44. Quando nenhum número é informado, os downloads começam no vídeo 0.