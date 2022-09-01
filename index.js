require('dotenv').config()

const fs = require('fs')
const open = require('open')

const { menu,
        subMenu,
        subMenuCard,
        subMenuCollection,
        subMenuExecuteCollection,
        pausa,
        readInput,
        dataCollection,
        listReport } = require('./helpers/menu')

const { cardGenerator } = require('./helpers/cardGenerator')

const { generalExecution, 
        createCollection,
        executeCollection } = require('./models/newmanGeneral')


const main = async() => {

    //const busquedas = new Busquedas();
    let optMenu
    let optSubMenu
    let optSubMenuCard
    let optSubMenuCollection

    let data = {}
    let newCollection = {}
    let objectCollection = []

    do{

        optMenu = await menu()

        switch( optMenu ) {

            case 1:

                do{

                    optSubMenu = await subMenu()

                    switch ( optSubMenu ) {

                        case 1:

                            data.stage = await readInput('Stage: ', optSubMenu)

                            break
                        case 2:

                            data.identification = await readInput('Identificación: ', optSubMenu)

                            break
                        case 3:

                            data.kashtag = await readInput('Kashtag: ', optSubMenu)
    
                            break
                        case 4:

                            data.phone = await readInput('Teléfono: ', optSubMenu)

                            break
                        case 5:

                            data.password = await readInput('Contraseña: ', optSubMenu)

                            break
                        case 6:

                            do {
                                optSubMenuCard = await subMenuCard()

                                switch ( optSubMenuCard ) {
                                    
                                    case 1:

                                        data.card1 = await cardGenerator()
                                    
                                        break
                                    case 2:

                                        data.card2 = await cardGenerator()
                                    
                                        break
                                    case 3:

                                        data.card3 = await cardGenerator()
                                    
                                        break
                                }

                                if (optSubMenuCard !== 0) await pausa()

                            } while ( optSubMenuCard !== 0 )

                            break
                    }

                    if (optSubMenu !== 0) await pausa()

                } while ( optSubMenu !== 0 )
                
                await generalExecution( data )

                break

            case 2:

                let listCollection = []
                await fs.writeFileSync( process.env.PATHCOLLECTIONPER, '' )

                do {

                    optSubMenuCollection = await subMenuCollection()

                    switch ( optSubMenuCollection ) {

                        case 1:
                            
                            objectCollection = await dataCollection( listCollection )
                            
                            break
                    
                        case 2:

                           newCollection = await createCollection( objectCollection )

                           break
                    }

                    if ( optSubMenuCollection !== 0 ) await pausa()
                    
                } while ( optSubMenuCollection !== 0 )

                break

            case 3:

                do {

                    optSubMenuExecuteCollection = await subMenuExecuteCollection()

                    switch ( optSubMenuExecuteCollection ) {

                        case 1:
                            
                            executeCollection( optSubMenuExecuteCollection )
                            
                            break
                    
                        case 2:

                            executeCollection( optSubMenuExecuteCollection )

                           break
                    }

                    if ( optSubMenuExecuteCollection !== 0 ) await pausa()
                    
                } while ( optSubMenuExecuteCollection !== 0 )
                
                break

            case 4:

                const nameReport = await listReport()
                await open(process.env.PATHREPORTS+'/'+nameReport, {app: {name: 'google chrome', arguments: ['--incognito']}})

                break
        }

        if ( optMenu !== 0 ) await pausa()

    } while ( optMenu !== 0 )
}

main()