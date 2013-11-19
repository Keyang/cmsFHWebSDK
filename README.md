cmsFHWebSDK
===========

Web based sdk sync cms content

#Basic Usage:

##Init sdk 
    cms.init({
      "alias":"the alias of your app on cms"
    });
    
##Get app structure (local then remote)
    
    cms.data.getAppStructure(function(err,res){});
    
##Get content (local then remote)

    cms.data.getContent(contentId, function (err,res){});

##Sync

    cms.service.sync(function(err,res){})
    
##Start /stop  client service for dynamic update

    cms.service.startPoll(timeinsec)
    
    cms.service.stopPoll()
    
