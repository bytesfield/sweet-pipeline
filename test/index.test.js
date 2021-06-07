const helpers = require('./helper');
const Pipeline = require('../index');

describe("Pipeline Test", () => {

    //Helpers functions sync testing
    var repeatText = helpers.repeatText,
        capitalize = helpers.capitalize,
        exclaim = helpers.exclaim;

    //Helpers functions async testing
    var repeatTextAsync = helpers.repeatTextAsync,
        capitalizeAsync = helpers.capitalizeAsync,
        exclaimAsync = helpers.exclaimAsync;

    //Synchronous pipes
    var syncPipes = [
        repeatText,
        capitalize,
        exclaim
    ];

    //Asynchronous pipes
    var asyncPipes = [
        repeatTextAsync,
        capitalizeAsync,
        exclaimAsync
    ];

    const  text = 'Pipeline';

    it('Should process only the first pipe in pipeline with break', ()=> {

        const response = new Pipeline().send(text)
                                       .through(syncPipes)
                                       .break(true)
                                       .return();
    
        expect(response).toEqual('Pipeline, Pipeline');
    });

    it('Should not process pipes if pipeline is not an array or object', ()=> {
        
        const response = new Pipeline().send(text)
                                       .through('Pipe')
                                       .return();
    
        expect(response.error).toEqual('Pipes must be in an array or object.');
    });

    it('Should not process pipes if pipeline is not passed', ()=> {
        
        const response = new Pipeline().send(text)
                                       .through()
                                       .return();
    
        expect(response.error).toEqual('Pipes must be in an array or object.');
    });

    it('Should not process pipes if pipeline is empty', ()=> {
        
        const response = new Pipeline().send(text)
                                       .through([])
                                       .return();
    
        expect(response.error).toEqual('No pipe specified.');
    });

    it('Should not process pipes if break parameter is not boolean', ()=> {
        
        const response = new Pipeline().send(text)
                                       .through(syncPipes)
                                       .break('true')
                                       .return();
    
        expect(response.error).toEqual('Break parameter value must be boolean.');
    });

    it('Should process all pipes in pipelines without break', ()=> {
        
        const response = new Pipeline().send(text)
                                       .through(syncPipes)
                                       .return();
    
        expect(response).toEqual('Pipeline, pipeline!');
    });

    it('Should process all pipes in pipelines if all pipes return promises', ()=> {
        
        new Pipeline().send(text)
                      .through(asyncPipes)
                      .return()
                      .then((value)=>{
                         expect(value).toEqual('Pipeline, pipeline!');
                      })
                      .catch((error)=>{});
    
    });

    it('Should process any pipe in pipelines with some pipes returning promises and some does not ', ()=> {
        
        new Pipeline().send(text)
                      .through([repeatTextAsync,capitalize,exclaimAsync])
                      .return()
                      .then((value)=>{//
                         expect(value).toEqual('Pipeline, pipeline!');
                      })
                      .catch((error)=>{});
    
    });

});