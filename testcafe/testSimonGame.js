import { Selector } from 'testcafe';

fixture`New Fixture`
    .page`https://staticfilecontent.z7.web.core.windows.net/`;

test('New Test', async t => {

    await t
        .click(Selector('button').withText('Start'))
        .debug()
        .expect(Selector('h3').withText('LEVEL')()).eql("LEVEL - 1");

});