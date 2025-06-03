const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browserURL = 'http://localhost:9222'; // Endereço do Chrome no modo debug
  const browser = await puppeteer.connect({ browserURL });

  const pages = await browser.pages();
  const page = pages.length > 0 ? pages[0] : await browser.newPage();

  //await page.goto('https://www.facebook.com/watch/presbcesardesouza/');

  console.log('Página aberta no Facebook!');

  // Exemplo: pega o título da página
  const title = await page.title();
  
  const links = await page.$$eval(`a[aria-label="um link para um vídeo"]`, elementos => {
    return elementos.map(el => el.href)
  });

  console.log('olaa:', links[0])

  fs.writeFileSync('links.txt', '');

  for(const link of links) {
    fs.appendFileSync('links.txt', `${link}\n`);
    //console.log(link)
  }

  console.log('Fim de papo');
  //console.log(`Foram encontrados ${elementos.length} elementos.`);



  // O navegador não fecha, pois é o seu Chrome aberto manualmente
  // await browser.disconnect(); // Use isso se quiser desconectar o Puppeteer

})();
