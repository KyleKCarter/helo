addPost = (req, res) => {
    const db = req.app.get('db');
    const {title, text} = req.body;
    db.create_post([title, text])
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json('Cannot process request.')
        })
}

getPosts = (req, res) => {
    const db = req.app.get('db');
    db.get_posts().then(response => {
        res.status(200).json(response)
    }).catch(error => {
        console.log(error)
        res.status(500).json('Cannot process request.')
    })
}

searchPost = (req, res) => {
    const db = req.app.get('db');
    const {title} = req.query;
    db.certain_post([title]);
    if(!title) {
        db.get_posts().then(response => {
            res.status(200).json(response)
        });
    } else {
        db.certain_post(title).then(response => {
            res.status(200).json(response)
        })
    }
}

module.exports = {
    getPosts,
    searchPost,
    addPost
}