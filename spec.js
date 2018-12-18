/* eslint-disable no-undef */
data = ['Hello', 'abc', '...'];

data.forEach((name) => {
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
