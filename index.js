
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
        this.pipes = Array.isArray(pipes) ? pipes : [];

        return this;
    }


    /**
    * Set the method to call on the pipes.
    *
    * @param  {string}  method
    * @return this
    */
    via(method){
        this.method = method;
 
        return this;
     }

     /**
    * Run the pipeline with a final destination.
    *
    * @return mixed
    */
    async thenReturn(){

        if (this.pipes.length === 0) {
            return 'No Pipeline specified.';
        }

        var i;
        var response = this.passable;

        for (i = 0; i < this.pipes.length; i++) {
            var pipe = this.pipes[i];

            response  = await pipe;
            
            // Output from the last stage was promise
            if (response && typeof response.then === 'function') {
                // Call the next stage only when the promise is fulfilled
                response = response.then(pipe);
            }else {

                // Otherwise, call the next stage with the last stage output
                if (typeof pipe === 'function') {
                    response = pipe(response);
                } else {
                    response = pipe;
                }
            }
            
        }
        return response;
       
    }
}

module.exports = Pipeline;