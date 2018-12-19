/* eslint-disable no-undef */
const until = protractor.ExpectedConditions;

const dataAngular = ['To Do Homework', 'Hello', 'abc', '...'];
const dataNonAngular = [
  { name: `Dirk Gently's Holistic Detective Agency`, date: 2016 },
  { name: `Westworld`, date: 2016 }
];

dataAngular.forEach((name) => {
  describe('angular test', function () {
    const addNewTaskField = element(by.css('input[placeholder]'));
    const allNotes = $$('.todo-container');
    const comleteTaskBox = element(by.cssContainingText('.todo-container', name)).element(by.css('input'));
    const searchField = element(by.css('.search-bar input'));
    const selector = element(by.css('select'));
    const completedMenu = element(by.cssContainingText('option', 'Completed'));
    const startedMenu = element(by.cssContainingText('option', 'Started'));

    function addNewNote () {
      addNewTaskField.sendKeys(name);
      addNewTaskField.sendKeys(protractor.Key.ENTER);
    }

    function searchNote () {
      searchField.sendKeys(name);
    }

    function openCompltedNotes () {
      selector.click();
      completedMenu.click();
    }

    function openStartedNotes () {
      selector.click();
      startedMenu.click();
    }

    beforeEach(function () {
      browser.get('http://maxcabrera.com/code/todo-list/');
    });

    it('should have a title', function () {
      expect(browser.getTitle()).toEqual('Angular2 Seed');
    });

    it('add a new note', async function () {
      const numOfNotes = await allNotes.count();
      addNewNote(name);
      expect(allNotes.count()).toBe(numOfNotes + 1);
      searchNote();
      browser.sleep(15000);
      expect(allNotes.count()).toBe(1);
    });

    it('delete a new note', async function () {
      const numOfNotes = await allNotes.count();
      addNewNote(name);
      expect(allNotes.count()).toBe(numOfNotes + 1);
      searchNote();
      expect(allNotes.count()).toBe(1);
      comleteTaskBox.click();
      expect(allNotes.count()).toBe(0);
    });

    it('restore note', async function () {
      const numOfNotes = await allNotes.count();
      openCompltedNotes();
      const numOfCompletedNotes = await allNotes.count();
      openStartedNotes();
      addNewNote(name);
      expect(allNotes.count()).toBe(numOfNotes + 1);
      searchNote();
      expect(allNotes.count()).toBe(1);
      comleteTaskBox.click();
      expect(allNotes.count()).toBe(0);
      openCompltedNotes();
      expect(allNotes.count()).toBe(1);
      searchField.clear();
      searchField.sendKeys('a', protractor.Key.BACK_SPACE);
      comleteTaskBox.click();
      expect(allNotes.count()).toBe(numOfCompletedNotes);
    });
  });
});

dataNonAngular.forEach((data) => {
  describe('non-angular test', function () {
    const searchField = browser.$('.headblock-search-txt');
    const seriesLink = browser.element(by.linkText(data.name));
    const firstSeason = browser.element(by.partialLinkText(`1 сезон`));
    const date = element(by.cssContainingText('.pgs-sinfo_list', ' Вышел: ')).element(by.css(`span`));

    jasmine.getEnv().defaultTimeoutInterval = 200000;

    beforeEach(function () {
      browser.waitForAngularEnabled(false); // For non-angular sites
      browser.get('http://seasonvar.ru/');
    });

    it('should have a title', function () {
      expect(browser.getTitle()).toEqual('Сериалы ТУТ! Сериалы онлайн смотреть бесплатно. Смотреть онлайн');
    });

    it('find tvSeries', async function () {
      searchField.sendKeys(data.name, protractor.Key.ENTER);
      browser.wait(until.elementToBeClickable(seriesLink), 5000);
      seriesLink.click();
      browser.wait(until.elementToBeClickable(firstSeason), 5000);
      firstSeason.click();
      expect(browser.getTitle()).toContain(data.name);
      expect(browser.getTitle()).toContain(`1 сезон`);
      expect(date.getText()).toBe(data.date.toString());
    });
  });
});
