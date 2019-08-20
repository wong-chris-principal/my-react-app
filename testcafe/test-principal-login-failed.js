import { Selector } from 'testcafe';

fixture `New Fixture`
    .page `https://www.principal.com.hk/zh`;

test('New Test', async t => {
    await t
        .click(Selector('li').withText('English').find('.fa.fa-user'))
        .wait(500)
        .click(Selector('#LoginId'))
        .wait(500)
        .click(Selector('#logintype_0'))
        .wait(500)
        .click(Selector('#schemeType_0'))
        .wait(500)
        .typeText(Selector('#txtHKID'), 'A123456(7)')
        .wait(500)
        .click(Selector('#Login'))
        .wait(500)
        .expect(Selector('#message').find('font')()).eql("尚未輸入密碼，請重新輸入")
        .wait(1000);
});
