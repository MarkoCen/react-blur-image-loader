import * as React from 'react';
import {render} from 'react-dom';
import BlurImageLoader from '../index.jsx';
import "../styles.css";

render(<BlurImageLoader fullCover={true} src={"http://i.imgur.com/RRUe0Mo.png"}/>, document.querySelector("#root"));