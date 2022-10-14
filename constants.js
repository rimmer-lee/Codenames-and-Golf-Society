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
    GAMES: {
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
                        minimum: 1
                    },
                    method: ['best', 'combined', 'worst'],
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
                    method: ['best', 'combined', 'worst'],
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
                filters: { teams: { even: false, minimum: 2 } },
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
    NAVBAR_LINKS: [
        { admin: false, link: '/charter', order: 1, text: 'Charter' },
        { admin: false, link: '/rounds/courses', order: 6, text: 'Courses' },
        { admin: false, link: '/demerits', order: 2, text: 'Demerits' },
        { admin: false, link: '/players', order: 3, text: 'Players' },
        { admin: false, link: '/rounds', order: 5, text: 'Rounds' },
        { admin: true, link: '/users', order: 4, text: 'Users' }
    ],
    NON_MEMBERS: ['guest', 'super'],
    PAR_CLASSES: ['f-level', 'f-over', 'f-under'],
    ROLES: ['admin', 'founder', 'guest', 'member', 'super'],
    ROUND_TYPES: [
        { end: 18, id: 'full', name: 'full', order: 1, start: 0, value: 'Full' },
        { end: 9, id: 'front', name: 'front', order: 2, start: 0, value: 'Front' },
        { end: 18, id: 'back', name: 'back', order: 3, start: 9, value: 'Back' },
        { end: 0, id: 'practice', name: 'practice', order: 4, start: 0, value: 'Practice' }
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