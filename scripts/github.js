jQuery.githubUser = function(username, callback) {
    jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback)
 }
  
 jQuery.fn.loadRepositories = function(username) {
     this.html("<span>Querying GitHub for " + username +"'s repositories...</span>");
      
     var target = this;
     $.githubUser(username, function(data) {
         var repos = data.data; // JSON Parsing
         sortByName(repos);    
        
         var list = $('<dl/>');
         target.empty().append(list);
         $(repos).each(function() {
             if (this.name != (username.toLowerCase()+'.github.com')) {
                 list.append('<dt style="height: 50px;border-bottom: 1px solid #ddd;"><a style="color:black;padding:10px;color:#333;"href="'+ (this.homepage?this.homepage:this.html_url) +'">' + this.name + '</a> Language:<em>'+(this.language?(' '+this.language):'')+'</em></dt>');
                 //list.append('<dd>' + this.description +'</dd>');
             }
         });      
       });
       
     function sortByName(repos) {
         repos.sort(function(a,b) {
         return a.name - b.name;
        });
     }
 };