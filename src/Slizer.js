
function Slizer(HtmlObject, options) {
    this.__interval = null;
    this.__initialized = false;
    this.__position = 0;
    this.__htmlObject = HtmlObject;
    this.__options = options;

    this._isPlaying = false;
    this.PixelPerRound = 1;
    this.StretchPercentege = 200;
    this.RoundInterval = 100;
    this.Direction = 'h';
    this.ApplyDefaultStyle = false;




    this.Pause = function () {
        this._isPlaying = false;
    }

    this.Play = function () {
        this._isPlaying = true;
    }

    this.Start = function () {
        this.__start();
    }



    this.__initialize = function () {
        if (!this.__initialized) {
            this.__initialized = true;



            // setting default options if options object is not supplied nor incomplete
            if (typeof (this.__options) === 'undefined') {
                this.__options = {};
            }


            if (typeof this.__options.Direction !== 'undefined' && this.__options.Direction !== null) {
                this.Direction = this.__options.Direction;
            }
            if (typeof this.__options.PixelPerRound !== 'undefined' && this.__options.PixelPerRound !== null) {
                this.PixelPerRound = this.__options.PixelPerRound;
            }

            if (typeof this.__options.RoundInterval !== 'undefined' && this.__options.RoundInterval !== null) {
                this.RoundInterval = this.__options.RoundInterval;
            }

            if (typeof this.__options.StretchPercentege !== 'undefined' && this.__options.StretchPercentege !== null) {
                this.StretchPercentege = this.__options.StretchPercentege;
            }

            if (typeof this.__options.ApplyDefaultStyle !== 'undefined' && this.__options.ApplyDefaultStyle !== null) {
                this.__htmlObject.style.backgroundRepeat = "reapeat";
                this.__htmlObject.style.backgroundAttachment = "fixed";
                this.__htmlObject.style.backgroundPosition = "0 0";
            }


            // handle the image / div conflict
            // if it's image wrap it with div 
            // other wise proceed
            if (this.__htmlObject instanceof HTMLImageElement) {
                this.__handleRawImage();
            }
            else {
                this.__setPanoramicStyles(this.__htmlObject);
            }



        }
    }

    this.__handleRawImage = function () {

        // wrap it into div
        var div = document.createElement("div");
        var oldImage = this.__htmlObject;
        this.__cloneAttributes(div, oldImage);
        div.style.backgroundImage = "url(" + oldImage.src + ")";
        oldImage.parentNode.replaceChild(div, oldImage);

        this.__htmlObject = div;

        // set the height and width for newly created div
        var bgImageSrc = this.__htmlObject.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];


        // set new added image width and height
        var image = new Image();
        image.src = bgImageSrc;

        var self = this;
        image.onload = function () {
            var boundingRect = self.__htmlObject.getBoundingClientRect();
            if (!boundingRect.width) {
                self.__htmlObject.style.width = "100%";
            }
            if (!boundingRect.height) {
                self.__htmlObject.style.height = image.height + "px";
            }

            self.__setPanoramicStyles(self.__htmlObject);
        }

    }


    this.__setPanoramicStyles = function (elem) {
        elem.style["background-position"] = "0 0";
        elem.style["background-repeat"] = "repeat";
        elem.style["background-size"] = StretchPercentege + "% 100%";
    }

    this.__start = function () {
        this.__initialize();
        var self = this;
        self._isPlaying = true;
        this.__interval = window.setInterval(function () {

            if (!self._isPlaying) return false;

            self.__position++;

            var positionValue = self.Direction === 'v'
                ? '0px ' + (self.__position * self.PixelPerRound * -1) + "px"
                : (self.__position * self.PixelPerRound * -1) + "px 0px";


            self.__htmlObject.style.backgroundPosition = positionValue;

        }, this.RoundInterval);
    }



    this.__cloneAttributes = function (element, sourceNode) {
        let attr;
        let attributes = Array.prototype.slice.call(sourceNode.attributes);
        while (attr = attributes.pop()) {
            element.setAttribute(attr.nodeName, attr.nodeValue);
        }
    }




    this.__initialize();
}