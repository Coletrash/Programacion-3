const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('RegisterDoctorTest', function() {
  this.timeout(30000)
  let driver
  let vars

  beforeEach(async function() {
    driver = await new Builder().forBrowser('firefox').build()
    vars = {}
  })

  afterEach(async function() {
    await driver.quit()
  })

  it('RegisterDoctorTest', async function() {
    await driver.get("http://localhost:3000/")
    await driver.manage().window().setRect({ width: 1272, height: 692 })
    
    // Paso 1: Navegar a la página de registro
    await driver.findElement(By.linkText("Sign Up")).click()
    await driver.findElement(By.css(".optionCard:nth-child(2) > a")).click()

    // Paso 2: Llenar los campos personales
    await driver.findElement(By.name("nationalId")).sendKeys("Paco Dominicano")
    await driver.findElement(By.name("firstName")).sendKeys("Paco")
    await driver.findElement(By.name("lastName")).sendKeys("Cruz")
    await driver.findElement(By.name("streetAddress")).sendKeys("1ra villa faro")
    await driver.findElement(By.name("city")).sendKeys("Santo Domingo")
    await driver.findElement(By.name("country")).sendKeys("Republica Dominicana")
    await driver.findElement(By.name("phone")).sendKeys("8296670530")
    await driver.findElement(By.name("email")).sendKeys("steven@gmail.com")
    
    // Hacer clic en el contenedor de registro del doctor
    await driver.findElement(By.css(".RegisterDoctorContainer")).click()

    // Paso 3: Hacer clic en el botón siguiente
    await driver.findElement(By.css(".next-button")).click()

    // Paso 4: Llenar los campos relacionados con el hospital
    await driver.findElement(By.name("specialty")).sendKeys("Mamología")
    await driver.findElement(By.name("hospitalName")).sendKeys("Dario Contrera")
    await driver.findElement(By.name("hospitalConnection")).sendKeys("Doctor")
    await driver.findElement(By.name("hospitalStreet")).sendKeys("America")
    await driver.findElement(By.name("hospitalCity")).sendKeys("Santo Domingo")
    await driver.findElement(By.name("hospitalCountry")).sendKeys("Republica Dominicana")
    await driver.findElement(By.name("hospitalPhone")).sendKeys("8298755692")
    await driver.findElement(By.name("hospitalEmail")).sendKeys("doctor@gmail.com")

    // Paso 5: Hacer clic en el siguiente botón
    await driver.findElement(By.css(".next-button")).click()

    // Paso 6: Aceptar los términos y condiciones
    await driver.findElement(By.id("terms")).click()
    await driver.findElement(By.css(".next-button")).click()
  })
})
