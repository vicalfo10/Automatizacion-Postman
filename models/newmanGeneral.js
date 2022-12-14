const fs = require('fs')

const newman = require('newman')
Collection = require('postman-collection').Collection

const generalExecution = async( values ) => {

    let readEnvironment = fs.readFileSync( process.env.PATHENVIRONMENT, { encoding: 'utf-8' } )
    let data = JSON.parse( readEnvironment )

    /*console.log( 'HOLA SignUP: ' + data.values[5].key + ' -- ' + data.values[7].key + ' -- ' + data.values[10].key + ' -- ' + data.values[11].key + ' -- ' + data.values[14].key + ' -- ' + data.values[30].key + ' -- ' + data.values[31].key + ' -- ' + data.values[32].key + ' -- ' + data.values[33].key + ' -- ' + data.values[67].key )
    console.log( 'HOLA PreSignUP: ' + data.values[75].key + ' -- ' + data.values[76].key + ' -- ' + data.values[78].key + ' -- ' + data.values[79].key )
    console.log( 'DATA: ' +  values.stage + ' - ' + values.identificationPre + ' - ' + values.kashtagPre + ' - ' + values.phonePre + ' - ' + values.passwordPre)*/
    //console.log( 'HOLA SignUPKYC: ' + data.values[83].value + ' -- ' + data.values[86].key + ' -- ' + data.values[87].key + ' -- ' + data.values[91].key + ' -- ' + data.values[100].key )

    data.values[6].value    = values.stage
    data.values[8].value    = values.identification
    data.values[11].value   = values.kashtag
    data.values[12].value   = values.phone
    data.values[15].value   = values.password
    data.values[26].value   = process.env.TOKENADMIN
    data.values[32].value   = values.card1
    data.values[33].value   = values.card2
    data.values[34].value   = values.card3
    data.values[35].value   = values.card4
    data.values[65].value   = values.phoneTransfer
    data.values[73].value   = values.identificationPre
    data.values[74].value   = values.kashtagPre
    data.values[76].value   = values.phonePre
    data.values[77].value   = values.passwordPre
    data.values[83].value   = values.identificationKYC
    data.values[84].value   = values.kashtagKYC
    data.values[85].value   = values.phoneKYC
    data.values[89].value   = values.passwordKYC
    data.values[98].value  = values.card5

    let vSignUp = [
        {
            "Stage"                 : data.values[6].value,
            "Identificacion"        : data.values[8].value,
            "Kashtag"               : data.values[11].value,
            "Tel??fono"              : data.values[12].value,
            "Password"              : data.values[15].value,
            "Tarjeta Uno"           : data.values[32].value,
            "Tarjeta Dos"           : data.values[33].value,
            "Tarjeta Tres"          : data.values[35].value,
            "Tel??fono a Tarjeta"    : data.values[65].value
        }
    ]

    let vPreSignUp = [
        {
            "Identificaci??n"    : data.values[73].value,
            "Kashtag"           : data.values[74].value,
            "Tel??fono"          : data.values[76].value,
            "Password"          : data.values[77].value,
            "Tarjeta"           : data.values[34].value
        }
    ]

    let vSignUpKYC = [
        {
            "Identificaci??n"    : data.values[83].value,
            "Kashtag"           : data.values[84].value,
            "Tel??fono"          : data.values[85].value,
            "Password"          : data.values[89].value,
            "Tarjeta"           : data.values[98].value
        }
    ]

    console.log( '\nFlujo SignUp'.cyan )
    console.table( vSignUp )

    console.log( '\nFlujo PreSignUp'.cyan )
    console.table( vPreSignUp )

    console.log( '\nFlujo SignUp With KYC'.cyan )
    console.table( vSignUpKYC )

    await fs.writeFileSync( process.env.PATHENVIRONMENT, JSON.stringify( data, null, 2 ) )

    //return data
}

const createCollection = async( dataObject ) => {

    newCollection = new Collection({
        info: {
            name: 'Api-Kash-QA-Created'
        }
    })

    const readCollection = fs.readFileSync( process.env.PATHCOLLECTION.toString() )
    const data = JSON.parse( readCollection )

    for ( let y=0; y < dataObject.length; y++ ) {

        for ( let a=0; a < data.item.length; a++ ) {

            for ( let i=0; i < data.item[a].item.length; i++ ) {
 
                for ( let x=0; x < data.item[a].item[i].item.length; x++ ) {    

                    if ( dataObject[y] == data.item[a].item[i].item[x].name ) {
                        
                        newCollection.items.add( await data.item[a].item[i].item[x] )
    
                    }
                }   
            }
        }
    }
    
    newCollection.auth = await data.auth
    newCollection.events.add( await data.event )

    await fs.writeFileSync( process.env.PATHCOLLECTIONPER, JSON.stringify( newCollection, null, 2 ) )
    
    return newCollection

}

const executeCollection = ( optValue ) => {

    let pathCollection

    if( optValue == 1 ) {
        pathCollection = process.env.PATHCOLLECTIONPER
    } else {
        pathCollection = process.env.PATHCOLLECTION
    }

    // call newman.run to pass `options` object and wait for callback
    newman.run({

        collection: require( '.'+pathCollection ),
        environment: require( '.'+process.env.PATHENVIRONMENT ),
        reporters: [ 'htmlextra', 'cli' ]
    },
    
    function ( err ) {
                    
        if (err) { 
            throw err 
        }
            console.log('Ejecuci??n Completada!')
    })
}

module.exports = {
    generalExecution,
    createCollection,
    executeCollection
}

