const { isBoolean, isArray, hasLength, isPromise, isFunction, isTrue } = require('./helper');
class Pipeline {

    /**
    * Set the object being sent through the pipeline.
    *
    * @param  {mixed}  passable
    * @return this
    */
    send(passable){
        this.passable = passable;

        return this;
    }

    /**
    * Set the array of pipes.
    *
    * @param  {array|mixed } pipes
    * @return this
    */
    through(pipes){

        if(isArray(pipes)){
            this.pipes = Object.values(pipes);
        }else{
            this.pipes = pipes;
        }
        
        return this;
    }

    /**
    * Breaks the loop.
    *
    * @param  {boolean} value
    * @return boolean
    */
    break(value = false){
        this.break = value;

        return this;
    }

    /**
    * Run the pipeline with a final destination.
    *
    * @return mixed
    */
    return(){
        if (!isArray(this.pipes)) {
            return {'error' : 'Pipes must be in an array or object.'};
        }
        
        if (!hasLength(this.pipes.length)) {
            return {'error' : 'No pipe specified.'};
        }
      
        if(!isFunction(this.break)){
            if (!isBoolean(this.break)) {
                return {'error' : 'Break parameter value must be boolean.'};
            }
        }
        
        var i;
        var response = this.passable;

        for (i = 0; i < this.pipes.length; i++) {
            var pipe = this.pipes[i];
            
            //Check if output from the last pipe was promise
            if (isPromise(response)) {
                //Then Call the next pipe
                response = response.then(pipe);

                if(isTrue(this.break)){
                    break;
                }
            }else {
                // Otherwise, call the next pipe with the last pipe output
                if (isFunction(pipe)) {
                    response = pipe(response);

                    if(isTrue(this.break)){
                        break;
                    }
                } else {
                    response = pipe;

                    if(isTrue(this.break)){
                        break;
                    }
                }
            }
            
        }
        return response;
       
    }
}

module.exports = Pipeline;