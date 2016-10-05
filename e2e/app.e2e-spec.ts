import { KnowitPage } from './app.po';

describe('knowit App', function() {
  let page: KnowitPage;

  beforeEach(() => {
    page = new KnowitPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
