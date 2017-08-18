/**
 * Created by deepspace on 17-8-1.
 */
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static(__dirname+'/public'));

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let orm = require("orm");

orm.connect('sqlite:/home/coco/WebstormProjects/team/Friday/oomovie.db', function(err, db) {
    if (err) return console.error('Connection error: ' + err);
    else console.log('success!');
});

app.use(orm.express('sqlite:/home/coco/WebstormProjects/team/Friday/oomovie.db',{
    define: function (db, models, next) {
        models.movieType = db.define("movieType", {
            id:Number,
            typeName:String,
            flag :Number
        });
        models.movies = db.define("movieInfo", {
            id:Number,
            movieName:String,
            movieDirector:String,
            movieActors:String,
            moviePictures:String,
            description:String,
            url:String
            // ,flag :Number
        });
        models.comment = db.define("movieComment", {
            userName:String,
            id:Number,
            movieCommentInfo:String
            // ,flag :Number
        });
        models.midtab=db.define("MT",{
            typeId:Number,
            movieId:Number
        });
        next();
    }
}));

//请求index.html
app.get('/', (req, res) => {
    // res.send('hello world');
    res.sendFile('index.html', {root: './public'});
});


// 请求所有电影信息
app.get('/movies',function (req,res) {
    req.models.movies.find({flag:1},function (err,movies) {
        console.log(movies);
        res.send(movies);
    });
});
//请求电影所有列表的信息
app.get('/movieTypes',function (req,res) {
    // console.log(req.models);
    req.models.movieType.find({flag:1},function (err,type) {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send(JSON.stringify(type));
        }
    });
    // res.send(db.exec('SELECT * FROM categoryOfMovie'));
});
//
app.get('/movieTypes/:typeId',function (req,res) {
    let typeId = req.params.typeId;
    let movietype = [];
    req.models.midtab.find({typeId:typeId},function (err,type) {
        for(let i = 0;i<type.length;i++)
        {
            console.log(type[i].movieId);
            movietype.push(type[i].movieId);
        }
        console.log(movietype);
        req.models.movies.find({id:movietype},function (err,movie) {
            res.send(movie);
        });
    });
});
/*----------------------------*/
app.get('/movies/:name',function (req,res) {
    // console.log(req.models);
    let name = req.params.name;
    let movietype = [];
    let macat = {detInfo:{},com:{},type:[]};
    req.models.movies.find({movieName:name}, function (err,movies) {
        macat.detInfo = movies[0];
        console.log(movies[0]);
        req.models.comment.find({id:movies[0].id},function (err,comment) {
            macat.com = comment;
            req.models.midtab.find({movieId:movies[0].id},function (err,type) {
                for(let i = 0;i<type.length;i++)
                {
                    movietype.push(type[i].typeId);
                }
                macat.type = movietype;
                res.send(macat);
            });
        });
    });
    // res.send(db.exec('SELECT * FROM categoryOfMovie'));
});

//名称搜索
app.get('/:name',function (req,res) {
    let name = req.params.name;
    req.models.movies.find({movieName:orm.like("%"+name+"%")}, function (err,movie) {
        res.send(movie);
    });
});

app.listen(3000, () => {
    console.log('running on port 3000...');
});
