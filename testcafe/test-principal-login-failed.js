import { Selector } from 'testcafe';

fixture `New Fixture`
    .page `https://rsc.principal.com.hk/Principal.WebApp/htdocs/initial.aspx?lang=zh-CN`;

test('New Test', async t => {
    await t
        .click(Selector('#logintype_0'))
        .wait(500)
        .click(Selector('#schemeType_0'))
        .wait(500)
        .typeText(Selector('#LoginId'), 'test')
        .wait(500)
        .pressKey('tab')
        .wait(500)
        .typeText(Selector('#password'), '12345678')
        .wait(500)
        .click(Selector('#Login'))
        .wait(500)
        .expect(Selector('#message').find('font').innerText).eql("就選擇的計劃所輸入的登入編號或密碼不正確，請重新輸入。")
        .wait(2000);
});
