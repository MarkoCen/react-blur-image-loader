import * as React from 'react';

const DEFAULT_BLUR_LEVEL = 25;
const DEFAULT_TRANSITION_TIME = 400;
const DEFAULT_STEP_TIME = 10;
const DEFAULT_TRANSITION_DELAY = 300;

class DefaultLoader extends React.Component{
    render(){
        return <div className="bil-default-loader"></div>
    }
}

class SvgContainer extends React.Component{

    constructor(props){
        super();
        this.state = {
            blurLevel: props.maxBlurLevel || DEFAULT_BLUR_LEVEL,
            blurImageOpacity: 1
        }
    }

    componentDidMount(){
        if(this.props.transitionTime){
            let stepTime = DEFAULT_STEP_TIME;
            let remainTime = this.props.transitionTime;
            setTimeout(()=>{
                let timer = setInterval(()=>{
                    if(remainTime <= 0){
                        window.clearInterval(timer);
                    }else{
                        let percent = Math.max(0, ((remainTime - stepTime) / remainTime));
                        let currentBlurLevel = this.state.blurImageOpacity * percent;
                        remainTime = remainTime - stepTime;
                        this.setState({
                            blurImageOpacity: currentBlurLevel
                        })
                    }
                }, stepTime)
            }, DEFAULT_TRANSITION_DELAY)
           
        }
    }

    render(){
        return <svg width="100%" height="100%" className="bil-svg-container" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <filter id="bilBlurFilter">
                <feGaussianBlur in="SourceGraphic" stdDeviation={this.state.blurLevel} />
            </filter>

            <image xlinkHref={this.props.src} 
                   x="0" y="0" 
                   width="100%" 
                   height="100%" 
                   filter="url(#bilBlurFilter)" 
                   style={{opacity: this.state.blurImageOpacity}}
                   preserveAspectRatio={this.props.fullCover ? "xMidYMid slice" : null}/>

            { this.props.transitionTime ? <image xlinkHref={this.props.src} 
                   x="0" y="0" 
                   width="100%" 
                   height="100%"
                   style={{opacity: 1-this.state.blurImageOpacity}}
                   preserveAspectRatio={this.props.fullCover ? "xMidYMid slice" : null}/>
                : null}
        </svg>
    }
}

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

    loadImage(src,preview){
        this.resetState();
        if(src){
            let image = new Image();
            image.onload = ()=>{
                this.setState({
                    showPreview: false,
                    showLoader: false,
                    showImage: true
                })
            };
            image.src = src
        }

        if(preview){
            let image = new Image();
            image.onload = ()=>{
                this.setState({
                    showPreview: !this.state.showImage,
                    showLoader: false
                })
            }
            image.src = preview;
        }
    }

    componentWillReceiveProps({src,preview}){
        this.loadImage(src,preview);
    }

    componentWillMount(){
        this.loadImage(this.props.src,this.props.preview);
    }

    render(){
        return <div className="bil-image">
            { this.state.showImage ? <SvgContainer src={this.props.src} 
                                                   fullCover={this.props.fullCover} 
                                                   maxBlurLevel={this.props.maxBlurLevel}
                                                   transitionTime={this.state.transitionTime}/> 
                                     : null }
            { this.state.showPreview ? <SvgContainer src={this.props.preview} 
                                                     fullCover={this.props.fullCover} 
                                                     maxBlurLevel={this.props.maxBlurLevel}/> 
                                     : null }
            { this.state.showLoader ? <DefaultLoader /> : null }
        </div>
    }
}

BlurImageLoader.propTypes = {
    src: React.PropTypes.string.isRequired,
    preview: React.PropTypes.string,
    fullCover: React.PropTypes.bool,
    maxBlurLevel: React.PropTypes.number,
    transitionTime: React.PropTypes.number
}

export default BlurImageLoader;