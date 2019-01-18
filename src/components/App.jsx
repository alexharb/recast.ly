import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import Search from './Search.js';
import searchYouTube from '../lib/searchYouTube.js';
import exampleVideoData from '../data/exampleVideoData.js';


class App extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      videoList: [],
      currentVideo: {},
      searchBar: ''
    };
    
  }
  
  componentDidMount() {
      this.props.searchYouTube({}, data => {
        this.setState({
          videoList: data,
          currentVideo: data[0]
        })
      })
    }
  
  onVideoTitleClick(event) {
    for (var video of this.state.videoList) {
      if (video.snippet.title === event.target.innerText) {
        var clickedVideo = video;
      }
    }
    
    this.setState({
      currentVideo: clickedVideo
    });
  }
  
  updateSearchTerm(event) {
    this.setState({
      searchBar: event.target.value
    })
    setTimeout(this.searchWeb.bind(this), 1)
  }
  
  searchWeb(event) {
    searchYouTube({query: this.state.searchBar}, data => {
      this.setState({
        videoList: data
      })
    })
  }
  
  
  
  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search 
              onChange={this.updateSearchTerm.bind(this)}
              value={this.state.searchBar}
              onClick={this.searchWeb.bind(this)}
              videoList={this.state.videoList}
              currentVideo={this.state.currentVideo}
              setState={this.setState}/>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7"><VideoPlayer
              video={this.state.currentVideo}/>
          </div>
          <div className="col-md-5"><VideoList 
              videos={this.state.videoList}
              onClick={this.onVideoTitleClick.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
