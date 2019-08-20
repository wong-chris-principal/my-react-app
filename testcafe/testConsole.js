import { Selector } from 'testcafe';

fixture `New Fixture`
    .page `https://chris-node-app.azurewebsites.net/`;

test('New Test', async t => {
    await t
        .click(Selector('html'))
        .wait(1000)
        .typeText(Selector('html'), 'C 20 20')
        .pressKey('enter')
        .wait(500)
        .typeText(Selector('#commandInput'), 'L 1 5 20 10')
        .pressKey('enter')
        .wait(500)
        .typeText(Selector('#commandInput'), 'B 1 10 p')
        .pressKey('enter')
        .wait(500)
        .typeText(Selector('#commandInput'), 'B 1 1 -')
        .pressKey('enter')
        .wait(500)
        .typeText(Selector('#commandInput'), 'q')
        .pressKey('enter')
        .wait(2000);
});
