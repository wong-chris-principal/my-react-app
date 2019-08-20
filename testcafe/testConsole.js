import { Selector } from 'testcafe';

fixture`New Fixture`
    .page`https://chris-node-app.azurewebsites.net/`;

test('Test - input command', async t => {
    await t
        .wait(2000)
        .pressKey('c 1 0 1 0 enter b 1 1 enter')
        .wait(2000)
        .expect('1').eql('1');

});