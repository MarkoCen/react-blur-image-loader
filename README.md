# react-blur-image-loader

![](https://cdn.rawgit.com/MarkoCen/react-blur-image-loader/3cf93750/samples/1.gif)


### Setup
1. Install
```
npm install react-blur-image-loader react react-dom -S
```
2. Usage

```javascript
import {render} from 'react-dom';
import BlurImageLoader from 'react-blur-image-loader';
import 'react-blur-image-loader/styles.css'; //please make sure import the stylesheet

render(<BlurImageLoader src={"picture.jpg"} preview={"tiny-picture.jpg"} />, document.getElementById("root"));
```
