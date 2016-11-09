import { Dnd5randomPage } from './app.po';

describe('dnd5random App', function() {
  let page: Dnd5randomPage;

  beforeEach(() => {
    page = new Dnd5randomPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
