/*---------------页面效果js  START----------*/
$(document).ready(function () {
    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
        isClosed = false;
    trigger.click(function () {
        hamburger_cross();
    });
    function hamburger_cross() {
        if (isClosed === true) {
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
        } else {
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
        }
    }
    $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
    });
});
/*---------------页面效果js  END----------*/



/*--------左边动态从数据库中添加列表进来START------------*/
$.get('/movieTypes',function (ans) {
    // let types = ans;
    // console.log(types);
    let lists = JSON.parse(ans);
    let list = '';

    for(let item of lists){
        // console.log(item);
        list+=`<li id="${item.id}" class="listClick" >
                    <a href="#" data-toggle="tab">${item.typeName}<span class="glyphicon glyphicon-chevron-right"></span>
                    </a>
               </li>`;
    }
    $('#movieLists').append(list);

});
/*--------左边动态从数据库中添加列表进来END-----------*/


/*-----获取列表分类Start--------*/
function listClick(aim) {
    $.get(`/movieTypes/${aim}`,function (ans) {
        let result = ans;
        let div = '';
        for(let i = 0; i<result.length;i++){
            div += `<div id="div-height" class="col-lg-3 col-sm-6 col-xs-12">
                        <div class="thumbnail">
                            <img src="${result[i].moviePictures}" alt="">
                            <div class="caption">
                                <h4>${result[i].movieName}</h4>
                                <p class="movieDirector">导演 : ${result[i].movieDirector}</p >
                                <p class="movieActors">主演 : ${result[i].movieActors}</p >
                                <p class="description">简介 : ${result[i].description}</p >
                                <p class="point"><a href="../detailMovie.html?name=${result[i].movieName}"><span class="glyphicon glyphicon-hand-right "></span></a ></p >
                            </div>                        
                        </div>
                    </div>`;
            $('#myTabContent').empty();
            $('#myTabContent').append(div);
        }
    });
}
/*-----获取列表分类End--------*/


/*-----动态添加的列表的事件,通过事件委托的方式 START---------*/
$(document).on('click','.listClick',function () {
    let listId = $(this).attr('id');
    listClick(listId);
});
/*-----动态添加的列表的事件,通过事件委托的方式 END---------*/


/*----首页加载所有信息-------*/
function start() {
    $.get('/movies',function (ans) {
        let movies = ans;
        // console.log(movies);
        let str = '';
        for(let j = 0; j<movies.length;j++){
            str += `<div id="div-height" class="col-lg-3 col-sm-6 col-xs-12">
                        <div class="thumbnail">
                            <img src="${movies[j].moviePictures}" alt="">
                            <div class="caption">
                                <h4>${movies[j].movieName}</h4>
                                <p class="movieDirector">导演 : ${movies[j].movieDirector}</p>
                                <p class="movieActors">主演 : ${movies[j].movieActors}</p>
                                <p class="description">简介 : ${movies[j].description}</p>
                                <p class="point"><a href="../detailMovie.html?name=${movies[j].movieName}"><span class="glyphicon glyphicon-hand-right "></span></a></p>
                            </div>                        
                        </div>
                </div>`;
        }
        $('#myTabContent').append(str);
    });
}
start();
/*点击全部电影也会遍历所有的电影,执行start()函数*/
$(document).ready(function () {
    $('#homepage').click(function () {
        $('#myTabContent').empty();
        start();
    });
});

/*-----------搜索点击事件START--------------*/
$(document).ready(function () {
    $('#search_btn').click(function (e) {
        e.preventDefault();
        let input_value = $('#search_input').val();
        // console.log(input_value);
        /*$.get('/`${input_value}`',function (ans) {
            // console.log(ans);//获取到的信息
            let movies = ans;
            let div = '';
            for(let i= 0; i<movies.length;i++){
                // console.log(movies[i].movieName);
                //input_value==movies[i].id|| input_value.toString()===movies[i].movieName
                if(input_value.toString()===movies[i].movieName){
                    // console.log(movies[i]);
                    let address = movies[i].moviePictures;
                    console.log(address);
                    // $('#img').css('width','100%').css('height','400px').css("background-image",`url(${address})`).css('color','red');
                    /!*style="width: 100%; height: 400px; float: left;margin-bottom: 10px; background: url(${address}) no-repeat"*!/
                    div += `<div id="div-height" class="col-lg-3 col-sm-6 col-xs-12">
                        <div class="thumbnail">
                            <img src="${movies[i].moviePictures}" alt="">
                            <div class="caption">
                                <h4>${movies[i].movieName}</h4>
                                <p class="movieDirector">导演 : ${movies[i].movieDirector}</p>
                                <p class="movieActors">主演 : ${movies[i].movieActors}</p>
                                <p class="description">简介 : ${movies[i].description}</p>
                                <p class="point"><a href="../detailMovie.html?id=${movies[i].id}"><span class="glyphicon glyphicon-hand-right "></span></a></p>
                            </div>
                        </div>
                    </div>
                </div>`;
                    console.log(div);
                    $('#myTabContent').empty();
                    $('#myTabContent').append(div);
                    break;
                }
            }
        })*/
        $.get(`/${input_value}`,function (ans) {
            let movies = ans;
            let div = '';
            for(let i = 0; i<movies.length; i++){
                div += `<div id="div-height" class="col-lg-3 col-sm-6 col-xs-12">
                        <div class="thumbnail">
                            <img src="${movies[i].moviePictures}" alt="">
                            <div class="caption">
                                <h4>${movies[i].movieName}</h4>
                                <p class="movieDirector">导演 : ${movies[i].movieDirector}</p>
                                <p class="movieActors">主演 : ${movies[i].movieActors}</p>
                                <p class="description">简介 : ${movies[i].description}</p>
                                <p class="point"><a href="../detailMovie.html?name=${movies[i].movieName}"><span class="glyphicon glyphicon-hand-right "></span></a></p>
                            </div>                        
                        </div>
                    </div>
                </div>`;
                $('#myTabContent').empty();
                $('#myTabContent').append(div);
            }
        })
    });
});
/*-----------搜索点击事件END--*/


