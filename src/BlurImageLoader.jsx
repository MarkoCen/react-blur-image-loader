import * as React from 'react';
import DefaultLoader from './DefaultLoader';
import ImageContainer from './ImageContainer';

const DEFAULT_TRANSITION_TIME = 400;

class BlurImageLoader extends React.Component{
    constructor(props){
        super();
        this.state = {
            showPreview: false,
            showLoader: true,
            showImage: false,
            transitionTime: props.transitionTime || DEFAULT_TRANSITION_TIME
        }
    }

    resetState(){
        this.setState({
            showPreview: false,
            showLoader: true,
            showImage: false
        })
    }

    loadImage(src, callback){
        if(src){
            this.image = new Image();
            this.image.onload = ()=>{
                if(callback){
                    callback.call(this);
                }
            }
            this.image.src = src;
        }
    }

    loadOriginalImage(){
        this.loadImage(this.props.src, ()=>{
            this.setState({
                showPreview: false,
                showLoader: false,
                showImage: true
            })
        })
    }

    loadPreviewImage(){
        this.loadImage(this.props.preview, ()=>{
            this.setState({
                showPreview: !this.state.showImage,
                showLoader: false
            })
        })
    }

    componentWillReceiveProps({src,preview},{oldSrc}){
        if(src !== oldSrc){
            this.resetState();
            this.loadOriginalImage();
            this.loadPreviewImage();
        }
    }

    componentWillMount(){
        this.resetState();
        this.loadOriginalImage();
        this.loadPreviewImage();
    }

    componentWillUnmount(){
        this.image.src = '';
    }

    renderLoader(){
        if(React.isValidElement(this.props.loader)){
            return this.props.loader;
        }else{
            return <DefaultLoader />
        }
    }

    render(){
        return <div className="bil-image">
            { this.state.showImage ? <ImageContainer src={this.props.src} 
                                                   fullCover={this.props.fullCover} 
                                                   maxBlurLevel={this.props.maxBlurLevel}
                                                   transitionTime={this.state.transitionTime}/> 
                                     : null }
            { this.state.showPreview ? <ImageContainer src={this.props.preview} 
                                                     fullCover={this.props.fullCover} 
                                                     maxBlurLevel={this.props.maxBlurLevel}/> 
                                     : null }
            { this.state.showLoader ? this.renderLoader() : null }
        </div>
    }
}

BlurImageLoader.propTypes = {
    src: React.PropTypes.string.isRequired,
    preview: React.PropTypes.string,
    fullCover: React.PropTypes.bool,
    maxBlurLevel: React.PropTypes.number,
    transitionTime: React.PropTypes.number,
    loader: React.PropTypes.element
}

export default BlurImageLoader;