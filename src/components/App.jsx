import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import Search from './Search.js';
import searchYouTube from '../lib/searchYouTube.js';
import exampleVideoData from '../data/exampleVideoData.js';


class App extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      videoList: exampleVideoData,
      currentVideo: exampleVideoData[0],
      searchBar: ''
    };
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
  }
  
  searchWeb(event) {
    console.log(this.state.searchBar);
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
            <div><h5><em>search?</em><Search 
              onChange={this.updateSearchTerm.bind(this)}
              value={this.state.searchBar}
              onClick={this.searchWeb.bind(this)}/></h5></div>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <div><h5><em>videoPlayer</em><VideoPlayer
              video={this.state.currentVideo}/>
            </h5></div>
          </div>
          <div className="col-md-5">
            <div><h5><em>videoList</em><VideoList 
              videos={this.state.videoList}
              onClick={this.onVideoTitleClick.bind(this)}/></h5></div>
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
