const fs = require('fs');
const puppeteer = require('puppeteer');
const https = require('https');

function withTimeout(promise, timeoutMs) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('⏳ Timeout excedido')), timeoutMs)
    ),
  ]);
}

const downloadLink = async (link, page, index) => {

    return new Promise(async(resolve, reject) => {
    
    try {
        await page.goto('https://fdown.net/pt/index.php');
        await page.waitForSelector('input[name="URLz"]');
    }
    catch(err){
        console.error('erro ao entrar na página:',err);
        reject();
        return;
    }

  // Seleciona o primeiro input com name="URLz"
  try {
    await page.waitForSelector('input[name="URLz"]');
  }
  catch(err){
    console.error('erro ao procurar input field', err);
    reject();
    return;
  }
    const input = await page.$('input[name="URLz"]');

    if (input) {
        // Limpa o input (opcional)
        await input.click({ clickCount: 3 });

        // Digita um valor
        await input.type(link);

        console.log('Texto inserido no input com name="URLz".');
    } else {
        console.log('Input não encontrado.');
        reject();
    }

    try{
        await page.waitForSelector('span[class="input-group-btn"]');
    }
    catch(err){
        console.error('erro ao procurar botão de download');
        reject();
        return;
    }

    const button = await page.$('span[class="input-group-btn"]');
    if(!button) {
        console.log('não achamos o button');
        reject();
        return;
    }
    button.click();
    
    //encontrando link de download

    try{
        await page.waitForSelector('a[id="hdlink"]');
    }
    catch (err){
        console.log('hdlink não encontrado');
        reject();
        return;
    }
    const href = await page.$eval('a[id="hdlink"]', (element) => {
        return element.href;
    });
    if(!href) {
        console.log('sem href');
        reject();
        return;
    }
    console.log('href', href);

    //baixando video
    const dir = './videos'
    if(!fs.existsSync(dir)) fs.mkdirSync(dir);
    const filePath = `${dir}/video${index}.mp4`;
    const file = fs.createWriteStream(filePath);

    https.get(href, response => {
    response.pipe(file);
    file.on('finish', () => {
    file.close();
    console.log(`Download do video ${index} concluido`, filePath);
    resolve();
    });
    }).on('error', err => {
    fs.unlink(filePath, () => {});

    console.error(`Erro no download do video ${index}:`, err.message);
    reject(err.message);
    });
    })

  // Acessa o Facebook
    

  
}

(async () => {
    console.log('olaaa')
    const browserURL = 'http://localhost:9222'; // Endereço do Chrome no modo debug
    const browser = await puppeteer.connect({
        browserURL
    });
    //const pages = await browser.pages();
    const page = await browser.newPage();

    console.log('conectados')
    //const pages = await browser.pages();

    const data = fs.readFileSync('links.txt');
    const text = data.toString();
    const lines = text.split('\n');

    //await downloadLink(lines[0], page, 0);
    for(let i = 0; i < lines.length; i++){
        try {
            console.log(`baixando o video: ${i}`);
            //await downloadLink(lines[i], page, i);
            await withTimeout(downloadLink(lines[i], page, i), 180000) //espera 3 minutos pra terminar
        }
        catch(err){
            console.log('deu errado, mas temos que continuar');
            if(!fs.existsSync('logs.txt')) fs.createWriteStream('logs.txt')
            fs.appendFileSync('logs.txt', `Erro ao baixar o video ${i} \n`);
        }
        
    }
    console.log('downloads concluidos');
})()
