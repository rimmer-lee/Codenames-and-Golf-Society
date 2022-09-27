const regions = [{
    code: 'AR-B',
    country: 'Argentina',
    name: 'Buenos Aires'
}, {
    code: 'AR-K',
    country: 'Argentina',
    name: 'Catamarca'
}, {
    code: 'AR-H',
    country: 'Argentina',
    name: 'Chaco'
}, {
    code: 'AR-U',
    country: 'Argentina',
    name: 'Chubut'
}, {
    code: 'AR-C',
    country: 'Argentina',
    name: 'Ciudad Autónoma de Buenos Aires'
}, {
    code: 'AR-X',
    country: 'Argentina',
    name: 'Cordoba'
}, {
    code: 'AR-W',
    country: 'Argentina',
    name: 'Corrientes'
}, {
    code: 'AR-E',
    country: 'Argentina',
    name: 'Entre Rios'
}, {
    code: 'AR-P',
    country: 'Argentina',
    name: 'Formosa'
}, {
    code: 'AR-Y',
    country: 'Argentina',
    name: 'Jujuy'
}, {
    code: 'AR-L',
    country: 'Argentina',
    name: 'La Pampa'
}, {
    code: 'AR-F',
    country: 'Argentina',
    name: 'La Rioja'
}, {
    code: 'AR-M',
    country: 'Argentina',
    name: 'Mendoza'
}, {
    code: 'AR-N',
    country: 'Argentina',
    name: 'Misiones'
}, {
    code: 'AR-Q',
    country: 'Argentina',
    name: 'Neuquen'
}, {
    code: 'AR-R',
    country: 'Argentina',
    name: 'Rio Negro'
}, {
    code: 'AR-A',
    country: 'Argentina',
    name: 'Salta'
}, {
    code: 'AR-J',
    country: 'Argentina',
    name: 'San Juan'
}, {
    code: 'AR-D',
    country: 'Argentina',
    name: 'San Luis'
}, {
    code: 'AR-Z',
    country: 'Argentina',
    name: 'Santa Cruz'
}, {
    code: 'AR-S',
    country: 'Argentina',
    name: 'Santa Fe'
}, {
    code: 'AR-G',
    country: 'Argentina',
    name: 'Santiago del Estero'
}, {
    code: 'AR-V',
    country: 'Argentina',
    name: 'Tierra del Fuego'
}, {
    code: 'AR-T',
    country: 'Argentina',
    name: 'Tucuman'
}, {
    code: 'AU-ACT',
    country: 'Australia',
    name: 'Australian Capital Territory'
}, {
    code: 'AU-NSW',
    country: 'Australia',
    name: 'New South Wales'
}, {
    code: 'AU-QLD',
    country: 'Australia',
    name: 'Queensland'
}, {
    code: 'AU-SA',
    country: 'Australia',
    name: 'South Australia'
}, {
    code: 'AU-TAS',
    country: 'Australia',
    name: 'Tasmania'
}, {
    code: 'AU-VIC',
    country: 'Australia',
    name: 'Victoria'
}, {
    code: 'AU-WA',
    country: 'Australia',
    name: 'Western Australia'
}, {
    code: 'AT-1',
    country: 'Austria',
    name: 'Burgenland'
}, {
    code: 'AT-2',
    country: 'Austria',
    name: 'Carinthia'
}, {
    code: 'AT-3',
    country: 'Austria',
    name: 'Lower Austria'
}, {
    code: 'AT-5',
    country: 'Austria',
    name: 'Salzburg'
}, {
    code: 'AT-6',
    country: 'Austria',
    name: 'Styria'
}, {
    code: 'AT-7',
    country: 'Austria',
    name: 'Tyrol'
}, {
    code: 'AT-4',
    country: 'Austria',
    name: 'Upper Austria'
}, {
    code: 'AT-9',
    country: 'Austria',
    name: 'Vienna'
}, {
    code: 'AT-8',
    country: 'Austria',
    name: 'Vorarlberg'
}, {
    code: 'BS-AK',
    country: 'Bahamas',
    name: 'Acklins'
}, {
    code: 'BS-BY',
    country: 'Bahamas',
    name: 'Berry Islands'
}, {
    code: 'BS-BI',
    country: 'Bahamas',
    name: 'Bimini'
}, {
    code: 'BS-BP',
    country: 'Bahamas',
    name: 'Black Point'
}, {
    code: 'BS-CI',
    country: 'Bahamas',
    name: 'Cat Island'
}, {
    code: 'BS-CO',
    country: 'Bahamas',
    name: 'Central Abaco'
}, {
    code: 'BS-CS',
    country: 'Bahamas',
    name: 'Central Andros'
}, {
    code: 'BS-CE',
    country: 'Bahamas',
    name: 'Central Eleuthera'
}, {
    code: 'BS-FP',
    country: 'Bahamas',
    name: 'City of Freeport'
}, {
    code: 'BS-CK',
    country: 'Bahamas',
    name: 'Crooked Island and Long Cay'
}, {
    code: 'BS-EG',
    country: 'Bahamas',
    name: 'East Grand Bahama'
}, {
    code: 'BS-EX',
    country: 'Bahamas',
    name: 'Exuma'
}, {
    code: 'BS-GC',
    country: 'Bahamas',
    name: 'Grand Cay'
}, {
    code: 'BS-HI',
    country: 'Bahamas',
    name: 'Harbour Island'
}, {
    code: 'BS-HT',
    country: 'Bahamas',
    name: 'Hope Town'
}, {
    code: 'BS-IN',
    country: 'Bahamas',
    name: 'Inagua'
}, {
    code: 'BS-LI',
    country: 'Bahamas',
    name: 'Long Island'
}, {
    code: 'BS-MC',
    country: 'Bahamas',
    name: 'Mangrove Cay'
}, {
    code: 'BS-MG',
    country: 'Bahamas',
    name: 'Mayaguana'
}, {
    code: 'BS-MI',
    country: 'Bahamas',
    name: 'Moores Island'
}, {
    code: 'BS-NO',
    country: 'Bahamas',
    name: 'North Abaco'
}, {
    code: 'BS-NS',
    country: 'Bahamas',
    name: 'North Andros'
}, {
    code: 'BS-NE',
    country: 'Bahamas',
    name: 'North Eleuthera'
}, {
    code: 'BS-RI',
    country: 'Bahamas',
    name: 'Ragged Island'
}, {
    code: 'BS-RC',
    country: 'Bahamas',
    name: 'Rum Cay'
}, {
    code: 'BS-SS',
    country: 'Bahamas',
    name: 'San Salvador'
}, {
    code: 'BS-SO',
    country: 'Bahamas',
    name: 'South Abaco'
}, {
    code: 'BS-SA',
    country: 'Bahamas',
    name: 'South Andros'
}, {
    code: 'BS-SE',
    country: 'Bahamas',
    name: 'South Eleuthera'
}, {
    code: 'BS-SW',
    country: 'Bahamas',
    name: 'Spanish Wells'
}, {
    code: 'BS-WG',
    country: 'Bahamas',
    name: 'West Grand Bahama'
}, {
    code: 'BD-05',
    country: 'Bangladesh',
    name: 'Bagerhat'
}, {
    code: 'BD-01',
    country: 'Bangladesh',
    name: 'Bandarban'
}, {
    code: 'BD-02',
    country: 'Bangladesh',
    name: 'Barguna'
}, {
    code: 'BD-06',
    country: 'Bangladesh',
    name: 'Barisal'
}, {
    code: 'BD-A',
    country: 'Bangladesh',
    name: 'Barisal'
}, {
    code: 'BD-07',
    country: 'Bangladesh',
    name: 'Bhola'
}, {
    code: 'BD-03',
    country: 'Bangladesh',
    name: 'Bogra'
}, {
    code: 'BD-04',
    country: 'Bangladesh',
    name: 'Brahmanbaria'
}, {
    code: 'BD-09',
    country: 'Bangladesh',
    name: 'Chandpur'
}, {
    code: 'BD-10',
    country: 'Bangladesh',
    name: 'Chittagong'
}, {
    code: 'BD-B',
    country: 'Bangladesh',
    name: 'Chittagong'
}, {
    code: 'BD-12',
    country: 'Bangladesh',
    name: 'Chuadanga'
}, {
    code: 'BD-08',
    country: 'Bangladesh',
    name: 'Comilla'
}, {
    code: 'BD-11',
    country: 'Bangladesh',
    name: 'Cox\'s Bazar'
}, {
    code: 'BD-13',
    country: 'Bangladesh',
    name: 'Dhaka'
}, {
    code: 'BD-C',
    country: 'Bangladesh',
    name: 'Dhaka'
}, {
    code: 'BD-14',
    country: 'Bangladesh',
    name: 'Dinajpur'
}, {
    code: 'BD-15',
    country: 'Bangladesh',
    name: 'Faridpur'
}, {
    code: 'BD-16',
    country: 'Bangladesh',
    name: 'Feni'
}, {
    code: 'BD-19',
    country: 'Bangladesh',
    name: 'Gaibandha'
}, {
    code: 'BD-18',
    country: 'Bangladesh',
    name: 'Gazipur'
}, {
    code: 'BD-17',
    country: 'Bangladesh',
    name: 'Gopalganj'
}, {
    code: 'BD-20',
    country: 'Bangladesh',
    name: 'Habiganj'
}, {
    code: 'BD-21',
    country: 'Bangladesh',
    name: 'Jamalpur'
}, {
    code: 'BD-22',
    country: 'Bangladesh',
    name: 'Jessore'
}, {
    code: 'BD-25',
    country: 'Bangladesh',
    name: 'Jhalakati'
}, {
    code: 'BD-23',
    country: 'Bangladesh',
    name: 'Jhenaidah'
}, {
    code: 'BD-24',
    country: 'Bangladesh',
    name: 'Joypurhat'
}, {
    code: 'BD-29',
    country: 'Bangladesh',
    name: 'Khagrachari'
}, {
    code: 'BD-27',
    country: 'Bangladesh',
    name: 'Khulna'
}, {
    code: 'BD-D',
    country: 'Bangladesh',
    name: 'Khulna'
}, {
    code: 'BD-26',
    country: 'Bangladesh',
    name: 'Kishoreganj'
}, {
    code: 'BD-28',
    country: 'Bangladesh',
    name: 'Kurigram'
}, {
    code: 'BD-30',
    country: 'Bangladesh',
    name: 'Kushtia'
}, {
    code: 'BD-31',
    country: 'Bangladesh',
    name: 'Lakshmipur'
}, {
    code: 'BD-32',
    country: 'Bangladesh',
    name: 'Lalmonirhat'
}, {
    code: 'BD-36',
    country: 'Bangladesh',
    name: 'Madaripur'
}, {
    code: 'BD-37',
    country: 'Bangladesh',
    name: 'Magura'
}, {
    code: 'BD-33',
    country: 'Bangladesh',
    name: 'Manikganj'
}, {
    code: 'BD-39',
    country: 'Bangladesh',
    name: 'Meherpur'
}, {
    code: 'BD-38',
    country: 'Bangladesh',
    name: 'Moulvibazar'
}, {
    code: 'BD-35',
    country: 'Bangladesh',
    name: 'Munshiganj'
}, {
    code: 'BD-34',
    country: 'Bangladesh',
    name: 'Mymensingh'
}, {
    code: 'BD-48',
    country: 'Bangladesh',
    name: 'Naogaon'
}, {
    code: 'BD-43',
    country: 'Bangladesh',
    name: 'Narail'
}, {
    code: 'BD-40',
    country: 'Bangladesh',
    name: 'Narayanganj'
}, {
    code: 'BD-42',
    country: 'Bangladesh',
    name: 'Narsingdi'
}, {
    code: 'BD-44',
    country: 'Bangladesh',
    name: 'Natore'
}, {
    code: 'BD-45',
    country: 'Bangladesh',
    name: 'Nawabganj'
}, {
    code: 'BD-41',
    country: 'Bangladesh',
    name: 'Netrakona'
}, {
    code: 'BD-46',
    country: 'Bangladesh',
    name: 'Nilphamari'
}, {
    code: 'BD-47',
    country: 'Bangladesh',
    name: 'Noakhali'
}, {
    code: 'BD-49',
    country: 'Bangladesh',
    name: 'Pabna'
}, {
    code: 'BD-52',
    country: 'Bangladesh',
    name: 'Panchagarh'
}, {
    code: 'BD-51',
    country: 'Bangladesh',
    name: 'Patuakhali'
}, {
    code: 'BD-50',
    country: 'Bangladesh',
    name: 'Pirojpur'
}, {
    code: 'BD-53',
    country: 'Bangladesh',
    name: 'Rajbari'
}, {
    code: 'BD-54',
    country: 'Bangladesh',
    name: 'Rajshahi'
}, {
    code: 'BD-E',
    country: 'Bangladesh',
    name: 'Rajshahi'
}, {
    code: 'BD-56',
    country: 'Bangladesh',
    name: 'Rangamati'
}, {
    code: 'BD-55',
    country: 'Bangladesh',
    name: 'Rangpur'
}, {
    code: 'BD-F',
    country: 'Bangladesh',
    name: 'Rangpur'
}, {
    code: 'BD-58',
    country: 'Bangladesh',
    name: 'Satkhira'
}, {
    code: 'BD-62',
    country: 'Bangladesh',
    name: 'Shariatpur'
}, {
    code: 'BD-57',
    country: 'Bangladesh',
    name: 'Sherpur'
}, {
    code: 'BD-59',
    country: 'Bangladesh',
    name: 'Sirajganj'
}, {
    code: 'BD-61',
    country: 'Bangladesh',
    name: 'Sunamganj'
}, {
    code: 'BD-60',
    country: 'Bangladesh',
    name: 'Sylhet'
}, {
    code: 'BD-G',
    country: 'Bangladesh',
    name: 'Sylhet'
}, {
    code: 'BD-63',
    country: 'Bangladesh',
    name: 'Tangail'
}, {
    code: 'BD-64',
    country: 'Bangladesh',
    name: 'Thakurgaon'
}, {
    code: 'BB-01',
    country: 'Barbados',
    name: 'Christ Church'
}, {
    code: 'BB-02',
    country: 'Barbados',
    name: 'Saint Andrew'
}, {
    code: 'BB-03',
    country: 'Barbados',
    name: 'Saint George'
}, {
    code: 'BB-04',
    country: 'Barbados',
    name: 'Saint James'
}, {
    code: 'BB-05',
    country: 'Barbados',
    name: 'Saint John'
}, {
    code: 'BB-06',
    country: 'Barbados',
    name: 'Saint Joseph'
}, {
    code: 'BB-07',
    country: 'Barbados',
    name: 'Saint Lucy'
}, {
    code: 'BB-08',
    country: 'Barbados',
    name: 'Saint Michael'
}, {
    code: 'BB-09',
    country: 'Barbados',
    name: 'Saint Peter'
}, {
    code: 'BB-10',
    country: 'Barbados',
    name: 'Saint Philip'
}, {
    code: 'BB-11',
    country: 'Barbados',
    name: 'Saint Thomas'
}, {
    code: 'BE-VAN',
    country: 'Belgium',
    name: 'Antwerpen'
}, {
    code: 'BE-WBR',
    country: 'Belgium',
    name: 'Brabant wallon'
}, {
    code: 'BE-BRU',
    country: 'Belgium',
    name: 'Brussels-Capital Region'
}, {
    code: 'BE-VLG',
    country: 'Belgium',
    name: 'Flemish Region'
}, {
    code: 'BE-WHT',
    country: 'Belgium',
    name: 'Hainaut'
}, {
    code: 'BE-WLG',
    country: 'Belgium',
    name: 'Liège'
}, {
    code: 'BE-VLI',
    country: 'Belgium',
    name: 'Limburg'
}, {
    code: 'BE-WLX',
    country: 'Belgium',
    name: 'Luxembourg'
}, {
    code: 'BE-WNA',
    country: 'Belgium',
    name: 'Namur'
}, {
    code: 'BE-VOV',
    country: 'Belgium',
    name: 'Oost-Vlaanderen'
}, {
    code: 'BE-VBR',
    country: 'Belgium',
    name: 'Vlaams-Brabant'
}, {
    code: 'BE-WAL',
    country: 'Belgium',
    name: 'Walloon Region'
}, {
    code: 'BE-VWV',
    country: 'Belgium',
    name: 'West-Vlaanderen'
}, {
    code: 'BM-DE',
    country: 'Bermuda',
    name: 'Devonshire'
}, {
    code: 'BM-HP',
    country: 'Bermuda',
    name: 'Hamilton Parish'
}, {
    code: 'BM-PA',
    country: 'Bermuda',
    name: 'Pagat'
}, {
    code: 'BM-PE',
    country: 'Bermuda',
    name: 'Pembroke'
}, {
    code: 'BM-SA',
    country: 'Bermuda',
    name: 'Sandys'
}, {
    code: 'BM-SM',
    country: 'Bermuda',
    name: 'Smith\'s'
}, {
    code: 'BM-SO',
    country: 'Bermuda',
    name: 'Southhampton'
}, {
    code: 'BM-SG',
    country: 'Bermuda',
    name: 'St. George\'s'
}, {
    code: 'BM-WA',
    country: 'Bermuda',
    name: 'Warwick'
},{
    code: 'BW-CE',
    country: 'Botswana',
    name: 'Central'
}, {
    code: 'BW-CH',
    country: 'Botswana',
    name: 'Chobe'
}, {
    code: 'BW-FR',
    country: 'Botswana',
    name: 'Francistown'
}, {
    code: 'BW-GA',
    country: 'Botswana',
    name: 'Gaborone'
}, {
    code: 'BW-GH',
    country: 'Botswana',
    name: 'Ghanzi'
}, {
    code: 'BW-JW',
    country: 'Botswana',
    name: 'Jwaneng'
}, {
    code: 'BW-KG',
    country: 'Botswana',
    name: 'Kgalagadi'
}, {
    code: 'BW-KL',
    country: 'Botswana',
    name: 'Kgatleng'
}, {
    code: 'BW-KW',
    country: 'Botswana',
    name: 'Kweneng'
}, {
    code: 'BW-LO',
    country: 'Botswana',
    name: 'Lobatse'
}, {
    code: 'BW-NE',
    country: 'Botswana',
    name: 'North-East'
}, {
    code: 'BW-NW',
    country: 'Botswana',
    name: 'North-West'
}, {
    code: 'BW-SP',
    country: 'Botswana',
    name: 'Selibe Phikwe'
}, {
    code: 'BW-SE',
    country: 'Botswana',
    name: 'South-East'
}, {
    code: 'BW-SO',
    country: 'Botswana',
    name: 'Southern'
}, {
    code: 'BW-ST',
    country: 'Botswana',
    name: 'Sowa Town'
}, {
    code: 'BR-AC',
    country: 'Brazil',
    name: 'Acre'
}, {
    code: 'BR-AL',
    country: 'Brazil',
    name: 'Alagoas'
}, {
    code: 'BR-AP',
    country: 'Brazil',
    name: 'Amapá'
}, {
    code: 'BR-AM',
    country: 'Brazil',
    name: 'Amazonas'
}, {
    code: 'BR-BA',
    country: 'Brazil',
    name: 'Bahia'
}, {
    code: 'BR-CE',
    country: 'Brazil',
    name: 'Ceará'
}, {
    code: 'BR-DF',
    country: 'Brazil',
    name: 'Distrito Federal'
}, {
    code: 'BR-ES',
    country: 'Brazil',
    name: 'Espírito Santo'
}, {
    code: 'BR-GO',
    country: 'Brazil',
    name: 'Goiás'
}, {
    code: 'BR-MA',
    country: 'Brazil',
    name: 'Maranhão'
}, {
    code: 'BR-MT',
    country: 'Brazil',
    name: 'Mato Grosso'
}, {
    code: 'BR-MS',
    country: 'Brazil',
    name: 'Mato Grosso do Sul'
}, {
    code: 'BR-MG',
    country: 'Brazil',
    name: 'Minas Gerais'
}, {
    code: 'BR-PA',
    country: 'Brazil',
    name: 'Pará'
}, {
    code: 'BR-PB',
    country: 'Brazil',
    name: 'Paraíba'
}, {
    code: 'BR-PR',
    country: 'Brazil',
    name: 'Paraná'
}, {
    code: 'BR-PE',
    country: 'Brazil',
    name: 'Pernambuco'
}, {
    code: 'BR-PI',
    country: 'Brazil',
    name: 'Piauí'
}, {
    code: 'BR-RJ',
    country: 'Brazil',
    name: 'Rio de Janeiro'
}, {
    code: 'BR-RN',
    country: 'Brazil',
    name: 'Rio Grande do Norte'
}, {
    code: 'BR-RS',
    country: 'Brazil',
    name: 'Rio Grande do Sul'
}, {
    code: 'BR-RO',
    country: 'Brazil',
    name: 'Rondônia'
}, {
    code: 'BR-RR',
    country: 'Brazil',
    name: 'Roraima'
}, {
    code: 'BR-SC',
    country: 'Brazil',
    name: 'Santa Catarina'
}, {
    code: 'BR-SP',
    country: 'Brazil',
    name: 'São Paulo'
}, {
    code: 'BR-SE',
    country: 'Brazil',
    name: 'Sergipe'
}, {
    code: 'BR-TO',
    country: 'Brazil',
    name: 'Tocantins'
}, {
    code: 'CA-AB',
    country: 'Canada',
    name: 'Alberta'
}, {
    code: 'CA-BC',
    country: 'Canada',
    name: 'British Columbia'
}, {
    code: 'CA-MB',
    country: 'Canada',
    name: 'Manitoba'
}, {
    code: 'CA-NB',
    country: 'Canada',
    name: 'New Brunswick'
}, {
    code: 'CA-NL',
    country: 'Canada',
    name: 'Newfoundland and Labrador'
}, {
    code: 'CA-NT',
    country: 'Canada',
    name: 'Northwest Territories'
}, {
    code: 'CA-NS',
    country: 'Canada',
    name: 'Nova Scotia'
}, {
    code: 'CA-NU',
    country: 'Canada',
    name: 'Nunavut'
}, {
    code: 'CA-ON',
    country: 'Canada',
    name: 'Ontario'
}, {
    code: 'CA-PE',
    country: 'Canada',
    name: 'Prince Edward Island'
}, {
    code: 'CA-QC',
    country: 'Canada',
    name: 'Quebec'
}, {
    code: 'CA-SK',
    country: 'Canada',
    name: 'Saskatchewan'
}, {
    code: 'CA-YT',
    country: 'Canada',
    name: 'Yukon'
}, {
    code: 'TD-BA',
    country: 'Chad',
    name: 'Al Baṭḩah'
}, {
    code: 'TD-LC',
    country: 'Chad',
    name: 'Al Buḩayrah'
}, {
    code: 'TD-BG',
    country: 'Chad',
    name: 'Baḩr al Ghazāl'
}, {
    code: 'TD-BO',
    country: 'Chad',
    name: 'Būrkū'
}, {
    code: 'TD-HL',
    country: 'Chad',
    name: 'Ḥajjar Lamīs'
}, {
    code: 'TD-EN',
    country: 'Chad',
    name: 'Innīdī'
}, {
    code: 'TD-KA',
    country: 'Chad',
    name: 'Kānim'
}, {
    code: 'TD-LR',
    country: 'Chad',
    name: 'Lūqūn ash Sharqī'
}, {
    code: 'TD-LO',
    country: 'Chad',
    name: 'Lūqūn al Gharbī'
}, {
    code: 'TD-ND',
    country: 'Chad',
    name: 'Madīnat Injamīnā'
}, {
    code: 'TD-MA',
    country: 'Chad',
    name: 'Māndūl'
}, {
    code: 'TD-MO',
    country: 'Chad',
    name: 'Māyū Kībbī al Gharbī'
}, {
    code: 'TD-ME',
    country: 'Chad',
    name: 'Māyū Kībbī ash Sharqī'
}, {
    code: 'TD-GR',
    country: 'Chad',
    name: 'Qīrā'
}, {
    code: 'TD-SA',
    country: 'Chad',
    name: 'Salāmāt'
}, {
    code: 'TD-MC',
    country: 'Chad',
    name: 'Shārī al Awsaṭ'
}, {
    code: 'TD-CB',
    country: 'Chad',
    name: 'Shārī Bāqirmī'
}, {
    code: 'TD-SI',
    country: 'Chad',
    name: 'Sīlā'
}, {
    code: 'TD-TA',
    country: 'Chad',
    name: 'Tānjilī'
}, {
    code: 'TD-TI',
    country: 'Chad',
    name: 'Tibastī'
}, {
    code: 'TD-OD',
    country: 'Chad',
    name: 'Waddāy'
}, {
    code: 'TD-WF',
    country: 'Chad',
    name: 'Wādī Fīrā'
}, {
    code: 'CL-AI',
    country: 'Chile',
    name: 'Aisén del General Carlos Ibañez del Campo'
}, {
    code: 'CL-AN',
    country: 'Chile',
    name: 'Antofagasta'
}, {
    code: 'CL-AR',
    country: 'Chile',
    name: 'Araucania'
}, {
    code: 'CL-AP',
    country: 'Chile',
    name: 'Arica y Parinacota'
}, {
    code: 'CL-AT',
    country: 'Chile',
    name: 'Atacama'
}, {
    code: 'CL-BI',
    country: 'Chile',
    name: 'Bío-Bío'
}, {
    code: 'CL-CO',
    country: 'Chile',
    name: 'Coquimbo'
}, {
    code: 'CL-LI',
    country: 'Chile',
    name: 'Libertador General Bernardo O\'Higgins'
}, {
    code: 'CL-LL',
    country: 'Chile',
    name: 'Los Lagos'
}, {
    code: 'CL-LR',
    country: 'Chile',
    name: 'Los Ríos'
}, {
    code: 'CL-MA',
    country: 'Chile',
    name: 'Magallanes'
}, {
    code: 'CL-ML',
    country: 'Chile',
    name: 'Maule'
}, {
    code: 'CL-RM',
    country: 'Chile',
    name: 'Región Metropolitana de Santiago'
}, {
    code: 'CL-TA',
    country: 'Chile',
    name: 'Tarapacá'
}, {
    code: 'CL-VS',
    country: 'Chile',
    name: 'Valparaíso'
}, {
    code: 'TW-CYI',
    country: 'Chinese Taipei',
    name: 'Chiayi'
}, {
    code: 'TW-CYQ',
    country: 'Chinese Taipei',
    name: 'Chiayi'
}, {
    code: 'TW-HUA',
    country: 'Chinese Taipei',
    name: 'Hualien'
}, {
    code: 'TW-KHH',
    country: 'Chinese Taipei',
    name: 'Kaohsiung'
}, {
    code: 'TW-KEE',
    country: 'Chinese Taipei',
    name: 'Keelung'
}, {
    code: 'TW-PEN',
    country: 'Chinese Taipei',
    name: 'Penghu'
}, {
    code: 'TW-TXG',
    country: 'Chinese Taipei',
    name: 'Taichung'
}, {
    code: 'TW-TNN',
    country: 'Chinese Taipei',
    name: 'Tainan'
}, {
    code: 'TW-TPE',
    country: 'Chinese Taipei',
    name: 'Taipei'
}, {
    code: 'TW-TTT',
    country: 'Chinese Taipei',
    name: 'Taitung'
}, {
    code: 'TW-YUN',
    country: 'Chinese Taipei',
    name: 'Yunlin'
}, {
    code: 'CO-AMA',
    country: 'Colombia',
    name: 'Amazonas'
}, {
    code: 'CO-ANT',
    country: 'Colombia',
    name: 'Antioquia'
}, {
    code: 'CO-ARA',
    country: 'Colombia',
    name: 'Arauca'
}, {
    code: 'CO-ATL',
    country: 'Colombia',
    name: 'Atlántico'
}, {
    code: 'CO-BOL',
    country: 'Colombia',
    name: 'Bolívar'
}, {
    code: 'CO-BOY',
    country: 'Colombia',
    name: 'Boyacá'
}, {
    code: 'CO-CAL',
    country: 'Colombia',
    name: 'Caldas'
}, {
    code: 'CO-CAQ',
    country: 'Colombia',
    name: 'Caquetá'
}, {
    code: 'CO-CAS',
    country: 'Colombia',
    name: 'Casanare'
}, {
    code: 'CO-CAU',
    country: 'Colombia',
    name: 'Cauca'
}, {
    code: 'CO-CES',
    country: 'Colombia',
    name: 'Cesar'
}, {
    code: 'CO-CHO',
    country: 'Colombia',
    name: 'Chocó'
}, {
    code: 'CO-COR',
    country: 'Colombia',
    name: 'Córdoba'
}, {
    code: 'CO-CUN',
    country: 'Colombia',
    name: 'Cundinamarca'
}, {
    code: 'CO-DC',
    country: 'Colombia',
    name: 'Distrito Capital de Bogotá'
}, {
    code: 'CO-GUA',
    country: 'Colombia',
    name: 'Guainía'
}, {
    code: 'CO-GUV',
    country: 'Colombia',
    name: 'Guaviare'
}, {
    code: 'CO-HUI',
    country: 'Colombia',
    name: 'Huila'
}, {
    code: 'CO-LAG',
    country: 'Colombia',
    name: 'La Guajira'
}, {
    code: 'CO-MAG',
    country: 'Colombia',
    name: 'Magdalena'
}, {
    code: 'CO-MET',
    country: 'Colombia',
    name: 'Meta'
}, {
    code: 'CO-NAR',
    country: 'Colombia',
    name: 'Nariño'
}, {
    code: 'CO-NSA',
    country: 'Colombia',
    name: 'Norte de Santander'
}, {
    code: 'CO-PUT',
    country: 'Colombia',
    name: 'Putumayo'
}, {
    code: 'CO-QUI',
    country: 'Colombia',
    name: 'Quindío'
}, {
    code: 'CO-RIS',
    country: 'Colombia',
    name: 'Risaralda'
}, {
    code: 'CO-SAP',
    country: 'Colombia',
    name: 'San Andrés, Providencia y Santa Catalina'
}, {
    code: 'CO-SAN',
    country: 'Colombia',
    name: 'Santander'
}, {
    code: 'CO-SUC',
    country: 'Colombia',
    name: 'Sucre'
}, {
    code: 'CO-TOL',
    country: 'Colombia',
    name: 'Tolima'
}, {
    code: 'CO-VAC',
    country: 'Colombia',
    name: 'Valle del Cauca'
}, {
    code: 'CO-VAU',
    country: 'Colombia',
    name: 'Vaupés'
}, {
    code: 'CO-VID',
    country: 'Colombia',
    name: 'Vichada'
}, {
    code: 'CR-A',
    country: 'Costa Rica',
    name: 'Alajuela'
}, {
    code: 'CR-C',
    country: 'Costa Rica',
    name: 'Cartago'
}, {
    code: 'CR-G',
    country: 'Costa Rica',
    name: 'Guanacaste'
}, {
    code: 'CR-H',
    country: 'Costa Rica',
    name: 'Heredia'
}, {
    code: 'CR-L',
    country: 'Costa Rica',
    name: 'Limón'
}, {
    code: 'CR-P',
    country: 'Costa Rica',
    name: 'Puntarenas'
}, {
    code: 'CR-SJ',
    country: 'Costa Rica',
    name: 'San José'
}, {
    code: 'CY-04',
    country: 'Cyprus',
    name: 'Famagusta'
}, {
    code: 'CY-06',
    country: 'Cyprus',
    name: 'Kyrenia'
}, {
    code: 'CY-03',
    country: 'Cyprus',
    name: 'Larnaca'
}, {
    code: 'CY-02',
    country: 'Cyprus',
    name: 'Limassol'
}, {
    code: 'CY-01',
    country: 'Cyprus',
    name: 'Nicosia'
}, {
    code: 'CY-05',
    country: 'Cyprus',
    name: 'Páfos'
}, {
    code: 'CD-BN',
    country: 'Democratic Republic of the Congo',
    name: 'Bandundu'
}, {
    code: 'CD-BC',
    country: 'Democratic Republic of the Congo',
    name: 'Bas-Congo'
}, {
    code: 'CD-KE',
    country: 'Democratic Republic of the Congo',
    name: 'East Kasai'
}, {
    code: 'CD-EQ',
    country: 'Democratic Republic of the Congo',
    name: 'Equator'
}, {
    code: 'CD-KA',
    country: 'Democratic Republic of the Congo',
    name: 'Katanga'
}, {
    code: 'CD-KN',
    country: 'Democratic Republic of the Congo',
    name: 'Kinshasa'
}, {
    code: 'CD-MA',
    country: 'Democratic Republic of the Congo',
    name: 'Maniema'
}, {
    code: 'CD-NK',
    country: 'Democratic Republic of the Congo',
    name: 'North Kivu'
}, {
    code: 'CD-OR',
    country: 'Democratic Republic of the Congo',
    name: 'Orientale'
}, {
    code: 'CD-SK',
    country: 'Democratic Republic of the Congo',
    name: 'South Kivu'
}, {
    code: 'CD-KW',
    country: 'Democratic Republic of the Congo',
    name: 'West Kasai'
}, {
    code: 'DK-84',
    country: 'Denmark',
    name: 'Capital Region of Denmark'
}, {
    code: 'DK-82',
    country: 'Denmark',
    name: 'Central Denmark Region'
}, {
    code: 'DK-81',
    country: 'Denmark',
    name: 'North Denmark Region'
}, {
    code: 'DK-83',
    country: 'Denmark',
    name: 'Region of Southern Denmark'
}, {
    code: 'DK-85',
    country: 'Denmark',
    name: 'Region Zealand'
}, {
    code: 'DO-02',
    country: 'Dominican Republic',
    name: 'Azua'
}, {
    code: 'DO-03',
    country: 'Dominican Republic',
    name: 'Baoruco'
}, {
    code: 'DO-04',
    country: 'Dominican Republic',
    name: 'Barahona'
}, {
    code: 'DO-33',
    country: 'Dominican Republic',
    name: 'Cibao Nordeste'
}, {
    code: 'DO-34',
    country: 'Dominican Republic',
    name: 'Cibao Noroeste'
}, {
    code: 'DO-35',
    country: 'Dominican Republic',
    name: 'Cibao Norte'
}, {
    code: 'DO-36',
    country: 'Dominican Republic',
    name: 'Cibao Sur'
}, {
    code: 'DO-05',
    country: 'Dominican Republic',
    name: 'Dajabón'
}, {
    code: 'DO-01',
    country: 'Dominican Republic',
    name: 'Distrito Nacional'
}, {
    code: 'DO-06',
    country: 'Dominican Republic',
    name: 'Duarte'
}, {
    code: 'DO-08',
    country: 'Dominican Republic',
    name: 'El Seibo'
}, {
    code: 'DO-37',
    country: 'Dominican Republic',
    name: 'El Valle'
}, {
    code: 'DO-38',
    country: 'Dominican Republic',
    name: 'Enriquillo'
}, {
    code: 'DO-09',
    country: 'Dominican Republic',
    name: 'Espaillat'
}, {
    code: 'DO-30',
    country: 'Dominican Republic',
    name: 'Hato Mayor'
}, {
    code: 'DO-19',
    country: 'Dominican Republic',
    name: 'Hermanas Mirabal'
}, {
    code: 'DO-39',
    country: 'Dominican Republic',
    name: 'Higuamo'
}, {
    code: 'DO-10',
    country: 'Dominican Republic',
    name: 'Independencia'
}, {
    code: 'DO-11',
    country: 'Dominican Republic',
    name: 'La Altagracia'
}, {
    code: 'DO-07',
    country: 'Dominican Republic',
    name: 'La Estrelleta'
}, {
    code: 'DO-12',
    country: 'Dominican Republic',
    name: 'La Romana'
}, {
    code: 'DO-13',
    country: 'Dominican Republic',
    name: 'La Vega'
}, {
    code: 'DO-14',
    country: 'Dominican Republic',
    name: 'María Trinidad Sánchez'
}, {
    code: 'DO-28',
    country: 'Dominican Republic',
    name: 'Monseñor Nouel'
}, {
    code: 'DO-15',
    country: 'Dominican Republic',
    name: 'Monte Cristi'
}, {
    code: 'DO-29',
    country: 'Dominican Republic',
    name: 'Monte Plata'
}, {
    code: 'DO-40',
    country: 'Dominican Republic',
    name: 'Ozama'
}, {
    code: 'DO-16',
    country: 'Dominican Republic',
    name: 'Pedernales'
}, {
    code: 'DO-17',
    country: 'Dominican Republic',
    name: 'Peravia'
}, {
    code: 'DO-18',
    country: 'Dominican Republic',
    name: 'Puerto Plata'
}, {
    code: 'DO-20',
    country: 'Dominican Republic',
    name: 'Samaná'
}, {
    code: 'DO-21',
    country: 'Dominican Republic',
    name: 'San Cristóbal'
}, {
    code: 'DO-31',
    country: 'Dominican Republic',
    name: 'San José de Ocoa'
}, {
    code: 'DO-22',
    country: 'Dominican Republic',
    name: 'San Juan'
}, {
    code: 'DO-23',
    country: 'Dominican Republic',
    name: 'San Pedro de Macorís'
}, {
    code: 'DO-24',
    country: 'Dominican Republic',
    name: 'Sánchez Ramírez'
}, {
    code: 'DO-25',
    country: 'Dominican Republic',
    name: 'Santiago'
}, {
    code: 'DO-26',
    country: 'Dominican Republic',
    name: 'Santiago Rodríguez'
}, {
    code: 'DO-32',
    country: 'Dominican Republic',
    name: 'Santo Domingo'
}, {
    code: 'DO-41',
    country: 'Dominican Republic',
    name: 'Valdesia'
}, {
    code: 'DO-27',
    country: 'Dominican Republic',
    name: 'Valverde'
}, {
    code: 'DO-42',
    country: 'Dominican Republic',
    name: 'Yuma'
}, {
    code: 'EC-A',
    country: 'Ecuador',
    name: 'Azuay'
}, {
    code: 'EC-B',
    country: 'Ecuador',
    name: 'Bolívar'
}, {
    code: 'EC-F',
    country: 'Ecuador',
    name: 'Cañar'
}, {
    code: 'EC-C',
    country: 'Ecuador',
    name: 'Carchi'
}, {
    code: 'EC-H',
    country: 'Ecuador',
    name: 'Chimborazo'
}, {
    code: 'EC-X',
    country: 'Ecuador',
    name: 'Cotopaxi'
}, {
    code: 'EC-O',
    country: 'Ecuador',
    name: 'El Oro'
}, {
    code: 'EC-E',
    country: 'Ecuador',
    name: 'Esmeraldas'
}, {
    code: 'EC-W',
    country: 'Ecuador',
    name: 'Galápagos'
}, {
    code: 'EC-G',
    country: 'Ecuador',
    name: 'Guayas'
}, {
    code: 'EC-I',
    country: 'Ecuador',
    name: 'Imbabura'
}, {
    code: 'EC-L',
    country: 'Ecuador',
    name: 'Loja'
}, {
    code: 'EC-R',
    country: 'Ecuador',
    name: 'Los Ríos'
}, {
    code: 'EC-M',
    country: 'Ecuador',
    name: 'Manabí'
}, {
    code: 'EC-S',
    country: 'Ecuador',
    name: 'Morona-Santiago'
}, {
    code: 'EC-N',
    country: 'Ecuador',
    name: 'Napo'
}, {
    code: 'EC-D',
    country: 'Ecuador',
    name: 'Orellana'
}, {
    code: 'EC-Y',
    country: 'Ecuador',
    name: 'Pastaza'
}, {
    code: 'EC-P',
    country: 'Ecuador',
    name: 'Pichincha'
}, {
    code: 'EC-SE',
    country: 'Ecuador',
    name: 'Santa Elena'
}, {
    code: 'EC-SD',
    country: 'Ecuador',
    name: 'Santo Domingo de los Tsáchilas'
}, {
    code: 'EC-U',
    country: 'Ecuador',
    name: 'Sucumbíos'
}, {
    code: 'EC-T',
    country: 'Ecuador',
    name: 'Tungurahua'
}, {
    code: 'EC-Z',
    country: 'Ecuador',
    name: 'Zamora-Chinchipe'
}, {
    code: 'SV-AH',
    country: 'El Salvador',
    name: 'Ahuachapán'
}, {
    code: 'SV-CA',
    country: 'El Salvador',
    name: 'Cabañas'
}, {
    code: 'SV-CH',
    country: 'El Salvador',
    name: 'Chalatenango'
}, {
    code: 'SV-CU',
    country: 'El Salvador',
    name: 'Cuscatlán'
}, {
    code: 'SV-LI',
    country: 'El Salvador',
    name: 'La Libertad'
}, {
    code: 'SV-PA',
    country: 'El Salvador',
    name: 'La Paz'
}, {
    code: 'SV-UN',
    country: 'El Salvador',
    name: 'La Unión'
}, {
    code: 'SV-MO',
    country: 'El Salvador',
    name: 'Morazán'
}, {
    code: 'SV-SM',
    country: 'El Salvador',
    name: 'San Miguel'
}, {
    code: 'SV-SS',
    country: 'El Salvador',
    name: 'San Salvador'
}, {
    code: 'SV-SV',
    country: 'El Salvador',
    name: 'San Vicente'
}, {
    code: 'SV-SA',
    country: 'El Salvador',
    name: 'Santa Ana'
}, {
    code: 'SV-SO',
    country: 'El Salvador',
    name: 'Sonsonate'
}, {
    code: 'SV-US',
    country: 'El Salvador',
    name: 'Usulután'
}, {
    code: 'GB-BDF',
    country: 'England',
    name: 'Bedfordshire'
}, {
    code: 'GB-BKM',
    country: 'England',
    name: 'Berks, Bucks & Oxon'
}, {
    code: 'GB-CAM',
    country: 'England',
    name: 'Cambridgeshire'
}, {
    code: 'GB-CHE',
    country: 'England',
    name: 'Cheshire'
}, {
    code: 'GB-CON',
    country: 'England',
    name: 'Cornwall'
}, {
    code: 'GB-CMA',
    country: 'England',
    name: 'Cumbria'
}, {
    code: 'GB-DBY',
    country: 'England',
    name: 'Derbyshire'
}, {
    code: 'GB-DEV',
    country: 'England',
    name: 'Devon'
}, {
    code: 'GB-DOR',
    country: 'England',
    name: 'Dorset'
}, {
    code: 'GB-DUR',
    country: 'England',
    name: 'Durham'
}, {
    code: 'GB-ESX',
    country: 'England',
    name: 'East & West Sussex'
}, {
    code: 'GB-ESS',
    country: 'England',
    name: 'Essex'
}, {
    code: 'GB-GLS',
    country: 'England',
    name: 'Gloucestershire'
}, {
    code: 'GB-HAM',
    country: 'England',
    name: 'Hampshire, Isle of Wight & Channel Islands'
}, {
    code: 'GB-SHR',
    country: 'England',
    name: 'Herefordshire & Shropshire'
}, {
    code: 'GB-HRT',
    country: 'England',
    name: 'Hertfordshire'
}, {
    code: 'GB-KEN',
    country: 'England',
    name: 'Kent'
}, {
    code: 'GB-LAN',
    country: 'England',
    name: 'Lancashire & Isle of Man'
}, {
    code: 'GB-LEC',
    country: 'England',
    name: 'Leicestershire & Rutland'
}, {
    code: 'GB-LIN',
    country: 'England',
    name: 'Lincolnshire'
}, {
    code: 'GB-LND',
    country: 'England',
    name: 'Middlesex'
}, {
    code: 'GB-NFK',
    country: 'England',
    name: 'Norfolk'
}, {
    code: 'GB-NTH',
    country: 'England',
    name: 'Northamptonshire'
}, {
    code: 'GB-NBL',
    country: 'England',
    name: 'Northumberland'
}, {
    code: 'GB-NTT',
    country: 'England',
    name: 'Nottinghamshire'
}, {
    code: 'GB-SOM',
    country: 'England',
    name: 'Somerset'
}, {
    code: 'GB-STS',
    country: 'England',
    name: 'Staffordshire'
}, {
    code: 'GB-SFK',
    country: 'England',
    name: 'Suffolk'
}, {
    code: 'GB-SRY',
    country: 'England',
    name: 'Surrey'
}, {
    code: 'GB-WAR',
    country: 'England',
    name: 'Warwickshire'
}, {
    code: 'GB-WIL',
    country: 'England',
    name: 'Wiltshire'
}, {
    code: 'GB-WOR',
    country: 'England',
    name: 'Worcestershire'
}, {
    code: 'GB-NYK',
    country: 'England',
    name: 'Yorkshire'
}, {
    code: 'EE-37',
    country: 'Estonia',
    name: 'Harju'
}, {
    code: 'EE-39',
    country: 'Estonia',
    name: 'Hiiu'
}, {
    code: 'EE-44',
    country: 'Estonia',
    name: 'Ida-Viru'
}, {
    code: 'EE-51',
    country: 'Estonia',
    name: 'Järva'
}, {
    code: 'EE-49',
    country: 'Estonia',
    name: 'Jõgeva'
}, {
    code: 'EE-57',
    country: 'Estonia',
    name: 'Lääne'
}, {
    code: 'EE-59',
    country: 'Estonia',
    name: 'Lääne-Viru'
}, {
    code: 'EE-67',
    country: 'Estonia',
    name: 'Pärnu'
}, {
    code: 'EE-65',
    country: 'Estonia',
    name: 'Põlva'
}, {
    code: 'EE-70',
    country: 'Estonia',
    name: 'Rapla'
}, {
    code: 'EE-74',
    country: 'Estonia',
    name: 'Saare'
}, {
    code: 'EE-78',
    country: 'Estonia',
    name: 'Tartu'
}, {
    code: 'EE-82',
    country: 'Estonia',
    name: 'Valga'
}, {
    code: 'EE-84',
    country: 'Estonia',
    name: 'Viljandi'
}, {
    code: 'FI-22',
    country: 'Finland',
    name: 'Itä-Suomi'
}, {
    code: 'FI-06',
    country: 'Finland',
    name: 'Kanta-Häme'
}, {
    code: 'FI-21',
    country: 'Finland',
    name: 'Keski-Suomi'
}, {
    code: 'FI-20',
    country: 'Finland',
    name: 'Lounais-Suomi'
}, {
    code: 'FI-25',
    country: 'Finland',
    name: 'Muut'
}, {
    code: 'FI-23',
    country: 'Finland',
    name: 'Pohjanmaa'
}, {
    code: 'FI-24',
    country: 'Finland',
    name: 'Pohjois-Suomi'
}, {
    code: 'FI-18',
    country: 'Finland',
    name: 'Uusimaa'
}, {
    code: 'DE-BW',
    country: 'Germany',
    name: 'Baden-Württemberg'
}, {
    code: 'DE-BY',
    country: 'Germany',
    name: 'Bavaria'
}, {
    code: 'DE-BE',
    country: 'Germany',
    name: 'Berlin'
}, {
    code: 'DE-BB',
    country: 'Germany',
    name: 'Brandenburg'
}, {
    code: 'DE-HB',
    country: 'Germany',
    name: 'Bremen'
}, {
    code: 'DE-HH',
    country: 'Germany',
    name: 'Hamburg'
}, {
    code: 'DE-HE',
    country: 'Germany',
    name: 'Hesse'
}, {
    code: 'DE-NI',
    country: 'Germany',
    name: 'Lower Saxony'
}, {
    code: 'DE-MV',
    country: 'Germany',
    name: 'Mecklenburg-Western Pomerania'
}, {
    code: 'DE-NW',
    country: 'Germany',
    name: 'North Rhine-Westphalia'
}, {
    code: 'DE-RP',
    country: 'Germany',
    name: 'Rhineland-Palatinate'
}, {
    code: 'DE-SL',
    country: 'Germany',
    name: 'Saarland'
}, {
    code: 'DE-ST',
    country: 'Germany',
    name: 'Saxony-Anhalt'
}, {
    code: 'DE-SN',
    country: 'Germany',
    name: 'Saxony'
}, {
    code: 'DE-SH',
    country: 'Germany',
    name: 'Schleswig-Holstein'
}, {
    code: 'DE-TH',
    country: 'Germany',
    name: 'Thuringia'
}, {
    code: 'GR-13',
    country: 'Greece',
    name: 'Achaïa'
}, {
    code: 'GR-69',
    country: 'Greece',
    name: 'Agio Oros'
}, {
    code: 'GR-01',
    country: 'Greece',
    name: 'Aitolia kai Akarnania'
}, {
    code: 'GR-A',
    country: 'Greece',
    name: 'Anatoliki Makedonia kai Thraki'
}, {
    code: 'GR-11',
    country: 'Greece',
    name: 'Argolida'
}, {
    code: 'GR-12',
    country: 'Greece',
    name: 'Arkadia'
}, {
    code: 'GR-31',
    country: 'Greece',
    name: 'Arta'
}, {
    code: 'GR-A1',
    country: 'Greece',
    name: 'Attiki'
}, {
    code: 'GR-I',
    country: 'Greece',
    name: 'Attiki'
}, {
    code: 'GR-64',
    country: 'Greece',
    name: 'Chalkidiki'
}, {
    code: 'GR-94',
    country: 'Greece',
    name: 'Chania'
}, {
    code: 'GR-85',
    country: 'Greece',
    name: 'Chios'
}, {
    code: 'GR-81',
    country: 'Greece',
    name: 'Dodekanisos'
}, {
    code: 'GR-52',
    country: 'Greece',
    name: 'Drama'
}, {
    code: 'GR-G',
    country: 'Greece',
    name: 'Dytiki Ellada'
}, {
    code: 'GR-C',
    country: 'Greece',
    name: 'Dytiki Makedonia'
}, {
    code: 'GR-71',
    country: 'Greece',
    name: 'Evros'
}, {
    code: 'GR-05',
    country: 'Greece',
    name: 'Evrytania'
}, {
    code: 'GR-04',
    country: 'Greece',
    name: 'Evvoia'
}, {
    code: 'GR-63',
    country: 'Greece',
    name: 'Florina'
}, {
    code: 'GR-07',
    country: 'Greece',
    name: 'Fokida'
}, {
    code: 'GR-06',
    country: 'Greece',
    name: 'Fthiotida'
}, {
    code: 'GR-51',
    country: 'Greece',
    name: 'Grevena'
}, {
    code: 'GR-14',
    country: 'Greece',
    name: 'Ileia'
}, {
    code: 'GR-53',
    country: 'Greece',
    name: 'Imathia'
}, {
    code: 'GR-33',
    country: 'Greece',
    name: 'Ioannina'
}, {
    code: 'GR-F',
    country: 'Greece',
    name: 'Ionia Nisia'
}, {
    code: 'GR-D',
    country: 'Greece',
    name: 'Ipeiros'
}, {
    code: 'GR-91',
    country: 'Greece',
    name: 'Irakleio'
}, {
    code: 'GR-41',
    country: 'Greece',
    name: 'Karditsa'
}, {
    code: 'GR-56',
    country: 'Greece',
    name: 'Kastoria'
}, {
    code: 'GR-55',
    country: 'Greece',
    name: 'Kavala'
}, {
    code: 'GR-23',
    country: 'Greece',
    name: 'Kefallonia'
}, {
    code: 'GR-B',
    country: 'Greece',
    name: 'Kentriki Makedonia'
}, {
    code: 'GR-22',
    country: 'Greece',
    name: 'Kerkyra'
}, {
    code: 'GR-57',
    country: 'Greece',
    name: 'Kilkis'
}, {
    code: 'GR-15',
    country: 'Greece',
    name: 'Korinthia'
}, {
    code: 'GR-58',
    country: 'Greece',
    name: 'Kozani'
}, {
    code: 'GR-M',
    country: 'Greece',
    name: 'Kriti'
}, {
    code: 'GR-82',
    country: 'Greece',
    name: 'Kyklades'
}, {
    code: 'GR-16',
    country: 'Greece',
    name: 'Lakonia'
}, {
    code: 'GR-42',
    country: 'Greece',
    name: 'Larisa'
}, {
    code: 'GR-92',
    country: 'Greece',
    name: 'Lasithi'
}, {
    code: 'GR-24',
    country: 'Greece',
    name: 'Lefkada'
}, {
    code: 'GR-83',
    country: 'Greece',
    name: 'Lesvos'
}, {
    code: 'GR-43',
    country: 'Greece',
    name: 'Magnisia'
}, {
    code: 'GR-17',
    country: 'Greece',
    name: 'Messinia'
}, {
    code: 'GR-L',
    country: 'Greece',
    name: 'Notio Aigaio'
}, {
    code: 'GR-59',
    country: 'Greece',
    name: 'Pella'
}, {
    code: 'GR-J',
    country: 'Greece',
    name: 'Peloponnisos'
}, {
    code: 'GR-61',
    country: 'Greece',
    name: 'Pieria'
}, {
    code: 'GR-34',
    country: 'Greece',
    name: 'Preveza'
}, {
    code: 'GR-93',
    country: 'Greece',
    name: 'Rethymno'
}, {
    code: 'GR-73',
    country: 'Greece',
    name: 'Rodopi'
}, {
    code: 'GR-84',
    country: 'Greece',
    name: 'Samos'
}, {
    code: 'GR-62',
    country: 'Greece',
    name: 'Serres'
}, {
    code: 'GR-H',
    country: 'Greece',
    name: 'Sterea Ellada'
}, {
    code: 'GR-32',
    country: 'Greece',
    name: 'Thesprotia'
}, {
    code: 'GR-E',
    country: 'Greece',
    name: 'Thessalia'
}, {
    code: 'GR-54',
    country: 'Greece',
    name: 'Thessaloniki'
}, {
    code: 'GR-44',
    country: 'Greece',
    name: 'Trikala'
}, {
    code: 'GR-03',
    country: 'Greece',
    name: 'Voiotia'
}, {
    code: 'GR-K',
    country: 'Greece',
    name: 'Voreio Aigaio'
}, {
    code: 'GR-72',
    country: 'Greece',
    name: 'Xanthi'
}, {
    code: 'GR-21',
    country: 'Greece',
    name: 'Zakynthos'
}, {
    code: 'GT-AV',
    country: 'Guatemala',
    name: 'Alta Verapaz'
}, {
    code: 'GT-BV',
    country: 'Guatemala',
    name: 'Baja Verapaz'
}, {
    code: 'GT-CM',
    country: 'Guatemala',
    name: 'Chimaltenango'
}, {
    code: 'GT-CQ',
    country: 'Guatemala',
    name: 'Chiquimula'
}, {
    code: 'GT-PR',
    country: 'Guatemala',
    name: 'El Progreso'
}, {
    code: 'GT-ES',
    country: 'Guatemala',
    name: 'Escuintla'
}, {
    code: 'GT-GU',
    country: 'Guatemala',
    name: 'Guatemala'
}, {
    code: 'GT-HU',
    country: 'Guatemala',
    name: 'Huehuetenango'
}, {
    code: 'GT-IZ',
    country: 'Guatemala',
    name: 'Izabal'
}, {
    code: 'GT-JA',
    country: 'Guatemala',
    name: 'Jalapa'
}, {
    code: 'GT-JU',
    country: 'Guatemala',
    name: 'Jutiapa'
}, {
    code: 'GT-PE',
    country: 'Guatemala',
    name: 'Petén'
}, {
    code: 'GT-QZ',
    country: 'Guatemala',
    name: 'Quetzaltenango'
}, {
    code: 'GT-QC',
    country: 'Guatemala',
    name: 'Quiché'
}, {
    code: 'GT-RE',
    country: 'Guatemala',
    name: 'Retalhuleu'
}, {
    code: 'GT-SA',
    country: 'Guatemala',
    name: 'Sacatepéquez'
}, {
    code: 'GT-SM',
    country: 'Guatemala',
    name: 'San Marcos'
}, {
    code: 'GT-SR',
    country: 'Guatemala',
    name: 'Santa Rosa'
}, {
    code: 'GT-SO',
    country: 'Guatemala',
    name: 'Sololá'
}, {
    code: 'GT-SU',
    country: 'Guatemala',
    name: 'Suchitepéquez'
}, {
    code: 'GT-TO',
    country: 'Guatemala',
    name: 'Totonicapán'
}, {
    code: 'GT-ZA',
    country: 'Guatemala',
    name: 'Zacapa'
}, {
    code: 'HU-BK',
    country: 'Hungary',
    name: 'Bács-Kiskun'
}, {
    code: 'HU-BA',
    country: 'Hungary',
    name: 'Baranya'
}, {
    code: 'HU-BE',
    country: 'Hungary',
    name: 'Békés'
}, {
    code: 'HU-BC',
    country: 'Hungary',
    name: 'Békéscsaba'
}, {
    code: 'HU-BZ',
    country: 'Hungary',
    name: 'Borsod-Abaúj-Zemplén'
}, {
    code: 'HU-BU',
    country: 'Hungary',
    name: 'Budapest'
}, {
    code: 'HU-CS',
    country: 'Hungary',
    name: 'Csongrád'
}, {
    code: 'HU-DE',
    country: 'Hungary',
    name: 'Debrecen'
}, {
    code: 'HU-DU',
    country: 'Hungary',
    name: 'Dunaújváros'
}, {
    code: 'HU-EG',
    country: 'Hungary',
    name: 'Eger'
}, {
    code: 'HU-ER',
    country: 'Hungary',
    name: 'Érd'
}, {
    code: 'HU-FE',
    country: 'Hungary',
    name: 'Fejér'
}, {
    code: 'HU-GY',
    country: 'Hungary',
    name: 'Győr'
}, {
    code: 'HU-GS',
    country: 'Hungary',
    name: 'Győr-Moson-Sopron'
}, {
    code: 'HU-HB',
    country: 'Hungary',
    name: 'Hajdú-Bihar'
}, {
    code: 'HU-HE',
    country: 'Hungary',
    name: 'Heves'
}, {
    code: 'HU-HV',
    country: 'Hungary',
    name: 'Hódmezővásárhely'
}, {
    code: 'HU-JN',
    country: 'Hungary',
    name: 'Jász-Nagykun-Szolnok'
}, {
    code: 'HU-KV',
    country: 'Hungary',
    name: 'Kaposvár'
}, {
    code: 'HU-KM',
    country: 'Hungary',
    name: 'Kecskemét'
}, {
    code: 'HU-KE',
    country: 'Hungary',
    name: 'Komárom-Esztergom'
}, {
    code: 'HU-MI',
    country: 'Hungary',
    name: 'Miskolc'
}, {
    code: 'HU-NK',
    country: 'Hungary',
    name: 'Nagykanizsa'
}, {
    code: 'HU-NO',
    country: 'Hungary',
    name: 'Nógrád'
}, {
    code: 'HU-NY',
    country: 'Hungary',
    name: 'Nyíregyháza'
}, {
    code: 'HU-PS',
    country: 'Hungary',
    name: 'Pécs'
}, {
    code: 'HU-PE',
    country: 'Hungary',
    name: 'Pest'
}, {
    code: 'HU-ST',
    country: 'Hungary',
    name: 'Salgótarján'
}, {
    code: 'HU-SO',
    country: 'Hungary',
    name: 'Somogy'
}, {
    code: 'HU-SN',
    country: 'Hungary',
    name: 'Sopron'
}, {
    code: 'HU-SZ',
    country: 'Hungary',
    name: 'Szabolcs-Szatmár-Bereg'
}, {
    code: 'HU-SD',
    country: 'Hungary',
    name: 'Szeged'
}, {
    code: 'HU-SF',
    country: 'Hungary',
    name: 'Székesfehérvár'
}, {
    code: 'HU-SS',
    country: 'Hungary',
    name: 'Szekszárd'
}, {
    code: 'HU-SK',
    country: 'Hungary',
    name: 'Szolnok'
}, {
    code: 'HU-SH',
    country: 'Hungary',
    name: 'Szombathely'
}, {
    code: 'HU-TB',
    country: 'Hungary',
    name: 'Tatabánya'
}, {
    code: 'HU-TO',
    country: 'Hungary',
    name: 'Tolna'
}, {
    code: 'HU-VA',
    country: 'Hungary',
    name: 'Vas'
}, {
    code: 'HU-VE',
    country: 'Hungary',
    name: 'Veszprém'
}, {
    code: 'HU-VM',
    country: 'Hungary',
    name: 'Veszprém'
}, {
    code: 'HU-ZA',
    country: 'Hungary',
    name: 'Zala'
}, {
    code: 'HU-ZE',
    country: 'Hungary',
    name: 'Zalaegerszeg'
}, {
    code: 'IS-7',
    country: 'Iceland',
    name: 'Austurland'
}, {
    code: 'IS-1',
    country: 'Iceland',
    name: 'Höfuðborgarsvæði utan Reykjavíkur'
}, {
    code: 'IS-5',
    country: 'Iceland',
    name: 'Norðurland vestra'
}, {
    code: 'IS-6',
    country: 'Iceland',
    name: 'Norðurland eystra'
}, {
    code: 'IS-0',
    country: 'Iceland',
    name: 'Reykjavík'
}, {
    code: 'IS-8',
    country: 'Iceland',
    name: 'Suðurland'
}, {
    code: 'IS-2',
    country: 'Iceland',
    name: 'Suðurnes'
}, {
    code: 'IS-4',
    country: 'Iceland',
    name: 'Vestfirðir'
}, {
    code: 'IS-3',
    country: 'Iceland',
    name: 'Vesturland'
}, {
    code: 'IN-AN',
    country: 'India',
    name: 'Andaman and Nicobar Islands'
}, {
    code: 'IN-AP',
    country: 'India',
    name: 'Andhra Pradesh'
}, {
    code: 'IN-AR',
    country: 'India',
    name: 'Arunachal Pradesh'
}, {
    code: 'IN-AS',
    country: 'India',
    name: 'Assam'
}, {
    code: 'IN-BR',
    country: 'India',
    name: 'Bihar'
}, {
    code: 'IN-CH',
    country: 'India',
    name: 'Chandigarh'
}, {
    code: 'IN-CT',
    country: 'India',
    name: 'Chhattisgarh'
}, {
    code: 'IN-DN',
    country: 'India',
    name: 'Dadra and Nagar Haveli'
}, {
    code: 'IN-DD',
    country: 'India',
    name: 'Daman and Diu'
}, {
    code: 'IN-DL',
    country: 'India',
    name: 'Delhi'
}, {
    code: 'IN-GA',
    country: 'India',
    name: 'Goa'
}, {
    code: 'IN-GJ',
    country: 'India',
    name: 'Gujarat'
}, {
    code: 'IN-HR',
    country: 'India',
    name: 'Haryana'
}, {
    code: 'IN-HP',
    country: 'India',
    name: 'Himachal Pradesh'
}, {
    code: 'IN-JK',
    country: 'India',
    name: 'Jammu and Kashmir'
}, {
    code: 'IN-JH',
    country: 'India',
    name: 'Jharkhand'
}, {
    code: 'IN-KA',
    country: 'India',
    name: 'Karnataka'
}, {
    code: 'IN-KL',
    country: 'India',
    name: 'Kerala'
}, {
    code: 'IN-LD',
    country: 'India',
    name: 'Lakshadweep'
}, {
    code: 'IN-MP',
    country: 'India',
    name: 'Madhya Pradesh'
}, {
    code: 'IN-MH',
    country: 'India',
    name: 'Maharashtra'
}, {
    code: 'IN-MN',
    country: 'India',
    name: 'Manipur'
}, {
    code: 'IN-ML',
    country: 'India',
    name: 'Meghalaya'
}, {
    code: 'IN-MZ',
    country: 'India',
    name: 'Mizoram'
}, {
    code: 'IN-NL',
    country: 'India',
    name: 'Nagaland'
}, {
    code: 'IN-OR',
    country: 'India',
    name: 'Odisha'
}, {
    code: 'IN-PY',
    country: 'India',
    name: 'Puducherry'
}, {
    code: 'IN-PB',
    country: 'India',
    name: 'Punjab'
}, {
    code: 'IN-RJ',
    country: 'India',
    name: 'Rajasthan'
}, {
    code: 'IN-SK',
    country: 'India',
    name: 'Sikkim'
}, {
    code: 'IN-TN',
    country: 'India',
    name: 'Tamil Nadu'
}, {
    code: 'IN-TG',
    country: 'India',
    name: 'Telangana'
}, {
    code: 'IN-TR',
    country: 'India',
    name: 'Tripura'
}, {
    code: 'IN-UP',
    country: 'India',
    name: 'Uttar Pradesh'
}, {
    code: 'IN-UT',
    country: 'India',
    name: 'Uttarakhand'
}, {
    code: 'IN-WB',
    country: 'India',
    name: 'West Bengal'
}, {
    code: 'IE-CW',
    country: 'Ireland',
    name: 'Carlow'
}, {
    code: 'IE-CN',
    country: 'Ireland',
    name: 'Cavan'
}, {
    code: 'IE-CE',
    country: 'Ireland',
    name: 'Clare'
}, {
    code: 'IE-C',
    country: 'Ireland',
    name: 'Connaught'
}, {
    code: 'IE-CO',
    country: 'Ireland',
    name: 'Cork'
}, {
    code: 'IE-DL',
    country: 'Ireland',
    name: 'Donegal'
}, {
    code: 'IE-D',
    country: 'Ireland',
    name: 'Dublin'
}, {
    code: 'IE-G',
    country: 'Ireland',
    name: 'Galway'
}, {
    code: 'IE-KY',
    country: 'Ireland',
    name: 'Kerry'
}, {
    code: 'IE-KE',
    country: 'Ireland',
    name: 'Kildare'
}, {
    code: 'IE-KK',
    country: 'Ireland',
    name: 'Kilkenny'
}, {
    code: 'IE-LS',
    country: 'Ireland',
    name: 'Laois'
}, {
    code: 'IE-L',
    country: 'Ireland',
    name: 'Leinster'
}, {
    code: 'IE-LM',
    country: 'Ireland',
    name: 'Leitrim'
}, {
    code: 'IE-LK',
    country: 'Ireland',
    name: 'Limerick'
}, {
    code: 'IE-LD',
    country: 'Ireland',
    name: 'Longford'
}, {
    code: 'IE-LH',
    country: 'Ireland',
    name: 'Louth'
}, {
    code: 'IE-MO',
    country: 'Ireland',
    name: 'Mayo'
}, {
    code: 'IE-MH',
    country: 'Ireland',
    name: 'Meath'
}, {
    code: 'IE-MN',
    country: 'Ireland',
    name: 'Monaghan'
}, {
    code: 'IE-M',
    country: 'Ireland',
    name: 'Munster'
}, {
    code: 'IE-OY',
    country: 'Ireland',
    name: 'Offaly'
}, {
    code: 'IE-RN',
    country: 'Ireland',
    name: 'Roscommon'
}, {
    code: 'IE-SO',
    country: 'Ireland',
    name: 'Sligo'
}, {
    code: 'IE-TA',
    country: 'Ireland',
    name: 'Tipperary'
}, {
    code: 'IE-U',
    country: 'Ireland',
    name: 'Ulster'
}, {
    code: 'IE-WD',
    country: 'Ireland',
    name: 'Waterford'
}, {
    code: 'IE-WH',
    country: 'Ireland',
    name: 'Westmeath'
}, {
    code: 'IE-WX',
    country: 'Ireland',
    name: 'Wexford'
}, {
    code: 'IE-WW',
    country: 'Ireland',
    name: 'Wicklow'
}, {
    code: 'IT-65',
    country: 'Italy',
    name: 'Abruzzo'
}, {
    code: 'IT-AG',
    country: 'Italy',
    name: 'Agrigento'
}, {
    code: 'IT-AL',
    country: 'Italy',
    name: 'Alessandria'
}, {
    code: 'IT-AN',
    country: 'Italy',
    name: 'Ancona'
}, {
    code: 'IT-AO',
    country: 'Italy',
    name: 'Aosta, Aoste'
}, {
    code: 'IT-AR',
    country: 'Italy',
    name: 'Arezzo'
}, {
    code: 'IT-AP',
    country: 'Italy',
    name: 'Ascoli Piceno'
}, {
    code: 'IT-AT',
    country: 'Italy',
    name: 'Asti'
}, {
    code: 'IT-AV',
    country: 'Italy',
    name: 'Avellino'
}, {
    code: 'IT-BA',
    country: 'Italy',
    name: 'Bari'
}, {
    code: 'IT-BT',
    country: 'Italy',
    name: 'Barletta-Andria-Trani'
}, {
    code: 'IT-77',
    country: 'Italy',
    name: 'Basilicata'
}, {
    code: 'IT-BL',
    country: 'Italy',
    name: 'Belluno'
}, {
    code: 'IT-BN',
    country: 'Italy',
    name: 'Benevento'
}, {
    code: 'IT-BG',
    country: 'Italy',
    name: 'Bergamo'
}, {
    code: 'IT-BI',
    country: 'Italy',
    name: 'Biella'
}, {
    code: 'IT-BO',
    country: 'Italy',
    name: 'Bologna'
}, {
    code: 'IT-BZ',
    country: 'Italy',
    name: 'Bolzano, Bozen'
}, {
    code: 'IT-BS',
    country: 'Italy',
    name: 'Brescia'
}, {
    code: 'IT-BR',
    country: 'Italy',
    name: 'Brindisi'
}, {
    code: 'IT-CA',
    country: 'Italy',
    name: 'Cagliari'
}, {
    code: 'IT-78',
    country: 'Italy',
    name: 'Calabria'
}, {
    code: 'IT-CL',
    country: 'Italy',
    name: 'Caltanissetta'
}, {
    code: 'IT-72',
    country: 'Italy',
    name: 'Campania'
}, {
    code: 'IT-CB',
    country: 'Italy',
    name: 'Campobasso'
}, {
    code: 'IT-CI',
    country: 'Italy',
    name: 'Carbonia-Iglesias'
}, {
    code: 'IT-CE',
    country: 'Italy',
    name: 'Caserta'
}, {
    code: 'IT-CT',
    country: 'Italy',
    name: 'Catania'
}, {
    code: 'IT-CZ',
    country: 'Italy',
    name: 'Catanzaro'
}, {
    code: 'IT-CH',
    country: 'Italy',
    name: 'Chieti'
}, {
    code: 'IT-CO',
    country: 'Italy',
    name: 'Como'
}, {
    code: 'IT-CS',
    country: 'Italy',
    name: 'Cosenza'
}, {
    code: 'IT-CR',
    country: 'Italy',
    name: 'Cremona'
}, {
    code: 'IT-KR',
    country: 'Italy',
    name: 'Crotone'
}, {
    code: 'IT-CN',
    country: 'Italy',
    name: 'Cuneo'
}, {
    code: 'IT-45',
    country: 'Italy',
    name: 'Emilia-Romagna'
}, {
    code: 'IT-EN',
    country: 'Italy',
    name: 'Enna'
}, {
    code: 'IT-FM',
    country: 'Italy',
    name: 'Fermo'
}, {
    code: 'IT-FE',
    country: 'Italy',
    name: 'Ferrara'
}, {
    code: 'IT-FI',
    country: 'Italy',
    name: 'Firenze'
}, {
    code: 'IT-FG',
    country: 'Italy',
    name: 'Foggia'
}, {
    code: 'IT-FC',
    country: 'Italy',
    name: 'Forlì-Cesena'
}, {
    code: 'IT-36',
    country: 'Italy',
    name: 'Friuli-Venezia Giulia'
}, {
    code: 'IT-FR',
    country: 'Italy',
    name: 'Frosinone'
}, {
    code: 'IT-GE',
    country: 'Italy',
    name: 'Genova'
}, {
    code: 'IT-GO',
    country: 'Italy',
    name: 'Gorizia'
}, {
    code: 'IT-GR',
    country: 'Italy',
    name: 'Grosseto'
}, {
    code: 'IT-IM',
    country: 'Italy',
    name: 'Imperia'
}, {
    code: 'IT-IS',
    country: 'Italy',
    name: 'Isernia'
}, {
    code: 'IT-AQ',
    country: 'Italy',
    name: 'L\'Aquila'
}, {
    code: 'IT-SP',
    country: 'Italy',
    name: 'La Spezia'
}, {
    code: 'IT-LT',
    country: 'Italy',
    name: 'Latina'
}, {
    code: 'IT-62',
    country: 'Italy',
    name: 'Lazio'
}, {
    code: 'IT-LE',
    country: 'Italy',
    name: 'Lecce'
}, {
    code: 'IT-LC',
    country: 'Italy',
    name: 'Lecco'
}, {
    code: 'IT-42',
    country: 'Italy',
    name: 'Liguria'
}, {
    code: 'IT-LI',
    country: 'Italy',
    name: 'Livorno'
}, {
    code: 'IT-LO',
    country: 'Italy',
    name: 'Lodi'
}, {
    code: 'IT-25',
    country: 'Italy',
    name: 'Lombardia'
}, {
    code: 'IT-LU',
    country: 'Italy',
    name: 'Lucca'
}, {
    code: 'IT-MC',
    country: 'Italy',
    name: 'Macerata'
}, {
    code: 'IT-MN',
    country: 'Italy',
    name: 'Mantova'
}, {
    code: 'IT-57',
    country: 'Italy',
    name: 'Marche'
}, {
    code: 'IT-MS',
    country: 'Italy',
    name: 'Massa-Carrara'
}, {
    code: 'IT-MT',
    country: 'Italy',
    name: 'Matera'
}, {
    code: 'IT-VS',
    country: 'Italy',
    name: 'Medio Campidano'
}, {
    code: 'IT-ME',
    country: 'Italy',
    name: 'Messina'
}, {
    code: 'IT-MI',
    country: 'Italy',
    name: 'Milano'
}, {
    code: 'IT-MO',
    country: 'Italy',
    name: 'Modena'
}, {
    code: 'IT-67',
    country: 'Italy',
    name: 'Molise'
}, {
    code: 'IT-MB',
    country: 'Italy',
    name: 'Monza e Brianza'
}, {
    code: 'IT-NA',
    country: 'Italy',
    name: 'Napoli'
}, {
    code: 'IT-NO',
    country: 'Italy',
    name: 'Novara'
}, {
    code: 'IT-NU',
    country: 'Italy',
    name: 'Nuoro'
}, {
    code: 'IT-OG',
    country: 'Italy',
    name: 'Ogliastra'
}, {
    code: 'IT-OT',
    country: 'Italy',
    name: 'Olbia-Tempio'
}, {
    code: 'IT-OR',
    country: 'Italy',
    name: 'Oristano'
}, {
    code: 'IT-PD',
    country: 'Italy',
    name: 'Padova'
}, {
    code: 'IT-PA',
    country: 'Italy',
    name: 'Palermo'
}, {
    code: 'IT-PR',
    country: 'Italy',
    name: 'Parma'
}, {
    code: 'IT-PV',
    country: 'Italy',
    name: 'Pavia'
}, {
    code: 'IT-PG',
    country: 'Italy',
    name: 'Perugia'
}, {
    code: 'IT-PU',
    country: 'Italy',
    name: 'Pesaro e Urbino'
}, {
    code: 'IT-PE',
    country: 'Italy',
    name: 'Pescara'
}, {
    code: 'IT-PC',
    country: 'Italy',
    name: 'Piacenza'
}, {
    code: 'IT-21',
    country: 'Italy',
    name: 'Piemonte'
}, {
    code: 'IT-PI',
    country: 'Italy',
    name: 'Pisa'
}, {
    code: 'IT-PT',
    country: 'Italy',
    name: 'Pistoia'
}, {
    code: 'IT-PN',
    country: 'Italy',
    name: 'Pordenone'
}, {
    code: 'IT-PZ',
    country: 'Italy',
    name: 'Potenza'
}, {
    code: 'IT-PO',
    country: 'Italy',
    name: 'Prato'
}, {
    code: 'IT-75',
    country: 'Italy',
    name: 'Puglia'
}, {
    code: 'IT-RG',
    country: 'Italy',
    name: 'Ragusa'
}, {
    code: 'IT-RA',
    country: 'Italy',
    name: 'Ravenna'
}, {
    code: 'IT-RC',
    country: 'Italy',
    name: 'Reggio Calabria'
}, {
    code: 'IT-RE',
    country: 'Italy',
    name: 'Reggio Emilia'
}, {
    code: 'IT-RI',
    country: 'Italy',
    name: 'Rieti'
}, {
    code: 'IT-RN',
    country: 'Italy',
    name: 'Rimini'
}, {
    code: 'IT-RM',
    country: 'Italy',
    name: 'Roma'
}, {
    code: 'IT-RO',
    country: 'Italy',
    name: 'Rovigo'
}, {
    code: 'IT-SA',
    country: 'Italy',
    name: 'Salerno'
}, {
    code: 'IT-88',
    country: 'Italy',
    name: 'Sardegna'
}, {
    code: 'IT-SS',
    country: 'Italy',
    name: 'Sassari'
}, {
    code: 'IT-SV',
    country: 'Italy',
    name: 'Savona'
}, {
    code: 'IT-82',
    country: 'Italy',
    name: 'Sicilia'
}, {
    code: 'IT-SI',
    country: 'Italy',
    name: 'Siena'
}, {
    code: 'IT-SR',
    country: 'Italy',
    name: 'Siracusa'
}, {
    code: 'IT-SO',
    country: 'Italy',
    name: 'Sondrio'
}, {
    code: 'IT-TA',
    country: 'Italy',
    name: 'Taranto'
}, {
    code: 'IT-TE',
    country: 'Italy',
    name: 'Teramo'
}, {
    code: 'IT-TR',
    country: 'Italy',
    name: 'Terni'
}, {
    code: 'IT-TO',
    country: 'Italy',
    name: 'Torino'
}, {
    code: 'IT-52',
    country: 'Italy',
    name: 'Toscana'
}, {
    code: 'IT-TP',
    country: 'Italy',
    name: 'Trapani'
}, {
    code: 'IT-32',
    country: 'Italy',
    name: 'Trentino-Alto Adige, Trentino-Südtirol'
}, {
    code: 'IT-TN',
    country: 'Italy',
    name: 'Trento'
}, {
    code: 'IT-TV',
    country: 'Italy',
    name: 'Treviso'
}, {
    code: 'IT-TS',
    country: 'Italy',
    name: 'Trieste'
}, {
    code: 'IT-UD',
    country: 'Italy',
    name: 'Udine'
}, {
    code: 'IT-55',
    country: 'Italy',
    name: 'Umbria'
}, {
    code: 'IT-23',
    country: 'Italy',
    name: 'Valle d\'Aosta, Vallée d\'Aoste'
}, {
    code: 'IT-VA',
    country: 'Italy',
    name: 'Varese'
}, {
    code: 'IT-34',
    country: 'Italy',
    name: 'Veneto'
}, {
    code: 'IT-VE',
    country: 'Italy',
    name: 'Venezia'
}, {
    code: 'IT-VB',
    country: 'Italy',
    name: 'Verbano-Cusio-Ossola'
}, {
    code: 'IT-VC',
    country: 'Italy',
    name: 'Vercelli'
}, {
    code: 'IT-VR',
    country: 'Italy',
    name: 'Verona'
}, {
    code: 'IT-VV',
    country: 'Italy',
    name: 'Vibo Valentia'
}, {
    code: 'IT-VI',
    country: 'Italy',
    name: 'Vicenza'
}, {
    code: 'IT-VT',
    country: 'Italy',
    name: 'Viterbo'
}, {
    code: 'JP-23',
    country: 'Japan',
    name: 'Aiti'
}, {
    code: 'JP-05',
    country: 'Japan',
    name: 'Akita'
}, {
    code: 'JP-02',
    country: 'Japan',
    name: 'Aomori'
}, {
    code: 'JP-38',
    country: 'Japan',
    name: 'Ehime'
}, {
    code: 'JP-21',
    country: 'Japan',
    name: 'Gihu'
}, {
    code: 'JP-10',
    country: 'Japan',
    name: 'Gunma'
}, {
    code: 'JP-34',
    country: 'Japan',
    name: 'Hirosima'
}, {
    code: 'JP-01',
    country: 'Japan',
    name: 'Hokkaidô'
}, {
    code: 'JP-18',
    country: 'Japan',
    name: 'Hukui'
}, {
    code: 'JP-40',
    country: 'Japan',
    name: 'Hukuoka'
}, {
    code: 'JP-07',
    country: 'Japan',
    name: 'Hukusima'
}, {
    code: 'JP-28',
    country: 'Japan',
    name: 'Hyôgo'
}, {
    code: 'JP-08',
    country: 'Japan',
    name: 'Ibaraki'
}, {
    code: 'JP-17',
    country: 'Japan',
    name: 'Isikawa'
}, {
    code: 'JP-03',
    country: 'Japan',
    name: 'Iwate'
}, {
    code: 'JP-37',
    country: 'Japan',
    name: 'Kagawa'
}, {
    code: 'JP-46',
    country: 'Japan',
    name: 'Kagosima'
}, {
    code: 'JP-14',
    country: 'Japan',
    name: 'Kanagawa'
}, {
    code: 'JP-39',
    country: 'Japan',
    name: 'Kôti'
}, {
    code: 'JP-43',
    country: 'Japan',
    name: 'Kumamoto'
}, {
    code: 'JP-26',
    country: 'Japan',
    name: 'Kyôto'
}, {
    code: 'JP-24',
    country: 'Japan',
    name: 'Mie'
}, {
    code: 'JP-04',
    country: 'Japan',
    name: 'Miyagi'
}, {
    code: 'JP-45',
    country: 'Japan',
    name: 'Miyazaki'
}, {
    code: 'JP-20',
    country: 'Japan',
    name: 'Nagano'
}, {
    code: 'JP-42',
    country: 'Japan',
    name: 'Nagasaki'
}, {
    code: 'JP-29',
    country: 'Japan',
    name: 'Nara'
}, {
    code: 'JP-15',
    country: 'Japan',
    name: 'Niigata'
}, {
    code: 'JP-44',
    country: 'Japan',
    name: 'Ôita'
}, {
    code: 'JP-33',
    country: 'Japan',
    name: 'Okayama'
}, {
    code: 'JP-47',
    country: 'Japan',
    name: 'Okinawa'
}, {
    code: 'JP-27',
    country: 'Japan',
    name: 'Ôsaka'
}, {
    code: 'JP-41',
    country: 'Japan',
    name: 'Saga'
}, {
    code: 'JP-11',
    country: 'Japan',
    name: 'Saitama'
}, {
    code: 'JP-25',
    country: 'Japan',
    name: 'Siga'
}, {
    code: 'JP-32',
    country: 'Japan',
    name: 'Simane'
}, {
    code: 'JP-22',
    country: 'Japan',
    name: 'Sizuoka'
}, {
    code: 'JP-12',
    country: 'Japan',
    name: 'Tiba'
}, {
    code: 'JP-36',
    country: 'Japan',
    name: 'Tokusima'
}, {
    code: 'JP-13',
    country: 'Japan',
    name: 'Tôkyô'
}, {
    code: 'JP-09',
    country: 'Japan',
    name: 'Totigi'
}, {
    code: 'JP-31',
    country: 'Japan',
    name: 'Tottori'
}, {
    code: 'JP-16',
    country: 'Japan',
    name: 'Toyama'
}, {
    code: 'JP-30',
    country: 'Japan',
    name: 'Wakayama'
}, {
    code: 'JP-06',
    country: 'Japan',
    name: 'Yamagata'
}, {
    code: 'JP-35',
    country: 'Japan',
    name: 'Yamaguti'
}, {
    code: 'JP-19',
    country: 'Japan',
    name: 'Yamanasi'
}, {
    code: 'JO-AJ',
    country: 'Jordan',
    name: 'ʽAjlūn'
}, {
    code: 'JO-AQ',
    country: 'Jordan',
    name: 'Al ʽAqabah'
}, {
    code: 'JO-BA',
    country: 'Jordan',
    name: 'Al Balqā\''
}, {
    code: 'JO-AM',
    country: 'Jordan',
    name: '‘Ammān'
}, {
    code: 'JO-AT',
    country: 'Jordan',
    name: 'Aţ Ţafīlah'
}, {
    code: 'JO-AZ',
    country: 'Jordan',
    name: 'Az Zarqā\''
}, {
    code: 'JO-IR',
    country: 'Jordan',
    name: 'Irbid'
}, {
    code: 'JO-JA',
    country: 'Jordan',
    name: 'Jerash'
}, {
    code: 'JO-KA',
    country: 'Jordan',
    name: 'Karak'
}, {
    code: 'JO-MN',
    country: 'Jordan',
    name: 'Ma\'ān'
}, {
    code: 'JO-MD',
    country: 'Jordan',
    name: 'Mādabā'
}, {
    code: 'JO-MA',
    country: 'Jordan',
    name: 'Mafraq'
}, {
    code: 'KE-01',
    country: 'Kenya',
    name: 'Baringo'
}, {
    code: 'KE-02',
    country: 'Kenya',
    name: 'Bomet'
}, {
    code: 'KE-03',
    country: 'Kenya',
    name: 'Bungoma'
}, {
    code: 'KE-04',
    country: 'Kenya',
    name: 'Busia'
}, {
    code: 'KE-05',
    country: 'Kenya',
    name: 'Elgeyo/Marakwet'
}, {
    code: 'KE-06',
    country: 'Kenya',
    name: 'Embu'
}, {
    code: 'KE-07',
    country: 'Kenya',
    name: 'Garissa'
}, {
    code: 'KE-08',
    country: 'Kenya',
    name: 'Homa Bay'
}, {
    code: 'KE-09',
    country: 'Kenya',
    name: 'Isiolo'
}, {
    code: 'KE-10',
    country: 'Kenya',
    name: 'Kajiado'
}, {
    code: 'KE-11',
    country: 'Kenya',
    name: 'Kakamega'
}, {
    code: 'KE-12',
    country: 'Kenya',
    name: 'Kericho'
}, {
    code: 'KE-13',
    country: 'Kenya',
    name: 'Kiambu'
}, {
    code: 'KE-14',
    country: 'Kenya',
    name: 'Kilifi'
}, {
    code: 'KE-15',
    country: 'Kenya',
    name: 'Kirinyaga'
}, {
    code: 'KE-16',
    country: 'Kenya',
    name: 'Kisii'
}, {
    code: 'KE-17',
    country: 'Kenya',
    name: 'Kisumu'
}, {
    code: 'KE-18',
    country: 'Kenya',
    name: 'Kitui'
}, {
    code: 'KE-19',
    country: 'Kenya',
    name: 'Kwale'
}, {
    code: 'KE-20',
    country: 'Kenya',
    name: 'Laikipia'
}, {
    code: 'KE-21',
    country: 'Kenya',
    name: 'Lamu'
}, {
    code: 'KE-22',
    country: 'Kenya',
    name: 'Machakos'
}, {
    code: 'KE-23',
    country: 'Kenya',
    name: 'Makueni'
}, {
    code: 'KE-24',
    country: 'Kenya',
    name: 'Mandera'
}, {
    code: 'KE-25',
    country: 'Kenya',
    name: 'Marsabit'
}, {
    code: 'KE-26',
    country: 'Kenya',
    name: 'Meru'
}, {
    code: 'KE-27',
    country: 'Kenya',
    name: 'Migori'
}, {
    code: 'KE-28',
    country: 'Kenya',
    name: 'Mombasa'
}, {
    code: 'KE-29',
    country: 'Kenya',
    name: 'Murang\'a'
}, {
    code: 'KE-30',
    country: 'Kenya',
    name: 'Nairobi City'
}, {
    code: 'KE-31',
    country: 'Kenya',
    name: 'Nakuru'
}, {
    code: 'KE-32',
    country: 'Kenya',
    name: 'Nandi'
}, {
    code: 'KE-33',
    country: 'Kenya',
    name: 'Narok'
}, {
    code: 'KE-34',
    country: 'Kenya',
    name: 'Nyamira'
}, {
    code: 'KE-35',
    country: 'Kenya',
    name: 'Nyandarua'
}, {
    code: 'KE-36',
    country: 'Kenya',
    name: 'Nyeri'
}, {
    code: 'KE-37',
    country: 'Kenya',
    name: 'Samburu'
}, {
    code: 'KE-38',
    country: 'Kenya',
    name: 'Siaya'
}, {
    code: 'KE-39',
    country: 'Kenya',
    name: 'Taita/Taveta'
}, {
    code: 'KE-40',
    country: 'Kenya',
    name: 'Tana River'
}, {
    code: 'KE-41',
    country: 'Kenya',
    name: 'Tharaka-Nithi'
}, {
    code: 'KE-42',
    country: 'Kenya',
    name: 'Trans Nzoia'
}, {
    code: 'KE-43',
    country: 'Kenya',
    name: 'Turkana'
}, {
    code: 'KE-44',
    country: 'Kenya',
    name: 'Uasin Gishu'
}, {
    code: 'KE-45',
    country: 'Kenya',
    name: 'Vihiga'
}, {
    code: 'KE-46',
    country: 'Kenya',
    name: 'Wajir'
}, {
    code: 'KE-47',
    country: 'Kenya',
    name: 'West Pokot'
}, {
    code: 'LV-011',
    country: 'Latvia',
    name: 'Ādažu novads'
}, {
    code: 'LV-001',
    country: 'Latvia',
    name: 'Aglonas novads'
}, {
    code: 'LV-002',
    country: 'Latvia',
    name: 'Aizkraukles novads'
}, {
    code: 'LV-003',
    country: 'Latvia',
    name: 'Aizputes novads'
}, {
    code: 'LV-004',
    country: 'Latvia',
    name: 'Aknīstes novads'
}, {
    code: 'LV-005',
    country: 'Latvia',
    name: 'Alojas novads'
}, {
    code: 'LV-006',
    country: 'Latvia',
    name: 'Alsungas novads'
}, {
    code: 'LV-007',
    country: 'Latvia',
    name: 'Alūksnes novads'
}, {
    code: 'LV-008',
    country: 'Latvia',
    name: 'Amatas novads'
}, {
    code: 'LV-009',
    country: 'Latvia',
    name: 'Apes novads'
}, {
    code: 'LV-010',
    country: 'Latvia',
    name: 'Auces novads'
}, {
    code: 'LV-012',
    country: 'Latvia',
    name: 'Babītes novads'
}, {
    code: 'LV-013',
    country: 'Latvia',
    name: 'Baldones novads'
}, {
    code: 'LV-014',
    country: 'Latvia',
    name: 'Baltinavas novads'
}, {
    code: 'LV-015',
    country: 'Latvia',
    name: 'Balvu novads'
}, {
    code: 'LV-016',
    country: 'Latvia',
    name: 'Bauskas novads'
}, {
    code: 'LV-017',
    country: 'Latvia',
    name: 'Beverīnas novads'
}, {
    code: 'LV-018',
    country: 'Latvia',
    name: 'Brocēnu novads'
}, {
    code: 'LV-020',
    country: 'Latvia',
    name: 'Carnikavas novads'
}, {
    code: 'LV-022',
    country: 'Latvia',
    name: 'Cēsu novads'
}, {
    code: 'LV-021',
    country: 'Latvia',
    name: 'Cesvaines novads'
}, {
    code: 'LV-023',
    country: 'Latvia',
    name: 'Ciblas novads'
}, {
    code: 'LV-024',
    country: 'Latvia',
    name: 'Dagdas novads'
}, {
    code: 'LV-DGV',
    country: 'Latvia',
    name: 'Daugavpils'
}, {
    code: 'LV-025',
    country: 'Latvia',
    name: 'Daugavpils novads'
}, {
    code: 'LV-026',
    country: 'Latvia',
    name: 'Dobeles novads'
}, {
    code: 'LV-027',
    country: 'Latvia',
    name: 'Dundagas novads'
}, {
    code: 'LV-028',
    country: 'Latvia',
    name: 'Durbes novads'
}, {
    code: 'LV-029',
    country: 'Latvia',
    name: 'Engures novads'
}, {
    code: 'LV-030',
    country: 'Latvia',
    name: 'Ērgļu novads'
}, {
    code: 'LV-031',
    country: 'Latvia',
    name: 'Garkalnes novads'
}, {
    code: 'LV-032',
    country: 'Latvia',
    name: 'Grobiņas novads'
}, {
    code: 'LV-033',
    country: 'Latvia',
    name: 'Gulbenes novads'
}, {
    code: 'LV-034',
    country: 'Latvia',
    name: 'Iecavas novads'
}, {
    code: 'LV-035',
    country: 'Latvia',
    name: 'Ikšķiles novads'
}, {
    code: 'LV-036',
    country: 'Latvia',
    name: 'Ilūkstes novads'
}, {
    code: 'LV-037',
    country: 'Latvia',
    name: 'Inčukalna novads'
}, {
    code: 'LV-038',
    country: 'Latvia',
    name: 'Jaunjelgavas novads'
}, {
    code: 'LV-039',
    country: 'Latvia',
    name: 'Jaunpiebalgas novads'
}, {
    code: 'LV-040',
    country: 'Latvia',
    name: 'Jaunpils novads'
}, {
    code: 'LV-JKB',
    country: 'Latvia',
    name: 'Jēkabpils'
}, {
    code: 'LV-042',
    country: 'Latvia',
    name: 'Jēkabpils novads'
}, {
    code: 'LV-JEL',
    country: 'Latvia',
    name: 'Jelgava'
}, {
    code: 'LV-041',
    country: 'Latvia',
    name: 'Jelgavas novads'
}, {
    code: 'LV-JUR',
    country: 'Latvia',
    name: 'Jūrmala'
}, {
    code: 'LV-043',
    country: 'Latvia',
    name: 'Kandavas novads'
}, {
    code: 'LV-044',
    country: 'Latvia',
    name: 'Kārsavas novads'
}, {
    code: 'LV-051',
    country: 'Latvia',
    name: 'Ķeguma novads'
}, {
    code: 'LV-052',
    country: 'Latvia',
    name: 'Ķekavas novads'
}, {
    code: 'LV-045',
    country: 'Latvia',
    name: 'Kocēnu novads'
}, {
    code: 'LV-046',
    country: 'Latvia',
    name: 'Kokneses novads'
}, {
    code: 'LV-047',
    country: 'Latvia',
    name: 'Krāslavas novads'
}, {
    code: 'LV-048',
    country: 'Latvia',
    name: 'Krimuldas novads'
}, {
    code: 'LV-049',
    country: 'Latvia',
    name: 'Krustpils novads'
}, {
    code: 'LV-050',
    country: 'Latvia',
    name: 'Kuldīgas novads'
}, {
    code: 'LV-053',
    country: 'Latvia',
    name: 'Lielvārdes novads'
}, {
    code: 'LV-LPX',
    country: 'Latvia',
    name: 'Liepāja'
}, {
    code: 'LV-055',
    country: 'Latvia',
    name: 'Līgatnes novads'
}, {
    code: 'LV-054',
    country: 'Latvia',
    name: 'Limbažu novads'
}, {
    code: 'LV-056',
    country: 'Latvia',
    name: 'Līvānu novads'
}, {
    code: 'LV-057',
    country: 'Latvia',
    name: 'Lubānas novads'
}, {
    code: 'LV-058',
    country: 'Latvia',
    name: 'Ludzas novads'
}, {
    code: 'LV-059',
    country: 'Latvia',
    name: 'Madonas novads'
}, {
    code: 'LV-062',
    country: 'Latvia',
    name: 'Mārupes novads'
}, {
    code: 'LV-060',
    country: 'Latvia',
    name: 'Mazsalacas novads'
}, {
    code: 'LV-063',
    country: 'Latvia',
    name: 'Mērsraga novads'
}, {
    code: 'LV-064',
    country: 'Latvia',
    name: 'Naukšēnu novads'
}, {
    code: 'LV-065',
    country: 'Latvia',
    name: 'Neretas novads'
}, {
    code: 'LV-066',
    country: 'Latvia',
    name: 'Nīcas novads'
}, {
    code: 'LV-067',
    country: 'Latvia',
    name: 'Ogres novads'
}, {
    code: 'LV-068',
    country: 'Latvia',
    name: 'Olaines novads'
}, {
    code: 'LV-069',
    country: 'Latvia',
    name: 'Ozolnieku novads'
}, {
    code: 'LV-070',
    country: 'Latvia',
    name: 'Pārgaujas novads'
}, {
    code: 'LV-071',
    country: 'Latvia',
    name: 'Pāvilostas novads'
}, {
    code: 'LV-072',
    country: 'Latvia',
    name: 'Pļaviņu novads'
}, {
    code: 'LV-073',
    country: 'Latvia',
    name: 'Preiļu novads'
}, {
    code: 'LV-074',
    country: 'Latvia',
    name: 'Priekules novads'
}, {
    code: 'LV-075',
    country: 'Latvia',
    name: 'Priekuļu novads'
}, {
    code: 'LV-076',
    country: 'Latvia',
    name: 'Raunas novads'
}, {
    code: 'LV-REZ',
    country: 'Latvia',
    name: 'Rēzekne'
}, {
    code: 'LV-077',
    country: 'Latvia',
    name: 'Rēzeknes novads'
}, {
    code: 'LV-078',
    country: 'Latvia',
    name: 'Riebiņu novads'
}, {
    code: 'LV-RIX',
    country: 'Latvia',
    name: 'Rīga'
}, {
    code: 'LV-079',
    country: 'Latvia',
    name: 'Rojas novads'
}, {
    code: 'LV-080',
    country: 'Latvia',
    name: 'Ropažu novads'
}, {
    code: 'LV-081',
    country: 'Latvia',
    name: 'Rucavas novads'
}, {
    code: 'LV-082',
    country: 'Latvia',
    name: 'Rugāju novads'
}, {
    code: 'LV-084',
    country: 'Latvia',
    name: 'Rūjienas novads'
}, {
    code: 'LV-083',
    country: 'Latvia',
    name: 'Rundāles novads'
}, {
    code: 'LV-086',
    country: 'Latvia',
    name: 'Salacgrīvas novads'
}, {
    code: 'LV-085',
    country: 'Latvia',
    name: 'Salas novads'
}, {
    code: 'LV-087',
    country: 'Latvia',
    name: 'Salaspils novads'
}, {
    code: 'LV-088',
    country: 'Latvia',
    name: 'Saldus novads'
}, {
    code: 'LV-089',
    country: 'Latvia',
    name: 'Saulkrastu novads'
}, {
    code: 'LV-090',
    country: 'Latvia',
    name: 'Sējas novads'
}, {
    code: 'LV-091',
    country: 'Latvia',
    name: 'Siguldas novads'
}, {
    code: 'LV-092',
    country: 'Latvia',
    name: 'Skrīveru novads'
}, {
    code: 'LV-093',
    country: 'Latvia',
    name: 'Skrundas novads'
}, {
    code: 'LV-094',
    country: 'Latvia',
    name: 'Smiltenes novads'
}, {
    code: 'LV-095',
    country: 'Latvia',
    name: 'Stopiņu novads'
}, {
    code: 'LV-096',
    country: 'Latvia',
    name: 'Strenču novads'
}, {
    code: 'LV-097',
    country: 'Latvia',
    name: 'Talsu novads'
}, {
    code: 'LV-098',
    country: 'Latvia',
    name: 'Tērvetes novads'
}, {
    code: 'LV-099',
    country: 'Latvia',
    name: 'Tukuma novads'
}, {
    code: 'LV-100',
    country: 'Latvia',
    name: 'Vaiņodes novads'
}, {
    code: 'LV-101',
    country: 'Latvia',
    name: 'Valkas novads'
}, {
    code: 'LV-VMR',
    country: 'Latvia',
    name: 'Valmiera'
}, {
    code: 'LV-102',
    country: 'Latvia',
    name: 'Varakļānu novads'
}, {
    code: 'LV-103',
    country: 'Latvia',
    name: 'Vārkavas novads'
}, {
    code: 'LV-104',
    country: 'Latvia',
    name: 'Vecpiebalgas novads'
}, {
    code: 'LV-105',
    country: 'Latvia',
    name: 'Vecumnieku novads'
}, {
    code: 'LV-VEN',
    country: 'Latvia',
    name: 'Ventspils'
}, {
    code: 'LV-106',
    country: 'Latvia',
    name: 'Ventspils novads'
}, {
    code: 'LV-107',
    country: 'Latvia',
    name: 'Viesītes novads'
}, {
    code: 'LV-108',
    country: 'Latvia',
    name: 'Viļakas novads'
}, {
    code: 'LV-109',
    country: 'Latvia',
    name: 'Viļānu novads'
}, {
    code: 'LV-110',
    country: 'Latvia',
    name: 'Zilupes novads'
}, {
    code: 'MW-BA',
    country: 'Malawi',
    name: 'Balaka'
}, {
    code: 'MW-BL',
    country: 'Malawi',
    name: 'Blantyre'
}, {
    code: 'MW-C',
    country: 'Malawi',
    name: 'Central Region'
}, {
    code: 'MW-CK',
    country: 'Malawi',
    name: 'Chikwawa'
}, {
    code: 'MW-CR',
    country: 'Malawi',
    name: 'Chiradzulu'
}, {
    code: 'MW-CT',
    country: 'Malawi',
    name: 'Chitipa'
}, {
    code: 'MW-DE',
    country: 'Malawi',
    name: 'Dedza'
}, {
    code: 'MW-DO',
    country: 'Malawi',
    name: 'Dowa'
}, {
    code: 'MW-KR',
    country: 'Malawi',
    name: 'Karonga'
}, {
    code: 'MW-KS',
    country: 'Malawi',
    name: 'Kasungu'
}, {
    code: 'MW-LK',
    country: 'Malawi',
    name: 'Likoma'
}, {
    code: 'MW-LI',
    country: 'Malawi',
    name: 'Lilongwe'
}, {
    code: 'MW-MH',
    country: 'Malawi',
    name: 'Machinga'
}, {
    code: 'MW-MG',
    country: 'Malawi',
    name: 'Mangochi'
}, {
    code: 'MW-MC',
    country: 'Malawi',
    name: 'Mchinji'
}, {
    code: 'MW-MU',
    country: 'Malawi',
    name: 'Mulanje'
}, {
    code: 'MW-MW',
    country: 'Malawi',
    name: 'Mwanza'
}, {
    code: 'MW-MZ',
    country: 'Malawi',
    name: 'Mzimba'
}, {
    code: 'MW-NE',
    country: 'Malawi',
    name: 'Neno'
}, {
    code: 'MW-NB',
    country: 'Malawi',
    name: 'Nkhata Bay'
}, {
    code: 'MW-NK',
    country: 'Malawi',
    name: 'Nkhotakota'
}, {
    code: 'MW-N',
    country: 'Malawi',
    name: 'Northern Region'
}, {
    code: 'MW-NS',
    country: 'Malawi',
    name: 'Nsanje'
}, {
    code: 'MW-NU',
    country: 'Malawi',
    name: 'Ntcheu'
}, {
    code: 'MW-NI',
    country: 'Malawi',
    name: 'Ntchisi'
}, {
    code: 'MW-PH',
    country: 'Malawi',
    name: 'Phalombe'
}, {
    code: 'MW-RU',
    country: 'Malawi',
    name: 'Rumphi'
}, {
    code: 'MW-SA',
    country: 'Malawi',
    name: 'Salima'
}, {
    code: 'MW-S',
    country: 'Malawi',
    name: 'Southern Region'
}, {
    code: 'MW-TH',
    country: 'Malawi',
    name: 'Thyolo'
}, {
    code: 'MW-ZO',
    country: 'Malawi',
    name: 'Zomba'
}, {
    code: 'MY-01',
    country: 'Malaysia',
    name: 'Johor'
}, {
    code: 'MY-02',
    country: 'Malaysia',
    name: 'Kedah'
}, {
    code: 'MY-03',
    country: 'Malaysia',
    name: 'Kelantan'
}, {
    code: 'MY-04',
    country: 'Malaysia',
    name: 'Melaka'
}, {
    code: 'MY-05',
    country: 'Malaysia',
    name: 'Negeri Sembilan'
}, {
    code: 'MY-06',
    country: 'Malaysia',
    name: 'Pahang'
}, {
    code: 'MY-08',
    country: 'Malaysia',
    name: 'Perak'
}, {
    code: 'MY-09',
    country: 'Malaysia',
    name: 'Perlis'
}, {
    code: 'MY-07',
    country: 'Malaysia',
    name: 'Pulau Pinang'
}, {
    code: 'MY-12',
    country: 'Malaysia',
    name: 'Sabah'
}, {
    code: 'MY-13',
    country: 'Malaysia',
    name: 'Sarawak'
}, {
    code: 'MY-10',
    country: 'Malaysia',
    name: 'Selangor'
}, {
    code: 'MY-11',
    country: 'Malaysia',
    name: 'Terengganu'
}, {
    code: 'MY-14',
    country: 'Malaysia',
    name: 'Wilayah Persekutuan Kuala Lumpur'
}, {
    code: 'MY-15',
    country: 'Malaysia',
    name: 'Wilayah Persekutuan Labuan'
}, {
    code: 'MY-16',
    country: 'Malaysia',
    name: 'Wilayah Persekutuan Putrajaya'
}, {
    code: 'MT-26',
    country: 'Malta',
    name: 'Marsa'
}, {
    code: 'MH-ALL',
    country: 'Marshall Islands',
    name: 'Ailinglaplap'
}, {
    code: 'MH-ALK',
    country: 'Marshall Islands',
    name: 'Ailuk'
}, {
    code: 'MH-ARN',
    country: 'Marshall Islands',
    name: 'Arno'
}, {
    code: 'MH-AUR',
    country: 'Marshall Islands',
    name: 'Aur'
}, {
    code: 'MH-EBO',
    country: 'Marshall Islands',
    name: 'Ebon'
}, {
    code: 'MH-ENI',
    country: 'Marshall Islands',
    name: 'Enewetak'
}, {
    code: 'MH-JAB',
    country: 'Marshall Islands',
    name: 'Jabat'
}, {
    code: 'MH-JAL',
    country: 'Marshall Islands',
    name: 'Jaluit'
}, {
    code: 'MH-KIL',
    country: 'Marshall Islands',
    name: 'Kili'
}, {
    code: 'MH-KWA',
    country: 'Marshall Islands',
    name: 'Kwajalein'
}, {
    code: 'MH-LAE',
    country: 'Marshall Islands',
    name: 'Lae'
}, {
    code: 'MH-LIB',
    country: 'Marshall Islands',
    name: 'Lib'
}, {
    code: 'MH-LIK',
    country: 'Marshall Islands',
    name: 'Likiep'
}, {
    code: 'MH-MAJ',
    country: 'Marshall Islands',
    name: 'Majuro'
}, {
    code: 'MH-MAL',
    country: 'Marshall Islands',
    name: 'Maloelap'
}, {
    code: 'MH-MEJ',
    country: 'Marshall Islands',
    name: 'Mejit'
}, {
    code: 'MH-MIL',
    country: 'Marshall Islands',
    name: 'Mili'
}, {
    code: 'MH-NMK',
    country: 'Marshall Islands',
    name: 'Namdrik'
}, {
    code: 'MH-NMU',
    country: 'Marshall Islands',
    name: 'Namu'
}, {
    code: 'MH-L',
    country: 'Marshall Islands',
    name: 'Ralik chain'
}, {
    code: 'MH-T',
    country: 'Marshall Islands',
    name: 'Ratak chain'
}, {
    code: 'MH-RON',
    country: 'Marshall Islands',
    name: 'Rongelap'
}, {
    code: 'MH-UJA',
    country: 'Marshall Islands',
    name: 'Ujae'
}, {
    code: 'MH-UTI',
    country: 'Marshall Islands',
    name: 'Utirik'
}, {
    code: 'MH-WTH',
    country: 'Marshall Islands',
    name: 'Wotho'
}, {
    code: 'MH-WTJ',
    country: 'Marshall Islands',
    name: 'Wotje'
}, {
    code: 'MU-AG',
    country: 'Mauritius',
    name: 'Agalega Islands'
}, {
    code: 'MU-BR',
    country: 'Mauritius',
    name: 'Beau Bassin-Rose Hill'
}, {
    code: 'MU-BL',
    country: 'Mauritius',
    name: 'Black River'
}, {
    code: 'MU-CC',
    country: 'Mauritius',
    name: 'Cargados Carajos Shoals'
}, {
    code: 'MU-CU',
    country: 'Mauritius',
    name: 'Curepipe'
}, {
    code: 'MU-FL',
    country: 'Mauritius',
    name: 'Flacq'
}, {
    code: 'MU-GP',
    country: 'Mauritius',
    name: 'Grand Port'
}, {
    code: 'MU-MO',
    country: 'Mauritius',
    name: 'Moka'
}, {
    code: 'MU-PA',
    country: 'Mauritius',
    name: 'Pamplemousses'
}, {
    code: 'MU-PW',
    country: 'Mauritius',
    name: 'Plaines Wilhems'
}, {
    code: 'MU-PL',
    country: 'Mauritius',
    name: 'Port Louis'
}, {
    code: 'MU-PU',
    country: 'Mauritius',
    name: 'Port Louis'
}, {
    code: 'MU-QB',
    country: 'Mauritius',
    name: 'Quatre Bornes'
}, {
    code: 'MU-RR',
    country: 'Mauritius',
    name: 'Rivière du Rempart'
}, {
    code: 'MU-RO',
    country: 'Mauritius',
    name: 'Rodrigues Island'
}, {
    code: 'MU-SA',
    country: 'Mauritius',
    name: 'Savanne'
}, {
    code: 'MU-VP',
    country: 'Mauritius',
    name: 'Vacoas-Phoenix'
}, {
    code: 'MX-AGU',
    country: 'Mexico',
    name: 'Aguascalientes'
}, {
    code: 'MX-BCN',
    country: 'Mexico',
    name: 'Baja California'
}, {
    code: 'MX-BCS',
    country: 'Mexico',
    name: 'Baja California Sur'
}, {
    code: 'MX-CAM',
    country: 'Mexico',
    name: 'Campeche'
}, {
    code: 'MX-CHP',
    country: 'Mexico',
    name: 'Chiapas'
}, {
    code: 'MX-CHH',
    country: 'Mexico',
    name: 'Chihuahua'
}, {
    code: 'MX-COA',
    country: 'Mexico',
    name: 'Coahuila'
}, {
    code: 'MX-COL',
    country: 'Mexico',
    name: 'Colima'
}, {
    code: 'MX-DIF',
    country: 'Mexico',
    name: 'Distrito Federal'
}, {
    code: 'MX-DUR',
    country: 'Mexico',
    name: 'Durango'
}, {
    code: 'MX-GUA',
    country: 'Mexico',
    name: 'Guanajuato'
}, {
    code: 'MX-GRO',
    country: 'Mexico',
    name: 'Guerrero'
}, {
    code: 'MX-HID',
    country: 'Mexico',
    name: 'Hidalgo'
}, {
    code: 'MX-JAL',
    country: 'Mexico',
    name: 'Jalisco'
}, {
    code: 'MX-MEX',
    country: 'Mexico',
    name: 'México'
}, {
    code: 'MX-MIC',
    country: 'Mexico',
    name: 'Michoacán'
}, {
    code: 'MX-MOR',
    country: 'Mexico',
    name: 'Morelos'
}, {
    code: 'MX-NAY',
    country: 'Mexico',
    name: 'Nayarit'
}, {
    code: 'MX-NLE',
    country: 'Mexico',
    name: 'Nuevo León'
}, {
    code: 'MX-OAX',
    country: 'Mexico',
    name: 'Oaxaca'
}, {
    code: 'MX-PUE',
    country: 'Mexico',
    name: 'Puebla'
}, {
    code: 'MX-QUE',
    country: 'Mexico',
    name: 'Querétaro'
}, {
    code: 'MX-ROO',
    country: 'Mexico',
    name: 'Quintana Roo'
}, {
    code: 'MX-SLP',
    country: 'Mexico',
    name: 'San Luis Potosi'
}, {
    code: 'MX-SIN',
    country: 'Mexico',
    name: 'Sinaloa'
}, {
    code: 'MX-SON',
    country: 'Mexico',
    name: 'Sonora'
}, {
    code: 'MX-TAB',
    country: 'Mexico',
    name: 'Tabasco'
}, {
    code: 'MX-TAM',
    country: 'Mexico',
    name: 'Tamaulipas'
}, {
    code: 'MX-TLA',
    country: 'Mexico',
    name: 'Tlaxcala'
}, {
    code: 'MX-VER',
    country: 'Mexico',
    name: 'Veracruz'
}, {
    code: 'MX-YUC',
    country: 'Mexico',
    name: 'Yucatán'
}, {
    code: 'MX-ZAC',
    country: 'Mexico',
    name: 'Zacatecas'
}, {
    code: 'MN-073',
    country: 'Mongolia',
    name: 'Arhangay'
}, {
    code: 'MN-071',
    country: 'Mongolia',
    name: 'Bayan-Ölgiy'
}, {
    code: 'MN-069',
    country: 'Mongolia',
    name: 'Bayanhongor'
}, {
    code: 'MN-067',
    country: 'Mongolia',
    name: 'Bulgan'
}, {
    code: 'MN-037',
    country: 'Mongolia',
    name: 'Darhan uul'
}, {
    code: 'MN-061',
    country: 'Mongolia',
    name: 'Dornod'
}, {
    code: 'MN-063',
    country: 'Mongolia',
    name: 'Dornogovĭ'
}, {
    code: 'MN-059',
    country: 'Mongolia',
    name: 'Dundgovĭ'
}, {
    code: 'MN-057',
    country: 'Mongolia',
    name: 'Dzavhan'
}, {
    code: 'MN-065',
    country: 'Mongolia',
    name: 'Govĭ-Altay'
}, {
    code: 'MN-064',
    country: 'Mongolia',
    name: 'Govĭ-Sümber'
}, {
    code: 'MN-039',
    country: 'Mongolia',
    name: 'Hentiy'
}, {
    code: 'MN-043',
    country: 'Mongolia',
    name: 'Hovd'
}, {
    code: 'MN-041',
    country: 'Mongolia',
    name: 'Hövsgöl'
}, {
    code: 'MN-053',
    country: 'Mongolia',
    name: 'Ömnögovĭ'
}, {
    code: 'MN-035',
    country: 'Mongolia',
    name: 'Orhon'
}, {
    code: 'MN-055',
    country: 'Mongolia',
    name: 'Övörhangay'
}, {
    code: 'MN-049',
    country: 'Mongolia',
    name: 'Selenge'
}, {
    code: 'MN-051',
    country: 'Mongolia',
    name: 'Sühbaatar'
}, {
    code: 'MN-047',
    country: 'Mongolia',
    name: 'Töv'
}, {
    code: 'MN-1',
    country: 'Mongolia',
    name: 'Ulaanbaatar'
}, {
    code: 'MN-046',
    country: 'Mongolia',
    name: 'Uvs'
}, {
    code: 'MA-AGD',
    country: 'Morocco',
    name: 'Agadir-Ida-Outanane'
}, {
    code: 'MA-HAO',
    country: 'Morocco',
    name: 'Al Haouz'
}, {
    code: 'MA-HOC',
    country: 'Morocco',
    name: 'Al Hoceïma'
}, {
    code: 'MA-AOU',
    country: 'Morocco',
    name: 'Aousserd'
}, {
    code: 'MA-ASZ',
    country: 'Morocco',
    name: 'Assa-Zag'
}, {
    code: 'MA-AZI',
    country: 'Morocco',
    name: 'Azilal'
}, {
    code: 'MA-BES',
    country: 'Morocco',
    name: 'Ben Slimane'
}, {
    code: 'MA-BEM',
    country: 'Morocco',
    name: 'Beni Mellal'
}, {
    code: 'MA-BER',
    country: 'Morocco',
    name: 'Berkane'
}, {
    code: 'MA-BOD',
    country: 'Morocco',
    name: 'Boujdour'
}, {
    code: 'MA-BOM',
    country: 'Morocco',
    name: 'Boulemane'
}, {
    code: 'MA-CAS',
    country: 'Morocco',
    name: 'Casablanca'
}, {
    code: 'MA-09',
    country: 'Morocco',
    name: 'Chaouia-Ouardigha'
}, {
    code: 'MA-CHE',
    country: 'Morocco',
    name: 'Chefchaouen'
}, {
    code: 'MA-CHI',
    country: 'Morocco',
    name: 'Chichaoua'
}, {
    code: 'MA-CHT',
    country: 'Morocco',
    name: 'Chtouka-Ait Baha'
}, {
    code: 'MA-10',
    country: 'Morocco',
    name: 'Doukhala-Abda'
}, {
    code: 'MA-HAJ',
    country: 'Morocco',
    name: 'El Hajeb'
}, {
    code: 'MA-JDI',
    country: 'Morocco',
    name: 'El Jadida'
}, {
    code: 'MA-ERR',
    country: 'Morocco',
    name: 'Errachidia'
}, {
    code: 'MA-ESM',
    country: 'Morocco',
    name: 'Es Smara'
}, {
    code: 'MA-ESI',
    country: 'Morocco',
    name: 'Essaouira'
}, {
    code: 'MA-FAH',
    country: 'Morocco',
    name: 'Fahs-Beni Makada'
}, {
    code: 'MA-05',
    country: 'Morocco',
    name: 'Fès-Boulemane'
}, {
    code: 'MA-FIG',
    country: 'Morocco',
    name: 'Figuig'
}, {
    code: 'MA-02',
    country: 'Morocco',
    name: 'Gharb-Chrarda-Beni Hssen'
}, {
    code: 'MA-08',
    country: 'Morocco',
    name: 'Grand Casablanca'
}, {
    code: 'MA-14',
    country: 'Morocco',
    name: 'Guelmim-Es Smara'
}, {
    code: 'MA-GUE',
    country: 'Morocco',
    name: 'Guelmim'
}, {
    code: 'MA-IFR',
    country: 'Morocco',
    name: 'Ifrane'
}, {
    code: 'MA-INE',
    country: 'Morocco',
    name: 'Inezgane-Ait Melloul'
}, {
    code: 'MA-JRA',
    country: 'Morocco',
    name: 'Jrada'
}, {
    code: 'MA-KES',
    country: 'Morocco',
    name: 'Kelaat es Sraghna'
}, {
    code: 'MA-KEN',
    country: 'Morocco',
    name: 'Kénitra'
}, {
    code: 'MA-KHE',
    country: 'Morocco',
    name: 'Khémisset'
}, {
    code: 'MA-KHN',
    country: 'Morocco',
    name: 'Khénifra'
}, {
    code: 'MA-KHO',
    country: 'Morocco',
    name: 'Khouribga'
}, {
    code: 'MA-04',
    country: 'Morocco',
    name: 'L\'Oriental'
}, {
    code: 'MA-15',
    country: 'Morocco',
    name: 'Laâyoune-Boujdour-Sakia el Hamra'
}, {
    code: 'MA-LAA',
    country: 'Morocco',
    name: 'Laâyoune'
}, {
    code: 'MA-LAR',
    country: 'Morocco',
    name: 'Larache'
}, {
    code: 'MA-MMD',
    country: 'Morocco',
    name: 'Marrakech-Medina'
}, {
    code: 'MA-MMN',
    country: 'Morocco',
    name: 'Marrakech-Menara'
}, {
    code: 'MA-11',
    country: 'Morocco',
    name: 'Marrakech-Tensift-Al Haouz'
}, {
    code: 'MA-MED',
    country: 'Morocco',
    name: 'Médiouna'
}, {
    code: 'MA-MEK',
    country: 'Morocco',
    name: 'Meknès'
}, {
    code: 'MA-06',
    country: 'Morocco',
    name: 'Meknès-Tafilalet'
}, {
    code: 'MA-MOH',
    country: 'Morocco',
    name: 'Mohammadia'
}, {
    code: 'MA-MOU',
    country: 'Morocco',
    name: 'Moulay Yacoub'
}, {
    code: 'MA-NAD',
    country: 'Morocco',
    name: 'Nador'
}, {
    code: 'MA-NOU',
    country: 'Morocco',
    name: 'Nouaceur'
}, {
    code: 'MA-OUA',
    country: 'Morocco',
    name: 'Ouarzazate'
}, {
    code: 'MA-16',
    country: 'Morocco',
    name: 'Oued ed Dahab-Lagouira'
}, {
    code: 'MA-OUD',
    country: 'Morocco',
    name: 'Oued ed Dahab'
}, {
    code: 'MA-OUJ',
    country: 'Morocco',
    name: 'Oujda-Angad'
}, {
    code: 'MA-RAB',
    country: 'Morocco',
    name: 'Rabat'
}, {
    code: 'MA-07',
    country: 'Morocco',
    name: 'Rabat-Salé-Zemmour-Zaer'
}, {
    code: 'MA-SAF',
    country: 'Morocco',
    name: 'Safi'
}, {
    code: 'MA-SAL',
    country: 'Morocco',
    name: 'Salé'
}, {
    code: 'MA-SEF',
    country: 'Morocco',
    name: 'Sefrou'
}, {
    code: 'MA-SET',
    country: 'Morocco',
    name: 'Settat'
}, {
    code: 'MA-SIK',
    country: 'Morocco',
    name: 'Sidi Kacem'
}, {
    code: 'MA-SYB',
    country: 'Morocco',
    name: 'Sidi Youssef Ben Ali'
}, {
    code: 'MA-SKH',
    country: 'Morocco',
    name: 'Skhirate-Témara'
}, {
    code: 'MA-13',
    country: 'Morocco',
    name: 'Souss-Massa-Drâa'
}, {
    code: 'MA-12',
    country: 'Morocco',
    name: 'Tadla-Azilal'
}, {
    code: 'MA-TNT',
    country: 'Morocco',
    name: 'Tan-Tan'
}, {
    code: 'MA-TNG',
    country: 'Morocco',
    name: 'Tanger-Assilah'
}, {
    code: 'MA-01',
    country: 'Morocco',
    name: 'Tanger-Tétouan'
}, {
    code: 'MA-TAO',
    country: 'Morocco',
    name: 'Taounate'
}, {
    code: 'MA-TAI',
    country: 'Morocco',
    name: 'Taourirt'
}, {
    code: 'MA-TAR',
    country: 'Morocco',
    name: 'Taroudant'
}, {
    code: 'MA-TAT',
    country: 'Morocco',
    name: 'Tata'
}, {
    code: 'MA-03',
    country: 'Morocco',
    name: 'Taza-Al Hoceima-Taounate'
}, {
    code: 'MA-TAZ',
    country: 'Morocco',
    name: 'Taza'
}, {
    code: 'MA-TET',
    country: 'Morocco',
    name: 'Tétouan'
}, {
    code: 'MA-TIZ',
    country: 'Morocco',
    name: 'Tiznit'
}, {
    code: 'MA-ZAG',
    country: 'Morocco',
    name: 'Zagora'
}, {
    code: 'MZ-P',
    country: 'Mozambique',
    name: 'Cabo Delgado'
}, {
    code: 'MZ-G',
    country: 'Mozambique',
    name: 'Gaza'
}, {
    code: 'MZ-I',
    country: 'Mozambique',
    name: 'Inhambane'
}, {
    code: 'MZ-B',
    country: 'Mozambique',
    name: 'Manica'
}, {
    code: 'MZ-L',
    country: 'Mozambique',
    name: 'Maputo'
}, {
    code: 'MZ-N',
    country: 'Mozambique',
    name: 'Nampula'
}, {
    code: 'MZ-A',
    country: 'Mozambique',
    name: 'Niassa'
}, {
    code: 'MZ-S',
    country: 'Mozambique',
    name: 'Sofala'
}, {
    code: 'MZ-T',
    country: 'Mozambique',
    name: 'Tete'
}, {
    code: 'MZ-Q',
    country: 'Mozambique',
    name: 'Zambézia'
}, {
    code: 'NA-ER',
    country: 'Namibia',
    name: 'Erongo'
}, {
    code: 'NA-HA',
    country: 'Namibia',
    name: 'Hardap'
}, {
    code: 'NA-KA',
    country: 'Namibia',
    name: 'Karas'
}, {
    code: 'NA-KE',
    country: 'Namibia',
    name: 'Kavango East'
}, {
    code: 'NA-KW',
    country: 'Namibia',
    name: 'Kavango West'
}, {
    code: 'NA-KH',
    country: 'Namibia',
    name: 'Khomas'
}, {
    code: 'NA-KU',
    country: 'Namibia',
    name: 'Kunene'
}, {
    code: 'NA-OW',
    country: 'Namibia',
    name: 'Ohangwena'
}, {
    code: 'NA-OH',
    country: 'Namibia',
    name: 'Omaheke'
}, {
    code: 'NA-OS',
    country: 'Namibia',
    name: 'Omusati'
}, {
    code: 'NA-ON',
    country: 'Namibia',
    name: 'Oshana'
}, {
    code: 'NA-OT',
    country: 'Namibia',
    name: 'Oshikoto'
}, {
    code: 'NA-OD',
    country: 'Namibia',
    name: 'Otjozondjupa'
}, {
    code: 'NA-CA',
    country: 'Namibia',
    name: 'Zambezi'
}, {
    code: 'NL-AW',
    country: 'Netherlands',
    name: 'Aruba'
}, {
    code: 'NL-BQ1',
    country: 'Netherlands',
    name: 'Bonaire'
}, {
    code: 'NL-CW',
    country: 'Netherlands',
    name: 'Curaçao'
}, {
    code: 'NL-DR',
    country: 'Netherlands',
    name: 'Drenthe'
}, {
    code: 'NL-FL',
    country: 'Netherlands',
    name: 'Flevoland'
}, {
    code: 'NL-FR',
    country: 'Netherlands',
    name: 'Fryslân'
}, {
    code: 'NL-GE',
    country: 'Netherlands',
    name: 'Gelderland'
}, {
    code: 'NL-GR',
    country: 'Netherlands',
    name: 'Groningen'
}, {
    code: 'NL-LI',
    country: 'Netherlands',
    name: 'Limburg'
}, {
    code: 'NL-NB',
    country: 'Netherlands',
    name: 'Noord-Brabant'
}, {
    code: 'NL-NH',
    country: 'Netherlands',
    name: 'Noord-Holland'
}, {
    code: 'NL-OV',
    country: 'Netherlands',
    name: 'Overijssel'
}, {
    code: 'NL-BQ2',
    country: 'Netherlands',
    name: 'Saba'
}, {
    code: 'NL-BQ3',
    country: 'Netherlands',
    name: 'Sint Eustatius'
}, {
    code: 'NL-SX',
    country: 'Netherlands',
    name: 'Sint Maarten'
}, {
    code: 'NL-UT',
    country: 'Netherlands',
    name: 'Utrecht'
}, {
    code: 'NL-ZE',
    country: 'Netherlands',
    name: 'Zeeland'
}, {
    code: 'NL-ZH',
    country: 'Netherlands',
    name: 'Zuid-Holland'
}, {
    code: 'NZ-AUK',
    country: 'New Zealand',
    name: 'Auckland'
}, {
    code: 'NZ-BOP',
    country: 'New Zealand',
    name: 'Bay of Plenty'
}, {
    code: 'NZ-CAN',
    country: 'New Zealand',
    name: 'Canterbury'
}, {
    code: 'NZ-CIT',
    country: 'New Zealand',
    name: 'Chatham Islands Territory'
}, {
    code: 'NZ-GIS',
    country: 'New Zealand',
    name: 'Gisborne District'
}, {
    code: 'NZ-HKB',
    country: 'New Zealand',
    name: 'Hawke\'s Bay'
}, {
    code: 'NZ-MWT',
    country: 'New Zealand',
    name: 'Manawatu-Wanganui'
}, {
    code: 'NZ-MBH',
    country: 'New Zealand',
    name: 'Marlborough District'
}, {
    code: 'NZ-NSN',
    country: 'New Zealand',
    name: 'Nelson City'
}, {
    code: 'NZ-N',
    country: 'New Zealand',
    name: 'North Island'
}, {
    code: 'NZ-NTL',
    country: 'New Zealand',
    name: 'Northland'
}, {
    code: 'NZ-OTA',
    country: 'New Zealand',
    name: 'Otago'
}, {
    code: 'NZ-S',
    country: 'New Zealand',
    name: 'South Island'
}, {
    code: 'NZ-STL',
    country: 'New Zealand',
    name: 'Southland'
}, {
    code: 'NZ-TKI',
    country: 'New Zealand',
    name: 'Taranaki'
}, {
    code: 'NZ-TAS',
    country: 'New Zealand',
    name: 'Tasman District'
}, {
    code: 'NZ-WKO',
    country: 'New Zealand',
    name: 'Waikato'
}, {
    code: 'NZ-WGN',
    country: 'New Zealand',
    name: 'Wellington'
}, {
    code: 'NZ-WTC',
    country: 'New Zealand',
    name: 'West Coast'
}, {
    code: 'NI-AN',
    country: 'Nicaragua',
    name: 'Atlántico Norte'
}, {
    code: 'NI-AS',
    country: 'Nicaragua',
    name: 'Atlántico Sur'
}, {
    code: 'NI-BO',
    country: 'Nicaragua',
    name: 'Boaco'
}, {
    code: 'NI-CA',
    country: 'Nicaragua',
    name: 'Carazo'
}, {
    code: 'NI-CI',
    country: 'Nicaragua',
    name: 'Chinandega'
}, {
    code: 'NI-CO',
    country: 'Nicaragua',
    name: 'Chontales'
}, {
    code: 'NI-ES',
    country: 'Nicaragua',
    name: 'Estelí'
}, {
    code: 'NI-GR',
    country: 'Nicaragua',
    name: 'Granada'
}, {
    code: 'NI-JI',
    country: 'Nicaragua',
    name: 'Jinotega'
}, {
    code: 'NI-LE',
    country: 'Nicaragua',
    name: 'León'
}, {
    code: 'NI-MD',
    country: 'Nicaragua',
    name: 'Madriz'
}, {
    code: 'NI-MN',
    country: 'Nicaragua',
    name: 'Managua'
}, {
    code: 'NI-MS',
    country: 'Nicaragua',
    name: 'Masaya'
}, {
    code: 'NI-MT',
    country: 'Nicaragua',
    name: 'Matagalpa'
}, {
    code: 'NI-NS',
    country: 'Nicaragua',
    name: 'Nueva Segovia'
}, {
    code: 'NI-SJ',
    country: 'Nicaragua',
    name: 'Río San Juan'
}, {
    code: 'NI-RI',
    country: 'Nicaragua',
    name: 'Rivas'
}, {
    code: 'GB-ANT',
    country: 'Northern Ireland',
    name: 'Antrim'
}, {
    code: 'GB-ARM',
    country: 'Northern Ireland',
    name: 'Armagh'
}, {
    code: 'GB-BFS',
    country: 'Northern Ireland',
    name: 'Belfast'
}, {
    code: 'GB-CGV',
    country: 'Northern Ireland',
    name: 'Craigavon'
}, {
    code: 'GB-DRY',
    country: 'Northern Ireland',
    name: 'Derry'
}, {
    code: 'GB-DOW',
    country: 'Northern Ireland',
    name: 'Down'
}, {
    code: 'GB-FER',
    country: 'Northern Ireland',
    name: 'Fermanagh'
}, {
    code: 'GB-LSB',
    country: 'Northern Ireland',
    name: 'Lisburn'
}, {
    code: 'GB-NYM',
    country: 'Northern Ireland',
    name: 'Newry and Mourne District'
}, {
    code: 'GB-NTA',
    country: 'Northern Ireland',
    name: 'Newtownabbey'
}, {
    code: 'GB-OMH',
    country: 'Northern Ireland',
    name: 'Omagh'
}, {
    code: 'NO-02',
    country: 'Norway',
    name: 'Akershus'
}, {
    code: 'NO-09',
    country: 'Norway',
    name: 'Aust-Agder'
}, {
    code: 'NO-06',
    country: 'Norway',
    name: 'Buskerud'
}, {
    code: 'NO-20',
    country: 'Norway',
    name: 'Finnmark'
}, {
    code: 'NO-04',
    country: 'Norway',
    name: 'Hedmark'
}, {
    code: 'NO-12',
    country: 'Norway',
    name: 'Hordaland'
}, {
    code: 'NO-22',
    country: 'Norway',
    name: 'Jan Mayen'
}, {
    code: 'NO-15',
    country: 'Norway',
    name: 'Møre og Romsdal'
}, {
    code: 'NO-17',
    country: 'Norway',
    name: 'Nord-Trøndelag'
}, {
    code: 'NO-18',
    country: 'Norway',
    name: 'Nordland'
}, {
    code: 'NO-05',
    country: 'Norway',
    name: 'Oppland'
}, {
    code: 'NO-03',
    country: 'Norway',
    name: 'Oslo'
}, {
    code: 'NO-01',
    country: 'Norway',
    name: 'Østfold'
}, {
    code: 'NO-11',
    country: 'Norway',
    name: 'Rogaland'
}, {
    code: 'NO-14',
    country: 'Norway',
    name: 'Sogn og Fjordane'
}, {
    code: 'NO-16',
    country: 'Norway',
    name: 'Sør-Trøndelag'
}, {
    code: 'NO-21',
    country: 'Norway',
    name: 'Svalbard'
}, {
    code: 'NO-08',
    country: 'Norway',
    name: 'Telemark'
}, {
    code: 'NO-19',
    country: 'Norway',
    name: 'Troms'
}, {
    code: 'NO-10',
    country: 'Norway',
    name: 'Vest-Agder'
}, {
    code: 'NO-07',
    country: 'Norway',
    name: 'Vestfold'
}, {
    code: 'OM-DA',
    country: 'Oman',
    name: 'Ad Dākhilīyah'
}, {
    code: 'OM-BA',
    country: 'Oman',
    name: 'Al Bāţinah'
}, {
    code: 'OM-BU',
    country: 'Oman',
    name: 'Al Buraymī'
}, {
    code: 'OM-WU',
    country: 'Oman',
    name: 'Al Wusţá'
}, {
    code: 'OM-SH',
    country: 'Oman',
    name: 'Ash Sharqīyah'
}, {
    code: 'OM-ZA',
    country: 'Oman',
    name: 'Az̧ Z̧āhirah'
}, {
    code: 'OM-MA',
    country: 'Oman',
    name: 'Masqaţ'
}, {
    code: 'OM-MU',
    country: 'Oman',
    name: 'Musandam'
}, {
    code: 'OM-ZU',
    country: 'Oman',
    name: 'Z̧ufār'
}, {
    code: 'PA-1',
    country: 'Panama',
    name: 'Bocas del Toro'
}, {
    code: 'PA-4',
    country: 'Panama',
    name: 'Chiriquí'
}, {
    code: 'PA-2',
    country: 'Panama',
    name: 'Coclé'
}, {
    code: 'PA-3',
    country: 'Panama',
    name: 'Colón'
}, {
    code: 'PA-5',
    country: 'Panama',
    name: 'Darién'
}, {
    code: 'PA-EM',
    country: 'Panama',
    name: 'Emberá'
}, {
    code: 'PA-6',
    country: 'Panama',
    name: 'Herrera'
}, {
    code: 'PA-KY',
    country: 'Panama',
    name: 'Kuna Yala'
}, {
    code: 'PA-7',
    country: 'Panama',
    name: 'Los Santos'
}, {
    code: 'PA-NB',
    country: 'Panama',
    name: 'Ngöbe-Buglé'
}, {
    code: 'PA-10',
    country: 'Panama',
    name: 'Panamá Oeste'
}, {
    code: 'PA-8',
    country: 'Panama',
    name: 'Panamá'
}, {
    code: 'PA-9',
    country: 'Panama',
    name: 'Veraguas'
}, {
    code: 'PY-16',
    country: 'Paraguay',
    name: 'Alto Paraguay'
}, {
    code: 'PY-10',
    country: 'Paraguay',
    name: 'Alto Paraná'
}, {
    code: 'PY-13',
    country: 'Paraguay',
    name: 'Amambay'
}, {
    code: 'PY-ASU',
    country: 'Paraguay',
    name: 'Asunción'
}, {
    code: 'PY-19',
    country: 'Paraguay',
    name: 'Boquerón'
}, {
    code: 'PY-5',
    country: 'Paraguay',
    name: 'Caaguazú'
}, {
    code: 'PY-6',
    country: 'Paraguay',
    name: 'Caazapá'
}, {
    code: 'PY-14',
    country: 'Paraguay',
    name: 'Canindeyú'
}, {
    code: 'PY-11',
    country: 'Paraguay',
    name: 'Central'
}, {
    code: 'PY-1',
    country: 'Paraguay',
    name: 'Concepción'
}, {
    code: 'PY-3',
    country: 'Paraguay',
    name: 'Cordillera'
}, {
    code: 'PY-4',
    country: 'Paraguay',
    name: 'Guairá'
}, {
    code: 'PY-7',
    country: 'Paraguay',
    name: 'Itapúa'
}, {
    code: 'PY-8',
    country: 'Paraguay',
    name: 'Misiones'
}, {
    code: 'PY-12',
    country: 'Paraguay',
    name: 'Ñeembucú'
}, {
    code: 'PY-9',
    country: 'Paraguay',
    name: 'Paraguarí'
}, {
    code: 'PY-15',
    country: 'Paraguay',
    name: 'Presidente Hayes'
}, {
    code: 'PY-2',
    country: 'Paraguay',
    name: 'San Pedro'
}, {
    code: 'CN-34',
    country: 'People Republic of China',
    name: 'Anhui'
}, {
    code: 'CN-11',
    country: 'People Republic of China',
    name: 'Beijing'
}, {
    code: 'CN-50',
    country: 'People Republic of China',
    name: 'Chongqing'
}, {
    code: 'CN-35',
    country: 'People Republic of China',
    name: 'Fujian'
}, {
    code: 'CN-62',
    country: 'People Republic of China',
    name: 'Gansu'
}, {
    code: 'CN-44',
    country: 'People Republic of China',
    name: 'Guangdong'
}, {
    code: 'CN-45',
    country: 'People Republic of China',
    name: 'Guangxi'
}, {
    code: 'CN-52',
    country: 'People Republic of China',
    name: 'Guizhou'
}, {
    code: 'CN-46',
    country: 'People Republic of China',
    name: 'Hainan'
}, {
    code: 'CN-13',
    country: 'People Republic of China',
    name: 'Hebei'
}, {
    code: 'CN-23',
    country: 'People Republic of China',
    name: 'Heilongjiang'
}, {
    code: 'CN-41',
    country: 'People Republic of China',
    name: 'Henan'
}, {
    code: 'CN-91',
    country: 'People Republic of China',
    name: 'Hong Kong'
}, {
    code: 'CN-42',
    country: 'People Republic of China',
    name: 'Hubei'
}, {
    code: 'CN-43',
    country: 'People Republic of China',
    name: 'CN-43'
}, {
    code: 'CN-32',
    country: 'People Republic of China',
    name: 'Jiangsu'
}, {
    code: 'CN-36',
    country: 'People Republic of China',
    name: 'Jiangxi'
}, {
    code: 'CN-22',
    country: 'People Republic of China',
    name: 'Jilin'
}, {
    code: 'CN-21',
    country: 'People Republic of China',
    name: 'Liaoning'
}, {
    code: 'CN-92',
    country: 'People Republic of China',
    name: 'Macao'
}, {
    code: 'CN-15',
    country: 'People Republic of China',
    name: 'Nei Mongol'
}, {
    code: 'CN-64',
    country: 'People Republic of China',
    name: 'Ningxia'
}, {
    code: 'CN-63',
    country: 'People Republic of China',
    name: 'Qinghai'
}, {
    code: 'CN-61',
    country: 'People Republic of China',
    name: 'Shaanxi'
}, {
    code: 'CN-37',
    country: 'People Republic of China',
    name: 'Shandong'
}, {
    code: 'CN-31',
    country: 'People Republic of China',
    name: 'Shanghai'
}, {
    code: 'CN-14',
    country: 'People Republic of China',
    name: 'Shanxi'
}, {
    code: 'CN-51',
    country: 'People Republic of China',
    name: 'Sichuan'
}, {
    code: 'CN-71',
    country: 'People Republic of China',
    name: 'Chinese Taipei'
}, {
    code: 'CN-12',
    country: 'People Republic of China',
    name: 'Tianjin'
}, {
    code: 'CN-65',
    country: 'People Republic of China',
    name: 'Xinjiang'
}, {
    code: 'CN-54',
    country: 'People Republic of China',
    name: 'Xizang'
}, {
    code: 'CN-53',
    country: 'People Republic of China',
    name: 'Yunnan'
}, {
    code: 'CN-33',
    country: 'People Republic of China',
    name: 'Zhejiang'
}, {
    code: 'PE-AMA',
    country: 'Peru',
    name: 'Amazonas'
}, {
    code: 'PE-ANC',
    country: 'Peru',
    name: 'Ancash'
}, {
    code: 'PE-APU',
    country: 'Peru',
    name: 'Apurímac'
}, {
    code: 'PE-ARE',
    country: 'Peru',
    name: 'Arequipa'
}, {
    code: 'PE-AYA',
    country: 'Peru',
    name: 'Ayacucho'
}, {
    code: 'PE-CAJ',
    country: 'Peru',
    name: 'Cajamarca'
}, {
    code: 'PE-CUS',
    country: 'Peru',
    name: 'Cusco'
}, {
    code: 'PE-CAL',
    country: 'Peru',
    name: 'El Callao'
}, {
    code: 'PE-HUV',
    country: 'Peru',
    name: 'Huancavelica'
}, {
    code: 'PE-HUC',
    country: 'Peru',
    name: 'Huánuco'
}, {
    code: 'PE-ICA',
    country: 'Peru',
    name: 'Ica'
}, {
    code: 'PE-JUN',
    country: 'Peru',
    name: 'Junín'
}, {
    code: 'PE-LAL',
    country: 'Peru',
    name: 'La Libertad'
}, {
    code: 'PE-LAM',
    country: 'Peru',
    name: 'Lambayeque'
}, {
    code: 'PE-LIM',
    country: 'Peru',
    name: 'Lima'
}, {
    code: 'PE-LOR',
    country: 'Peru',
    name: 'Loreto'
}, {
    code: 'PE-MDD',
    country: 'Peru',
    name: 'Madre de Dios'
}, {
    code: 'PE-MOQ',
    country: 'Peru',
    name: 'Moquegua'
}, {
    code: 'PE-LMA',
    country: 'Peru',
    name: 'Municipalidad Metropolitana de Lima'
}, {
    code: 'PE-PAS',
    country: 'Peru',
    name: 'Pasco'
}, {
    code: 'PE-PIU',
    country: 'Peru',
    name: 'Piura'
}, {
    code: 'PE-PUN',
    country: 'Peru',
    name: 'Puno'
}, {
    code: 'PE-SAM',
    country: 'Peru',
    name: 'San Martín'
}, {
    code: 'PE-TAC',
    country: 'Peru',
    name: 'Tacna'
}, {
    code: 'PE-TUM',
    country: 'Peru',
    name: 'Tumbes'
}, {
    code: 'PE-UCA',
    country: 'Peru',
    name: 'Ucayali'
}, {
    code: 'PH-ABR',
    country: 'Philippines',
    name: 'Abra'
}, {
    code: 'PH-AGN',
    country: 'Philippines',
    name: 'Agusan del Norte'
}, {
    code: 'PH-AGS',
    country: 'Philippines',
    name: 'Agusan del Sur'
}, {
    code: 'PH-AKL',
    country: 'Philippines',
    name: 'Aklan'
}, {
    code: 'PH-ALB',
    country: 'Philippines',
    name: 'Albay'
}, {
    code: 'PH-ANT',
    country: 'Philippines',
    name: 'Antique'
}, {
    code: 'PH-APA',
    country: 'Philippines',
    name: 'Apayao'
}, {
    code: 'PH-AUR',
    country: 'Philippines',
    name: 'Aurora'
}, {
    code: 'PH-14',
    country: 'Philippines',
    name: 'Autonomous Region in Muslim Mindanao'
}, {
    code: 'PH-BAS',
    country: 'Philippines',
    name: 'Basilan'
}, {
    code: 'PH-BAN',
    country: 'Philippines',
    name: 'Bataan'
}, {
    code: 'PH-BTN',
    country: 'Philippines',
    name: 'Batanes'
}, {
    code: 'PH-BTG',
    country: 'Philippines',
    name: 'Batangas'
}, {
    code: 'PH-BEN',
    country: 'Philippines',
    name: 'Benguet'
}, {
    code: 'PH-05',
    country: 'Philippines',
    name: 'Bicol'
}, {
    code: 'PH-BIL',
    country: 'Philippines',
    name: 'Biliran'
}, {
    code: 'PH-BOH',
    country: 'Philippines',
    name: 'Bohol'
}, {
    code: 'PH-BUK',
    country: 'Philippines',
    name: 'Bukidnon'
}, {
    code: 'PH-BUL',
    country: 'Philippines',
    name: 'Bulacan'
}, {
    code: 'PH-CAG',
    country: 'Philippines',
    name: 'Cagayan'
}, {
    code: 'PH-02',
    country: 'Philippines',
    name: 'Cagayan Valley'
}, {
    code: 'PH-40',
    country: 'Philippines',
    name: 'Calabarzon'
}, {
    code: 'PH-CAN',
    country: 'Philippines',
    name: 'Camarines Norte'
}, {
    code: 'PH-CAS',
    country: 'Philippines',
    name: 'Camarines Sur'
}, {
    code: 'PH-CAM',
    country: 'Philippines',
    name: 'Camiguin'
}, {
    code: 'PH-CAP',
    country: 'Philippines',
    name: 'Capiz'
}, {
    code: 'PH-13',
    country: 'Philippines',
    name: 'Caraga'
}, {
    code: 'PH-CAT',
    country: 'Philippines',
    name: 'Catanduanes'
}, {
    code: 'PH-CAV',
    country: 'Philippines',
    name: 'Cavite'
}, {
    code: 'PH-CEB',
    country: 'Philippines',
    name: 'Cebu'
}, {
    code: 'PH-03',
    country: 'Philippines',
    name: 'Central Luzon'
}, {
    code: 'PH-07',
    country: 'Philippines',
    name: 'Central Visayas'
}, {
    code: 'PH-COM',
    country: 'Philippines',
    name: 'Compostela Valley'
}, {
    code: 'PH-15',
    country: 'Philippines',
    name: 'Cordillera Administrative Region'
}, {
    code: 'PH-NCO',
    country: 'Philippines',
    name: 'Cotabato'
}, {
    code: 'PH-DAV',
    country: 'Philippines',
    name: 'Davao del Norte'
}, {
    code: 'PH-DAS',
    country: 'Philippines',
    name: 'Davao del Sur'
}, {
    code: 'PH-DAO',
    country: 'Philippines',
    name: 'Davao Oriental'
}, {
    code: 'PH-11',
    country: 'Philippines',
    name: 'Davao'
}, {
    code: 'PH-DIN',
    country: 'Philippines',
    name: 'Dinagat Islands'
}, {
    code: 'PH-EAS',
    country: 'Philippines',
    name: 'Eastern Samar'
}, {
    code: 'PH-08',
    country: 'Philippines',
    name: 'Eastern Visayas'
}, {
    code: 'PH-GUI',
    country: 'Philippines',
    name: 'Guimaras'
}, {
    code: 'PH-IFU',
    country: 'Philippines',
    name: 'Ifugao'
}, {
    code: 'PH-ILN',
    country: 'Philippines',
    name: 'Ilocos Norte'
}, {
    code: 'PH-01',
    country: 'Philippines',
    name: 'Ilocos'
}, {
    code: 'PH-ILS',
    country: 'Philippines',
    name: 'Ilocos Sur'
}, {
    code: 'PH-ILI',
    country: 'Philippines',
    name: 'Iloilo'
}, {
    code: 'PH-ISA',
    country: 'Philippines',
    name: 'Isabela'
}, {
    code: 'PH-KAL',
    country: 'Philippines',
    name: 'Kalinga'
}, {
    code: 'PH-LUN',
    country: 'Philippines',
    name: 'La Union'
}, {
    code: 'PH-LAG',
    country: 'Philippines',
    name: 'Laguna'
}, {
    code: 'PH-LAN',
    country: 'Philippines',
    name: 'Lanao del Norte'
}, {
    code: 'PH-LAS',
    country: 'Philippines',
    name: 'Lanao del Sur'
}, {
    code: 'PH-LEY',
    country: 'Philippines',
    name: 'Leyte'
}, {
    code: 'PH-MAG',
    country: 'Philippines',
    name: 'Maguindanao'
}, {
    code: 'PH-MAD',
    country: 'Philippines',
    name: 'Marinduque'
}, {
    code: 'PH-MAS',
    country: 'Philippines',
    name: 'Masbate'
}, {
    code: 'PH-41',
    country: 'Philippines',
    name: 'Mimaropa'
}, {
    code: 'PH-MDC',
    country: 'Philippines',
    name: 'Mindoro Occidental'
}, {
    code: 'PH-MDR',
    country: 'Philippines',
    name: 'Mindoro Oriental'
}, {
    code: 'PH-MSC',
    country: 'Philippines',
    name: 'Misamis Occidental'
}, {
    code: 'PH-MSR',
    country: 'Philippines',
    name: 'Misamis Oriental'
}, {
    code: 'PH-MOU',
    country: 'Philippines',
    name: 'Mountain Province'
}, {
    code: 'PH-00',
    country: 'Philippines',
    name: 'National Capital Region'
}, {
    code: 'PH-NEC',
    country: 'Philippines',
    name: 'Negros Occidental'
}, {
    code: 'PH-NER',
    country: 'Philippines',
    name: 'Negros Oriental'
}, {
    code: 'PH-10',
    country: 'Philippines',
    name: 'Northern Mindanao'
}, {
    code: 'PH-NSA',
    country: 'Philippines',
    name: 'Northern Samar'
}, {
    code: 'PH-NUE',
    country: 'Philippines',
    name: 'Nueva Ecija'
}, {
    code: 'PH-NUV',
    country: 'Philippines',
    name: 'Nueva Vizcaya'
}, {
    code: 'PH-PLW',
    country: 'Philippines',
    name: 'Palawan'
}, {
    code: 'PH-PAM',
    country: 'Philippines',
    name: 'Pampanga'
}, {
    code: 'PH-PAN',
    country: 'Philippines',
    name: 'Pangasinan'
}, {
    code: 'PH-QUE',
    country: 'Philippines',
    name: 'Quezon'
}, {
    code: 'PH-QUI',
    country: 'Philippines',
    name: 'Quirino'
}, {
    code: 'PH-RIZ',
    country: 'Philippines',
    name: 'Rizal'
}, {
    code: 'PH-ROM',
    country: 'Philippines',
    name: 'Romblon'
}, {
    code: 'PH-WSA',
    country: 'Philippines',
    name: 'Samar'
}, {
    code: 'PH-SAR',
    country: 'Philippines',
    name: 'Sarangani'
}, {
    code: 'PH-SIG',
    country: 'Philippines',
    name: 'Siquijor'
}, {
    code: 'PH-12',
    country: 'Philippines',
    name: 'Soccsksargen'
}, {
    code: 'PH-SOR',
    country: 'Philippines',
    name: 'Sorsogon'
}, {
    code: 'PH-SCO',
    country: 'Philippines',
    name: 'South Cotabato'
}, {
    code: 'PH-SLE',
    country: 'Philippines',
    name: 'Southern Leyte'
}, {
    code: 'PH-SUK',
    country: 'Philippines',
    name: 'Sultan Kudarat'
}, {
    code: 'PH-SLU',
    country: 'Philippines',
    name: 'Sulu'
}, {
    code: 'PH-SUN',
    country: 'Philippines',
    name: 'Surigao del Norte'
}, {
    code: 'PH-SUR',
    country: 'Philippines',
    name: 'Surigao del Sur'
}, {
    code: 'PH-TAR',
    country: 'Philippines',
    name: 'Tarlac'
}, {
    code: 'PH-TAW',
    country: 'Philippines',
    name: 'Tawi-Tawi'
}, {
    code: 'PH-06',
    country: 'Philippines',
    name: 'Western Visayas'
}, {
    code: 'PH-ZMB',
    country: 'Philippines',
    name: 'Zambales'
}, {
    code: 'PH-ZAN',
    country: 'Philippines',
    name: 'Zamboanga del Norte'
}, {
    code: 'PH-ZAS',
    country: 'Philippines',
    name: 'Zamboanga del Sur'
}, {
    code: 'PH-09',
    country: 'Philippines',
    name: 'Zamboanga Peninsula'
}, {
    code: 'PH-ZSI',
    country: 'Philippines',
    name: 'Zamboanga Sibugay'
}, {
    code: 'PL-WP',
    country: 'Poland',
    name: 'Greater Poland'
}, {
    code: 'PL-SK',
    country: 'Poland',
    name: 'Holy Cross'
}, {
    code: 'PL-KP',
    country: 'Poland',
    name: 'Kuyavia-Pomerania'
}, {
    code: 'PL-MA',
    country: 'Poland',
    name: 'Lesser Poland'
}, {
    code: 'PL-LD',
    country: 'Poland',
    name: 'Łódź'
}, {
    code: 'PL-DS',
    country: 'Poland',
    name: 'Lower Silesia'
}, {
    code: 'PL-LU',
    country: 'Poland',
    name: 'Lublin'
}, {
    code: 'PL-LB',
    country: 'Poland',
    name: 'Lubusz'
}, {
    code: 'PL-MZ',
    country: 'Poland',
    name: 'Mazovia'
}, {
    code: 'PL-OP',
    country: 'Poland',
    name: 'Opole'
}, {
    code: 'PL-PD',
    country: 'Poland',
    name: 'Podlaskie'
}, {
    code: 'PL-PM',
    country: 'Poland',
    name: 'Pomerania'
}, {
    code: 'PL-SL',
    country: 'Poland',
    name: 'Silesia'
}, {
    code: 'PL-PK',
    country: 'Poland',
    name: 'Subcarpathia'
}, {
    code: 'PL-WN',
    country: 'Poland',
    name: 'Warmia-Masuria'
}, {
    code: 'PL-ZP',
    country: 'Poland',
    name: 'West Pomerania'
}, {
    code: 'PT-01',
    country: 'Portugal',
    name: 'Aveiro'
}, {
    code: 'PT-02',
    country: 'Portugal',
    name: 'Beja'
}, {
    code: 'PT-03',
    country: 'Portugal',
    name: 'Braga'
}, {
    code: 'PT-04',
    country: 'Portugal',
    name: 'Bragança'
}, {
    code: 'PT-05',
    country: 'Portugal',
    name: 'Castelo Branco'
}, {
    code: 'PT-06',
    country: 'Portugal',
    name: 'Coimbra'
}, {
    code: 'PT-07',
    country: 'Portugal',
    name: 'Évora'
}, {
    code: 'PT-08',
    country: 'Portugal',
    name: 'Faro'
}, {
    code: 'PT-09',
    country: 'Portugal',
    name: 'Guarda'
}, {
    code: 'PT-10',
    country: 'Portugal',
    name: 'Leiria'
}, {
    code: 'PT-11',
    country: 'Portugal',
    name: 'Lisboa'
}, {
    code: 'PT-12',
    country: 'Portugal',
    name: 'Portalegre'
}, {
    code: 'PT-13',
    country: 'Portugal',
    name: 'Porto'
}, {
    code: 'PT-30',
    country: 'Portugal',
    name: 'Região Autónoma da Madeira'
}, {
    code: 'PT-20',
    country: 'Portugal',
    name: 'Região Autónoma dos Açores'
}, {
    code: 'PT-14',
    country: 'Portugal',
    name: 'Santarém'
}, {
    code: 'PT-15',
    country: 'Portugal',
    name: 'Setúbal'
}, {
    code: 'PT-16',
    country: 'Portugal',
    name: 'Viana do Castelo'
}, {
    code: 'PT-17',
    country: 'Portugal',
    name: 'Vila Real'
}, {
    code: 'PT-18',
    country: 'Portugal',
    name: 'Viseu'
}, {
    code: 'KR-26',
    country: 'Republic of Korea',
    name: 'Busan'
}, {
    code: 'KR-43',
    country: 'Republic of Korea',
    name: 'Chungcheongbuk-do'
}, {
    code: 'KR-44',
    country: 'Republic of Korea',
    name: 'Chungcheongnam-do'
}, {
    code: 'KR-27',
    country: 'Republic of Korea',
    name: 'Daegu'
}, {
    code: 'KR-30',
    country: 'Republic of Korea',
    name: 'Daejeon'
}, {
    code: 'KR-42',
    country: 'Republic of Korea',
    name: 'Gangwon-do'
}, {
    code: 'KR-29',
    country: 'Republic of Korea',
    name: 'Gwangju'
}, {
    code: 'KR-41',
    country: 'Republic of Korea',
    name: 'Gyeonggi-do'
}, {
    code: 'KR-47',
    country: 'Republic of Korea',
    name: 'Gyeongsangbuk-do'
}, {
    code: 'KR-48',
    country: 'Republic of Korea',
    name: 'Gyeongsangnam-do'
}, {
    code: 'KR-28',
    country: 'Republic of Korea',
    name: 'Incheon'
}, {
    code: 'KR-49',
    country: 'Republic of Korea',
    name: 'Jeju'
}, {
    code: 'KR-45',
    country: 'Republic of Korea',
    name: 'Jeollabuk-do'
}, {
    code: 'KR-46',
    country: 'Republic of Korea',
    name: 'Jeollanam-do'
}, {
    code: 'KR-50',
    country: 'Republic of Korea',
    name: 'Sejong'
}, {
    code: 'KR-11',
    country: 'Republic of Korea',
    name: 'Seoul'
}, {
    code: 'KR-31',
    country: 'Republic of Korea',
    name: 'Ulsan'
}, {
    code: 'GB-ABE',
    country: 'Scotland',
    name: 'Aberdeen City'
}, {
    code: 'GB-ABD',
    country: 'Scotland',
    name: 'Aberdeenshire'
}, {
    code: 'GB-ANS',
    country: 'Scotland',
    name: 'Angus'
}, {
    code: 'GB-AGB',
    country: 'Scotland',
    name: 'Argyll & Bute'
}, {
    code: 'GB-CLK',
    country: 'Scotland',
    name: 'Clackmannanshire'
}, {
    code: 'GB-DGY',
    country: 'Scotland',
    name: 'Dumfries & Galloway'
}, {
    code: 'GB-DND',
    country: 'Scotland',
    name: 'Dundee City'
}, {
    code: 'GB-EAY',
    country: 'Scotland',
    name: 'East Ayrshire'
}, {
    code: 'GB-EDU',
    country: 'Scotland',
    name: 'East Dunbartonshire'
}, {
    code: 'GB-ELN',
    country: 'Scotland',
    name: 'East Lothian'
}, {
    code: 'GB-ERW',
    country: 'Scotland',
    name: 'East Renfrewshire'
}, {
    code: 'GB-EDH',
    country: 'Scotland',
    name: 'Edinburgh'
}, {
    code: 'GB-ELS',
    country: 'Scotland',
    name: 'Eilean Siar'
}, {
    code: 'GB-FAL',
    country: 'Scotland',
    name: 'Falkirk'
}, {
    code: 'GB-FIF',
    country: 'Scotland',
    name: 'Fife'
}, {
    code: 'GB-GLG',
    country: 'Scotland',
    name: 'Glasgow'
}, {
    code: 'GB-HLD',
    country: 'Scotland',
    name: 'Highlands'
}, {
    code: 'GB-IVC',
    country: 'Scotland',
    name: 'Inverclyde'
}, {
    code: 'GB-MLN',
    country: 'Scotland',
    name: 'Midlothian'
}, {
    code: 'GB-MRY',
    country: 'Scotland',
    name: 'Moray'
}, {
    code: 'GB-NAY',
    country: 'Scotland',
    name: 'North Ayrshire'
}, {
    code: 'GB-NLK',
    country: 'Scotland',
    name: 'North Lanarkshire'
}, {
    code: 'GB-ORK',
    country: 'Scotland',
    name: 'Orkney Islands'
}, {
    code: 'GB-PKN',
    country: 'Scotland',
    name: 'Perth & Kinross'
}, {
    code: 'GB-RFW',
    country: 'Scotland',
    name: 'Renfrewshire'
}, {
    code: 'GB-SCB',
    country: 'Scotland',
    name: 'Scottish Borders'
}, {
    code: 'GB-ZET',
    country: 'Scotland',
    name: 'Shetland Islands'
}, {
    code: 'GB-SAY',
    country: 'Scotland',
    name: 'South Ayrshire'
}, {
    code: 'GB-SLK',
    country: 'Scotland',
    name: 'South Lanarkshire'
}, {
    code: 'GB-STG',
    country: 'Scotland',
    name: 'Stirling'
}, {
    code: 'GB-WDU',
    country: 'Scotland',
    name: 'West Dunbartonshire'
}, {
    code: 'GB-WLN',
    country: 'Scotland',
    name: 'West Lothian'
}, {
    code: 'SC-01',
    country: 'Seychelles',
    name: 'Anse aux Pins'
}, {
    code: 'SC-02',
    country: 'Seychelles',
    name: 'Anse Boileau'
}, {
    code: 'SC-03',
    country: 'Seychelles',
    name: 'Anse Etoile'
}, {
    code: 'SC-05',
    country: 'Seychelles',
    name: 'Anse Royale'
}, {
    code: 'SC-04',
    country: 'Seychelles',
    name: 'Au Cap'
}, {
    code: 'SC-06',
    country: 'Seychelles',
    name: 'Baie Lazare'
}, {
    code: 'SC-07',
    country: 'Seychelles',
    name: 'Baie Sainte Anne'
}, {
    code: 'SC-08',
    country: 'Seychelles',
    name: 'Beau Vallon'
}, {
    code: 'SC-09',
    country: 'Seychelles',
    name: 'Bel Air'
}, {
    code: 'SC-10',
    country: 'Seychelles',
    name: 'Bel Ombre'
}, {
    code: 'SC-11',
    country: 'Seychelles',
    name: 'Cascade'
}, {
    code: 'SC-16',
    country: 'Seychelles',
    name: 'English River'
}, {
    code: 'SC-12',
    country: 'Seychelles',
    name: 'Glacis'
}, {
    code: 'SC-13',
    country: 'Seychelles',
    name: 'Grand Anse Mahe'
}, {
    code: 'SC-14',
    country: 'Seychelles',
    name: 'Grand Anse Praslin'
}, {
    code: 'SC-15',
    country: 'Seychelles',
    name: 'La Digue'
}, {
    code: 'SC-24',
    country: 'Seychelles',
    name: 'Les Mamelles'
}, {
    code: 'SC-17',
    country: 'Seychelles',
    name: 'Mont Buxton'
}, {
    code: 'SC-18',
    country: 'Seychelles',
    name: 'Mont Fleuri'
}, {
    code: 'SC-19',
    country: 'Seychelles',
    name: 'Plaisance'
}, {
    code: 'SC-20',
    country: 'Seychelles',
    name: 'Pointe Larue'
}, {
    code: 'SC-21',
    country: 'Seychelles',
    name: 'Port Glaud'
}, {
    code: 'SC-25',
    country: 'Seychelles',
    name: 'Roche Caiman'
}, {
    code: 'SC-22',
    country: 'Seychelles',
    name: 'Saint Louis'
}, {
    code: 'SC-23',
    country: 'Seychelles',
    name: 'Takamaka'
}, {
    code: 'SG-01',
    country: 'Singapore',
    name: 'Central Singapore'
}, {
    code: 'SG-02',
    country: 'Singapore',
    name: 'North East'
}, {
    code: 'SG-03',
    country: 'Singapore',
    name: 'North West'
}, {
    code: 'SG-04',
    country: 'Singapore',
    name: 'South East'
}, {
    code: 'SG-05',
    country: 'Singapore',
    name: 'South West'
}, {
    code: 'SK-BC',
    country: 'Slovakia',
    name: 'Banskobystrický kraj'
}, {
    code: 'SK-BL',
    country: 'Slovakia',
    name: 'Bratislavský kraj'
}, {
    code: 'SK-KI',
    country: 'Slovakia',
    name: 'Košický kraj'
}, {
    code: 'SK-NI',
    country: 'Slovakia',
    name: 'Nitriansky kraj'
}, {
    code: 'SK-PV',
    country: 'Slovakia',
    name: 'Prešovský kraj'
}, {
    code: 'SK-TC',
    country: 'Slovakia',
    name: 'Trenčiansky kraj'
}, {
    code: 'SK-TA',
    country: 'Slovakia',
    name: 'Trnavsky kraj'
}, {
    code: 'SK-ZI',
    country: 'Slovakia',
    name: 'Žilinský kraj'
}, {
    code: 'ZA-EC',
    country: 'South Africa',
    name: 'Eastern Cape'
}, {
    code: 'ZA-FS',
    country: 'South Africa',
    name: 'Free State'
}, {
    code: 'ZA-GT',
    country: 'South Africa',
    name: 'Gauteng'
}, {
    code: 'ZA-NL',
    country: 'South Africa',
    name: 'Kwazulu-Natal'
}, {
    code: 'ZA-LP',
    country: 'South Africa',
    name: 'Limpopo'
}, {
    code: 'ZA-MP',
    country: 'South Africa',
    name: 'Mpumalanga'
}, {
    code: 'ZA-NW',
    country: 'South Africa',
    name: 'North-West (South Africa)'
}, {
    code: 'ZA-NC',
    country: 'South Africa',
    name: 'Northern Cape'
}, {
    code: 'ZA-WC',
    country: 'South Africa',
    name: 'Western Cape'
}, {
    code: 'LK-52',
    country: 'Sri Lanka',
    name: 'Ampara'
}, {
    code: 'LK-71',
    country: 'Sri Lanka',
    name: 'Anuradhapura'
}, {
    code: 'LK-81',
    country: 'Sri Lanka',
    name: 'Badulla'
}, {
    code: 'LK-51',
    country: 'Sri Lanka',
    name: 'Batticaloa'
}, {
    code: 'LK-2',
    country: 'Sri Lanka',
    name: 'Central Province'
}, {
    code: 'LK-11',
    country: 'Sri Lanka',
    name: 'Colombo'
}, {
    code: 'LK-5',
    country: 'Sri Lanka',
    name: 'Eastern Province'
}, {
    code: 'LK-31',
    country: 'Sri Lanka',
    name: 'Galle'
}, {
    code: 'LK-12',
    country: 'Sri Lanka',
    name: 'Gampaha'
}, {
    code: 'LK-33',
    country: 'Sri Lanka',
    name: 'Hambantota'
}, {
    code: 'LK-41',
    country: 'Sri Lanka',
    name: 'Jaffna'
}, {
    code: 'LK-13',
    country: 'Sri Lanka',
    name: 'Kalutara'
}, {
    code: 'LK-21',
    country: 'Sri Lanka',
    name: 'Kandy'
}, {
    code: 'LK-92',
    country: 'Sri Lanka',
    name: 'Kegalla'
}, {
    code: 'LK-42',
    country: 'Sri Lanka',
    name: 'Kilinochchi'
}, {
    code: 'LK-61',
    country: 'Sri Lanka',
    name: 'Kurunegala'
}, {
    code: 'LK-43',
    country: 'Sri Lanka',
    name: 'Mannar'
}, {
    code: 'LK-22',
    country: 'Sri Lanka',
    name: 'Matale'
}, {
    code: 'LK-32',
    country: 'Sri Lanka',
    name: 'Matara'
}, {
    code: 'LK-82',
    country: 'Sri Lanka',
    name: 'Monaragala'
}, {
    code: 'LK-45',
    country: 'Sri Lanka',
    name: 'Mullaittivu'
}, {
    code: 'LK-7',
    country: 'Sri Lanka',
    name: 'North Central Province'
}, {
    code: 'LK-6',
    country: 'Sri Lanka',
    name: 'North Western Province'
}, {
    code: 'LK-4',
    country: 'Sri Lanka',
    name: 'Northern Province'
}, {
    code: 'LK-23',
    country: 'Sri Lanka',
    name: 'Nuwara Eliya'
}, {
    code: 'LK-72',
    country: 'Sri Lanka',
    name: 'Polonnaruwa'
}, {
    code: 'LK-62',
    country: 'Sri Lanka',
    name: 'Puttalam'
}, {
    code: 'LK-91',
    country: 'Sri Lanka',
    name: 'Ratnapura'
}, {
    code: 'LK-9',
    country: 'Sri Lanka',
    name: 'Sabaragamuwa Province'
}, {
    code: 'LK-3',
    country: 'Sri Lanka',
    name: 'Southern Province'
}, {
    code: 'LK-53',
    country: 'Sri Lanka',
    name: 'Trincomalee'
}, {
    code: 'LK-8',
    country: 'Sri Lanka',
    name: 'Uva Province'
}, {
    code: 'LK-44',
    country: 'Sri Lanka',
    name: 'Vavuniya'
}, {
    code: 'LK-1',
    country: 'Sri Lanka',
    name: 'Western Province'
}, {
    code: 'SD-NB',
    country: 'Sudan',
    name: 'Blue Nile'
}, {
    code: 'SD-DC',
    country: 'Sudan',
    name: 'Central Darfur'
}, {
    code: 'SD-DE',
    country: 'Sudan',
    name: 'East Darfur'
}, {
    code: 'SD-GD',
    country: 'Sudan',
    name: 'Gedaref'
}, {
    code: 'SD-GZ',
    country: 'Sudan',
    name: 'Gezira'
}, {
    code: 'SD-KA',
    country: 'Sudan',
    name: 'Kassala'
}, {
    code: 'SD-KH',
    country: 'Sudan',
    name: 'Khartoum'
}, {
    code: 'SD-DN',
    country: 'Sudan',
    name: 'North Darfur'
}, {
    code: 'SD-KN',
    country: 'Sudan',
    name: 'North Kordofan'
}, {
    code: 'SD-NO',
    country: 'Sudan',
    name: 'Northern'
}, {
    code: 'SD-RS',
    country: 'Sudan',
    name: 'Red Sea'
}, {
    code: 'SD-NR',
    country: 'Sudan',
    name: 'River Nile'
}, {
    code: 'SD-SI',
    country: 'Sudan',
    name: 'Sennar'
}, {
    code: 'SD-DS',
    country: 'Sudan',
    name: 'South Darfur'
}, {
    code: 'SD-KS',
    country: 'Sudan',
    name: 'South Kordofan'
}, {
    code: 'SD-DW',
    country: 'Sudan',
    name: 'West Darfur'
}, {
    code: 'SD-NW',
    country: 'Sudan',
    name: 'White Nile'
}, {
    code: 'SZ-HH',
    country: 'Eswatini',
    name: 'Hhohho'
}, {
    code: 'SZ-LU',
    country: 'Eswatini',
    name: 'Lubombo'
}, {
    code: 'SZ-MA',
    country: 'Eswatini',
    name: 'Manzini'
}, {
    code: 'SZ-SH',
    country: 'Eswatini',
    name: 'Shiselweni'
}, {
    code: 'SE-K',
    country: 'Sweden',
    name: 'Blekinge län'
}, {
    code: 'SE-W',
    country: 'Sweden',
    name: 'Dalarnas län'
}, {
    code: 'SE-X',
    country: 'Sweden',
    name: 'Gävleborgs län'
}, {
    code: 'SE-I',
    country: 'Sweden',
    name: 'Gotlands län'
}, {
    code: 'SE-N',
    country: 'Sweden',
    name: 'Hallands län'
}, {
    code: 'SE-Z',
    country: 'Sweden',
    name: 'Jämtlands län'
}, {
    code: 'SE-F',
    country: 'Sweden',
    name: 'Jönköpings län'
}, {
    code: 'SE-H',
    country: 'Sweden',
    name: 'Kalmar län'
}, {
    code: 'SE-G',
    country: 'Sweden',
    name: 'Kronobergs län'
}, {
    code: 'SE-BD',
    country: 'Sweden',
    name: 'Norrbottens län'
}, {
    code: 'SE-T',
    country: 'Sweden',
    name: 'Örebro län'
}, {
    code: 'SE-E',
    country: 'Sweden',
    name: 'Östergötlands län'
}, {
    code: 'SE-M',
    country: 'Sweden',
    name: 'Skåne län'
}, {
    code: 'SE-D',
    country: 'Sweden',
    name: 'Södermanlands län'
}, {
    code: 'SE-AB',
    country: 'Sweden',
    name: 'Stockholms län'
}, {
    code: 'SE-C',
    country: 'Sweden',
    name: 'Uppsala län'
}, {
    code: 'SE-S',
    country: 'Sweden',
    name: 'Värmlands län'
}, {
    code: 'SE-AC',
    country: 'Sweden',
    name: 'Västerbottens län'
}, {
    code: 'SE-Y',
    country: 'Sweden',
    name: 'Västernorrlands län'
}, {
    code: 'SE-U',
    country: 'Sweden',
    name: 'Västmanlands län'
}, {
    code: 'SE-O',
    country: 'Sweden',
    name: 'Västra Götalands län'
}, {
    code: 'CH-AG',
    country: 'Switzerland',
    name: 'Aargau'
}, {
    code: 'CH-AR',
    country: 'Switzerland',
    name: 'Appenzell Ausserrhoden'
}, {
    code: 'CH-AI',
    country: 'Switzerland',
    name: 'Appenzell Innerrhoden'
}, {
    code: 'CH-BL',
    country: 'Switzerland',
    name: 'Basel-Landschaft'
}, {
    code: 'CH-BS',
    country: 'Switzerland',
    name: 'Basel-Stadt'
}, {
    code: 'CH-BE',
    country: 'Switzerland',
    name: 'Bern, Berne'
}, {
    code: 'CH-FR',
    country: 'Switzerland',
    name: 'Fribourg, Freiburg'
}, {
    code: 'CH-GE',
    country: 'Switzerland',
    name: 'Genève'
}, {
    code: 'CH-GL',
    country: 'Switzerland',
    name: 'Glarus'
}, {
    code: 'CH-GR',
    country: 'Switzerland',
    name: 'Graubünden, Grigioni , Grischun'
}, {
    code: 'CH-JU',
    country: 'Switzerland',
    name: 'Jura'
}, {
    code: 'CH-LU',
    country: 'Switzerland',
    name: 'Luzern'
}, {
    code: 'CH-NE',
    country: 'Switzerland',
    name: 'Neuchâtel'
}, {
    code: 'CH-NW',
    country: 'Switzerland',
    name: 'Nidwalden'
}, {
    code: 'CH-OW',
    country: 'Switzerland',
    name: 'Obwalden'
}, {
    code: 'CH-SG',
    country: 'Switzerland',
    name: 'Sankt Gallen'
}, {
    code: 'CH-SH',
    country: 'Switzerland',
    name: 'Schaffhausen'
}, {
    code: 'CH-SZ',
    country: 'Switzerland',
    name: 'Schwyz'
}, {
    code: 'CH-SO',
    country: 'Switzerland',
    name: 'Solothurn'
}, {
    code: 'CH-TG',
    country: 'Switzerland',
    name: 'Thurgau'
}, {
    code: 'CH-TI',
    country: 'Switzerland',
    name: 'Ticino'
}, {
    code: 'CH-UR',
    country: 'Switzerland',
    name: 'Uri'
}, {
    code: 'CH-VS',
    country: 'Switzerland',
    name: 'Valais, Wallis'
}, {
    code: 'CH-VD',
    country: 'Switzerland',
    name: 'Vaud'
}, {
    code: 'CH-ZG',
    country: 'Switzerland',
    name: 'Zug'
}, {
    code: 'CH-ZH',
    country: 'Switzerland',
    name: 'Zürich'
}, {
    code: 'TW-CHA',
    country: 'Chinese Taipei',
    name: 'Changhua'
}, {
    code: 'TW-HSQ',
    country: 'Chinese Taipei',
    name: 'Hsinchu'
}, {
    code: 'TW-HSZ',
    country: 'Chinese Taipei',
    name: 'Hsinchui City'
}, {
    code: 'TW-ILA',
    country: 'Chinese Taipei',
    name: 'Ilan'
}, {
    code: 'TW-KHQ',
    country: 'Chinese Taipei',
    name: 'Kaohsiung'
}, {
    code: 'TW-MIA',
    country: 'Chinese Taipei',
    name: 'Miaoli'
}, {
    code: 'TW-NAN',
    country: 'Chinese Taipei',
    name: 'Nantou'
}, {
    code: 'TW-PIF',
    country: 'Chinese Taipei',
    name: 'Pingtung'
}, {
    code: 'TW-TXQ',
    country: 'Chinese Taipei',
    name: 'Taichung'
}, {
    code: 'TW-TNQ',
    country: 'Chinese Taipei',
    name: 'Tainan'
}, {
    code: 'TW-TPQ',
    country: 'Chinese Taipei',
    name: 'Taipei'
}, {
    code: 'TW-TAO',
    country: 'Chinese Taipei',
    name: 'Taoyuan'
}, {
    code: 'TH-37',
    country: 'Thailand',
    name: 'Amnat Charoen'
}, {
    code: 'TH-15',
    country: 'Thailand',
    name: 'Ang Thong'
}, {
    code: 'TH-38',
    country: 'Thailand',
    name: 'Bueng Kan'
}, {
    code: 'TH-31',
    country: 'Thailand',
    name: 'Buri Ram'
}, {
    code: 'TH-24',
    country: 'Thailand',
    name: 'Chachoengsao'
}, {
    code: 'TH-18',
    country: 'Thailand',
    name: 'Chai Nat'
}, {
    code: 'TH-36',
    country: 'Thailand',
    name: 'Chaiyaphum'
}, {
    code: 'TH-22',
    country: 'Thailand',
    name: 'Chanthaburi'
}, {
    code: 'TH-50',
    country: 'Thailand',
    name: 'Chiang Mai'
}, {
    code: 'TH-57',
    country: 'Thailand',
    name: 'Chiang Rai'
}, {
    code: 'TH-20',
    country: 'Thailand',
    name: 'Chon Buri'
}, {
    code: 'TH-86',
    country: 'Thailand',
    name: 'Chumphon'
}, {
    code: 'TH-46',
    country: 'Thailand',
    name: 'Kalasin'
}, {
    code: 'TH-62',
    country: 'Thailand',
    name: 'Kamphaeng Phet'
}, {
    code: 'TH-71',
    country: 'Thailand',
    name: 'Kanchanaburi'
}, {
    code: 'TH-40',
    country: 'Thailand',
    name: 'Khon Kaen'
}, {
    code: 'TH-81',
    country: 'Thailand',
    name: 'Krabi'
}, {
    code: 'TH-10',
    country: 'Thailand',
    name: 'Krung Thep Maha Nakhon'
}, {
    code: 'TH-52',
    country: 'Thailand',
    name: 'Lampang'
}, {
    code: 'TH-51',
    country: 'Thailand',
    name: 'Lamphun'
}, {
    code: 'TH-42',
    country: 'Thailand',
    name: 'Loei'
}, {
    code: 'TH-16',
    country: 'Thailand',
    name: 'Lop Buri'
}, {
    code: 'TH-58',
    country: 'Thailand',
    name: 'Mae Hong Son'
}, {
    code: 'TH-44',
    country: 'Thailand',
    name: 'Maha Sarakham'
}, {
    code: 'TH-49',
    country: 'Thailand',
    name: 'Mukdahan'
}, {
    code: 'TH-26',
    country: 'Thailand',
    name: 'Nakhon Nayok'
}, {
    code: 'TH-73',
    country: 'Thailand',
    name: 'Nakhon Pathom'
}, {
    code: 'TH-48',
    country: 'Thailand',
    name: 'Nakhon Phanom'
}, {
    code: 'TH-30',
    country: 'Thailand',
    name: 'Nakhon Ratchasima'
}, {
    code: 'TH-60',
    country: 'Thailand',
    name: 'Nakhon Sawan'
}, {
    code: 'TH-80',
    country: 'Thailand',
    name: 'Nakhon Si Thammarat'
}, {
    code: 'TH-55',
    country: 'Thailand',
    name: 'Nan'
}, {
    code: 'TH-96',
    country: 'Thailand',
    name: 'Narathiwat'
}, {
    code: 'TH-39',
    country: 'Thailand',
    name: 'Nong Bua Lam Phu'
}, {
    code: 'TH-43',
    country: 'Thailand',
    name: 'Nong Khai'
}, {
    code: 'TH-12',
    country: 'Thailand',
    name: 'Nonthaburi'
}, {
    code: 'TH-13',
    country: 'Thailand',
    name: 'Pathum Thani'
}, {
    code: 'TH-94',
    country: 'Thailand',
    name: 'Pattani'
}, {
    code: 'TH-82',
    country: 'Thailand',
    name: 'Phangnga'
}, {
    code: 'TH-93',
    country: 'Thailand',
    name: 'Phatthalung'
}, {
    code: 'TH-S',
    country: 'Thailand',
    name: 'Phatthaya'
}, {
    code: 'TH-56',
    country: 'Thailand',
    name: 'Phayao'
}, {
    code: 'TH-67',
    country: 'Thailand',
    name: 'Phetchabun'
}, {
    code: 'TH-76',
    country: 'Thailand',
    name: 'Phetchaburi'
}, {
    code: 'TH-66',
    country: 'Thailand',
    name: 'Phichit'
}, {
    code: 'TH-65',
    country: 'Thailand',
    name: 'Phitsanulok'
}, {
    code: 'TH-14',
    country: 'Thailand',
    name: 'Phra Nakhon Si Ayutthaya'
}, {
    code: 'TH-54',
    country: 'Thailand',
    name: 'Phrae'
}, {
    code: 'TH-83',
    country: 'Thailand',
    name: 'Phuket'
}, {
    code: 'TH-25',
    country: 'Thailand',
    name: 'Prachin Buri'
}, {
    code: 'TH-77',
    country: 'Thailand',
    name: 'Prachuap Khiri Khan'
}, {
    code: 'TH-85',
    country: 'Thailand',
    name: 'Ranong'
}, {
    code: 'TH-70',
    country: 'Thailand',
    name: 'Ratchaburi'
}, {
    code: 'TH-21',
    country: 'Thailand',
    name: 'Rayong'
}, {
    code: 'TH-45',
    country: 'Thailand',
    name: 'Roi Et'
}, {
    code: 'TH-27',
    country: 'Thailand',
    name: 'Sa Kaeo'
}, {
    code: 'TH-47',
    country: 'Thailand',
    name: 'Sakon Nakhon'
}, {
    code: 'TH-11',
    country: 'Thailand',
    name: 'Samut Prakan'
}, {
    code: 'TH-74',
    country: 'Thailand',
    name: 'Samut Sakhon'
}, {
    code: 'TH-75',
    country: 'Thailand',
    name: 'Samut Songkhram'
}, {
    code: 'TH-19',
    country: 'Thailand',
    name: 'Saraburi'
}, {
    code: 'TH-91',
    country: 'Thailand',
    name: 'Satun'
}, {
    code: 'TH-33',
    country: 'Thailand',
    name: 'Si Sa Ket'
}, {
    code: 'TH-17',
    country: 'Thailand',
    name: 'Sing Buri'
}, {
    code: 'TH-90',
    country: 'Thailand',
    name: 'Songkhla'
}, {
    code: 'TH-64',
    country: 'Thailand',
    name: 'Sukhothai'
}, {
    code: 'TH-72',
    country: 'Thailand',
    name: 'Suphan Buri'
}, {
    code: 'TH-84',
    country: 'Thailand',
    name: 'Surat Thani'
}, {
    code: 'TH-32',
    country: 'Thailand',
    name: 'Surin'
}, {
    code: 'TH-63',
    country: 'Thailand',
    name: 'Tak'
}, {
    code: 'TH-92',
    country: 'Thailand',
    name: 'Trang'
}, {
    code: 'TH-23',
    country: 'Thailand',
    name: 'Trat'
}, {
    code: 'TH-34',
    country: 'Thailand',
    name: 'Ubon Ratchathani'
}, {
    code: 'TH-41',
    country: 'Thailand',
    name: 'Udon Thani'
}, {
    code: 'TH-61',
    country: 'Thailand',
    name: 'Uthai Thani'
}, {
    code: 'TH-53',
    country: 'Thailand',
    name: 'Uttaradit'
}, {
    code: 'TH-95',
    country: 'Thailand',
    name: 'Yala'
}, {
    code: 'TH-35',
    country: 'Thailand',
    name: 'Yasothon'
}, {
    code: 'TR-01',
    country: 'Turkey',
    name: 'Adana'
}, {
    code: 'TR-02',
    country: 'Turkey',
    name: 'Adıyaman'
}, {
    code: 'TR-03',
    country: 'Turkey',
    name: 'Afyonkarahisar'
}, {
    code: 'TR-04',
    country: 'Turkey',
    name: 'Ağrı'
}, {
    code: 'TR-68',
    country: 'Turkey',
    name: 'Aksaray'
}, {
    code: 'TR-05',
    country: 'Turkey',
    name: 'Amasya'
}, {
    code: 'TR-06',
    country: 'Turkey',
    name: 'Ankara'
}, {
    code: 'TR-07',
    country: 'Turkey',
    name: 'Antalya'
}, {
    code: 'TR-75',
    country: 'Turkey',
    name: 'Ardahan'
}, {
    code: 'TR-08',
    country: 'Turkey',
    name: 'Artvin'
}, {
    code: 'TR-09',
    country: 'Turkey',
    name: 'Aydın'
}, {
    code: 'TR-10',
    country: 'Turkey',
    name: 'Balıkesir'
}, {
    code: 'TR-74',
    country: 'Turkey',
    name: 'Bartın'
}, {
    code: 'TR-72',
    country: 'Turkey',
    name: 'Batman'
}, {
    code: 'TR-69',
    country: 'Turkey',
    name: 'Bayburt'
}, {
    code: 'TR-11',
    country: 'Turkey',
    name: 'Bilecik'
}, {
    code: 'TR-12',
    country: 'Turkey',
    name: 'Bingöl'
}, {
    code: 'TR-13',
    country: 'Turkey',
    name: 'Bitlis'
}, {
    code: 'TR-14',
    country: 'Turkey',
    name: 'Bolu'
}, {
    code: 'TR-15',
    country: 'Turkey',
    name: 'Burdur'
}, {
    code: 'TR-16',
    country: 'Turkey',
    name: 'Bursa'
}, {
    code: 'TR-17',
    country: 'Turkey',
    name: 'Çanakkale'
}, {
    code: 'TR-18',
    country: 'Turkey',
    name: 'Çankırı'
}, {
    code: 'TR-19',
    country: 'Turkey',
    name: 'Çorum'
}, {
    code: 'TR-20',
    country: 'Turkey',
    name: 'Denizli'
}, {
    code: 'TR-21',
    country: 'Turkey',
    name: 'Diyarbakır'
}, {
    code: 'TR-81',
    country: 'Turkey',
    name: 'Düzce'
}, {
    code: 'TR-22',
    country: 'Turkey',
    name: 'Edirne'
}, {
    code: 'TR-23',
    country: 'Turkey',
    name: 'Elazığ'
}, {
    code: 'TR-24',
    country: 'Turkey',
    name: 'Erzincan'
}, {
    code: 'TR-25',
    country: 'Turkey',
    name: 'Erzurum'
}, {
    code: 'TR-26',
    country: 'Turkey',
    name: 'Eskişehir'
}, {
    code: 'TR-27',
    country: 'Turkey',
    name: 'Gaziantep'
}, {
    code: 'TR-28',
    country: 'Turkey',
    name: 'Giresun'
}, {
    code: 'TR-29',
    country: 'Turkey',
    name: 'Gümüşhane'
}, {
    code: 'TR-30',
    country: 'Turkey',
    name: 'Hakkâri'
}, {
    code: 'TR-31',
    country: 'Turkey',
    name: 'Hatay'
}, {
    code: 'TR-76',
    country: 'Turkey',
    name: 'Iğdır'
}, {
    code: 'TR-32',
    country: 'Turkey',
    name: 'Isparta'
}, {
    code: 'TR-34',
    country: 'Turkey',
    name: 'İstanbul'
}, {
    code: 'TR-35',
    country: 'Turkey',
    name: 'İzmir'
}, {
    code: 'TR-46',
    country: 'Turkey',
    name: 'Kahramanmaraş'
}, {
    code: 'TR-78',
    country: 'Turkey',
    name: 'Karabük'
}, {
    code: 'TR-70',
    country: 'Turkey',
    name: 'Karaman'
}, {
    code: 'TR-36',
    country: 'Turkey',
    name: 'Kars'
}, {
    code: 'TR-37',
    country: 'Turkey',
    name: 'Kastamonu'
}, {
    code: 'TR-38',
    country: 'Turkey',
    name: 'Kayseri'
}, {
    code: 'TR-79',
    country: 'Turkey',
    name: 'Kilis'
}, {
    code: 'TR-71',
    country: 'Turkey',
    name: 'Kırıkkale'
}, {
    code: 'TR-39',
    country: 'Turkey',
    name: 'Kırklareli'
}, {
    code: 'TR-40',
    country: 'Turkey',
    name: 'Kırşehir'
}, {
    code: 'TR-41',
    country: 'Turkey',
    name: 'Kocaeli'
}, {
    code: 'TR-42',
    country: 'Turkey',
    name: 'Konya'
}, {
    code: 'TR-43',
    country: 'Turkey',
    name: 'Kütahya'
}, {
    code: 'TR-44',
    country: 'Turkey',
    name: 'Malatya'
}, {
    code: 'TR-45',
    country: 'Turkey',
    name: 'Manisa'
}, {
    code: 'TR-47',
    country: 'Turkey',
    name: 'Mardin'
}, {
    code: 'TR-33',
    country: 'Turkey',
    name: 'Mersin'
}, {
    code: 'TR-48',
    country: 'Turkey',
    name: 'Muğla'
}, {
    code: 'TR-49',
    country: 'Turkey',
    name: 'Muş'
}, {
    code: 'TR-50',
    country: 'Turkey',
    name: 'Nevşehir'
}, {
    code: 'TR-51',
    country: 'Turkey',
    name: 'Niğde'
}, {
    code: 'TR-52',
    country: 'Turkey',
    name: 'Ordu'
}, {
    code: 'TR-80',
    country: 'Turkey',
    name: 'Osmaniye'
}, {
    code: 'TR-53',
    country: 'Turkey',
    name: 'Rize'
}, {
    code: 'TR-54',
    country: 'Turkey',
    name: 'Sakarya'
}, {
    code: 'TR-55',
    country: 'Turkey',
    name: 'Samsun'
}, {
    code: 'TR-63',
    country: 'Turkey',
    name: 'Şanlıurfa'
}, {
    code: 'TR-56',
    country: 'Turkey',
    name: 'Siirt'
}, {
    code: 'TR-57',
    country: 'Turkey',
    name: 'Sinop'
}, {
    code: 'TR-73',
    country: 'Turkey',
    name: 'Şırnak'
}, {
    code: 'TR-58',
    country: 'Turkey',
    name: 'Sivas'
}, {
    code: 'TR-59',
    country: 'Turkey',
    name: 'Tekirdağ'
}, {
    code: 'TR-60',
    country: 'Turkey',
    name: 'Tokat'
}, {
    code: 'TR-61',
    country: 'Turkey',
    name: 'Trabzon'
}, {
    code: 'TR-62',
    country: 'Turkey',
    name: 'Tunceli'
}, {
    code: 'TR-64',
    country: 'Turkey',
    name: 'Uşak'
}, {
    code: 'TR-65',
    country: 'Turkey',
    name: 'Van'
}, {
    code: 'TR-77',
    country: 'Turkey',
    name: 'Yalova'
}, {
    code: 'TR-66',
    country: 'Turkey',
    name: 'Yozgat'
}, {
    code: 'TR-67',
    country: 'Turkey',
    name: 'Zonguldak'
}, {
    code: 'TC-NA',
    country: 'Turks and Caicos',
    name: 'NA'
}, {
    code: 'UG-317',
    country: 'Uganda',
    name: 'Abim'
}, {
    code: 'UG-301',
    country: 'Uganda',
    name: 'Adjumani'
}, {
    code: 'UG-314',
    country: 'Uganda',
    name: 'Amolatar'
}, {
    code: 'UG-216',
    country: 'Uganda',
    name: 'Amuria'
}, {
    code: 'UG-319',
    country: 'Uganda',
    name: 'Amuru'
}, {
    code: 'UG-302',
    country: 'Uganda',
    name: 'Apac'
}, {
    code: 'UG-303',
    country: 'Uganda',
    name: 'Arua'
}, {
    code: 'UG-217',
    country: 'Uganda',
    name: 'Budaka'
}, {
    code: 'UG-223',
    country: 'Uganda',
    name: 'Bududa'
}, {
    code: 'UG-201',
    country: 'Uganda',
    name: 'Bugiri'
}, {
    code: 'UG-224',
    country: 'Uganda',
    name: 'Bukedea'
}, {
    code: 'UG-C',
    country: 'Uganda',
    name: 'Central'
}, {
    code: 'UG-318',
    country: 'Uganda',
    name: 'Dokolo'
}, {
    code: 'UG-E',
    country: 'Uganda',
    name: 'Eastern'
}, {
    code: 'UG-304',
    country: 'Uganda',
    name: 'Gulu'
}, {
    code: 'UG-403',
    country: 'Uganda',
    name: 'Hoima'
}, {
    code: 'UG-416',
    country: 'Uganda',
    name: 'Ibanda'
}, {
    code: 'UG-203',
    country: 'Uganda',
    name: 'Iganga'
}, {
    code: 'UG-417',
    country: 'Uganda',
    name: 'Isingiro'
}, {
    code: 'UG-204',
    country: 'Uganda',
    name: 'Jinja'
}, {
    code: 'UG-315',
    country: 'Uganda',
    name: 'Kaabong'
}, {
    code: 'UG-405',
    country: 'Uganda',
    name: 'Kabarole'
}, {
    code: 'UG-102',
    country: 'Uganda',
    name: 'Kampala'
}, {
    code: 'UG-206',
    country: 'Uganda',
    name: 'Kapchorwa'
}, {
    code: 'UG-406',
    country: 'Uganda',
    name: 'Kasese'
}, {
    code: 'UG-306',
    country: 'Uganda',
    name: 'Kotido'
}, {
    code: 'UG-104',
    country: 'Uganda',
    name: 'Luwero'
}, {
    code: 'UG-116',
    country: 'Uganda',
    name: 'Lyantonde'
}, {
    code: 'UG-105',
    country: 'Uganda',
    name: 'Masaka'
}, {
    code: 'UG-209',
    country: 'Uganda',
    name: 'Mbale'
}, {
    code: 'UG-107',
    country: 'Uganda',
    name: 'Mubende'
}, {
    code: 'UG-N',
    country: 'Uganda',
    name: 'Northern'
}, {
    code: 'UG-312',
    country: 'Uganda',
    name: 'Pader'
}, {
    code: 'UG-111',
    country: 'Uganda',
    name: 'Sembabule'
}, {
    code: 'UG-212',
    country: 'Uganda',
    name: 'Tororo'
}, {
    code: 'UG-113',
    country: 'Uganda',
    name: 'Wakiso'
}, {
    code: 'UG-W',
    country: 'Uganda',
    name: 'Western'
}, {
    code: 'UG-313',
    country: 'Uganda',
    name: 'Yumbe'
}, {
    code: 'AE-AZ',
    country: 'United Arab Emirates',
    name: 'Abu Dhabi'
}, {
    code: 'AE-AJ',
    country: 'United Arab Emirates',
    name: 'Ajman'
}, {
    code: 'AE-DU',
    country: 'United Arab Emirates',
    name: 'Dubai'
}, {
    code: 'AE-FU',
    country: 'United Arab Emirates',
    name: 'Fujairah'
}, {
    code: 'AE-RK',
    country: 'United Arab Emirates',
    name: 'Ras al-Khaimah'
}, {
    code: 'AE-SH',
    country: 'United Arab Emirates',
    name: 'Sharjah'
}, {
    code: 'AE-UQ',
    country: 'United Arab Emirates',
    name: 'Umm al-Quwain'
}, {
    code: 'TZ-01',
    country: 'United Republic of Tanzania',
    name: 'Arusha'
}, {
    code: 'TZ-02',
    country: 'United Republic of Tanzania',
    name: 'Dar es Salaam'
}, {
    code: 'TZ-03',
    country: 'United Republic of Tanzania',
    name: 'Dodoma'
}, {
    code: 'TZ-04',
    country: 'United Republic of Tanzania',
    name: 'Iringa'
}, {
    code: 'TZ-05',
    country: 'United Republic of Tanzania',
    name: 'Kagera'
}, {
    code: 'TZ-06',
    country: 'United Republic of Tanzania',
    name: 'Kaskazini Pemba'
}, {
    code: 'TZ-07',
    country: 'United Republic of Tanzania',
    name: 'Kaskazini Unguja'
}, {
    code: 'TZ-08',
    country: 'United Republic of Tanzania',
    name: 'Kigoma'
}, {
    code: 'TZ-09',
    country: 'United Republic of Tanzania',
    name: 'Kilimanjaro'
}, {
    code: 'TZ-10',
    country: 'United Republic of Tanzania',
    name: 'Kusini Pemba'
}, {
    code: 'TZ-11',
    country: 'United Republic of Tanzania',
    name: 'Kusini Unguja'
}, {
    code: 'TZ-12',
    country: 'United Republic of Tanzania',
    name: 'Lindi'
}, {
    code: 'TZ-26',
    country: 'United Republic of Tanzania',
    name: 'Manyara'
}, {
    code: 'TZ-13',
    country: 'United Republic of Tanzania',
    name: 'Mara'
}, {
    code: 'TZ-14',
    country: 'United Republic of Tanzania',
    name: 'Mbeya'
}, {
    code: 'TZ-15',
    country: 'United Republic of Tanzania',
    name: 'Mjini Magharibi'
}, {
    code: 'TZ-16',
    country: 'United Republic of Tanzania',
    name: 'Morogoro'
}, {
    code: 'TZ-17',
    country: 'United Republic of Tanzania',
    name: 'Mtwara'
}, {
    code: 'TZ-18',
    country: 'United Republic of Tanzania',
    name: 'Mwanza'
}, {
    code: 'TZ-19',
    country: 'United Republic of Tanzania',
    name: 'Pwani'
}, {
    code: 'TZ-20',
    country: 'United Republic of Tanzania',
    name: 'Rukwa'
}, {
    code: 'TZ-21',
    country: 'United Republic of Tanzania',
    name: 'Ruvuma'
}, {
    code: 'TZ-22',
    country: 'United Republic of Tanzania',
    name: 'Shinyanga'
}, {
    code: 'TZ-23',
    country: 'United Republic of Tanzania',
    name: 'Singida'
}, {
    code: 'TZ-24',
    country: 'United Republic of Tanzania',
    name: 'Tabora'
}, {
    code: 'TZ-25',
    country: 'United Republic of Tanzania',
    name: 'Tanga'
}, {
    code: 'US-AL',
    country: 'United States',
    name: 'Alabama'
}, {
    code: 'US-AK',
    country: 'United States',
    name: 'Alaska'
}, {
    code: 'US-AZ',
    country: 'United States',
    name: 'Arizona'
}, {
    code: 'US-AR',
    country: 'United States',
    name: 'Arkansas'
}, {
    code: 'US-CA',
    country: 'United States',
    name: 'California'
}, {
    code: 'US-CO',
    country: 'United States',
    name: 'Colorado'
}, {
    code: 'US-CT',
    country: 'United States',
    name: 'Connecticut'
}, {
    code: 'US-DE',
    country: 'United States',
    name: 'Delaware'
}, {
    code: 'US-DC',
    country: 'United States',
    name: 'District of Columbia'
}, {
    code: 'US-FL',
    country: 'United States',
    name: 'Florida'
}, {
    code: 'US-GA',
    country: 'United States',
    name: 'Georgia'
}, {
    code: 'US-GU',
    country: 'United States',
    name: 'Guam'
}, {
    code: 'US-HI',
    country: 'United States',
    name: 'Hawaii'
}, {
    code: 'US-ID',
    country: 'United States',
    name: 'Idaho'
}, {
    code: 'US-IL',
    country: 'United States',
    name: 'Illinois'
}, {
    code: 'US-IN',
    country: 'United States',
    name: 'Indiana'
}, {
    code: 'US-IA',
    country: 'United States',
    name: 'Iowa'
}, {
    code: 'US-KS',
    country: 'United States',
    name: 'Kansas'
}, {
    code: 'US-KY',
    country: 'United States',
    name: 'Kentucky'
}, {
    code: 'US-LA',
    country: 'United States',
    name: 'Louisiana'
}, {
    code: 'US-ME',
    country: 'United States',
    name: 'Maine'
}, {
    code: 'US-MD',
    country: 'United States',
    name: 'Maryland'
}, {
    code: 'US-MA',
    country: 'United States',
    name: 'Massachusetts'
}, {
    code: 'US-MI',
    country: 'United States',
    name: 'Michigan'
}, {
    code: 'US-MN',
    country: 'United States',
    name: 'Minnesota'
}, {
    code: 'US-MS',
    country: 'United States',
    name: 'Mississippi'
}, {
    code: 'US-MO',
    country: 'United States',
    name: 'Missouri'
}, {
    code: 'US-MT',
    country: 'United States',
    name: 'Montana'
}, {
    code: 'US-NE',
    country: 'United States',
    name: 'Nebraska'
}, {
    code: 'US-NV',
    country: 'United States',
    name: 'Nevada'
}, {
    code: 'US-NH',
    country: 'United States',
    name: 'New Hampshire'
}, {
    code: 'US-NJ',
    country: 'United States',
    name: 'New Jersey'
}, {
    code: 'US-NM',
    country: 'United States',
    name: 'New Mexico'
}, {
    code: 'US-NY',
    country: 'United States',
    name: 'New York'
}, {
    code: 'US-NC',
    country: 'United States',
    name: 'North Carolina'
}, {
    code: 'US-ND',
    country: 'United States',
    name: 'North Dakota'
}, {
    code: 'US-OH',
    country: 'United States',
    name: 'Ohio'
}, {
    code: 'US-OK',
    country: 'United States',
    name: 'Oklahoma'
}, {
    code: 'US-OR',
    country: 'United States',
    name: 'Oregon'
}, {
    code: 'US-PA',
    country: 'United States',
    name: 'Pennsylvania'
}, {
    code: 'US-PR',
    country: 'United States',
    name: 'Puerto Rico'
}, {
    code: 'US-RI',
    country: 'United States',
    name: 'Rhode Island'
}, {
    code: 'US-SC',
    country: 'United States',
    name: 'South Carolina'
}, {
    code: 'US-SD',
    country: 'United States',
    name: 'South Dakota'
}, {
    code: 'US-TN',
    country: 'United States',
    name: 'Tennessee'
}, {
    code: 'US-TX',
    country: 'United States',
    name: 'Texas'
}, {
    code: 'US-UT',
    country: 'United States',
    name: 'Utah'
}, {
    code: 'US-VT',
    country: 'United States',
    name: 'Vermont'
}, {
    code: 'US-VA',
    country: 'United States',
    name: 'Virginia'
}, {
    code: 'US-WA',
    country: 'United States',
    name: 'Washington'
}, {
    code: 'US-WV',
    country: 'United States',
    name: 'West Virginia'
}, {
    code: 'US-WI',
    country: 'United States',
    name: 'Wisconsin'
}, {
    code: 'US-WY',
    country: 'United States',
    name: 'Wyoming'
}, {
    code: 'UY-AR',
    country: 'Uruguay',
    name: 'Artigas'
}, {
    code: 'UY-CA',
    country: 'Uruguay',
    name: 'Canelones'
}, {
    code: 'UY-CL',
    country: 'Uruguay',
    name: 'Cerro Largo'
}, {
    code: 'UY-CO',
    country: 'Uruguay',
    name: 'Colonia'
}, {
    code: 'UY-DU',
    country: 'Uruguay',
    name: 'Durazno'
}, {
    code: 'UY-FS',
    country: 'Uruguay',
    name: 'Flores'
}, {
    code: 'UY-FD',
    country: 'Uruguay',
    name: 'Florida'
}, {
    code: 'UY-LA',
    country: 'Uruguay',
    name: 'Lavalleja'
}, {
    code: 'UY-MA',
    country: 'Uruguay',
    name: 'Maldonado'
}, {
    code: 'UY-MO',
    country: 'Uruguay',
    name: 'Montevideo'
}, {
    code: 'UY-PA',
    country: 'Uruguay',
    name: 'Paysandú'
}, {
    code: 'UY-RN',
    country: 'Uruguay',
    name: 'Río Negro'
}, {
    code: 'UY-RV',
    country: 'Uruguay',
    name: 'Rivera'
}, {
    code: 'UY-RO',
    country: 'Uruguay',
    name: 'Rocha'
}, {
    code: 'UY-SA',
    country: 'Uruguay',
    name: 'Salto'
}, {
    code: 'UY-SJ',
    country: 'Uruguay',
    name: 'San José'
}, {
    code: 'UY-SO',
    country: 'Uruguay',
    name: 'Soriano'
}, {
    code: 'UY-TA',
    country: 'Uruguay',
    name: 'Tacuarembó'
}, {
    code: 'UY-TT',
    country: 'Uruguay',
    name: 'Treinta y Tres'
}, {
    code: 'VE-Z',
    country: 'Venezuela',
    name: 'Amazonas'
}, {
    code: 'VE-C',
    country: 'Venezuela',
    name: 'Apure'
}, {
    code: 'VE-E',
    country: 'Venezuela',
    name: 'Barinas'
}, {
    code: 'VE-F',
    country: 'Venezuela',
    name: 'Bolívar'
}, {
    code: 'VE-G',
    country: 'Venezuela',
    name: 'Carabobo'
}, {
    code: 'VE-W',
    country: 'Venezuela',
    name: 'Dependencias Federales'
}, {
    code: 'VE-A',
    country: 'Venezuela',
    name: 'Distrito Federal'
}, {
    code: 'VE-I',
    country: 'Venezuela',
    name: 'Falcón'
}, {
    code: 'VE-J',
    country: 'Venezuela',
    name: 'Guárico'
}, {
    code: 'VE-K',
    country: 'Venezuela',
    name: 'Lara'
}, {
    code: 'VE-L',
    country: 'Venezuela',
    name: 'Mérida'
}, {
    code: 'VE-N',
    country: 'Venezuela',
    name: 'Monagas'
}, {
    code: 'VE-O',
    country: 'Venezuela',
    name: 'Nueva Esparta'
}, {
    code: 'VE-P',
    country: 'Venezuela',
    name: 'Portuguesa'
}, {
    code: 'VE-R',
    country: 'Venezuela',
    name: 'Sucre'
}, {
    code: 'VE-T',
    country: 'Venezuela',
    name: 'Trujillo'
}, {
    code: 'VE-X',
    country: 'Venezuela',
    name: 'Vargas'
}, {
    code: 'VE-U',
    country: 'Venezuela',
    name: 'Yaracuy'
}, {
    code: 'VE-V',
    country: 'Venezuela',
    name: 'Zulia'
}, {
    code: 'VN-44',
    country: 'Vietnam',
    name: 'An Giang'
}, {
    code: 'VN-43',
    country: 'Vietnam',
    name: 'Bà Rịa–Vũng Tàu'
}, {
    code: 'VN-54',
    country: 'Vietnam',
    name: 'Bắc Giang'
}, {
    code: 'VN-31',
    country: 'Vietnam',
    name: 'Bình Định'
}, {
    code: 'VN-57',
    country: 'Vietnam',
    name: 'Bình Dương'
}, {
    code: 'VN-40',
    country: 'Vietnam',
    name: 'Bình Thuận'
}, {
    code: 'VN-DN',
    country: 'Vietnam',
    name: 'Đà Nẵng'
}, {
    code: 'VN-63',
    country: 'Vietnam',
    name: 'Hà Nam'
}, {
    code: 'VN-HN',
    country: 'Vietnam',
    name: 'Hà Nội'
}, {
    code: 'VN-23',
    country: 'Vietnam',
    name: 'Hà Tỉnh'
}, {
    code: 'VN-61',
    country: 'Vietnam',
    name: 'Hải Duong'
}, {
    code: 'VN-HP',
    country: 'Vietnam',
    name: 'Hải Phòng'
}, {
    code: 'VN-14',
    country: 'Vietnam',
    name: 'Hoà Bình'
}, {
    code: 'VN-34',
    country: 'Vietnam',
    name: 'Khánh Hòa'
}, {
    code: 'VN-35',
    country: 'Vietnam',
    name: 'Lâm Đồng'
}, {
    code: 'VN-41',
    country: 'Vietnam',
    name: 'Long An'
}, {
    code: 'VN-22',
    country: 'Vietnam',
    name: 'Nghệ An'
}, {
    code: 'VN-18',
    country: 'Vietnam',
    name: 'Ninh Bình'
}, {
    code: 'VN-68',
    country: 'Vietnam',
    name: 'Phú Thọ'
}, {
    code: 'VN-32',
    country: 'Vietnam',
    name: 'Phú Yên'
}, {
    code: 'VN-24',
    country: 'Vietnam',
    name: 'Quảng Bình'
}, {
    code: 'VN-27',
    country: 'Vietnam',
    name: 'Quảng Nam'
}, {
    code: 'VN-13',
    country: 'Vietnam',
    name: 'Quảng Ninh'
}, {
    code: 'VN-52',
    country: 'Vietnam',
    name: 'Sóc Trăng'
}, {
    code: 'VN-21',
    country: 'Vietnam',
    name: 'Thanh Hóa'
}, {
    code: 'VN-26',
    country: 'Vietnam',
    name: 'Thừa Thiên-Huế'
}, {
    code: 'VN-49',
    country: 'Vietnam',
    name: 'Vĩnh Long'
}, {
    code: 'VN-70',
    country: 'Vietnam',
    name: 'Vĩnh Phúc'
}, {
    code: 'VN-06',
    country: 'Vietnam',
    name: 'Yên Bái'
}, {
    code: 'GB-BGW',
    country: 'Wales',
    name: 'Blaenau Gwent'
}, {
    code: 'GB-BGE',
    country: 'Wales',
    name: 'Bridgend'
}, {
    code: 'GB-CAY',
    country: 'Wales',
    name: 'Caerphilly'
}, {
    code: 'GB-CRF',
    country: 'Wales',
    name: 'Cardiff'
}, {
    code: 'GB-CMN',
    country: 'Wales',
    name: 'Carmarthenshire'
}, {
    code: 'GB-CGN',
    country: 'Wales',
    name: 'Ceredigion'
}, {
    code: 'GB-CWY',
    country: 'Wales',
    name: 'Conwy'
}, {
    code: 'GB-DEN',
    country: 'Wales',
    name: 'Denbighshire'
}, {
    code: 'GB-FLN',
    country: 'Wales',
    name: 'Flintshire'
}, {
    code: 'GB-GWN',
    country: 'Wales',
    name: 'Gwynedd'
}, {
    code: 'GB-AGY',
    country: 'Wales',
    name: 'Isle of Anglesey'
}, {
    code: 'GB-MTY',
    country: 'Wales',
    name: 'Merthyr Tydfil'
}, {
    code: 'GB-MON',
    country: 'Wales',
    name: 'Monmouthshire'
}, {
    code: 'GB-NTL',
    country: 'Wales',
    name: 'Neath Port Talbot'
}, {
    code: 'GB-NWP',
    country: 'Wales',
    name: 'Newport'
}, {
    code: 'GB-PEM',
    country: 'Wales',
    name: 'Pembrokeshire'
}, {
    code: 'GB-POW',
    country: 'Wales',
    name: 'Powys'
}, {
    code: 'GB-RCT',
    country: 'Wales',
    name: 'Rhondda, Cynon, Taff'
}, {
    code: 'GB-SWA',
    country: 'Wales',
    name: 'Swansea'
}, {
    code: 'GB-TOF',
    country: 'Wales',
    name: 'Torfaen'
}, {
    code: 'GB-VGL',
    country: 'Wales',
    name: 'Vale of Glamorgan, The'
}, {
    code: 'GB-WRX',
    country: 'Wales',
    name: 'Wrexham'
}, {
    code: 'ZM-02',
    country: 'Zambia',
    name: 'Central'
}, {
    code: 'ZM-08',
    country: 'Zambia',
    name: 'Copperbelt'
}, {
    code: 'ZM-03',
    country: 'Zambia',
    name: 'Eastern'
}, {
    code: 'ZM-04',
    country: 'Zambia',
    name: 'Luapula'
}, {
    code: 'ZM-09',
    country: 'Zambia',
    name: 'Lusaka'
}, {
    code: 'ZM-06',
    country: 'Zambia',
    name: 'North-Western'
}, {
    code: 'ZM-05',
    country: 'Zambia',
    name: 'Northern'
}, {
    code: 'ZM-07',
    country: 'Zambia',
    name: 'Southern (Zambia)'
}, {
    code: 'ZM-01',
    country: 'Zambia',
    name: 'Western'
}, {
    code: 'ZW-BU',
    country: 'Zimbabwe',
    name: 'Bulawayo'
}, {
    code: 'ZW-HA',
    country: 'Zimbabwe',
    name: 'Harare'
}, {
    code: 'ZW-MA',
    country: 'Zimbabwe',
    name: 'Manicaland'
}, {
    code: 'ZW-MC',
    country: 'Zimbabwe',
    name: 'Mashonaland Central'
}, {
    code: 'ZW-ME',
    country: 'Zimbabwe',
    name: 'Mashonaland East'
}, {
    code: 'ZW-MW',
    country: 'Zimbabwe',
    name: 'Mashonaland West'
}, {
    code: 'ZW-MV',
    country: 'Zimbabwe',
    name: 'Masvingo'
}, {
    code: 'ZW-MN',
    country: 'Zimbabwe',
    name: 'Matabeleland North'
}, {
    code: 'ZW-MS',
    country: 'Zimbabwe',
    name: 'Matabeleland South'
}, {
    code: 'ZW-MI',
    country: 'Zimbabwe',
    name: 'Midlands'
}];

const countries = [
    { name: 'Argentina', code: 'ARG' },
    { name: 'Australia', code: 'AUS' },
    { name: 'Austria', code: 'AUT' },
    { name: 'Bahamas', code: 'BAH' },
    { name: 'Bangladesh', code: 'BAN' },
    { name: 'Barbados', code: 'BAR' },
    { name: 'Belgium', code: 'BEL' },
    { name: 'Bermuda', code: 'BER' },
    { name: 'Botswana', code: 'BOT' },
    { name: 'Brazil', code: 'BRA' },
    { name: 'Canada', code: 'CAN' },
    { name: 'Chad', code: 'CHA' },
    { name: 'Chile', code: 'CHI' },
    { name: 'Chinese Taipei', code: 'TPE' },
    { name: 'Colombia', code: 'COL' },
    { name: 'Costa Rica', code: 'CRC' },
    { name: 'Cyprus', code: 'CYP' },
    { name: 'Democratic Republic of the Congo', code: 'COD' },
    { name: 'Denmark', code: 'DEN' },
    { name: 'Dominican Republic', code: 'DOM' },
    { name: 'Ecuador', code: 'ECU' },
    { name: 'El Salvador', code: 'ESA' },
    { name: 'England', code: 'ENG' },
    { name: 'Estonia', code: 'EST' },
    { name: 'Eswatini', code: 'SWZ' },
    { name: 'Finland', code: 'FIN' },
    { name: 'Germany', code: 'GER' },
    { name: 'Greece', code: 'GRE' },
    { name: 'Guatemala', code: 'GUA' },
    { name: 'Hong Kong, China', code: 'HKG' },
    { name: 'Hungary', code: 'HUN' },
    { name: 'Iceland', code: 'ISL' },
    { name: 'India', code: 'IND' },
    { name: 'Ireland', code: 'IRL' },
    { name: 'Italy', code: 'ITA' },
    { name: 'Japan', code: 'JPN' },
    { name: 'Jordan', code: 'JOR' },
    { name: 'Kenya', code: 'KEN' },
    { name: 'Latvia', code: 'LAT' },
    { name: 'Malawi', code: 'MAW' },
    { name: 'Malaysia', code: 'MAS' },
    { name: 'Malta', code: 'MLT' },
    { name: 'Marshall Islands', code: 'MHL' },
    { name: 'Mauritius', code: 'MRI' },
    { name: 'Mexico', code: 'MEX' },
    { name: 'Mongolia', code: 'MGL' },
    { name: 'Morocco', code: 'MAR' },
    { name: 'Mozambique', code: 'MOZ' },
    { name: 'Namibia', code: 'NAM' },
    { name: 'Netherlands', code: 'NED' },
    { name: 'New Zealand', code: 'NZL' },
    { name: 'Nicaragua', code: 'NCA' },
    { name: 'Northern Ireland', code: 'NIR' },
    { name: 'Norway', code: 'NOR' },
    { name: 'Oman', code: 'OMA' },
    { name: 'Panama', code: 'PAN' },
    { name: 'Paraguay', code: 'PAR' },
    { name: 'People Republic of China', code: 'CHN' },
    { name: 'Peru', code: 'PER' },
    { name: 'Philippines', code: 'PHI' },
    { name: 'Poland', code: 'POL' },
    { name: 'Portugal', code: 'POR' },
    { name: 'Puerto Rico', code: 'PUR' },
    { name: 'Republic of Korea', code: 'KOR' },
    { name: 'Scotland', code: 'SCO' },
    { name: 'Seychelles', code: 'SEY' },
    { name: 'Singapore', code: 'SIN' },
    { name: 'Slovakia', code: 'SVK' },
    { name: 'South Africa', code: 'RSA' },
    { name: 'Sri Lanka', code: 'SRI' },
    { name: 'Sudan', code: 'SUD' },
    { name: 'Sweden', code: 'SWE' },
    { name: 'Switzerland', code: 'SUI' },
    { name: 'Thailand', code: 'THA' },
    { name: 'Turkey', code: 'TUR' },
    { name: 'Turks and Caicos', code: 'TCA' },
    { name: 'Uganda', code: 'UGA' },
    { name: 'United Arab Emirates', code: 'UAE' },
    { name: 'United Republic of Tanzania', code: 'TAN' },
    { name: 'United States', code: 'USA' },
    { name: 'Uruguay', code: 'URU' },
    { name: 'Venezuela', code: 'VEN' },
    { name: 'Vietnam', code: 'VIE' },
    { name: 'Wales', code: 'WAL' },
    { name: 'Zambia', code: 'ZAM' },
    { name: 'Zimbabwe', code: 'ZIM' }
]

const sections = [
    {
        title: 'The Spirit of the Game',
        description: ['Golf is played, for the most part, without the supervision of a referee or umpire. The game relies on the integrity of the individual to show consideration for other players and to abide by the Rules. All players should conduct themselves in a disciplined manner, demonstrating courtesy and sportsmanship at all times, irrespective of how competitive they may be.']
    },
    {
        title: 'Membership',
        description: [
            'The annual membership year will run from 1st January each year.',
            'All new applications for membership will be subject to approval by the Committee of Founder Members',
            'Applications for membership will not be considered until the applicant has played as a visitor on 3 or more occasions.'
        ]
    },
    {
        title: 'Founder Members',
        description: ['In recognition of their contribution to the Society, the five Founder Members, will hereby be recognised as lifetime members with no membership fees applicable.']
    },
    {
        title: 'Handicaps',
        description: ['For the purposes of friendly competition, all Members and Visitors are required to hold an unofficially calculated handicap.']
    },
    {
        title: 'Dress Code',
        description: ['The dress code shall be determined by the golf course, but you are still representing the society. If you look like a pro they’ll think that shank you just hit was a 1 in 1000, not a 1 in 10.']
    },
    {
        title: 'Rules on the Course',
        description: ['These rules are applicable whenever a quorum of members is present on the course. A quorum is at least 3 members, one to accuse, one to protest and one to cast the deciding ruling. Where a deadlock on a ruling occurs, the ‘Ace’ (see rule #19) has the deciding vote. If there is no ‘Ace’, the incumbent ‘Karen’ (see rule #12) has their opinion disregarded.'],
        rules: [
            {
                index: 1,
                description: ['Don’t talk about CGS'],
                action: { demerits: 1 }
            },
            {
                index: 2,
                description: ['Breach of the rules will result in a de-merit. 5 accumulated de-merits require the player to buy a round of drinks at the conclusion of the current golf round. 20 accumulated de-merits in one calendar requires the player to host a BBQ for the society members and partners.']
            },
            {
                index: 3,
                description: ['If the course is open its ALWAYS golfing weather.']
            },
            {
                index: 4,
                description: ['Never cry on the course, play like a champion. It’s between you and the course, mummy and daddy can’t help you now.']
            },
            {
                index: 5,
                description: ['CGS do not hold up fellow golfers. Every practice swing after the second ahead of any shot not on the putting green results in an automatic de-merit. Opening tee shot excluded. Rustiness is for boats. You are not a boat.'],
                action: { demerits: 1 }
            },
            {
                index: 6,
                description: ['Late is not great. Any golfer not at the course 5 minutes before the first tee time puts every golfer in the group under pressure. The late golfer may not take a practice putt on the first 3 holes to allow the group to get back on track.']
            },
            {
                index: 7,
                description: ['Any player teeing off last after all other playing partners have hit Driver must either do the same or shout ‘I’m afraid of greatness!’ as loud as possible and forfeit their use of Driver for the remainder of the round.']
            },
            {
                index: 8,
                description: ['If your beastly drive missed the fairway on the hole you are not allowed to make any reference as to how far it went, although others may do so if they choose.'],
                action: { demerits: 1 }
            },
            {
                index: 9,
                description: ['Any ball striking another player or their belongings is deemed to be at the fault of the player striking the ball. Commensurate retaliation will be permitted +1 de-merit.'],
                action: { demerits: 1 }
            },
            {
                index: 10,
                description: ['Errant shots must be accompanied by a shout of ‘fore’ in a timely manner. Relying on your playing partners results in a de-merit.'],
                action: { demerits: 1 }
            },
            {
                index: 11,
                description: ['If a putt is declared ‘good’ prior to being taken, it can only be taken as a practice putt in agreement with the player conceding the putt in the first place. Otherwise, the miss is scored accordingly and +1 de-merit.'],
                action: { demerits: 1 }
            },
            {
                index: 12,
                description: ['Anyone who 4 putts shall thereafter be known as ‘Karen’ and will be shamed as he/she approaches the first tee (GoT style). This will continue in perpetuity until such time as another member 4 putts, thereby succeeding the current ‘Karen’.'],
                action: { titles: [{ method: 'award', title: 'Karen' }] }
            },
            {
                index: 13,
                description: ['If a tee-shot fails to reach the forward tees, that player then becomes the ‘flag bitch’ who has sole responsibility for tending the flag stick.'],
                action: { titles: [{ method: 'award', title: 'flag bitch' }] }
            },
            {
                index: 14,
                description: ['If a player holds both ‘Karen’ and ‘flag bitch’ titles it is an automatic +5 de-merits.'],
                action: { demerits: 5 }
            },
            {
                index: 15,
                description: ['Any off-putting noise and/or movement during another playing partners shot is an automatic demit.'],
                action: { demerits: 1 }
            },
            {
                index: 16,
                description: ['An eagle will result in a guard of honour being given at the next tee box. Due to the merit of the achievement 2 de-merits are removed from the players record.'],
                action: { demerits: -2 }
            },
            {
                index: 17,
                description: ['Back-to-back birdies is the sign of an elite player and shall be recognised by all players with a polite clap or fist bump. -1 de-merit.'],
                action: { demerits: -1 }
            },
            {
                index: 18,
                description: ['A chip-in means chip in (to the tab). All players not on your team receive a de-merit. Players on your team had the foresight to secure your talent on their team so can count themselves lucky.'],
                action: { demerits: 1 }
            },
            {
                index: 19,
                description: ['Any player carding a hole-in-one shall become ‘Ace’. All de-merits earned are instantly cleared and ‘Karen’ or ‘flag bitch’ titles are relinquished. Those are titles for golfers not fit to carry your bag.'],
                action: {
                    demerits: -99, // all demerits
                    titles: [
                        { method: 'award', title: 'Ace' },
                        { method: 'revoke', title: 'Karen' },
                        { method: 'revoke', title: 'flag bitch' }
                    ]
                }
            },
            {
                index: 20,
                description: ['All members must attend the annual awards event/piss up. Any who do not without a valid reason as agreed by the Committee will be ejected for the society for 6 months.']
            },
            {
                index: 21,
                description: ['The player booking the tee time saved you the effort. To repay the favour don’t let him be out of pocket; pay your green fee within one day of the round like a gent. +1 de-merit per day late.'],
                actions: { demerits: 1 }
            }
        ]
    }
];

const demerits = [
    {
        player: 'Joseph Burrows',
        action: { demerits: 1 },
        rule: 9,
        when: { hole: 2, date: new Date(2021, 3, 2) },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 3, 2)
                }
            }
        ]
    },
    {
        player: 'Jonathan Martin',
        action: { demerits: 5 },
        rule: 14,
        when: { hole: 6, date: new Date(2021, 3, 2) },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 3, 2)
                }
            }
        ]
    },
    {
        player: 'Martin Nash',
        action: { demerits: 1 },
        rule: 8,
        when: { hole: 18, date: new Date(2021, 3, 2) },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 3, 2)
                }
            }
        ]
    },
    {
        player: 'Oliver Nash',
        action: { demerits: 1 },
        rule: 8,
        when: { hole: 18, date: new Date(2021, 3, 2) },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 3, 2)
                }
            }
        ]
    },
    {
        player: 'Thomas Rimmer',
        value: 1,
        rule: 1,
        when: { date: new Date(2021, 3, 2) },
        action: { demerits: 1 },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 3, 2)
                }
            }
        ]
    },
    {
        player: 'Jonathan Martin',
        when: { hole: 3, date: new Date(2021, 3, 2) },
        rule: 12,
        action: { titles: [{ name: 'Karen', method: 'award' }] },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 3, 2)
                }
            }
        ]
    },
    {
        player: 'Jonathan Martin',
        when: { hole: 6, date: new Date(2021, 3, 2) },
        rule: 13,
        action: { titles: [{ name: 'flag bitch', method: 'award' }] },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 3, 2)
                }
            }
        ]
    },
    {
        player: 'Joseph Burrows',
        when: { hole: 18, date: new Date(2021, 3, 2) },
        rule: 12,
        action: { titles: [{ name: 'Karen', method: 'award' }] },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 3, 2)
                }
            }
        ]
    },
    {
        player: 'Thomas Rimmer',
        when: { hole: 6, date: new Date(2021, 3, 15) },
        rule: 18,
        action: { demerits: 1 },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 3, 15)
                }
            }
        ]
    },
    {
        player: 'Martin Nash',
        when: { hole: 6, date: new Date(2021, 3, 15) },
        rule: 18,
        action: { demerits: 1 },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 3, 15)
                }
            }
        ]
    },
    {
        player: 'Jonathan Martin',
        when: { date: new Date(2021, 3, 16) },
        rule: 18,
        action: { demerits: 1 },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 3, 16)
                }
            }
        ]
    },
    {
        player: 'Martin Nash',
        when: { date: new Date(2021, 3, 16) },
        rule: 18,
        action: { demerits: 1 },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 3, 16)
                }
            }
        ]
    },
    {
        player: 'Oliver Nash',
        when: { date: new Date(2021, 3, 16) },
        rule: 11,
        action: { demerits: 1 },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 3, 16)
                }
            }
        ]
    },
    {
        player: 'Thomas Rimmer',
        when: { date: new Date(2021, 4, 30) },
        rule: 1,
        action: { demerits: 1 },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 4, 30)
                }
            }
        ]
    },
    {
        player: 'Oliver Nash',
        when: { hole: 13, date: new Date(2021, 5, 12) },
        rule: 9,
        action: { demerits: 1 },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 5, 12)
                }
            }
        ]
    },
    {
        player: 'Joseph Burrows',
        when: { hole: 18, date: new Date(2021, 5, 12) },
        rule: 13,
        action: { titles: [{ name: 'flag bitch', method: 'award' }] },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 5, 12)
                }
            }
        ]
    },
    {
        player: 'Joseph Burrows',
        when: { date: new Date(2021, 5, 12) },
        rule: 14,
        action: { demerits: 5 },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 5, 12)
                }
            }
        ]
    },
    {
        player: 'Thomas Rimmer',
        when: { hole: 1, date: new Date(2021, 5, 19) },
        rule: 13,
        action: { titles: [{ name: 'flag bitch', method: 'award' }] },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 5, 19)
                }
            }
        ]
    },
    {
        player: 'Martin Nash',
        when: { hole: 4, date: new Date(2021, 5, 19) },
        rule: 13,
        action: { titles: [{ name: 'flag bitch', method: 'award' }] },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 5, 19)
                }
            }
        ]
    },
    {
        player: 'Joseph Burrows',
        when: { hole: 6, date: new Date(2021, 5, 19) },
        rule: 13,
        action: { titles: [{ name: 'flag bitch', method: 'award' }] },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 5, 19)
                }
            }
        ]
    },
    {
        player: 'Joseph Burrows',
        when: { date: new Date(2021, 5, 19) },
        rule: 14,
        action: { demerits: 5 },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 5, 19)
                }
            }
        ]
    },
    {
        player: 'Martin Nash',
        when: { hole: 6, date: new Date(2021, 5, 19) },
        rule: 13,
        action: { titles: [{ name: 'flag bitch', method: 'award' }] },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 5, 19)
                }
            }
        ]
    },
    {
        player: 'Jonathan Martin',
        when: { hole: 6, date: new Date(2021, 5, 19) },
        rule: 12,
        action: { titles: [{ name: 'Karen', method: 'award' }] },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 5, 19)
                }
            }
        ]
    },
    {
        player: 'Joseph Burrows',
        when: { hole: 7, date: new Date(2021, 5, 19) },
        rule: 13,
        action: { titles: [{ name: 'flag bitch', method: 'award' }] },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 5, 19)
                }
            }
        ]
    },
    {
        player: 'Thomas Rimmer',
        when: { hole: 17, date: new Date(2021, 5, 19) },
        rule: 13,
        action: { titles: [{ name: 'flag bitch', method: 'award' }] },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 5, 19)
                }
            }
        ]
    }
];

const drinks = [
    {
        player: 'Oliver Nash',
        value: 1,
        when: { date: new Date(2021, 3, 14) }
    },
    {
        player: 'Joseph Burrows',
        value: 1,
        when: { date: new Date(2021, 4, 30) }
    }
];

const users = [
    {
        name: {
            preferred: 'Lee',
            full: 'Thomas Lee Rimmer'
        },
        username: 'lee',
        email: 'lee@rimmer.com',
        role: 'founder',
        status: 'active',
        birthday: new Date(1988, 8, 3),
        gender: 'male'
    },
    {
        name: { preferred: 'The Machine' },
        username: 'machine',
        email: 'the@machine.com',
        role: 'super',
        status: 'active'
    },
    {
        name: {
            preferred: 'Joe',
            full: 'Joseph Edward Carew Burrows'
        },
        username: 'joe',
        email: 'joe@burrows.com',
        role: 'founder',
        status: 'active',
        birthday: new Date(1989, 0, 19),
        gender: 'male'
    },
    {
        name: {
            preferred: 'Jonny',
            full: 'Jonathan Elliot Martin'
        },
        username: 'jonny',
        email: 'jonny@martin.com',
        role: 'founder',
        status: 'active',
        birthday: new Date(1988, 11, 29),
        gender: 'male'
    },
    {
        name: {
            full: 'Martin James Nash'
        },
        username: 'martin',
        email: 'martin@nash.com',
        role: 'founder',
        status: 'active',
        birthday: new Date(1989, 5, 7),
        gender: 'male'
    },
    {
        name: {
            preferred: 'Oli',
            full: 'Oliver George Nash'
        },
        username: 'oli',
        email: 'oli@nash.com',
        role: 'founder',
        status: 'active',
        birthday: new Date(1989, 5, 7),
        gender: 'male'
    }
];

const rounds = [
    {
        course: 'Caddington',
        tee: 'blue',
        date: new Date(2021, 10, 6),
        scores: [
            {
                player: 'Thomas Rimmer',
                shots: [ 6, 4, 5, 4, 8, 5, 4, 6, 5, 4, 5, 5, 7, 5, 6, 6, 6, 6 ]
            },
            {
                player: 'Joseph Burrows',
                shots: [ 6, 4, 5, 4, 4, 5, 4, 8, 5, 4, 4, 4, 4, 4, 6, 5, 5, 5 ]
            },
            {
                player: 'Martin Nash',
                shots: [ 7, 3, 6, 6, 6, 5, 5, 5, 8, 5, 5, 8, 6, 5, 7, 4, 6, 5 ]
            },
            {
                player: 'Oliver Nash',
                shots: [ 6, 4, 4, 4, 5, 6, 4, 6, 6, 3, 7, 6, 5, 5, 6, 6, 4, 4 ]
            }
        ],
        games: []
    }
];

const courses = [
    {
        randa: 21692,
        name: 'Aylesbury Vale',
        tees: [
            {
                name: 'White',
                measure: 'yards',
                holes: [
                    {
                        index: 1,
                        distance: 499,
                        strokeIndex: 11,
                        par: 5
                    },
                    {
                        index: 2,
                        distance: 167,
                        strokeIndex: 13,
                        par: 3
                    },
                    {
                        index: 3,
                        distance: 427,
                        strokeIndex: 4,
                        par: 4
                    },
                    {
                        index: 4,
                        distance: 320,
                        strokeIndex: 15,
                        par: 4
                    },
                    {
                        index: 5,
                        distance: 377,
                        strokeIndex: 6,
                        par: 4
                    },
                    {
                        index: 6,
                        distance: 402,
                        strokeIndex: 2,
                        par: 4
                    },
                    {
                        index: 7,
                        distance: 340,
                        strokeIndex: 16,
                        par: 4
                    },
                    {
                        index: 8,
                        distance: 217,
                        strokeIndex: 9,
                        par: 3
                    },
                    {
                        index: 9,
                        distance: 495,
                        strokeIndex: 17,
                        par: 5
                    },
                    {
                        index: 10,
                        distance: 453,
                        strokeIndex: 5,
                        par: 4
                    },
                    {
                        index: 11,
                        distance: 362,
                        strokeIndex: 8,
                        par: 4
                    },
                    {
                        index: 12,
                        distance: 503,
                        strokeIndex: 12,
                        par: 5
                    },
                    {
                        index: 13,
                        distance: 414,
                        strokeIndex: 1,
                        par: 4
                    },
                    {
                        index: 14,
                        distance: 447,
                        strokeIndex: 3,
                        par: 4
                    },
                    {
                        index: 15,
                        distance: 170,
                        strokeIndex: 10,
                        par: 3
                    },
                    {
                        index: 16,
                        distance: 302,
                        strokeIndex: 13,
                        par: 4
                    },
                    {
                        index: 17,
                        distance: 164,
                        strokeIndex: 18,
                        par: 3
                    },
                    {
                        index: 18,
                        distance: 534,
                        strokeIndex: 7,
                        par: 5
                    }
                ]
            },
            {
                name: 'Yellow',
                measure: 'yards',
                holes: [
                    {
                        index: 1,
                        distance: 497,
                        strokeIndex: 11,
                        par: 5
                    },
                    {
                        index: 2,
                        distance: 164,
                        strokeIndex: 13,
                        par: 3
                    },
                    {
                        index: 3,
                        distance: 417,
                        strokeIndex: 4,
                        par: 4
                    },
                    {
                        index: 4,
                        distance: 309,
                        strokeIndex: 15,
                        par: 4
                    },
                    {
                        index: 5,
                        distance: 373,
                        strokeIndex: 6,
                        par: 4
                    },
                    {
                        index: 6,
                        distance: 399,
                        strokeIndex: 2,
                        par: 4
                    },
                    {
                        index: 7,
                        distance: 339,
                        strokeIndex: 16,
                        par: 4
                    },
                    {
                        index: 8,
                        distance: 177,
                        strokeIndex: 9,
                        par: 3
                    },
                    {
                        index: 9,
                        distance: 490,
                        strokeIndex: 17,
                        par: 5
                    },
                    {
                        index: 10,
                        distance: 448,
                        strokeIndex: 5,
                        par: 4
                    },
                    {
                        index: 11,
                        distance: 360,
                        strokeIndex: 8,
                        par: 4
                    },
                    {
                        index: 12,
                        distance: 498,
                        strokeIndex: 12,
                        par: 5
                    },
                    {
                        index: 13,
                        distance: 408,
                        strokeIndex: 1,
                        par: 4
                    },
                    {
                        index: 14,
                        distance: 447,
                        strokeIndex: 3,
                        par: 4
                    },
                    {
                        index: 15,
                        distance: 166,
                        strokeIndex: 10,
                        par: 3
                    },
                    {
                        index: 16,
                        distance: 302,
                        strokeIndex: 13,
                        par: 4
                    },
                    {
                        index: 17,
                        distance: 156,
                        strokeIndex: 18,
                        par: 3
                    },
                    {
                        index: 18,
                        distance: 524,
                        strokeIndex: 7,
                        par: 5
                    }
                ]
            },
            {
                name: 'Red',
                measure: 'yards',
                holes: [
                    {
                        index: 1,
                        distance: 483,
                        strokeIndex: 10,
                        par: 5
                    },
                    {
                        index: 2,
                        distance: 151,
                        strokeIndex: 15,
                        par: 3
                    },
                    {
                        index: 3,
                        distance: 340,
                        strokeIndex: 6,
                        par: 4
                    },
                    {
                        index: 4,
                        distance: 265,
                        strokeIndex: 12,
                        par: 4
                    },
                    {
                        index: 5,
                        distance: 361,
                        strokeIndex: 2,
                        par: 4
                    },
                    {
                        index: 6,
                        distance: 340,
                        strokeIndex: 4,
                        par: 4
                    },
                    {
                        index: 7,
                        distance: 275,
                        strokeIndex: 14,
                        par: 4
                    },
                    {
                        index: 8,
                        distance: 139,
                        strokeIndex: 17,
                        par: 3
                    },
                    {
                        index: 9,
                        distance: 468,
                        strokeIndex: 9,
                        par: 5
                    },
                    {
                        index: 10,
                        distance: 421,
                        strokeIndex: 13,
                        par: 5
                    },
                    {
                        index: 11,
                        distance: 277,
                        strokeIndex: 11,
                        par: 4
                    },
                    {
                        index: 12,
                        distance: 364,
                        strokeIndex: 1,
                        par: 4
                    },
                    {
                        index: 13,
                        distance: 389,
                        strokeIndex: 5,
                        par: 5
                    },
                    {
                        index: 14,
                        distance: 359,
                        strokeIndex: 3,
                        par: 4
                    },
                    {
                        index: 15,
                        distance: 135,
                        strokeIndex: 16,
                        par: 3
                    },
                    {
                        index: 16,
                        distance: 273,
                        strokeIndex: 8,
                        par: 4
                    },
                    {
                        index: 17,
                        distance: 137,
                        strokeIndex: 18,
                        par: 3
                    },
                    {
                        index: 18,
                        distance: 462,
                        strokeIndex: 7,
                        par: 5
                    }
                ]
            }
        ]
    },
    {
        randa: 20083,
        name: 'Stocks',
        tees: [
            {
                name: 'White',
                measure: 'yards',
                holes: [
                    {
                        index: 1,
                        distance: 382,
                        strokeIndex: 11,
                        par: 4
                    },
                    {
                        index: 2,
                        distance: 424,
                        strokeIndex: 3,
                        par: 4
                    },
                    {
                        index: 3,
                        distance: 369,
                        strokeIndex: 9,
                        par: 4
                    },
                    {
                        index: 4,
                        distance: 519,
                        strokeIndex: 13,
                        par: 5
                    },
                    {
                        index: 5,
                        distance: 515,
                        strokeIndex: 7,
                        par: 5
                    },
                    {
                        index: 6,
                        distance: 436,
                        strokeIndex: 1,
                        par: 4
                    },
                    {
                        index: 7,
                        distance: 161,
                        strokeIndex: 17,
                        par: 3
                    },
                    {
                        index: 8,
                        distance: 471,
                        strokeIndex: 5,
                        par: 4
                    },
                    {
                        index: 9,
                        distance: 191,
                        strokeIndex: 15,
                        par: 3
                    },
                    {
                        index: 10,
                        distance: 288,
                        strokeIndex: 12,
                        par: 4
                    },
                    {
                        index: 11,
                        distance: 357,
                        strokeIndex: 4,
                        par: 4
                    },
                    {
                        index: 12,
                        distance: 130,
                        strokeIndex: 14,
                        par: 3
                    },
                    {
                        index: 13,
                        distance: 369,
                        strokeIndex: 6,
                        par: 4
                    },
                    {
                        index: 14,
                        distance: 329,
                        strokeIndex: 18,
                        par: 4
                    },
                    {
                        index: 15,
                        distance: 377,
                        strokeIndex: 2,
                        par: 4
                    },
                    {
                        index: 16,
                        distance: 489,
                        strokeIndex: 8,
                        par: 5
                    },
                    {
                        index: 17,
                        distance: 368,
                        strokeIndex: 16,
                        par: 4
                    },
                    {
                        index: 18,
                        distance: 538,
                        strokeIndex: 10,
                        par: 5
                    }
                ]
            },
            {
                name: 'Yellow',
                measure: 'yards',
                holes: [
                    {
                        index: 1,
                        distance: 382,
                        strokeIndex: 11,
                        par: 4
                    },
                    {
                        index: 2,
                        distance: 397,
                        strokeIndex: 3,
                        par: 4
                    },
                    {
                        index: 3,
                        distance: 331,
                        strokeIndex: 9,
                        par: 4
                    },
                    {
                        index: 4,
                        distance: 498,
                        strokeIndex: 13,
                        par: 5
                    },
                    {
                        index: 5,
                        distance: 490,
                        strokeIndex: 7,
                        par: 5
                    },
                    {
                        index: 6,
                        distance: 416,
                        strokeIndex: 1,
                        par: 4
                    },
                    {
                        index: 7,
                        distance: 135,
                        strokeIndex: 17,
                        par: 3
                    },
                    {
                        index: 8,
                        distance: 423,
                        strokeIndex: 5,
                        par: 4
                    },
                    {
                        index: 9,
                        distance: 166,
                        strokeIndex: 15,
                        par: 3
                    },
                    {
                        index: 10,
                        distance: 288,
                        strokeIndex: 12,
                        par: 4
                    },
                    {
                        index: 11,
                        distance: 337,
                        strokeIndex: 4,
                        par: 4
                    },
                    {
                        index: 12,
                        distance: 128,
                        strokeIndex: 14,
                        par: 3
                    },
                    {
                        index: 13,
                        distance: 358,
                        strokeIndex: 6,
                        par: 4
                    },
                    {
                        index: 14,
                        distance: 288,
                        strokeIndex: 18,
                        par: 4
                    },
                    {
                        index: 15,
                        distance: 351,
                        strokeIndex: 2,
                        par: 4
                    },
                    {
                        index: 16,
                        distance: 470,
                        strokeIndex: 8,
                        par: 5
                    },
                    {
                        index: 17,
                        distance: 327,
                        strokeIndex: 16,
                        par: 4
                    },
                    {
                        index: 18,
                        distance: 471,
                        strokeIndex: 10,
                        par: 5
                    }
                ]
            },
            {
                name: 'Red',
                measure: 'yards',
                holes: [
                    {
                        index: 1,
                        distance: 341,
                        strokeIndex: 9,
                        par: 4
                    },
                    {
                        index: 2,
                        distance: 343,
                        strokeIndex: 3,
                        par: 4
                    },
                    {
                        index: 3,
                        distance: 299,
                        strokeIndex: 11,
                        par: 4
                    },
                    {
                        index: 4,
                        distance: 457,
                        strokeIndex: 13,
                        par: 5
                    },
                    {
                        index: 5,
                        distance: 418,
                        strokeIndex: 7,
                        par: 5
                    },
                    {
                        index: 6,
                        distance: 393,
                        strokeIndex: 1,
                        par: 4
                    },
                    {
                        index: 7,
                        distance: 111,
                        strokeIndex: 17,
                        par: 3
                    },
                    {
                        index: 8,
                        distance: 369,
                        strokeIndex: 5,
                        par: 4
                    },
                    {
                        index: 9,
                        distance: 142,
                        strokeIndex: 15,
                        par: 3
                    },
                    {
                        index: 10,
                        distance: 231,
                        strokeIndex: 12,
                        par: 4
                    },
                    {
                        index: 11,
                        distance: 282,
                        strokeIndex: 4,
                        par: 4
                    },
                    {
                        index: 12,
                        distance: 144,
                        strokeIndex: 18,
                        par: 3
                    },
                    {
                        index: 13,
                        distance: 340,
                        strokeIndex: 2,
                        par: 4
                    },
                    {
                        index: 14,
                        distance: 277,
                        strokeIndex: 14,
                        par: 4
                    },
                    {
                        index: 15,
                        distance: 294,
                        strokeIndex: 6,
                        par: 4
                    },
                    {
                        index: 16,
                        distance: 400,
                        strokeIndex: 8,
                        par: 5
                    },
                    {
                        index: 17,
                        distance: 266,
                        strokeIndex: 16,
                        par: 4
                    },
                    {
                        index: 18,
                        distance: 412,
                        strokeIndex: 10,
                        par: 5
                    }
                ]
            }
        ]
    },
    {
        randa: 22167,
        name: 'Weston Turville',
        tees: [
            {
                name: 'White',
                measure: 'yards',
                holes: [
                    {
                        index: 1,
                        distance: 395,
                        strokeIndex: 10,
                        par: 4
                    },
                    {
                        index: 2,
                        distance: 395,
                        strokeIndex: 4,
                        par: 4
                    },
                    {
                        index: 3,
                        distance: 172,
                        strokeIndex: 12,
                        par: 3
                    },
                    {
                        index: 4,
                        distance: 124,
                        strokeIndex: 18,
                        par: 3
                    },
                    {
                        index: 5,
                        distance: 418,
                        strokeIndex: 2,
                        par: 4
                    },
                    {
                        index: 6,
                        distance: 168,
                        strokeIndex: 6,
                        par: 3
                    },
                    {
                        index: 7,
                        distance: 479,
                        strokeIndex: 14,
                        par: 5
                    },
                    {
                        index: 8,
                        distance: 325,
                        strokeIndex: 8,
                        par: 4
                    },
                    {
                        index: 9,
                        distance: 326,
                        strokeIndex: 16,
                        par: 4
                    },
                    {
                        index: 10,
                        distance: 203,
                        strokeIndex: 7,
                        par: 3
                    },
                    {
                        index: 11,
                        distance: 514,
                        strokeIndex: 17,
                        par: 5
                    },
                    {
                        index: 12,
                        distance: 378,
                        strokeIndex: 11,
                        par: 4
                    },
                    {
                        index: 13,
                        distance: 404,
                        strokeIndex: 3,
                        par: 4
                    },
                    {
                        index: 14,
                        distance: 343,
                        strokeIndex: 15,
                        par: 4
                    },
                    {
                        index: 15,
                        distance: 428,
                        strokeIndex: 1,
                        par: 4
                    },
                    {
                        index: 16,
                        distance: 178,
                        strokeIndex: 13,
                        par: 3
                    },
                    {
                        index: 17,
                        distance: 363,
                        strokeIndex: 5,
                        par: 4
                    },
                    {
                        index: 18,
                        distance: 395,
                        strokeIndex: 9,
                        par: 4
                    }
                ]
            },
            {
                name: 'Yellow',
                measure: 'yards',
                holes: [
                    {
                        index: 1,
                        distance: 350,
                        strokeIndex: 10,
                        par: 4
                    },
                    {
                        index: 2,
                        distance: 381,
                        strokeIndex: 4,
                        par: 4
                    },
                    {
                        index: 3,
                        distance: 161,
                        strokeIndex: 12,
                        par: 3
                    },
                    {
                        index: 4,
                        distance: 117,
                        strokeIndex: 18,
                        par: 3
                    },
                    {
                        index: 5,
                        distance: 408,
                        strokeIndex: 2,
                        par: 4
                    },
                    {
                        index: 6,
                        distance: 166,
                        strokeIndex: 6,
                        par: 3
                    },
                    {
                        index: 7,
                        distance: 471,
                        strokeIndex: 14,
                        par: 5
                    },
                    {
                        index: 8,
                        distance: 320,
                        strokeIndex: 8,
                        par: 4
                    },
                    {
                        index: 9,
                        distance: 323,
                        strokeIndex: 16,
                        par: 4
                    },
                    {
                        index: 10,
                        distance: 189,
                        strokeIndex: 7,
                        par: 3
                    },
                    {
                        index: 11,
                        distance: 503,
                        strokeIndex: 17,
                        par: 5
                    },
                    {
                        index: 12,
                        distance: 363,
                        strokeIndex: 11,
                        par: 4
                    },
                    {
                        index: 13,
                        distance: 389,
                        strokeIndex: 3,
                        par: 4
                    },
                    {
                        index: 14,
                        distance: 323,
                        strokeIndex: 15,
                        par: 4
                    },
                    {
                        index: 15,
                        distance: 411,
                        strokeIndex: 1,
                        par: 4
                    },
                    {
                        index: 16,
                        distance: 167,
                        strokeIndex: 13,
                        par: 3
                    },
                    {
                        index: 17,
                        distance: 316,
                        strokeIndex: 5,
                        par: 4
                    },
                    {
                        index: 18,
                        distance: 387,
                        strokeIndex: 9,
                        par: 4
                    }
                ]
            },
            {
                name: 'Red',
                measure: 'yards',
                holes: [
                    {
                        index: 1,
                        distance: 338,
                        strokeIndex: 4,
                        par: 4
                    },
                    {
                        index: 2,
                        distance: 348,
                        strokeIndex: 6,
                        par: 4
                    },
                    {
                        index: 3,
                        distance: 153,
                        strokeIndex: 16,
                        par: 3
                    },
                    {
                        index: 4,
                        distance: 105,
                        strokeIndex: 18,
                        par: 3
                    },
                    {
                        index: 5,
                        distance: 397,
                        strokeIndex: 10,
                        par: 5
                    },
                    {
                        index: 6,
                        distance: 151,
                        strokeIndex: 14,
                        par: 3
                    },
                    {
                        index: 7,
                        distance: 445,
                        strokeIndex: 2,
                        par: 5
                    },
                    {
                        index: 8,
                        distance: 315,
                        strokeIndex: 8,
                        par: 4
                    },
                    {
                        index: 9,
                        distance: 313,
                        strokeIndex: 12,
                        par: 4
                    },
                    {
                        index: 10,
                        distance: 152,
                        strokeIndex: 15,
                        par: 3
                    },
                    {
                        index: 11,
                        distance: 494,
                        strokeIndex: 5,
                        par: 5
                    },
                    {
                        index: 12,
                        distance: 347,
                        strokeIndex: 9,
                        par: 4
                    },
                    {
                        index: 13,
                        distance: 376,
                        strokeIndex: 3,
                        par: 4
                    },
                    {
                        index: 14,
                        distance: 238,
                        strokeIndex: 17,
                        par: 4
                    },
                    {
                        index: 15,
                        distance: 359,
                        strokeIndex: 1,
                        par: 4
                    },
                    {
                        index: 16,
                        distance: 140,
                        strokeIndex: 13,
                        par: 3
                    },
                    {
                        index: 17,
                        distance: 317,
                        strokeIndex: 11,
                        par: 4
                    },
                    {
                        index: 18,
                        distance: 381,
                        strokeIndex: 7,
                        par: 4
                    }
                ]
            }
        ]
    },
    {
        randa: 21494,
        name: 'Caddington',
        tees: [
            {
                name: 'White',
                measure: 'yards',
                holes: [
                    {
                        index: 1,
                        distance: 473,
                        strokeIndex: 17,
                        par: 5
                    },
                    {
                        index: 2,
                        distance: 123,
                        strokeIndex: 13,
                        par: 3
                    },
                    {
                        index: 3,
                        distance: 394,
                        strokeIndex: 5,
                        par: 4
                    },
                    {
                        index: 4,
                        distance: 214,
                        strokeIndex: 9,
                        par: 3
                    },
                    {
                        index: 5,
                        distance: 311,
                        strokeIndex: 15,
                        par: 4
                    },
                    {
                        index: 6,
                        distance: 381,
                        strokeIndex: 7,
                        par: 4
                    },
                    {
                        index: 7,
                        distance: 150,
                        strokeIndex: 11,
                        par: 3
                    },
                    {
                        index: 8,
                        distance: 431,
                        strokeIndex: 3,
                        par: 4
                    },
                    {
                        index: 9,
                        distance: 418,
                        strokeIndex: 1,
                        par: 4
                    },
                    {
                        index: 10,
                        distance: 150,
                        strokeIndex: 6,
                        par: 3
                    },
                    {
                        index: 11,
                        distance: 355,
                        strokeIndex: 2,
                        par: 4
                    },
                    {
                        index: 12,
                        distance: 368,
                        strokeIndex: 8,
                        par: 4
                    },
                    {
                        index: 13,
                        distance: 476,
                        strokeIndex: 12,
                        par: 5
                    },
                    {
                        index: 14,
                        distance: 226,
                        strokeIndex: 4,
                        par: 3
                    },
                    {
                        index: 15,
                        distance: 426,
                        strokeIndex: 18,
                        par: 5
                    },
                    {
                        index: 16,
                        distance: 270,
                        strokeIndex: 16,
                        par: 4
                    },
                    {
                        index: 17,
                        distance: 475,
                        strokeIndex: 14,
                        par: 5
                    },
                    {
                        index: 18,
                        distance: 379,
                        strokeIndex: 10,
                        par: 4
                    }
                ]
            },
            {
                name: 'Blue',
                measure: 'yards',
                holes: [
                    {
                        index: 1,
                        distance: 460,
                        strokeIndex: 17,
                        par: 5
                    },
                    {
                        index: 2,
                        distance: 131,
                        strokeIndex: 13,
                        par: 3
                    },
                    {
                        index: 3,
                        distance: 383,
                        strokeIndex: 5,
                        par: 4
                    },
                    {
                        index: 4,
                        distance: 201,
                        strokeIndex: 9,
                        par: 3
                    },
                    {
                        index: 5,
                        distance: 296,
                        strokeIndex: 15,
                        par: 4
                    },
                    {
                        index: 6,
                        distance: 368,
                        strokeIndex: 7,
                        par: 4
                    },
                    {
                        index: 7,
                        distance: 140,
                        strokeIndex: 11,
                        par: 3
                    },
                    {
                        index: 8,
                        distance: 378,
                        strokeIndex: 3,
                        par: 4
                    },
                    {
                        index: 9,
                        distance: 410,
                        strokeIndex: 1,
                        par: 4
                    },
                    {
                        index: 10,
                        distance: 143,
                        strokeIndex: 6,
                        par: 3
                    },
                    {
                        index: 11,
                        distance: 350,
                        strokeIndex: 2,
                        par: 4
                    },
                    {
                        index: 12,
                        distance: 361,
                        strokeIndex: 8,
                        par: 4
                    },
                    {
                        index: 13,
                        distance: 455,
                        strokeIndex: 12,
                        par: 5
                    },
                    {
                        index: 14,
                        distance: 219,
                        strokeIndex: 4,
                        par: 3
                    },
                    {
                        index: 15,
                        distance: 420,
                        strokeIndex: 18,
                        par: 5
                    },
                    {
                        index: 16,
                        distance: 250,
                        strokeIndex: 16,
                        par: 4
                    },
                    {
                        index: 17,
                        distance: 458,
                        strokeIndex: 14,
                        par: 5
                    },
                    {
                        index: 18,
                        distance: 371,
                        strokeIndex: 10,
                        par: 4
                    }
                ]
            },
            {
                name: 'Red 2019',
                measure: 'yards',
                holes: [
                    {
                        index: 1,
                        distance: 403,
                        strokeIndex: 17,
                        par: 4
                    },
                    {
                        index: 2,
                        distance: 110,
                        strokeIndex: 13,
                        par: 3
                    },
                    {
                        index: 3,
                        distance: 337,
                        strokeIndex: 5,
                        par: 4
                    },
                    {
                        index: 4,
                        distance: 158,
                        strokeIndex: 9,
                        par: 3
                    },
                    {
                        index: 5,
                        distance: 262,
                        strokeIndex: 15,
                        par: 4
                    },
                    {
                        index: 6,
                        distance: 357,
                        strokeIndex: 7,
                        par: 4
                    },
                    {
                        index: 7,
                        distance: 132,
                        strokeIndex: 11,
                        par: 3
                    },
                    {
                        index: 8,
                        distance: 372,
                        strokeIndex: 3,
                        par: 4
                    },
                    {
                        index: 9,
                        distance: 402,
                        strokeIndex: 1,
                        par: 5
                    },
                    {
                        index: 10,
                        distance: 137,
                        strokeIndex: 6,
                        par: 3
                    },
                    {
                        index: 11,
                        distance: 342,
                        strokeIndex: 2,
                        par: 4
                    },
                    {
                        index: 12,
                        distance: 355,
                        strokeIndex: 8,
                        par: 4
                    },
                    {
                        index: 13,
                        distance: 317,
                        strokeIndex: 12,
                        par: 4
                    },
                    {
                        index: 14,
                        distance: 160,
                        strokeIndex: 4,
                        par: 3
                    },
                    {
                        index: 15,
                        distance: 388,
                        strokeIndex: 18,
                        par: 4
                    },
                    {
                        index: 16,
                        distance: 221,
                        strokeIndex: 16,
                        par: 4
                    },
                    {
                        index: 17,
                        distance: 364,
                        strokeIndex: 14,
                        par: 5
                    },
                    {
                        index: 18,
                        distance: 334,
                        strokeIndex: 10,
                        par: 4
                    }
                ]
            }
        ]
    },
    {
        randa: 20324,
        name: 'Tilsworth',
        tees: [
            {
                name: 'White',
                measure: 'yards',
                holes: [
                    {
                        index: 1,
                        distance: 567,
                        strokeIndex: 5,
                        par: 5
                    },
                    {
                        index: 2,
                        distance: 296,
                        strokeIndex: 15,
                        par: 4
                    },
                    {
                        index: 3,
                        distance: 195,
                        strokeIndex: 9,
                        par: 3
                    },
                    {
                        index: 4,
                        distance: 328,
                        strokeIndex: 1,
                        par: 4
                    },
                    {
                        index: 5,
                        distance: 250,
                        strokeIndex: 7,
                        par: 4
                    },
                    {
                        index: 6,
                        distance: 161,
                        strokeIndex: 17,
                        par: 3
                    },
                    {
                        index: 7,
                        distance: 317,
                        strokeIndex: 3,
                        par: 4
                    },
                    {
                        index: 8,
                        distance: 318,
                        strokeIndex: 11,
                        par: 4
                    },
                    {
                        index: 9,
                        distance: 515,
                        strokeIndex: 13,
                        par: 5
                    },
                    {
                        index: 10,
                        distance: 395,
                        strokeIndex: 2,
                        par: 4
                    },
                    {
                        index: 11,
                        distance: 338,
                        strokeIndex: 6,
                        par: 4
                    },
                    {
                        index: 12,
                        distance: 254,
                        strokeIndex: 12,
                        par: 4
                    },
                    {
                        index: 13,
                        distance: 97,
                        strokeIndex: 18,
                        par: 3
                    },
                    {
                        index: 14,
                        distance: 321,
                        strokeIndex: 14,
                        par: 4
                    },
                    {
                        index: 15,
                        distance: 266,
                        strokeIndex: 10,
                        par: 4
                    },
                    {
                        index: 16,
                        distance: 163,
                        strokeIndex: 4,
                        par: 3
                    },
                    {
                        index: 17,
                        distance: 316,
                        strokeIndex: 8,
                        par: 4
                    },
                    {
                        index: 18,
                        distance: 209,
                        strokeIndex: 16,
                        par: 3
                    }
                ]
            },
            {
                name: 'Yellow',
                measure: 'yards',
                holes: [
                    {
                        index: 1,
                        distance: 553,
                        strokeIndex: 5,
                        par: 5
                    },
                    {
                        index: 2,
                        distance: 296,
                        strokeIndex: 15,
                        par: 4
                    },
                    {
                        index: 3,
                        distance: 191,
                        strokeIndex: 9,
                        par: 3
                    },
                    {
                        index: 4,
                        distance: 317,
                        strokeIndex: 1,
                        par: 4
                    },
                    {
                        index: 5,
                        distance: 240,
                        strokeIndex: 7,
                        par: 4
                    },
                    {
                        index: 6,
                        distance: 156,
                        strokeIndex: 17,
                        par: 3
                    },
                    {
                        index: 7,
                        distance: 310,
                        strokeIndex: 3,
                        par: 4
                    },
                    {
                        index: 8,
                        distance: 310,
                        strokeIndex: 11,
                        par: 4
                    },
                    {
                        index: 9,
                        distance: 498,
                        strokeIndex: 13,
                        par: 5
                    },
                    {
                        index: 10,
                        distance: 380,
                        strokeIndex: 2,
                        par: 4
                    },
                    {
                        index: 11,
                        distance: 334,
                        strokeIndex: 6,
                        par: 4
                    },
                    {
                        index: 12,
                        distance: 250,
                        strokeIndex: 12,
                        par: 4
                    },
                    {
                        index: 13,
                        distance: 94,
                        strokeIndex: 18,
                        par: 3
                    },
                    {
                        index: 14,
                        distance: 270,
                        strokeIndex: 14,
                        par: 4
                    },
                    {
                        index: 15,
                        distance: 258,
                        strokeIndex: 10,
                        par: 4
                    },
                    {
                        index: 16,
                        distance: 152,
                        strokeIndex: 4,
                        par: 3
                    },
                    {
                        index: 17,
                        distance: 304,
                        strokeIndex: 8,
                        par: 4
                    },
                    {
                        index: 18,
                        distance: 205,
                        strokeIndex: 16,
                        par: 3
                    }
                ]
            },
            {
                name: 'Red',
                measure: 'yards',
                holes: [
                    {
                        index: 1,
                        distance: 493,
                        strokeIndex: 1,
                        par: 5
                    },
                    {
                        index: 2,
                        distance: 289,
                        strokeIndex: 15,
                        par: 4
                    },
                    {
                        index: 3,
                        distance: 191,
                        strokeIndex: 13,
                        par: 3
                    },
                    {
                        index: 4,
                        distance: 213,
                        strokeIndex: 11,
                        par: 4
                    },
                    {
                        index: 5,
                        distance: 229,
                        strokeIndex: 7,
                        par: 4
                    },
                    {
                        index: 6,
                        distance: 154,
                        strokeIndex: 17,
                        par: 3
                    },
                    {
                        index: 7,
                        distance: 305,
                        strokeIndex: 5,
                        par: 4
                    },
                    {
                        index: 8,
                        distance: 308,
                        strokeIndex: 9,
                        par: 4
                    },
                    {
                        index: 9,
                        distance: 505,
                        strokeIndex: 3,
                        par: 5
                    },
                    {
                        index: 10,
                        distance: 311,
                        strokeIndex: 4,
                        par: 4
                    },
                    {
                        index: 11,
                        distance: 330,
                        strokeIndex: 2,
                        par: 4
                    },
                    {
                        index: 12,
                        distance: 242,
                        strokeIndex: 10,
                        par: 4
                    },
                    {
                        index: 13,
                        distance: 91,
                        strokeIndex: 12,
                        par: 3
                    },
                    {
                        index: 14,
                        distance: 261,
                        strokeIndex: 8,
                        par: 4
                    },
                    {
                        index: 15,
                        distance: 227,
                        strokeIndex: 18,
                        par: 4
                    },
                    {
                        index: 16,
                        distance: 152,
                        strokeIndex: 14,
                        par: 3
                    },
                    {
                        index: 17,
                        distance: 299,
                        strokeIndex: 6,
                        par: 4
                    },
                    {
                        index: 18,
                        distance: 201,
                        strokeIndex: 16,
                        par: 3
                    }
                ]
            }
        ]
    }
];

module.exports = { countries, courses, demerits, drinks, regions, rounds, sections, users };