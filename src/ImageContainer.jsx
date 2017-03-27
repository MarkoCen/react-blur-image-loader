import * as React from 'react';

const DEFAULT_BLUR_LEVEL = 10;
const DEFAULT_STEP_TIME = 10;
const DEFAULT_TRANSITION_DELAY = 300;

class ImageContainer extends React.Component{

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

ImageContainer.propTypes = {
    src: React.PropTypes.string.isRequired,
    preview: React.PropTypes.string,
    fullCover: React.PropTypes.bool,
    maxBlurLevel: React.PropTypes.number,
    transitionTime: React.PropTypes.number
}

export default ImageContainer;