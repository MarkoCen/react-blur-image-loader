# react-blur-image-loader

![](https://cdn.rawgit.com/MarkoCen/react-blur-image-loader/3cf93750/samples/1.gif)

Implement blurred preview image during load times

### Setup
1. Install
```
npm install react-blur-image-loader react react-dom -S
```
2. Usage

```javascript
import {render} from 'react-dom';
import BlurImageLoader from 'react-blur-image-loader';

render(<BlurImageLoader src={"picture.jpg"} 
                        preview={"tiny-picture.jpg"} 
                        fullCover={true}
                        maxBlurLevel={10}
                        transitionTime={400}/>, document.getElementById("root"));
```
3. Props

PropName | Type | Default Value | Description
--- | --- | --- | ---
`src` | string | Null | This field is REQUIRED, it specifies the final image url
`preview` | string | "" | Specifies a preview image url, a preview image should be a tiny optimized image, it will be present until final image loaded, if `preview` is not defined, a spin loader would be present until final image loaded.
`fullCover` | bool | false | Specifies whether image should cover its parent area or contain inside.
`maxBlurLevel` | number | 10 | Specifies the level of Gaussian blur, refer to [stdDeviation](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stdDeviation). 
`transitionTime` | number | 400 | Specifies the transition time from blur to clear, default value is 400ms.
`loader` | React.Element | <DefaultLoader /> | Specifies the preview loader
