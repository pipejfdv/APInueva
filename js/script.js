

function searchMovie(){
    $("#movie-list").html("");
    // consulta jquery
    $.ajax({
        // API
        url:"http://www.omdbapi.com",
        //aplicar el metodo get
        type:"get",
        //retornar en el formato json
        dataType:"json",
        //datos de la APIKEY
        data:{
            apikey:"c905163",
            //valor de la consulta que se hace
            s:$("#search-input").val()
        },

        success: function(result){
            if(result.Response == "True"){
                let movies = result.Search;
                $.each(movies, function(i, data){
                    $("#movie-list").append(
                        `<div class="col-md-3">
                            <div class="card mb-3">
                                <img class="card-img-top" src=`+data.Poster +
                                `alt="Card image cap">
                                <div class="card-body">
                                <h5 class="card-tittle">`+
                                data.Title +
                                `</h5>
                                <h6 class="card-subtitle mb-2 text-muted">`+
                                data.Year + `</h6>
                                    <a href="#" class="card-link see-detail"
                                    data-toggle="modal" data-target="#exampleModal"
                                    data-id=`+
                                data.imdbID+
                                `>Detail</a>
                                    </div>
                                </div>
                            </div>`
                    );
                });
                $("#search-input").val("");
            }
            else{
                $("#movie-list").html(
                    `
                    <div class = "col">
                        <h1 class="text-center">`+
                        result.Error +
                        `</h1>
                    </div>`
                )
            }
        }
    });
}
$("#search-button").on("click", function(){
    searchMovie();
});

$("#search-button").on("keyup", function(e){
    if(e.keyCode === 13){
        searchMovie();
    }
});