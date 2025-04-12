const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const config = require('./config');

describe('Pruebas de Autenticación', () => {
  let driver;

  beforeAll(async () => {
    try {
      console.log('Iniciando configuración del navegador...');
      const options = new chrome.Options();
      
      if (config.browserOptions.headless) {
        options.addArguments('--headless=new');
      }
      options.addArguments('--no-sandbox');
      options.addArguments('--disable-dev-shm-usage');
      options.addArguments(`--window-size=${config.browserOptions.windowSize}`);
      
      driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
      
      console.log('Navegador iniciado correctamente');
    } catch (error) {
      console.error('Error al iniciar el navegador:', error);
      throw error;
    }
  }, config.timeouts.hook);

  afterAll(async () => {
    if (driver) {
      await driver.quit();
      console.log('Navegador cerrado correctamente');
    }
  }, config.timeouts.hook);

  test('Carga correcta de la página de login', async () => {
    await driver.get(`${config.baseUrl}/login`);
    
    // Esperar a que cargue el título
    await driver.wait(until.elementLocated(By.css('h1')), 5000);
    const title = await driver.findElement(By.css('h1')).getText();
    expect(title).toContain('Welcome Back');
    
    // Verificar inputs
    const userInput = await driver.findElement(By.css('.inputWrapper input[type="text"]'));
    expect(await userInput.isDisplayed()).toBeTruthy();
    
    const passInput = await driver.findElement(By.css('.inputWrapper input[type="password"]'));
    expect(await passInput.isDisplayed()).toBeTruthy();
    
    // Captura de pantalla
    const screenshot = await driver.takeScreenshot();
    require('fs').writeFileSync('login-page.png', screenshot, 'base64');
  });

  test('Interacción con campos de formulario', async () => {
    await driver.get(`${config.baseUrl}/login`);
    
    // Localizar y escribir en el input de usuario
    const userInput = await driver.findElement(By.css('.inputWrapper input[type="text"]'));
    await userInput.sendKeys('testuser');
    
    // Verificar animación del ícono
    await driver.wait(async () => {
      const userIcon = await driver.findElement(By.css('.inputWrapper i'));
      const iconClass = await userIcon.getAttribute('class');
      return iconClass.includes('bx-tada');
    }, 3000);
    
    // Esperar a que termine la animación
    await driver.wait(async () => {
      const userIcon = await driver.findElement(By.css('.inputWrapper i'));
      const iconClass = await userIcon.getAttribute('class');
      return !iconClass.includes('bx-tada');
    }, 3000);
  });

  test('Redirección al dashboard tras login exitoso', async () => {
    await driver.get(`${config.baseUrl}/login`);
    
    // Completar formulario
    await driver.findElement(By.css('.inputWrapper input[type="text"]'))
      .sendKeys(config.credentials.validUser);
    await driver.findElement(By.css('.inputWrapper input[type="password"]'))
      .sendKeys(config.credentials.validPassword);
    
    // Hacer clic en el botón de login
    await driver.findElement(By.css('a[href="/breastDashboard"]')).click();
    
    // Esperar y verificar redirección
    await driver.wait(until.urlContains('/breastDashboard'), 5000);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toContain('/breastDashboard');
    
    // Captura de pantalla
    const screenshot = await driver.takeScreenshot();
    require('fs').writeFileSync('dashboard-redirect.png', screenshot, 'base64');
  });
});