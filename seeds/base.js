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
        when: { hole: 6, date: new Date(2021, 3, 14) },
        rule: 18,
        action: { demerits: 1 },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 3, 14)
                }
            }
        ]
    },
    {
        player: 'Martin Nash',
        when: { hole: 6, date: new Date(2021, 3, 14) },
        rule: 18,
        action: { demerits: 1 },
        status: 'Approved',
        history: [
            {
                status: 'Created',
                updated: {
                    by: 'The Machine',
                    date: new Date(2021, 3, 14)
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
            first: 'Thomas',
            middle: [ 'Lee' ],
            last: 'Rimmer'
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
            first: 'Joseph',
            middle: [ 'Edward', 'Carew' ],
            last: 'Burrows'
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
            first: 'Jonathan',
            middle: [ 'Elliot' ],
            last: 'Martin'
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
            first: 'Martin',
            middle: [ 'James' ],
            last: 'Nash',
            status: 'active'
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
            first: 'Oliver',
            middle: [ 'George' ],
            last: 'Nash'
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

];

const courses = [

    // const HoleSchema = new Schema({
    //     name: String,
    //     index: {
    //         type: Number,
    //         min: 1,
    //         max: 18
    //     },
    //     distance: Number,
    //     strokeIndex: {
    //         type: Number,
    //         min: 1,
    //         max: 18
    //     },
    //     par: {
    //         type: Number,
    //         min: 3,
    //         max: 5
    //     }
    // });
    
    // const TeeSchema = new Schema({
    //     colour: {
    //         type: String,
    //         enum: TEE_COLOURS.map(({ colour }) => colour)
    //     },
    //     ratings: {
    //         course: {
    //             full: Number,
    //             front: Number,
    //             back: Number,
    //         },
    //         bogey: Number,
    //         slope: {
    //             full: {
    //                 type: Number,
    //                 min: 55,
    //                 max: 155
    //             },
    //             front: {
    //                 type: Number,
    //                 min: 55,
    //                 max: 155
    //             },
    //             back: {
    //                 type: Number,
    //                 min: 55,
    //                 max: 155
    //             }
    //         }   
    //     },
    //     measure: {
    //         type: String,
    //         enum: [ 'yards' ]
    //     },
    //     holes: [ HoleSchema ]
    // });
    
    // const CourseSchema = new Schema({
    //     created: {
    //         date: {
    //             type: Date,
    //             default: Date.now(),
    //             required: true
    //         },
    //         by: {
    //             type: Schema.Types.ObjectId,
    //             ref: 'User',
    //             required: true
    //         },
    //         comments: String
    //     },
    //     name: String,
    //     geometry: {
    //         type: {
    //             type: String,
    //             enum: [ 'Point' ]
    //         },
    //         coordinates: {
    //             type: [ Number ]
    //         }
    //     },
    //     tees: [ TeeSchema ]
    // });

];

module.exports = { courses, demerits, drinks, rounds, sections, users };