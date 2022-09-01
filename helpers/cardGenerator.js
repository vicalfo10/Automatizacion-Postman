generator = require('creditcard-generator')
const valid = require('card-validator')

const cardGenerator = async() => {

    let numberCard = 0
    let card = 0

    if( Math.random() < 0.5 ) {

        numberCard = generator.GenCC( 'VISA' )
        card = valid.number( numberCard.toString() )

    } else {

        numberCard = generator.GenCC( 'Mastercard' )
        card = valid.number( numberCard.toString() )

    }

    let numCard = numberCard.toString()
    const separate = 4
    numCard = numCard.split('').map( (x,i) => (i>0 && i%separate==0)? " "+x : x ).join('')

    if( card.isPotentiallyValid ) {

        return numCard
        
    }

}

module.exports = {
    cardGenerator
}