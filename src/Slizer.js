
function Slizer(HtmlObject, options) {
    this.__interval = null;
    this.__initialized = false;
    this.__position = 0;
    this.__htmlObject = HtmlObject;
    this.__options = options;
    this.PixelPerRound = 1;
    this.RoundInterval = 100 ;
    this.Direction = 'h';
    this.ApplyDefaultStyle = false ;

    this.__initialize = function () {
        if (!this.__initialized) {
            this.__initialized = true;

            if (typeof (this.__options) === 'undefined') return;


            if (typeof this.__options.Direction !== 'undefined' && this.__options.Direction !== null) {
                this.Direction = this.__options.Direction;
            }
            if (typeof this.__options.PixelPerRound !== 'undefined' && this.__options.PixelPerRound !== null) {
                this.PixelPerRound = this.__options.PixelPerRound;
            }

            if (typeof this.__options.RoundInterval !== 'undefined' && this.__options.RoundInterval !== null) {
                this.RoundInterval = this.__options.RoundInterval;
            }
            if (typeof this.__options.ApplyDefaultStyle !== 'undefined' && this.__options.ApplyDefaultStyle !== null){
                this.__htmlObject.style.backgroundRepeat = "reapeat";
                this.__htmlObject.style.backgroundAttachment = "fixed";
                this.__htmlObject.style.backgroundPosition = "0 0";

            }
        }
    }

    this.__start = function () {
        this.__initialize();
        var self = this;
        // this.__interval = window.setInterval(self.moveBackground, 50);
        this.__interval = window.setInterval(function(){
            self.__position++;
            var positionValue = self.Direction === 'v' 
            ? '0px ' + (self.__position * self.PixelPerRound) + "px" 
            : (self.__position * self.PixelPerRound) + "px 0px";
            self.__htmlObject.style.backgroundPosition = positionValue;
        }, this.RoundInterval);
    }


    this.moveBackground = function () {
        this.position++;
        if (typeof this.__htmlObject === 'undefined') return ;

        this.__htmlObject.style.backgroundPosition = (this.__position * this.pixelPerRound) + "px 0px";
    }


    this.__initialize();
    this.__start();
}