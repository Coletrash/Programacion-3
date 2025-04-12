const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Tumor', function() {
  this.timeout(30000);
  let driver;
  let vars;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('firefox').build();
    vars = {};
  });

  afterEach(async function() {
    await driver.quit();
  });

  it('Tumor', async function() {
    // Navegar a la página
    await driver.get("http://localhost:3000/");
    await driver.manage().window().setRect({ width: 1245, height: 692 });

    // Login
    await driver.findElement(By.linkText("Sign In")).click();
    await driver.findElement(By.css(".inputWrapper:nth-child(1) > input")).click();
    await driver.findElement(By.css(".inputWrapper:nth-child(1) > input")).sendKeys("admin");
    await driver.findElement(By.css(".inputWrapper:nth-child(2) > input")).sendKeys("root");
    await driver.findElement(By.linkText("Login")).click();


    // Ruta de archivo correcta para la imagen
    await driver.findElement(By.css("input[type='file']")).sendKeys("C:\\Users\\robin\\Desktop\\Screening-Mammogram-CancerCurrents_0.jpg");
  });
});
