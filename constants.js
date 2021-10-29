const TITLES = [{ id: 'ace', value: 'Ace', icon: 'bi-suit-spade-fill' }, { id: 'flag-bitch', value: 'flag bitch', icon: 'bi-flag-fill' }, { id: 'karen', value: 'Karen', icon: 'bi-cone-striped' }];
const ACTIONS = [{ method: 'award', title: 'Award', class: 'success', tooltip: 'top' }, { method: 'revoke', title: 'Revoke', class: 'danger', tooltip: 'bottom' }];
const NAME_TITLES = ['Master', 'Mr', 'Ms', 'Miss', 'Mrs', 'Mx', 'Lord', 'Lady', 'Sir', 'Dame', 'Dr', 'Prof'];
const GENDERS = ['ambiguous', 'female', 'male', 'trans'];
const ROLES = ['super', 'founder', 'admin', 'user'];
const TEE_COLOURS = [
    { colour: 'black', class: 'dark' },
    { colour: 'gold', class: 'secondary' },
    { colour: 'blue', class: 'primary' },
    { colour: 'white', class: 'light' },
    { colour: 'yellow', class: 'warning' },
    { colour: 'red', class: 'danger' },
    { colour: 'green', class: 'success' }
];
const SAFEURLS = {
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
};

module.exports = { TITLES, ACTIONS, NAME_TITLES, GENDERS, ROLES, TEE_COLOURS, SAFEURLS };