const fs = require('fs')

const newman = require('newman')
Collection = require('postman-collection').Collection

const generalExecution = async( values ) => {

    let readEnvironment = fs.readFileSync( process.env.PATHENVIRONMENT, { encoding: 'utf-8' } )
    let data = JSON.parse( readEnvironment )

    //console.log( 'HOLA: ' + data.values[4].key + ' -- ' + data.values[6].key + ' -- ' + data.values[9].key + ' -- ' + data.values[10].key + ' -- ' + data.values[12].key + ' -- ' + data.values[27].key + ' -- ' + data.values[28].key + ' -- ' + data.values[29].key + ' -- ' + data.values[30].key + ' -- ' + data.values[61].key )

    data.values[4].value    = values.stage
    data.values[6].value    = values.identification
    data.values[9].value    = values.kashtag
    data.values[10].value   = values.phone
    data.values[12].value   = values.password
    data.values[27].value   = values.card1
    data.values[28].value   = values.card2
    data.values[29].value   = values.card3
    data.values[30].value   = values.card4
    data.values[61].value   = values.phoneTransfer

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
            console.log('Ejecución Completada!')
    })
}

module.exports = {
    generalExecution,
    createCollection,
    executeCollection
}

