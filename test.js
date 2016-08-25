'use strict';
require('chai').should();

let webdriver = require('selenium-webdriver');
let By = webdriver.By;

let d = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

after(function(done){
  d.quit().then(done);
});

describe('Social Tables Help Page', function(){

  // increase timeout from 2000ms to account for webdriver load
  this.timeout(15000);

  beforeEach(function(done){
    d.get('http://help.socialtables.com')
    // wait for page to load
    .then(d.wait(d.findElement(By.tagName('title'))))
    .then(done)
  });

  // Test 0
  it('has the correct title', function(done) {
    d.getTitle()
      .then(title => title.should.equal('Social Tables Help - Home'))
      .then(() => done())
      .catch(error => done(error));
  });

  // Test 1
  // note - change xdescribe to describe to get this code to run
  describe('Logo', function(){
    it('should link to https://www.socialtables.com/', function(done){
      d.findElement(By.id('logo-grey')).click();
      d.getCurrentUrl().then(currentUrl => currentUrl.toString().should.equal('http://socialtables.digihey.com/'))
      .then(()=>done())
      .catch(error => done(error));
    });
  });

  // Test 2
  describe('Searching for \'Bobby Fisher\'', function(){
    it('should return 0 results', function(done){
      d.findElement(By.id('searchAskInput')).sendKeys('Bobby Fisher')
      d.findElement(By.id('searchAskButton')).click()
      .then(() => d.findElements(By.className('article')).then(elements => elements.length.should.equal(0)))
      .then(() => done())
      .catch(error => done(error));
      // Insert Your Code Here
    });
  });

  // Test 3
  describe('Searching for \'event\'', function(){
    it('should return 10 results', function(done){
      d.findElement(By.id('searchAskInput')).sendKeys('event')
      d.findElement(By.id('searchAskButton')).click()
      .then(() => d.findElements(By.className('article')).then(elements => elements.length.should.equal(10)))
      .then(() => done())
      .catch(error => done(error));
      // Insert Your Code Here

    })
  });

  // Test 4
  describe('Searching for a word under three character', function(){
    it('should trigger an alert box with the text \'Search string must be at least 3 characters long\'', function(done){
      d.findElement(By.id('searchAskInput')).sendKeys('is')
      d.findElement(By.id('searchAskButton')).click()
      d.switchTo().alert().accept()
      .then(() => done())
      .catch(error => done(error));
      // Insert Your Code Here

    });
  });

  describe('Searching for \'food\'', function(){
    it('should return 1 result', function(done){
      d.findElement(By.id('searchAskInput')).sendKeys('food')
      d.findElement(By.id('searchAskButton')).click()
      .then(() => d.findElements(By.className('article')).then(elements => elements.length.should.equal(1)))
      .then(() => done())
      .catch(error => done(error));
    })
  });

});
