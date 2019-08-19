import { Selector } from 'testcafe';

fixture `New Fixture`
    .page `http://todomvc.com/examples/react/#/`;

test('New Test', async t => {
    await t
        .typeText(Selector('.new-todo[data-reactid=".0.0.1"]'), 'A')
        .pressKey('enter')
        .expect(Selector('label').withText('A').textContent).eql("AB");
});