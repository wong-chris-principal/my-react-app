import { Selector } from 'testcafe';

fixture`New Fixture`
    .page`https://staticfilecontent.z7.web.core.windows.net`;

test('New Test', async t => {
    await t
        .wait(2000)
        .click(Selector('button').withText('Start'))
        .wait(2000)
        .expect(Selector('span').withText('1')().textContent).eql('1');

});