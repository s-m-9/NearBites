export const Images = {
    stars: {
        zero: require(`./large/large_0.png`),
        one: require(`./large/large_1.png`),
        one_half: require(`./large/large_1_half.png`),
        two: require(`./large/large_2.png`),
        two_half: require(`./large/large_2_half.png`),
        three: require(`./large/large_3.png`),
        three_half: require(`./large/large_3_half.png`),
        four: require(`./large/large_4.png`),
        four_half: require(`./large/large_4_half.png`),
        five: require(`./large/large_0.png`)
    },
    image_not_found: require('./image-not-found.png'),
    add_fav: require('./addFav.png'),
    show_fav: require('./showFav.png'),
    del_fav: require('./delFav.png'),
    yelp_logo: require('./yelpLogo.png')
};

export const getStarRating = (star) => {
    switch (star) {
        case 0:
            return Images.stars.zero
            break;
        case 1:
            return Images.stars.one
            break;
        case 1.5:
            return Images.stars.one_half
            break;
        case 2:
            return Images.stars.two
            break;
        case 2.5:
            return Images.stars.two_half
            break;
        case 3:
            return Images.stars.three
            break;
        case 3.5:
            return Images.stars.three_half
            break;
        case 4:
            return Images.stars.four
            break;
        case 4.5:
            return Images.stars.four_half
            break;
        case 5:
            return Images.stars.five
            break;
        default:
            return Images.stars.zero
    }
}