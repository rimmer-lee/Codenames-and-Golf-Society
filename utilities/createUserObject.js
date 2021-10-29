module.exports = (user)  => {
    const { email, name, image, birthday, gender, username } = user;
    const { full, title, preferred } = name;
    const names = full.split(' ');
    const userObject = {
        name: { title, preferred },
        username,
        // image,
        email,
        birthday,
        gender
    };
    if (names.length > 0) userObject.name.first = names[0];
    if (names.length > 1) userObject.name.last = names[names.length - 1];
    if (names.length > 2) userObject.name.middle = names.slice(1, -1);
    return userObject;
};