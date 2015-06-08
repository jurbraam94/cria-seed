// Load configuration
var env = process.env.NODE_ENV || 'development',
    config = require('../../server/config/config.js')[env],
    localConfig = require('./../config-test.json');

console.log('>>>>>', env, '<<<<<');

`/*
describe('Vaste pagina opzet', function () {
    beforeEach(function () {
        browser.get('http://' + localConfig.host + ':' + config.port);
    });
    it('should have a topmenu, footer and body', function () {
        expect(browser.getTitle()).toBe('DOOD');
        expect(element(by.tagName('head')).get.toBe(null);
        expect(element(by.tagName('h1')).getText()).toBe('Book demo');
        expect(element(by.css('navbar-header')).not.toBe(null));
        expect(element(by.tagName('nav')).not.toBe(null));
        expect(element(by.className('container-fluid Content')).not.toBe(null));
        expect(element(by.tagName('footer')).not.toBe(null));
    });
});*/


//describe('DOOD test homepage', function () {
//
//    beforeEach(function () {
//        browser.get('http://' + localConfig.host + ':' + config.port);
//    });
//
//    it('should get the titles', function () {
//
//        expect(browser.getTitle()).toBe('DOOD');
//        expect(element(by.tagName('head')).null()).toBe(false);
//        expect(element(by.tagName('nav')).null()).toBe(false);
//        expect(element(by.className('container-fluid Content')).null()).toBe(false);
//        expect(element(by.tagName('footer')).null()).toBe(false);
//
//        // Get CSS value
//        element(by.tagName('h1')).getCssValue('color')
//            .then(function (v) {
//                expect(v).toBe('rgba(0, 0, 0, 1)');
//            });
//
//    });
//
//    it('should count the number of gebruiker', function () {
//
//        var gebruiker = element.all(by.repeater('book in gebruiker'));
//
//        expect(gebruiker.count()).toBe(10);
//
//    });
//
//    it('should get the first book', function () {
//
//        var gebruiker = element.all(by.repeater('book in gebruiker'));
//
//        expect(gebruiker.get(0).getText()).toEqual('DOCTOR SLEEP, Stephen King');
//
//    });
//
//    it('should get the last book', function () {
//
//        var gebruiker = element.all(by.repeater('book in gebruiker'));
//
//        expect(gebruiker.last().getText()).toEqual('SYCAMORE ROW, John Grisham');
//
//    });
//
//    it('should filter the gebruiker and return 1 book', function () {
//
//        element(by.model('query')).sendKeys('tar');
//
//        var gebruiker = element.all(by.repeater('book in gebruiker'));
//
//        expect(gebruiker.count()).toBe(1);
//        expect(gebruiker.get(0).getText()).toEqual('THE GOLDFINCH, Donna Tartt');
//
//    });
//});
//
//describe('CRUD on book', function () {
//
//    var _id;
//
//    beforeEach(function () {
//        browser.get('http://' + localConfig.host + ':' + config.port + '/#/gebruiker/new');
//    });
//
//    it('should get the titles', function () {
//
//        browser.get('http://' + localConfig.host + ':' + config.port + '/#/gebruiker/new');
//
//        expect(browser.getTitle()).toBe('DOOD');
//        expect(element(by.tagName('h1')).getText()).toBe('DOOD');
//        expect(element(by.tagName('h2')).getText()).toBe('Book');
//
//        // Get CSS value
//        element(by.tagName('h1')).getCssValue('color')
//            .then(function (v) {
//                expect(v).toBe('rgba(0, 0, 0, 1)');
//            });
//
//    });
//
//
//    /**
//     * @see https://docs.angularjs.org/api/ng/directive/form
//     */
//    it('should display an empty form', function () {
//
//        browser.get('http://' + localConfig.host + ':' + config.port + '/#/gebruiker/new');
//
//        expect(element(by.model('gebruiker.doc._id')).getText()).toBe('');
//        expect(element(by.model('gebruiker.doc.title')).getText()).toBe('');
//        expect(element(by.model('gebruiker.doc.author')).getText()).toBe('');
//        expect(element(by.model('gebruiker.doc.description')).getText()).toBe('');
//
//    });
//
//    it('should create a book', function () {
//
//        /**
//         * First we create the new book
//         */
//        browser.get('http://' + localConfig.host + ':' + config.port + '/#/gebruiker/new');
//
//        element(by.model('gebruiker.doc.title')).sendKeys('ALL THE LIGHT WE CANNOT SEE');
//        element(by.model('gebruiker.doc.author')).sendKeys('Anthony Doerr');
//        element(by.model('gebruiker.doc.description')).sendKeys('The lives of a blind French girl and a gadget-obsessed German boy before and during World War II.');
//
//        element(by.id('saveBtn')).click();
//
//    });
//
//    it('should query the new created book', function () {
//
//        browser.get('http://' + localConfig.host + ':' + config.port);
//
//        element(by.model('query')).sendKeys('Anthony Doerr');
//
//        var gebruiker = element.all(by.repeater('book in gebruiker'));
//
//        expect(gebruiker.count()).toBe(1);
//        expect(gebruiker.get(0).getText()).toEqual('ALL THE LIGHT WE CANNOT SEE, Anthony Doerr');
//
//    });
//
//    it('should update the new created book', function () {
//
//        browser.get('http://' + localConfig.host + ':' + config.port);
//
//        // Find the book
//        element(by.model('query')).sendKeys('Anthony Doerr');
//
//        expect(element.all(by.repeater('book in gebruiker'))
//            .first().getText())
//            .toBe('ALL THE LIGHT WE CANNOT SEE, Anthony Doerr');
//
//
//        // Click on list item (note the nested selector)
//        element.all(by.repeater('book in gebruiker')).first().$('a').click();
//
//        // Retrieve id for later retrieval
//        // Issue with retrieving value from input field, @see https://github.com/angular/protractor/issues/140
//        element(by.model('gebruiker.doc._id')).getAttribute('value')
//            .then(function (v) {
//                _id = v;
//
//                // Set new values
//                element(by.model('gebruiker.doc.title')).clear();
//                element(by.model('gebruiker.doc.title')).sendKeys('The Dreamer of the Snake');
//
//                element(by.model('gebruiker.doc.author')).clear();
//                element(by.model('gebruiker.doc.author')).sendKeys('Ruan Mashander');
//
//                element(by.model('gebruiker.doc.description')).clear();
//                element(by.model('gebruiker.doc.description')).sendKeys('Falling asleep was easy. Staying asleep was easy. Waking up was harder.');
//
//                // Save new values
//                element(by.id('saveBtn')).click();
//
//                // Verify new values
//                browser.get('http://' + localConfig.host + ':' + config.port);
//
//                // Find the book
//                element(by.model('query')).sendKeys(_id);
//
//                expect(element.all(by.repeater('book in gebruiker'))
//                    .first().getText())
//                    .toBe('The Dreamer of the Snake, Ruan Mashander');
//
//                // browser.pause();
//
//            });
//
//    });
//
//    it('should delete the new created book', function () {
//
//        browser.get('http://' + localConfig.host + ':' + config.port);
//
//        // Find the book
//        element(by.model('query')).sendKeys(_id);
//
//        expect(element.all(by.repeater('book in gebruiker'))
//            .first().getText())
//            .toBe('The Dreamer of the Snake, Ruan Mashander');
//
//        // Click on list item (note the nested selector)
//        element.all(by.repeater('book in gebruiker')).first().$('a').click();
//
//        // Delete book
//        element(by.id('deleteBtn')).click();
//
//        // Verify that the number of gebruiker is 10
//        browser.get('http://' + localConfig.host + ':' + config.port);
//
//        var gebruiker = element.all(by.repeater('book in gebruiker'));
//
//        expect(gebruiker.count()).toBe(10);
//
//    });
//});
