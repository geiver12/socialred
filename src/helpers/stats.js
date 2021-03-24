const { Image, Comment } = require("../models");

async function imageCounter() {
    return await Image.countDocuments();
}

async function commentsCounter() {
    return await Comment.countDocuments();
}

async function imageTotalViewsCounter() {
    const result = await Image.aggregate([{
        $group: {
            _id: '1',
            viewsTotal: { $sum: '$views' }
        }
    }]);
    if (result.length > 0)
        return result[0].viewsTotal;
    else
        return null
}

async function LikesTotalCounter() {
    const result = await Image.aggregate([{
        $group: {
            _id: '1',
            likesTotal: { $sum: '$likes' }
        }
    }]);

    if (result.length > 0)
        return result[0].likesTotal;
    else
        return null;

}


module.exports = async() => {
    const result = await Promise.all([
        imageCounter(), commentsCounter(), imageTotalViewsCounter(), LikesTotalCounter()
    ]);
    return {
        images: result[0],
        comments: result[1],
        views: result[2],
        likes: result[3]
    }
}