import * as React from 'react';
import {render} from 'react-dom';
import BlurImageLoader from '../index.jsx';
import "../styles.css";

class DefaultLoader extends React.Component{
    render(){
        return <div className="bil-default-loader"></div>
    }
}

render(<BlurImageLoader loader={<DefaultLoader/>} fullCover={true} src={"https://cdn.rawgit.com/MarkoCen/react-blur-image-loader/bd3440e7/samples/sample-large.jpg"} preview={"https://cdn.rawgit.com/MarkoCen/react-blur-image-loader/bd3440e7/samples/sample-preview.jpg"}/>, document.querySelector("#root"));