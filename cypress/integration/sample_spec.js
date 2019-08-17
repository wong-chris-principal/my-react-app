describe('My First Test', function () {
    it('Does not do much!', function () {
        expect(2).to.equal(2)
    })
})

describe('My First UI Test', function () {
    it('clicks the link "type"', function () {
        cy.visit('https://example.cypress.io')

        cy.contains('type').click()
    })
})