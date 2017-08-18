/**
 * Created by deepspace on 17-8-2.
 */
/*$.get('/movies',function (ans) {
    let movies = ans;
    // console.log(movies);
    let playContent = '';
    let brief = '';
    // console.log(movies);
    for(let item of movies){
        // console.log(item.id);
        if(item.id == window.location.href.split('?name=')[1]){
            playContent = `<embed id="videoPlayer" src='${item.url}' allowFullScreen='true' quality='high' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash'></embed>`;
            brief = `<h2>电影详情</h2>
            <p class="movieName"><span>电影名 : </span>${item.movieName}</p>
            <p class="movieDirector"><span>导演 : </span>${item.movieDirector}</p>
            <p class="movieActors"><span>主演 : </span>${item.movieActors}</p>
            <p class="description-all"><span>故事概要 : </span>${item.description}</p>`;
            $('#player').empty();
            $('#movieBrief').empty();
            $('#player').append(playContent);
            $('#movieBrief').append(brief);
            break;
        }
    }

});*/
// console.log(window.location.href.split('?id=')[1]);
$.get(`/movies/${window.location.href.split('?name=')[1]}`,function (ans) {
    let movies = ans;
    // console.log(movies);
    // console.log(movies.type);
    // let playContent = '';
    // let brief = '';
    // console.log(movies);
    let playContent = `<embed id="videoPlayer" src='${movies.detInfo.url}' allowFullScreen='true' quality='high' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash'></embed>`;
    let brief = `<h2>电影详情</h2>
    <p class="movieName"><span>电影名 : </span>${movies.detInfo.movieName}</p>
    <p class="movieDirector"><span>导演 : </span>${movies.detInfo.movieDirector}</p>
    <p class="movieActors"><span>主演 : </span>${movies.detInfo.movieActors}</p>
    <p class="description-all"><span>故事概要 : </span>${movies.detInfo.description}</p>`;
    $('#player').empty();
    $('#movieBrief').empty();
    $('#player').append(playContent);
    $('#movieBrief').append(brief);

});
/*---------相关推荐START---------------*/
$.get(`/movies/${window.location.href.split('?name=')[1]}`,function (ans) {
    let movies = ans;
    console.log(movies.detInfo.movieName);
    $.get('/movies',function (ans) {
        let movies = ans;
        // console.log(movies);
        let str = '';
        for(let j = 0; j<4;j++){
            str += `<div id="div-height-1" class="col-lg-3 col-sm-6 col-xs-12">
                        <div class="thumbnail">
                            <img src="${movies[j].moviePictures}" alt="">
                            <div class="caption">
                                <h4>${movies[j].movieName}</h4>
                                <span class="a">导演 : ${movies[j].movieDirector}</span>
                                <span class="a"><a href="../detailMovie.html?name=${movies[j].movieName}"><span class="glyphicon glyphicon-hand-right "></span></a></span>
                            </div>                        
                        </div>
                </div>`;
        }
        $('#myTabContent').append(str);
    });

});
/*----------相关推荐END---------------------*/
