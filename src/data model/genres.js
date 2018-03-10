import data_provider from '@/data model/service call.js'

export default class Genres{
    static load_all_genres(){
        console.log('call load_all_genres in genres class');
        return data_provider.get(true, queries.load_all_genres()).then(loaded =>{
            if(loaded && loaded.genres)
                return loaded.genres;
            else {
                WriteError('genres', 'load_all_genres', loaded, 'genres field is missing');
                return Promise.reject({is_ok: false, error_type: 'parsing'});
            }
        });
    }

    static queries(){
        return queries;
    }
}

var queries = {
    load_all_genres(){
      return "/admin/library/genres/get_all_genres.json";
    }
  }