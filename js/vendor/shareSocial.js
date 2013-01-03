$.fn.share = function(){

        var actualUrl               = encodeURIComponent(document.URL);
        /* Mensajes */

        var twitterMesagge = 'Lo ví en BAZUCA "'+$(this).attr('longdesc')+'"';
        var twitterUser = "bazucachile";

        /* Social connect */
        facebook    = "http://www.facebook.com/sharer.php?u="+actualUrl;
        twitter     = "https://twitter.com/intent/tweet?text="+twitterMesagge+"&via="+twitterUser+"&url="+actualUrl;
        google      = "https://plus.google.com/share?url="+actualUrl;

        $(this).each(function(){
            type = $(this).attr('class');
                if(type=='facebook'){
                    $(this).attr('href',facebook);
                    facebookShare(actualUrl);
                }
                if(type=='google'){
                    $(this).attr('href',google);
                }
                if(type=='twitter'){
                    $(this).attr('href',twitter);
                    twittershare(actualUrl);
                }  
                $(this).addClass('popup');
        });




        //facebook count
        function facebookShare(url){
          var url = "http://graph.facebook.com/"+url;
          $.getJSON(url, function(data) {
            $.each(data, function(key, val) {
                if(key!="id"){

                    var num = parseInt($('[type="facebook"] .count').html());
                    var val = val;
                    var total =  num+val;

                    if(num=="0"){
                        $('[type="facebook"] .count').html(val);
                    }else{
                        $('[type="facebook"] .count').html(total);
                    }

                }
            });
          });

        };
        //end facebook

        //twitter count
        function twittershare(url){
          var url = "http://urls.api.twitter.com/1/urls/count.json?url="+url+"&callback=?";
          $.getJSON(url, function(data) {
            $.each(data, function(key, val) {
              if(key!="url"){
                if(key=="count"){
                  key = "shares"
                }
                $('[type="twitter"] .count').html(val);
              }
            });      
          });
        };
        // end twitter count


        $('.popup').live('click',function(e){
            e.preventDefault();
            var url =   $(this).attr('href');
            window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=650');
        })

       
    };  