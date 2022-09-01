require('colors')

const fs = require('fs')

const { number } = require('card-validator')
const inquirer = require('inquirer')

const menu = async() => {

    console.clear()
    console.log('=========================='.green)
    console.log('|                        |'.green)
    console.log(`${'|'.green}       ${'AUTOMATION'.cyan}       ${'|'.green}`)
    console.log(`${'|'.green}       ${'KASH QA API'.cyan}      ${'|'.green}`)
    console.log('|                        |'.green)
    console.log('==========================\n'.green)
    console.log('=========================='.green)
    console.log('  Seleccione una opción'.white )
    console.log('==========================\n'.green)

    const { opcion } = await inquirer.prompt( optionMenu )

    return opcion
}

const optionMenu = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${ '1.'.green } Completar Variables`
            },
            {
                value: 2,
                name: `${ '2.'.green } Elaborar Colección`
            },
            {
                value: 3,
                name: `${ '3.'.green } Ejecutar Colección`
            },
            {
                value: 4,
                name: `${ '4.'.green } Ver Reporte`
            },
            {
                value: 0,
                name: `${ '0.'.green } Salir`
            },
        ]
    }
]

const subMenu = async() => {

    const optionSubMenu = [
        {
            type: 'rawlist',
            name: 'opcion',
            message: '¿Qué variable desea llenar?',
            choices: [
                {
                    value: 1,
                    name: `Ingresar Stage`
                },
                {
                    value: 2,
                    name: `Ingresar Identificación`
                },
                {
                    value: 3,
                    name: `Ingresar Kashtag`
                },
                {
                    value: 4,
                    name: `Ingresar Teléfono`
                },
                {
                    value: 5,
                    name: `Ingresar Contraseña`
                },
                {
                    value: 6,
                    name: `Registrar Tarjeta`
                },
                {
                    value: 0,
                    name: `Salir`
                },
            ]
        }
    ]

    const { opcion } = await inquirer.prompt(optionSubMenu)

    return opcion
}

const subMenuCard = async() => {

    const optionSubCard = [
        {
            type: 'rawlist',
            name: 'opcion',
            message: '¿Cual tarjeta débito desea generar?',
            choices: [
                {
                    value: 1,
                    name: `Tarjeta Uno`
                },
                {
                    value: 2,
                    name: `Tarjeta Dos`
                },
                {
                    value: 3,
                    name: `Tarjeta Tres`
                },
                {
                    value: 0,
                    name: `Salir`
                },
            ]
        }
    ]

    const { opcion } = await inquirer.prompt( optionSubCard )

    return opcion
}

const subMenuCollection = async() => {

    const optionSubCollection = [
        {
            type: 'rawlist',
            name: 'opcion',
            message: '¿Qué desea hacer?',
            choices: [
                {
                    value: 1,
                    name: `Crear Colección`
                },
                {
                    value: 2,
                    name: `Armar Colección`
                },
                {
                    value: 0,
                    name: `Salir`
                },
            ]
        }
    ]

    const { opcion } = await inquirer.prompt( optionSubCollection )

    return opcion
}

const subMenuExecuteCollection = async() => {

    const optionSubCollection = [
        {
            type: 'rawlist',
            name: 'opcion',
            message: '¿Qué colección deseas hacer?',
            choices: [
                {
                    value: 1,
                    name: `Ejecutar Colección Personalizada`
                },
                {
                    value: 2,
                    name: `Ejecutar Colección General`
                },
                {
                    value: 0,
                    name: `Salir`
                },
            ]
        }
    ]

    const { opcion } = await inquirer.prompt( optionSubCollection )

    return opcion
}


const pausa = async() => {
    
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'enter'.green } para continuar`
        }
    ];

    console.log('\n')
    await inquirer.prompt( question )
}

const readInput = async( message, opt ) => {

    if ( opt == 1 ){

        const question = [
            {
                type: 'input',
                name: 'stage',
                message,
                validate( value ) {
                    if( value.length === 0 ) {
                        return 'Por favor ingrese un valor.'
                    }
                    return true
                }
            }
            
        ]

        const { stage } = await inquirer.prompt( question )
        return stage

    } else if ( opt == 2 ) {

        const question = [
            {
                type: 'input',
                name: 'identification',
                message,
                validate( value ) {
                    if( value.length === 0 ) {
                        return 'Por favor ingrese un valor.'
                    }
                    return true
                }
            }
        ]

        const { identification } = await inquirer.prompt( question )
        return identification

    } else if ( opt == 3 ) {

        const question = [
            {
                type: 'input',
                name: 'kashtag',
                message,
                validate( value ) {
                    if( value.length === 0 ) {
                        return 'Por favor ingrese un valor.'
                    }
                    return true
                }
            }
        ]

        const { kashtag } = await inquirer.prompt( question )
        return kashtag

    } else if ( opt == 4 ) {

        const question = [
            {
                type: 'input',
                name: 'phone',
                message,
                validate( value ) {
                    if( value.length === 0 ) {
                        return 'Por favor ingrese un valor.'
                    } else if( isNaN( value ) ) {
                        return 'Solo se aceptan numeros.'
                    } else if( value.length !== 11 ) {
                        return 'Número teléfono igual 8 digitos.'
                    }
                    return true
                }
            }
        ]

        const { phone } = await inquirer.prompt( question )
        return phone

    } else if ( opt == 5 ) {

        const question = [
            {
                type: 'input',
                name: 'password',
                message,
                validate( value ) {
                    if( value.length === 0 ) {
                        return 'Por favor ingrese un valor'
                    }
                    return true
                }
            }
        ]

        const { password } = await inquirer.prompt( question )
        return password

    } else if ( opt == 6 ) {

        const question = [
            {
                type: 'input',
                name: 'card',
                message,
                validate( value ) {
                    if( value.length === 0 ) {
                        return 'Por favor ingrese un valor'
                    } else if( isNaN( value ) ) {
                        return 'Solo se aceptan numeros.'
                    }
                    return true
                }
            }
        ]

        const { card } = await inquirer.prompt( question )
        return card
    }
}

const dataCollection = async( valueCollection ) => {

    let nameOption = ''
    let listNameCollection = []

    const readCollection = await fs.readFileSync( process.env.PATHCOLLECTION, { encoding: 'utf-8' } )
    const data = JSON.parse( readCollection )

    for ( let i=0; i < data.item.length; i++ ) {

        listNameCollection.push( ` ${ data.item[i].name } `.red )

        for ( let x=0; x < data.item[i].item.length; x++ ) {

            listNameCollection.push( ' |__' + ' ' + data.item[i].item[x].request.method + ' - ' + data.item[i].item[x].name )
        }
    }

    const optionNameCollection = [
        {
            type: 'rawlist',
            name: 'opcion',
            message: '¿Cual Colección deseas ejecutar?',
            choices: listNameCollection
        }
    ]

    const { opcion } = await inquirer.prompt( optionNameCollection )
    nameOption = opcion.split('-')

    valueCollection.push( nameOption[1].trimStart().trimEnd() )

    return valueCollection
}

const listReport = async() => {

    let output = []
    const directory = process.env.PATHREPORTS

    const files = fs.readdirSync( directory )

    for( const file of files ) {

        output.push( file )

    }

    output.push( 'Salir' )

    const optionSubMenu = [
        {
            type: 'rawlist',
            name: 'opcion',
            message: '¿Cual tarjeta débito desea generar?',
            choices: output
        }
    ]

    const { opcion } = await inquirer.prompt( optionSubMenu )

    return opcion
}

module.exports = {
    menu,
    subMenu,
    subMenuCard,
    subMenuCollection,
    subMenuExecuteCollection,
    pausa,
    readInput,
    dataCollection,
    listReport
}