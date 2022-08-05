module.exports = {
    ACTIONS: [
        { method: 'award', title: 'Award', class: 'success', tooltip: 'top' },
        { method: 'revoke', title: 'Revoke', class: 'danger', tooltip: 'bottom' }
    ],
    BREAKDOWN_OBJECT: {
        back: Number,
        front: Number,
        full: Number
    },
    COUNTRY_CODES: [
        { name: 'Argentina', 'alpha-3': 'ARG' },
        { name: 'Australia', 'alpha-3': 'AUS' },
        { name: 'Austria', 'alpha-3': 'AUT' },
        { name: 'Bahamas', 'alpha-3': 'BAH' },
        { name: 'Bangladesh', 'alpha-3': 'BAN' },
        { name: 'Barbados', 'alpha-3': 'BAR' },
        { name: 'Belgium', 'alpha-3': 'BEL' },
        { name: 'Bermuda', 'alpha-3': 'BER' },
        { name: 'Botswana', 'alpha-3': 'BOT' },
        { name: 'Brazil', 'alpha-3': 'BRA' },
        { name: 'Canada', 'alpha-3': 'CAN' },
        { name: 'Chad', 'alpha-3': 'CHA' },
        { name: 'Chile', 'alpha-3': 'CHI' },
        { name: 'Chinese Taipei', 'alpha-3': 'TPE' },
        { name: 'Colombia', 'alpha-3': 'COL' },
        { name: 'Costa Rica', 'alpha-3': 'CRC' },
        { name: 'Cyprus', 'alpha-3': 'CYP' },
        { name: 'Democratic Republic of the Congo', 'alpha-3': 'COD' },
        { name: 'Denmark', 'alpha-3': 'DEN' },
        { name: 'Dominican Republic', 'alpha-3': 'DOM' },
        { name: 'Ecuador', 'alpha-3': 'ECU' },
        { name: 'El Salvador', 'alpha-3': 'ESA' },
        { name: 'England', 'alpha-3': 'ENG' },
        { name: 'Estonia', 'alpha-3': 'EST' },
        { name: 'Finland', 'alpha-3': 'FIN' },
        { name: 'Germany', 'alpha-3': 'GER' },
        { name: 'Greece', 'alpha-3': 'GRE' },
        { name: 'Guatemala', 'alpha-3': 'GUA' },
        { name: 'Hong Kong, China', 'alpha-3': 'HKG' },
        { name: 'Hungary', 'alpha-3': 'HUN' },
        { name: 'Iceland', 'alpha-3': 'ISL' },
        { name: 'India', 'alpha-3': 'IND' },
        { name: 'Ireland', 'alpha-3': 'IRL' },
        { name: 'Italy', 'alpha-3': 'ITA' },
        { name: 'Japan', 'alpha-3': 'JPN' },
        { name: 'Jordan', 'alpha-3': 'JOR' },
        { name: 'Kenya', 'alpha-3': 'KEN' },
        { name: 'Latvia', 'alpha-3': 'LAT' },
        { name: 'Malawi', 'alpha-3': 'MAW' },
        { name: 'Malaysia', 'alpha-3': 'MAS' },
        { name: 'Malta', 'alpha-3': 'MLT' },
        { name: 'Marshall Islands', 'alpha-3': 'MHL' },
        { name: 'Mauritius', 'alpha-3': 'MRI' },
        { name: 'Mexico', 'alpha-3': 'MEX' },
        { name: 'Mongolia', 'alpha-3': 'MGL' },
        { name: 'Morocco', 'alpha-3': 'MAR' },
        { name: 'Mozambique', 'alpha-3': 'MOZ' },
        { name: 'Namibia', 'alpha-3': 'NAM' },
        { name: 'Netherlands', 'alpha-3': 'NED' },
        { name: 'New Zealand', 'alpha-3': 'NZL' },
        { name: 'Nicaragua', 'alpha-3': 'NCA' },
        { name: 'Northern Ireland', 'alpha-3': 'NIR' },
        { name: 'Norway', 'alpha-3': 'NOR' },
        { name: 'Oman', 'alpha-3': 'OMA' },
        { name: 'Panama', 'alpha-3': 'PAN' },
        { name: 'Paraguay', 'alpha-3': 'PAR' },
        { name: 'People Republic of China', 'alpha-3': 'CHN' },
        { name: 'Peru', 'alpha-3': 'PER' },
        { name: 'Philippines', 'alpha-3': 'PHI' },
        { name: 'Poland', 'alpha-3': 'POL' },
        { name: 'Portugal', 'alpha-3': 'POR' },
        { name: 'Puerto Rico', 'alpha-3': 'PUR' },
        { name: 'Republic of Korea', 'alpha-3': 'KOR' },
        { name: 'Scotland', 'alpha-3': 'SCO' },
        { name: 'Seychelles', 'alpha-3': 'SEY' },
        { name: 'Singapore', 'alpha-3': 'SIN' },
        { name: 'Slovakia', 'alpha-3': 'SVK' },
        { name: 'South Africa', 'alpha-3': 'RSA' },
        { name: 'Sri Lanka', 'alpha-3': 'SRI' },
        { name: 'Sudan', 'alpha-3': 'SUD' },
        { name: 'Swaziland', 'alpha-3': 'SWZ' },
        { name: 'Sweden', 'alpha-3': 'SWE' },
        { name: 'Switzerland', 'alpha-3': 'SUI' },
        { name: 'Thailand', 'alpha-3': 'THA' },
        { name: 'Turkey', 'alpha-3': 'TUR' },
        { name: 'Turks and Caicos', 'alpha-3': 'TCA' },
        { name: 'Uganda', 'alpha-3': 'UGA' },
        { name: 'United Arab Emirates', 'alpha-3': 'UAE' },
        { name: 'United Republic of Tanzania', 'alpha-3': 'TAN' },
        { name: 'United States', 'alpha-3': 'USA' },
        { name: 'Uruguay', 'alpha-3': 'URU' },
        { name: 'Venezuela', 'alpha-3': 'VEN' },
        { name: 'Vietnam', 'alpha-3': 'VIE' },
        { name: 'Wales', 'alpha-3': 'WAL' },
        { name: 'Zambia', 'alpha-3': 'ZAM' },
        { name: 'Zimbabwe', 'alpha-3': 'ZIM' }
    ],
    GAMES: {
        handicap: [
            {
                description: 'The participating player with the lowest handicap is taken as the baseline with all handicaps having the baseline deducted from them. The participating player with the lowest handicap is, therefore, playing off scratch.',
                id: 'competition',
                order: 2,
                value: 'Competition'
            },
            {
                description: 'The player\'s handicap is used.',
                id: 'standard',
                order: 1,
                value: 'Standard'
            }
        ],
        method: [
            {
                description: 'The \'Best\' (lowest) score is used as the team\'s score.',
                filters: { teams: { even: false, minimum: 1 } },
                id: 'best',
                order: 1,
                value: 'Best'
            },
            {
                description: 'The scores of all teammates are summed together.',
                filters: { teams: { even: true, minimum: 2 } },
                id: 'combined',
                order: 2,
                value: 'Combined'
            },
            {
                description: 'The \'Best\' (lowest) score is used to play against the \'Best\' score of the opposition and the \'Worst\' (highest) score is used to play against the \'Worst\' score of the opposition. If a team wins both match ups or 1 match up and ties the other then 1 point is scored for that team. If a team wins 1 match up and loses the other or if both match ups are tied then 0 points are scored.',
                filters: { teams: { even: true, minimum: 2 } },
                id: 'high/low',
                order: 3,
                value: 'High/Low'
            },
            {
                description: 'The \'Worst\' (highest) score is used as the team\'s score.',
                filters: { teams: { even: false, minimum: 1 } },
                id: 'worst',
                order: 4,
                value: 'Worst'
            }
        ],
        game: [
            {
                description: 'In match play, the lowest score on a hole wins that hole. The match is over when one player or side leads by more holes than there are still to play. A 4&3 victory is when one side is four holes up with only three holes to play.',
                filters: {
                    players: {
                        for: [ 'individual', 'team' ],
                        maximum: 2,
                        minimum: 2
                    },
                    method: ['best', 'combined', 'high/low', 'worst'],
                    scoring: ['nett', 'shots', 'stableford']
                },
                handicap: false,
                id: 'match-play',
                order: 1,
                value: 'Match Play'
            },
            {
                description: 'Players must register their score on every single hole, it doesn\`t matter how many shots they\`ve had, they must still produce a score. After the completion of the 18-holes, the scores are added up to give an overall total. The winner is the one with the lowest amount of strokes.',
                filters: {
                    players: {
                        for: [ 'individual', 'team' ],
                        minimum: 2
                    },
                    method: ['best', 'combined', 'high/low', 'worst'],
                    scoring: ['nett', 'shots', 'stableford']
                },
                handicap: false,
                id: 'stroke-play',
                order: 2,
                value: 'Stroke Play'
            },
            {
                description: 'If a player wins the hole outright, then they win the skin. If no-one wins the hole outright, the value of the skin gets added to the skin for the next hole. All players are able to compete for these held-over skins, even if they had not been involved in the tie for the win on the previous hole.',
                filters: {
                    players: {
                        for: [ 'individual', 'team' ],
                        minimum: 2
                    },
                    method: ['best', 'combined', 'high/low', 'worst'],
                    scoring: ['nett', 'shots', 'stableford']
                },
                handicap: false,
                id: 'skins',
                order: 3,
                value: 'Skins'
            },
            {
                description: 'Stableford is a very common scoring system in golf whereby points are awarded on each hole according to how the player does against their own handicap.',
                filters: {
                    players: {
                        for: [ 'individual' ],
                        minimum: 1
                    },
                    method: [],
                    scoring: ['stableford']
                },
                handicap: true,
                id: 'stableford',
                order: 4,
                value: 'Stableford'
            }
        ],
        scoring: [
            {
                description: 'Handicap adjusted shots are used.',
                id: 'nett',
                order: 2,
                value: 'Nett'
            },
            {
                description: 'Unadjusted shots are used.',
                id: 'shots',
                order: 1,
                value: 'Shots'
            },
            {
                description: 'Stableford calculated points are used.',
                id: 'stableford',
                order: 3,
                value: 'Stableford'
            }
        ]
    },
    GENDERS: ['ambiguous', 'female', 'male', 'trans'],
    NAME_TITLES: ['Master', 'Mr', 'Ms', 'Miss', 'Mrs', 'Mx', 'Lord', 'Lady', 'Sir', 'Dame', 'Dr', 'Prof'],
    NON_MEMBERS: ['guest', 'super'],
    PAR_CLASSES: ['f-level', 'f-over', 'f-under'],
    ROLES: ['admin', 'founder', 'guest', 'member', 'super'],
    ROUND_TYPES: [
        { name: 'full', start: 0, end: 18 },
        { name: 'front', start: 0, end: 9 },
        { name: 'back', start: 9, end: 18 },
        { name: 'practice', start: 0, end: 0 }
    ],
    SAFE_URLS: {
        connect: [
            'https://cdn.jsdelivr.net/'
        ],
        font: [
            'https://cdn.jsdelivr.net/',
            'https://fonts.gstatic.com'
        ],
        image: [],
        object: [],
        style: [
            'https://cdn.jsdelivr.net/',
            'https://stackpath.bootstrapcdn.com/',
            'https://fonts.googleapis.com/'
        ],
        script: [
            'https://cdn.jsdelivr.net/',
            'https://stackpath.bootstrapcdn.com/'
        ],
        worker: []
    },
    TEE_COLOURS: [
        { colour: 'black', class: { table: 'table-dark' } },
        { colour: 'silver', class: { table: 'table-secondary' } },
        { colour: 'gold', class: { table: 'table-warning' } },
        { colour: 'blue', class: { table: 'table-primary' } },
        { colour: 'white', class: { table: 'table-light' } },
        { colour: 'yellow', class: { table: 'table-warning' } },
        { colour: 'red', class: { table: 'table-danger' } },
        { colour: 'green', class: { table: 'table-success' } }
    ],
    TITLES: [
        { id: 'ace', value: 'Ace', icon: 'bi-suit-spade-fill' },
        { id: 'flag-bitch', value: 'flag bitch', icon: 'bi-flag-fill' },
        { id: 'karen', value: 'Karen', icon: 'bi-cone-striped' }
    ]
};