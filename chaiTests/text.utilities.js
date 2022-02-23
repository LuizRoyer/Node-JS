const expect = require('chai').expect


expect(true).to.be.true
// title[0] = pega a 1 letra da palavra title
// title.substring(1) pega o resto da palavra menos a 1 letra
titleCase = (title) => { return title[0].toUpperCase() + title.substring(1) }
let title = 'The great mouse detective'

expect(titleCase(title)).to.be.a('string')
expect(titleCase('a')).to.equal('A')
expect(titleCase('luiz')).to.equal('Luiz')

expect(titleCase('the great mouse detective')).to.equal(title)


