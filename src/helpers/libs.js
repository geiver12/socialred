const helpers = {};

helpers.randomNumber = () => {
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789-_/$·!.,';
    let randomNumber = 0;

    for (let index = 0; index < 6; index++) {
        randomNumber += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return randomNumber;
};

module.exports = helpers;