(function(win){
function damorParse(json, ele, question) {
    this.json = json;
    this.template='';
    this.parentNode = ele;
    this.question = question || '';
}
damorParse.prototype = {
    generateTUQTpl: function() {
        this.template = '<div class="auto-render-answer">';
        for (var i in this.json) {
            if (i == 'topic') {
                this.template += '<div class="auto-row-label">话题</div>';
                for (var j = 0; j < this.json[i].length; j++) {
                    this.template += '<div class="auto-row" data-module="topic">';
                    this.template += '<a href="/topic/' + this.json[i][j][1] + '">';
                    this.template += '<span class="item-tag">' + this.json[i][j][0] + '</span>';
                    this.template += '<span class="auto-gray">' + this.json[i][j][3] + '个精华问答</span>'
                    this.template += '</a></div>';
                }
            }
            if (i == 'user') {
                this.template += '<div class="auto-row-label">用户</div>';
                for (var j = 0; j < this.json[i].length; j++) {
                    this.template += '<div class="auto-row" data-module="userItem">';
                    this.template += '<a href="/user/' + this.json[i][j][1] + '">';
                    this.template += '<img src="' + this.json[i][j][2] + '" class="item-img-avatar fl">';
                    this.template += '<div class="auto-row-name">' + this.json[i][j][0] + '</div>';
                    this.template += '<div class="auto-row-description auto-gray"><span>' + this.json[i][j][3] + '</span></div>';
                    this.template += '</a></div>';
                }
            }
            if (i == 'question') {
                this.template += '<div class="auto-row-label">问题</div>';
                for (var j = 0; j < this.json[i].length; j++) {
                    this.template += '<div class="auto-row" data-module="questionItem">';
                    this.template += '<a class="auto-link" href="/question/' + this.json[i][j][1] + '">';
                    this.template += this.json[i][j][0];
                    this.template += '<span class="auto-gray">' + this.json[i][j][2] + '个回答</span>';
                    this.template += '</a></div>';
                }
            }
            if (i == 'search_link') {
                this.template += '<div class="auto-row search-link">';
                this.template += '<a href="/search/this.question">查看全部搜索结果</a></div>';
            }
        }
        this.template += '</div>';

    },
    generateQTpl:function(){
        this.template+='<div class="auto-remind">搜索你感兴趣的问题</div>'
        for (var i = 0; i < this.json['question'].length; i++) {
            
        }
    },

    generateSTpl:function(){
       this.template='';
       for (var i = 0; i < this.json['subject'].length; i++) {
            this.template+='<li>'
            this.template+=this.json['subject'][i][0];
            this.template+='<img src="';
            this.template+=this.json['subject'][i][1];
            this.template+='"/>';
            this.template+='</li>';
        }
    },
    generateUTpl:function(){
        this.template='<div class="auto-userinfo"><div class="top-trg"></div><img src="';
            this.template+=this.json['userinfo'][0];
            this.template+='" class="fl circle">';
            this.template+='<div class="fr"><div class="user-detail fr"><div><span>';
            this.template+=this.json['userinfo'][1];
            this.template+='</span></div><div><span>';
            this.template+=this.json['userinfo'][2];
            this.template+='</span></div><div class="circle gold"></div><div><span>';
            this.template+=this.json['userinfo'][3];
            this.template+='</span></div><div class="circle silver"></div><div><span>';
            this.template+=this.json['userinfo'][4];
            this.template+='</span></div><div class="circle copper"></div><div><span>';
            this.template+=this.json['userinfo'][5];
            this.template+='</span></div></div><div class="address">';
            this.template+=this.json['userinfo'][6];
            this.template+='</div><div><a href="';
            this.template+=this.json['userinfo'][7];
            this.template+='">个人主页链接</a></div></div> <div class="introduce">';
            this.template+=this.json['userinfo'][8];
            this.template+='</div></div>';
       
    },

    generateTagTpl:function(){
        this.template+='<div class="auto-tag"><div class="trg"></div><header><span>';
        this.template+=this.json['tag'][0];
        this.template+='问题';
        this.template+='</span><a href="/tags/';
        this.template+=this.json['tag'][1];
        this.template+='">订阅</a></header><p>';
        this.template+=this.json['tag'][2];
        this.template+='</p></div>';
    },
    generateTagsTpl:function(){
        this.template+='<ul class="auto-tags-list">';
        for (var i = 0; i < this.json['tags'].length; i++) {
              this.template+='<li><img src="';
              this.template+=this.json['tags'][i][1];
              this.template+='"><span>';
              this.template+=this.json['tags'][i][0];
              this.template+='</span></li>';
        }
        this.template+='</ul>';
    },
    generateUserInviteListTpl:function(){
        for (var i = 0; i < this.json['users'].length; i++) {
            this.template+='<li class="clearfix"><div class="user-info clearfix fl"><a href="';
            this.template+=this.json['users'][i][1];
            this.template+='" class="fl" user-id="';
            this.template+=this.json['users'][i][2];
            this.template+='"><img src="';
            this.template+=this.json['users'][i][0];
            this.template+='"><div class="circle fl"><span class="fl">'
            this.template+=this.json['users'][i][2];
            this.template+='</span></a><div class="user-detail fl"><div><span>';
            this.template+=this.json['users'][i][3];
            this.template+='</span></div><div class="circle"></div><div><span>';
            this.template+=this.json['users'][i][4];
            this.template+='</span></div><div class="circle"></div><div><span>';
            this.template+=this.json['users'][i][5];
            this.template+='</span></div><div class="circle"></div><div><span>';
            this.template+=this.json['users'][i][6];
            this.template+='</span></div></div></div></div><div class="fr"><button class="invite-control" user-id="';
            this.template+=this.json['users'][i][2];
            this.template+='">邀请回答</button></div></li>';
        }
    },

    renderTUQ: function() {
        this.generateTUQTpl();
        if ($('.auto-render-answer').length > 0)
            $('.auto-render-answer').remove();
        this.parentNode.append(this.template);
        if (this.question.length == 0) {
            $('.auto-render-answer').remove();
        }
    },
    renderS:function(){
        this.generateSTpl();
        this.parentNode.empty();
        this.parentNode.append(this.template);
         if (this.question.length == 0) {
         this.parentNode.empty();
        }
    },
    renderU:function(){
        this.generateUTpl();
        this.parentNode.append(this.template);
    },
    renderTag:function(){
        this.generateTagTpl();
        this.parentNode.append(this.template);
    },
    renderTags:function(){
        this.generateTagsTpl();
        if(!this.parentNode.is(':empty'))      
           this.parentNode.empty();
        this.parentNode.append(this.template);
    },
    renderUserInviteList:function(){
        this.generateUserInviteListTpl();
        if(!this.parentNode.is(':empty'))      
           this.parentNode.empty();
        this.parentNode.append(this.template);
    },
    renderMoreUserInviteList:function(){
        this.generateUserInviteListTpl();
        this.parentNode.append(this.template);
    }
}
    win.damorParse=damorParse;
})(window);