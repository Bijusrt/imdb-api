const hapi = require('hapi');

const promise = require('promise');

const fs = require('fs');

const server = new hapi.Server({

    host : "localhost",

    port : 8080

}); 

let file = JSON.parse(fs.readFileSync('250movies.json'));

server.route({

    method : "GET",

    path : '/movies/{movie}',

    handler : async(req)=>{

        for (var i of file){

            if(i.Name == req.params.movie){

                return i;

            }

        }

    }

});

server.route({

    method : "GET",

    path : '/movies/bylanguage/{language}',

    handler : async(req)=>{

        let languageList = [];

        for (var i of file){

            for (var k of i.Language){

                if (k == req.params.language){

                    languageList.push(i);

                }

            }

        }

        return languageList;

    }

});

server.route({

    method : "GET",

    path : '/movies/bydirector/{director}',

    handler : async(req)=>{

        let directorList = [];

        for (var i of file){

            for (var k of i.Director){

                if (k == req.params.director){

                    directorList.push(i);

                }

            }

        }

        return directorList;

    }

});

server.route({

    method : "GET",

    path : '/movies/bygenre/{genre}',

    handler : async(req)=>{

        let genreList = [];

        for (var i of file){

            for (var k of i.Genres){

                if (k.includes(req.params.genre)){

                    genreList.push(i);

                }

            }

        }

        return genreList;

    }

});

server.route({

    method : "GET",

    path : '/movies/bycountry/{country}',

    handler : async(req)=>{

        let countryList = [];

        for (var i of file){

            if (i.Country == req.params.country){

                countryList.push(i);

            }

        }

        return countryList;

    }

});

server.route({

    method : "POST",

    path : '/create_new_movie',

    handler : async(req)=>{

        let flag = true;

        for (var i of file){

            if (i.Name == req.payload.Name){

                flag = false;

            }

        }

        if (!flag){

            return 'Movie Already Exists!';
            
        }else{

            file.push(req.payload);

            const write = fs.writeFileSync('250movies.json',JSON.stringify(file));

            return 'Successfully Created!';

        }

    }

});

server.route({

    method : "PUT",

    path : "/update/full_movie",

    handler : async(req)=>{

        for(var i in file){

            if (file[i].Name == req.payload.Name){

                file[i] = req.payload;

                const write = fs.writeFileSync('250movies.json',JSON.stringify(file));

                return 'Successfully Updated!';

            }

        }

    }

});

server.route({

    method : "PUT",

    path : "/update/Name/{name}",

    handler : async(req)=>{

        for(var i in file){            

            if(file[i].hasOwnProperty('Name')){

                file[i].Name=req.params.name;

                const write = fs.writeFileSync('250movies.json',JSON.stringify(file));

                return 'Successfully Updated Name!';
            }

        }

    }

});

server.route({

    method : "PUT",

    path : "/update/Bio/{name}",

    handler : async(req)=>{

        for(var i in file){            

            if (file[i].Name == req.params.name){

                file[i].Bio = req.payload.Bio;

                const write = fs.writeFileSync('250movies.json',JSON.stringify(file));

                return 'Successfully Updated Bio!';

            }

        }

    }

});

server.route({

    method : "PATCH",

    path : "/update/Director/{name}",

    handler : async(req)=>{

        for(var i in file){            

            if (file[i].Name == req.params.name){

                if(!file[i].hasOwnProperty('Director')){

                    file[i].Director = [];

                }

                file[i].Director.push(req.payload.Director);

                const write = fs.writeFileSync('250movies.json',JSON.stringify(file));

                return 'Successfully Updated Director!';

            }

        }

    }

});

server.route({

    method : "PATCH",

    path : "/update/Genre/{name}",

    handler : async(req)=>{

        for(var i in file){            

            if (file[i].Name == req.params.name){

                if(!file[i].hasOwnProperty('Genres')){

                    file[i].Genres = [];

                }

                file[i].Genres.push(req.payload.Genres);

                const write = fs.writeFileSync('250movies.json',JSON.stringify(file));

                return 'Successfully Updated Genre!';

            }

        }

    }

});

server.route({

    method : "PUT",

    path : "/update/Country/{name}",

    handler : async(req)=>{

        for(var i in file){            

            if (file[i].Name == req.params.name){

                file[i].Country = req.payload.Country;

                const write = fs.writeFileSync('250movies.json',JSON.stringify(file));

                return 'Successfully Updated Country!';

            }

        }

    }

});

server.route({

    method : "PUT",

    path : "/update/Runtime/{name}",

    handler : async(req)=>{

        for(var i in file){            

            if (file[i].Name == req.params.name){

                file[i].Runtime = req.payload.Runtime;

                const write = fs.writeFileSync('250movies.json',JSON.stringify(file));

                return 'Successfully Updated Runtime!';

            }

        }

    }

});

server.route({

    method : "PATCH",

    path : "/update/Language/{name}",

    handler : async(req)=>{

        for(var i in file){            

            if (file[i].Name == req.params.name){

                if(!file[i].hasOwnProperty('Language')){

                    file[i].Language = [];

                }

                file[i].Language.push(req.payload.Language);

                const write = fs.writeFileSync('250movies.json',JSON.stringify(file));

                return 'Successfully Updated Language!';

            }

        }

    }

});

server.route({

    method : "DELETE",

    path : '/delete/full_movie/{name}',

    handler : async(req)=>{

        for (var i in file){

            if(file[i].Name == req.params.name){

                file.splice(i,1);

                const write = fs.writeFileSync('250movies.json',JSON.stringify(file));

                return 'Deleted Movie Successfully!';

            }

        }

    }

});

server.route({

    method : "DELETE",

    path : '/delete/Bio/{name}',

    handler : async(req)=>{

        for (var i of file){

            if(i.Name == req.params.name){

                delete i.Bio

                const write = fs.writeFileSync('250movies.json',JSON.stringify(file));

                return 'Deleted Bio Successfully!';

            }

        }

    }

});

server.route({

    method : "DELETE",

    path : '/delete/Director/{name}/{director}',

    handler : async(req)=>{

        for (var i of file){

            if(i.Name == req.params.name){

               for(var k in i.Director){

                    if(i.Director[k] == req.params.director){

                        i.Director.splice(k,1);

                        if(i.Director.length < 1){

                            delete i.Director;

                        }

                        const write = fs.writeFileSync('250movies.json',JSON.stringify(file));

                        return 'Deleted Director Successfully!';

                    }

               }

            }

        }

    }

});

server.route({

    method : "DELETE",

    path : '/delete/Genre/{name}/{genre}',

    handler : async(req)=>{

        for (var i of file){

            if(i.Name == req.params.name){

               for(var k in i.Genres){

                    if(i.Genres[k].includes(req.params.genre)){

                        i.Genres.splice(k,1);

                        if(i.Genres.length < 1){

                            delete i.Genres;
                            
                        }

                        const write = fs.writeFileSync('250movies.json',JSON.stringify(file));

                        return 'Deleted Genre Successfully!';

                    }

               }

            }

        }

    }

});

server.route({

    method : "DELETE",

    path : '/delete/Country/{name}',

    handler : async(req)=>{

        for (var i of file){

            if(i.Name == req.params.name){

                delete i.Country;

                const write = fs.writeFileSync('250movies.json',JSON.stringify(file));

                return 'Deleted Country Successfully!';

            }

        }

    }

});

server.route({

    method : "DELETE",

    path : '/delete/Runtime/{name}',

    handler : async(req)=>{

        for (var i of file){

            if(i.Name == req.params.name){

                delete i.Runtime;

                const write = fs.writeFileSync('250movies.json',JSON.stringify(file));

                return 'Deleted Runtime Successfully!';

            }

        }

    }

});

server.route({

    method : "DELETE",

    path : '/delete/Language/{name}/{language}',

    handler : async(req)=>{

        for (var i of file){

            if(i.Name == req.params.name){

               for(var k in i.Language){

                    if(i.Language[k].includes(req.params.language)){

                        i.Language.splice(k,1);

                        if(i.Language.length < 1){

                            delete i.Language;
                            
                        }

                        const write = fs.writeFileSync('250movies.json',JSON.stringify(file));

                        return 'Deleted Language Successfully!';

                    }

               }

            }

        }

    }

});


server.start((err)=>{

    if (err){

        console.log(err);
        
    }
});

console.log(`server started  at : ${server.info.uri}`);
