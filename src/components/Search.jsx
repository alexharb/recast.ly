import searchYouTube from '../lib/searchYouTube.js'

class Search extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  
  
  render() {
    return (
    <div className="search-bar form-inline">
      <input className="form-control" type="text" 
        value={this.props.value}
        onChange={this.props.onChange}/>
      <button className="btn hidden-sm-down" onClick={this.props.onClick}>
        <span className="glyphicon glyphicon-search"></span>
      </button>
    </div>
    ) 
   }
};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default Search;
