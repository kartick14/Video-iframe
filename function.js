createFrame: function(settings, videoDetails){

    if(videoDetails.provider === 'youtube') {
      if (settings.autoloop){
        var autoloop = '1&iv_load_policy=3&playlist='+videoDetails.id;
      } else {
        var autoloop = 0;
      }

      var html = '<iframe src="//www.youtube.com/embed/'+videoDetails.id+'?&autoplay=1&loop='+autoloop+'&rel=0&hd=1&showinfo=0&color=white&controls=0&enablejsapi=1&version=3&playerapiid=ytplayer" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen ></iframe>';
    }
    else if(videoDetails.provider === 'vimeo') {
      if (settings.autoloop){
        var autoloop = 1;
      } else {
        var autoloop = 0;
      }
      var html = '<iframe src="//player.vimeo.com/video/'+videoDetails.id+'?loop='+autoloop+'&amp;title=0&amp;byline=0&amp;portrait=0&amp;color=3d96d2&autoplay=1&amp;api=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen ></iframe>';
    }
    else if(videoDetails.provider === 'html5') {
      if (settings.autoloop){
        var autoloop = 'loop="loop"';
      }

      var html = '<video autoplay="true" '+autoloop+' id="video"><source src="'+videoDetails.videoMP4+'" type="video/mp4"><source src="'+videoDetails.videoOGV+'" type="video/ogg" ></video>';
    }
    return html;
  }


// Include http://a.vimeocdn.com/js/froogaloop2.min.js for vimeo play pause functionality
//Please add "&enablejsapi=1&version=3&playerapiid=ytplayer" end of the youtube embed url
/*
<iframe id="video" width="640" height="360" src="...?rel=0&showinfo=0&enablejsapi=1&version=3&playerapiid=ytplayer" frameborder="0" allowfullscreen="true" allowscriptaccess="always"></iframe>
*/
$(document).ready(function() {
    //for youtube
  $('#play-video').on('click', function(ev) {
 
    var iframe = $('#video')[0];
    var player = $f(iframe);

    if(targeted_video_type == 'vimeo'){
      player.api('play');
    }else if(targeted_video_type == 'youtube'){
      $("#video")[0].src += "&autoplay=1";
    }else{
      $("#video").get(0).play();  // for html5 video
    }
    ev.preventDefault();
 
  });
    
    // for vimeo
  $('#close-video').on('click', function(ev) {
 
    var iframe = $('#video')[0];
    var player = $f(iframe);

    if(targeted_video_type == 'vimeo'){
      player.api('pause');
    }else if(targeted_video_type == 'youtube'){
      $('#video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*'); 
    }else{
      $("#video").get(0).pause();  // for html5 video
    }
    ev.preventDefault();
 
  });  
});
