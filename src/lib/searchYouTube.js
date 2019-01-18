import YOUTUBE_API_KEY from '../config/youtube.js'

var searchYouTubePrime = (options, callback) => {
  $.ajax({
    type: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/search',
    data: 
    {
      q: options.query || '10 Hour Fireplace',
      maxResults: options.max || 5,
      key: options.key || YOUTUBE_API_KEY,
      type: 'video',
      part: 'snippet'
    },
    success: function(data) {
      return callback(data.items);    
    },
    error: function (data) {
      console.error('Failed to get videos', data);
    }
  });
};

var searchYouTube = _.debounce(searchYouTubePrime, 500)
export default searchYouTubePrime;
