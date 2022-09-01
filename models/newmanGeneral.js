const fs = require('fs')

const newman = require('newman')
Collection = require('postman-collection').Collection

const generalExecution = async( values ) => {

    let readEnvironment = fs.readFileSync( process.env.PATHENVIRONMENT, { encoding: 'utf-8' } )
    let data = JSON.parse( readEnvironment )

    data.values[2].value    = values.stage
    data.values[4].value    = values.identification
    data.values[5].value    = values.kashtag
    data.values[7].value    = values.phone
    data.values[9].value    = values.password
    data.values[24].value   = values.card1
    data.values[25].value   = values.card2
    data.values[26].value   = values.card3

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

        for ( let i=0; i < data.item.length; i++ ) {
    
            for ( let x=0; x < data.item[i].item.length; x++ ) {    
            
                if ( dataObject[y] == data.item[i].item[x].name ) {

                    newCollection.items.add( await data.item[i].item[x] )

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
            console.log('Ejecución Completada!')
    })
}

module.exports = {
    generalExecution,
    createCollection,
    executeCollection
}

