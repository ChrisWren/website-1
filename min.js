!function(e){function r(e){var r,a=document,t=e;if(a.body.createTextRange)r=a.body.createTextRange(),r.moveToElementText(t),r.select();else if(window.getSelection){var o=window.getSelection();r=a.createRange(),r.selectNodeContents(t),o.removeAllRanges(),o.addRange(r)}}function a(){e("#name").text(s.login),o(n),e("body").addClass("authenticated"),e(".login-box").hide(),e(".logged-in").show()}function t(e){UserApp.User.get({user_id:"self"},function(r,a){r?e&&e(null):e&&e(a[0])})}function o(r){e.get("http://cdnjs-server.herokuapp.com/favorites?token="+u,function(e){e&&(h=e,r(e))},"json")}function n(r){_.each(r,function(r){r="#"+r;var a=e(r),t=a.clone(!0);a.remove(),t.addClass("favorite"),e("#example tbody").prepend(t)})}function c(e,r){var a=[],t=e.length,o=r.length;if(0==t)return o;if(0==o)return t;for(var n=t;n>=0;n--)a[n]=[];for(var n=t;n>=0;n--)a[n][0]=n;for(var c=o;c>=0;c--)a[0][c]=c;for(var n=1;t>=n;n++)for(var i=e.charAt(n-1),c=1;o>=c;c++){if(n==c&&a[n][c]>4)return t;var l=r.charAt(c-1),s=i==l?0:1,u=a[n-1][c]+1,h=a[n][c-1]+1,d=a[n-1][c-1]+s;u>h&&(u=h),u>d&&(u=d),a[n][c]=u,n>1&&c>1&&i==r.charAt(c-2)&&e.charAt(n-2)==l&&(a[n][c]=Math.min(a[n][c],a[n-2][c-2]+s))}return a[t][o]}function i(r){if($rowCache=$rowCache||e(rowSelector),r.length>0){var a=[];cleanSearchVal=r.replace(/\./g,"").toLowerCase();for(var t=0;t<libraryNameCache.length;t++){var o=libraryNameCache[t];e("#"+o);var n=c(o,r),i=-1!==o.toLowerCase().indexOf(cleanSearchVal),l=_.contains(h,o);(i||2>n)&&a.push({name:o,levDist:n,favorite:l})}a=_.sortBy(a,function(e){var r=e.favorite?-1e3:0;return r+e.levDist}),e(matchedRowSelector).empty(),$rowCache.hide();for(var s=0;s<a.length;s++){var u=a[s],d=_.findWhere($rowCache,{id:u.name}),f=e(d).clone(!0).show();f.addClass("search-result"),e("#example tbody").append(f)}}else e(matchedRowSelector).empty(),$rowCache.show()}function l(r){var a=e(r.currentTarget).val();i(a)}UserApp.initialize({appId:"5343d12871774"});var s=null,u=Kaka.get("ua_session_token");u&&(UserApp.setToken(u),t(function(e){e&&(console.log(e),s=e,a())})),window.logout=function(){Kaka.remove("ua_session_token"),UserApp.User.logout(function(){window.location.href="login.html"})};var h=[];e("#example .change-favorite").on("click",function(r){var a=e(r.currentTarget).parents("tr")[0].id;_.contains(h,a)?_.isArray(h)&&h.length>0&&(_gaq.push(["_trackEvent","favorite","removed",a]),h=_.without(h,a),e.ajax({url:"http://cdnjs-server.herokuapp.com/favorites?token="+u,success:function(){console.log(arguments)},type:"DELETE",data:{library:a}})):(h.push(a),_gaq.push(["_trackEvent","favorite","added",a]),e.ajax({url:"http://cdnjs-server.herokuapp.com/favorites?token="+u,success:function(){console.log(arguments)},type:"POST",data:{library:a}}));var t=e("#"+a);t.toggleClass("favorite"),e(t).parents("tbody").prepend(t)}),e("p.library-url").on("mouseenter",function(a){r(e(a.currentTarget)[0])}),rowSelector="#example > tbody > tr",matchedRowSelector="#example tr.search-result",libraryNameCache=_.pluck(e(rowSelector),"id"),$rowCache=null,e("#search-box").on("keyup",_.debounce(l,300)),e("#search-box").focus()}(jQuery);