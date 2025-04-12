const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const config = require('./config');

describe('Pruebas de Registro', () => {
  let driver;

  beforeAll(async () => {
    try {
      console.log('Configurando navegador para pruebas de registro...');
      const options = new chrome.Options();
      
      if (config.browserOptions.headless) {
        options.addArguments('--headless=new');
      }
      options.addArguments('--disable-gpu');
      options.addArguments('--no-sandbox');
      
      driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
      
      await driver.manage().window().maximize();
    } catch (error) {
      console.error('Error en beforeAll:', error);
      throw error;
    }
  }, config.timeouts.hook);

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  }, config.timeouts.hook);
  
  test('Carga correcta del formulario de registro', async () => {
    await driver.get(`${config.baseUrl}/signup`);
    
    // Espera explícita para el título
    const title = await driver.wait(until.elementLocated(By.css('h1')), 5000);
    expect(await title.getText()).toContain('Create An Account');
    
    const inputs = await driver.findElements(By.css('.input-group input'));
    expect(inputs.length).toBe(6);
    
    // Captura de pantalla
    const screenshot = await driver.takeScreenshot();
    require('fs').writeFileSync('signup-page.png', screenshot, 'base64');
  });

  test('Validación de formulario incompleto', async () => {
    await driver.get(`${config.baseUrl}/signup`);
    
    await driver.findElement(By.css('.input-group input[placeholder="Steve"]')).sendKeys('Test');
    await driver.findElement(By.css('.input-group input[placeholder="Steven@gmail.com"]')).sendKeys('test@example.com');
    
    await driver.findElement(By.css('button[type="submit"]')).click();
    
    // Verifica que muestra mensaje de error
    const errorMessage = await driver.wait(until.elementLocated(By.css('.error-message')), 3000);
    expect(await errorMessage.getText()).toContain('Por favor completa todos los campos');
    
    expect(await driver.getCurrentUrl()).toContain('/signup');
  });

  test('Registro exitoso', async () => {
    await driver.get(`${config.baseUrl}/signup`);
    
    // Rellena todos los campos
    await driver.findElement(By.name('firstName')).sendKeys('Test');
    await driver.findElement(By.name('lastName')).sendKeys('User');
    await driver.findElement(By.name('email')).sendKeys(`test${Date.now()}@example.com`);
    await driver.findElement(By.name('password')).sendKeys('Password123');
    await driver.findElement(By.name('confirmPassword')).sendKeys('Password123');
    await driver.findElement(By.name('phone')).sendKeys('123456789');
    
    await driver.findElement(By.css('button[type="submit"]')).click();
    
    // Verifica redirección después de registro
    await driver.wait(until.urlContains('/welcome'), 5000);
  });
});