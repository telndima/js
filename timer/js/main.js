jQuery(function($){

    var app = {
        init: function () {
            this.start();
            this.stop();
        },

        start: function () {
            
            $( '#start' ).on( 'click', function(event) {
                event.preventDefault();

                $(time).text('start');
                $(start .start).removeClass('start').addClass('play')


                console.log( 'start' );
            });
            
        }, 

        stop: function () {
            
            $( '#stop' ).on( 'click', function(event) {
                event.preventDefault();
                $(time).text('stop');
                console.log( 'stop' );
            });
            
        },

   }

    app.init();
});