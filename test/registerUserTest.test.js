// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('RegisterUserTest', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('firefox').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('RegisterUserTest', async function() {
    await driver.get("http://localhost:3000/")
    await driver.manage().window().setRect({ width: 1210, height: 692 })
    await driver.findElement(By.linkText("Sign Up")).click()
    await driver.findElement(By.linkText("Register")).click()
    await driver.findElement(By.name("firstName")).click()
    await driver.findElement(By.name("firstName")).sendKeys("Paco")
    await driver.findElement(By.css(".submit-btn")).click()
  })
})
