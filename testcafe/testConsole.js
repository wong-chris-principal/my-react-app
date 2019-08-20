import { Selector } from 'testcafe';

fixture`New Fixture`
    .page`https://chris-node-app.azurewebsites.net/`;

test('Test - input command', async t => {
    await t
        .click(Selector('div').withAttribute('class', 'commandContainer'))
        .wait(2000)
        .pressKey('c space 1 0 space 1 0 enter b space 1 space 1 enter')
        .wait(2000)
        .expect('1').eql('1');

});