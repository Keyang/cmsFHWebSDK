cms.util=(function(module){
    module.webview=webview;

    function webview(url){
        $fh.webview({
            "act":"open",
            "url":url
        })
    }
    return module;
})(cms.util ||{});
