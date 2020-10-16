import createjs from 'preload-js';
import { getApplication } from "../../index";



class Loader {

    constructor(assetsObject, onLoadComplete) {
        this._imageAssets = assetsObject._images.assets;
        this._audioAssets = assetsObject._audio.assets;
        this._videoAssets = assetsObject._video.assets;
        this.onLoadCompleteCallback = onLoadComplete;
        this._combinedAssets = this._imageAssets.concat(this._audioAssets);
        this._assetLoadCount = 0;
        this._Observer = undefined;
        this._imageStore = {};
        this._audioStore = {};
        this._videoStore = {};
        this._imageLoadCount = 0;
        this._audioLoadCount = 0;
        this._videoLoadCount = 0;
    }

    startPreload() {

        this.onLoadStart();
    }
    onLoadStart() {

        for (let i = 0; i < this._imageAssets.length; i++) {
            let _imageName = this._imageAssets[i];
            let _imagePath = './images/' + this._imageAssets[i];
            _imageName = _imageName.substring(0, _imageName.indexOf("."));
            this._imageStore[_imageName] = new Image();
            this._imageStore[_imageName].src = _imagePath;
            this._imageStore[_imageName].onload = this.onImageLoad.call(this);
            //queue.loadFile('./images/' + this._imageAssets[i]);
        }
    }
    // onLoadProgress() {

    // }
    onImageLoad(evt) {
        this._imageLoadCount++;
        if (this._imageLoadCount === this._imageAssets.length) {
            this.loadMp3();
        }
        //console.log('image loaded with', evt);
    }
    BufferAudios(audLink, callbackFunc) {
        var req = new XMLHttpRequest();
        req.open('GET', audLink, true);
        req.responseType = 'blob';
        let ID = audLink.substring((audLink.lastIndexOf("/") + 1), audLink.lastIndexOf("."));
        var THIS = this;
        req.onload = function () {
            // Onload is triggered even on 404
            // so we need to check the status code
            // console.log('called.' + this.status)
            if (this.status === 200 || this.status === 206) {
                var videoBlob = this.response;

                var audio = URL.createObjectURL(videoBlob); // IE10+
                // audio is now downloaded
                // and we can set it as source on the video element
                // srcElem.src = audio;
                //srcElem.play();
                // console.log('ID'+ID)
                callbackFunc.call(THIS, {
                    audio: audio,
                    ID: ID
                });
            }
        }
        req.onerror = function () {
            // Error
        }

        req.send();
    }
    BufferVideos(vidLink, callbackFunc) {
        var req = new XMLHttpRequest();
        req.open('GET', vidLink, true);
        req.responseType = 'blob';
        let ID = vidLink.substring((vidLink.lastIndexOf("/") + 1), vidLink.lastIndexOf("."));
        var THIS = this;
        req.onload = function () {
            // Onload is triggered even on 404
            // so we need to check the status code
            // console.log('called.' + this.status)
            if (this.status === 200 || this.status === 206) {
                var videoBlob = this.response;

                var audio = URL.createObjectURL(videoBlob); // IE10+
                // audio is now downloaded
                // and we can set it as source on the video element
                // srcElem.src = audio;
                //srcElem.play();
                // console.log('ID'+audio)
                callbackFunc.call(THIS, {
                    video: audio,
                    ID: ID
                });
            }
        }
        req.onerror = function () {
            // Error
        }

        req.send();
    }

    loadMp3() {
        // let queue = new createjs.LoadQueue(true);
        // queue.on("fileload", () => {
        //     this.onAssetLoadComplete();
        // });
        for (let i = 0; i < this._audioAssets.length; i++) {
            let id = this._audioAssets[i];
            // let IDString = id.substring(0, id.indexOf('.mp3'));
            //console.log('IDString=' + IDString);
            this.BufferAudios('./audio/' + this._audioAssets[i], this.onAudioAssetLoaded);
            // queue.loadFile('./audio/' + this._audioAssets[i]);
        }
    }
    loadVideos() {
        for (let i = 0; i < this._videoAssets.length; i++) {
            let id = this._videoAssets[i];
            // let IDString = id.substring(0, id.indexOf('.mp3'));
            //console.log('IDString=' + IDString);
            this.BufferVideos('./video/' + this._videoAssets[i], this.onVideoAssetLoaded);
            // queue.loadFile('./audio/' + this._audioAssets[i]);
        }
    }
    // onAssetLoadComplete(event) {
    //     this._assetLoadCount++;
    //     if (this._assetLoadCount === this._audioAssets.length) {
    //         this.onLoadCompleteCallback();
    //         //console.log(this._audioStore);
    //         // this.Obsvr.setState({})
    //         //this._Observer = getApplication().getObserver().setState({ assetLoaded: true });


    //     }
    // }
    onAudioAssetLoaded(o) {
        this._audioLoadCount++;
        this._audioStore[o.ID] = o.audio;
        //console.log(o.ID);
        if (this._audioLoadCount === this._audioAssets.length) {
            this.loadVideos();
            //this.onLoadCompleteCallback();
        }
    }
    onVideoAssetLoaded(o) {
        this._videoLoadCount++;
        this._videoStore[o.ID] = o.video;
        if (this._videoLoadCount === this._videoAssets.length) {
            this.onLoadCompleteCallback();
        }
    }


    getImageSource(src) {
        if (this._imageStore[src] !== "undefined") {
            return this._imageStore[src].src;
        }
    }
    getAudioSource(src) {
        if (this._audioStore[src] !== "undefined") {
            //console.log('geting audio source=', this._audioStore);
            return this._audioStore[src];
        }
    }
    getVideoSource(src) {
        if (this._videoStore[src] !== "undefined") {
            //console.log('geting audio source=', this._audioStore);
            return this._videoStore[src];
        }
    }
}

export { Loader };
