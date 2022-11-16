const assert = require('assert');

Feature('Like a restaurant');

Scenario('Go to detail page from homepage', ({I}) => {
  I.amOnPage('/');

  I.waitForElement('.restaurant-item');
  I.seeElement('.restaurant-item');
  I.click(locate('.show-more').first());

  I.waitForElement('.detail-page');
  I.seeElement('.detail-page');
  I.seeElement('.review');
});

Scenario('Like one restaurant', async ({I}) => {
  I.amOnPage('/#/detail/rqdv5juczeskfw1e867');
  I.waitForElement('.detail-page', 5);

  const title = await I.grabTextFrom('.header h2');

  I.seeElement('#favorite-button.favorite');
  I.click(locate('#favorite-button.favorite').first());
  I.seeElement('#favorite-button.favorited');

  I.click(locate('.navigation').at(2));
  I.waitForElement('.favorite-page');

  I.seeElement('.restaurant-card');
  const titleFav = await I.grabTextFrom('.restaurant-card .judul');
  assert.strictEqual(titleFav, title);
});

Scenario('Unlike one restaurant right after like it', async ({I}) => {
  I.amOnPage('/#/detail/rqdv5juczeskfw1e867');
  I.waitForElement('.detail-page');

  I.seeElement('#favorite-button.favorite');
  I.click(locate('#favorite-button.favorite').first());
  I.seeElement('#favorite-button.favorited');
  I.click(locate('#favorite-button.favorited').first());
  I.seeElement('#favorite-button.favorite');

  I.click(locate('.navigation').at(2));

  I.waitForElement('.favorite-page');

  assert.equal(await I.grabTextFrom('.favorite-page'), 'Tidak ada restaurant yang disukai');
  I.dontSeeElement('.restaurant-card');
});

Scenario('Unlike one restaurant from favorite-page', async ({I}) => {
  I.amOnPage('/#/detail/rqdv5juczeskfw1e867');
  I.waitForElement('.detail-page');

  I.seeElement('#favorite-button.favorite');
  I.click(locate('#favorite-button.favorite').first());
  I.seeElement('#favorite-button.favorited');

  I.amOnPage('/#/favorites');
  I.waitForElement('.favorite-page');

  I.seeElement('.restaurant-card');
  I.click(locate('.detail-button').first());

  I.waitForElement('.detail-page');
  I.seeElement('#favorite-button.favorited');
  I.click(locate('#favorite-button.favorited').first());
  I.seeElement('#favorite-button.favorite');
});

Scenario('Check Navigation', async ({I}) => {
  I.amOnPage('/');
  I.waitForElement('.restaurant-item');
  I.seeElement('.restaurant-item');

  await I.refreshPage();

  I.waitForElement('.restaurant-item');
  I.seeElement('.restaurant-item');
  I.click(locate('.show-more').first());

  I.waitForElement('.detail-page');
  I.seeElement('.detail-page');
  await I.refreshPage();
  I.waitForElement('.detail-page');
  I.seeElement('.detail-page');

  I.click(locate('#favorite-button.favorite').first());
  I.seeElement('#favorite-button.favorited');
  await I.refreshPage();
  I.seeElement('#favorite-button.favorited');

  I.click(locate('.navigation').at(2));
  I.waitForElement('.favorite-page', 5);
  I.seeElement('.favorite-page');
  I.seeElement('.restaurant-card');
  await I.refreshPage();
  I.waitForElement('.favorite-page');
  I.seeElement('.favorite-page');
  I.seeElement('.restaurant-card');

  I.click(locate('.navigation').at(1));
  I.waitForElement('.restaurant-item');
  I.seeElement('.restaurant-item');
});
