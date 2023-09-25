var magpic = function(selector, options){
    var _this = this;
    _this.el = $(selector);
    _this.imgSrc = $('img', _this.el).attr('src');
     
    var d_coding = {
      magnifierSize :200,
      fadeDuration :200,
      enabled:true,
      initialPosition:false
    };
    options = options || {};
    _this.settings = $.extend( {}, d_coding, options);
    _this.imgSize = {width:null, height:null};
    _this.img = new Image();
    _this.img.onload= function(){
        _this.imgSize.width = this.width;
        _this.imgSize.height =this.height;

        if(_this.settings.initialPosition!=false)
            _this.moveTo(_this.settings.initialPosition[0], _this.
                el.settings.initialPosition[1]);
    }
 
    _this.img.src = _this.imgSrc;
    _this.magE1 = $('<div>').addClass('zoom_m');
    _this.magE1
        .css('width', _this.settings.magnifierSize + 'px')
        .css('height', _this.settings.magnifierSize + 'px')
        .css('margin-top',-(_this.settings.magnifierSize/2) + 'px')
        .css('margin-left',-(_this.settings.magnifierSize/2) + 'px')
        _this.magImgE1 = $('<img>').attr('src', _this.imgSrc);
        _this.magE1.append(_this.magImgE1);
        _this.fadeE1 = $('<div>').addClass('zoom_f');
        _this.el.append(_this.fadeE1);
        _this.el.append(_this.magE1);
        _this.isVisible=false;
        _this.toggleVisibility = function(show){
            if(show == undefined) show = !_this.isVisible;
            if (show) {
                _this.magE1.fadeIn(_this.settings.fadeDuration);
                _this.fadeE1.fadeIn(_this.settings.fadeDuration); 
            }else{
                _this.magE1.fadeOut(_this.settings.fadeDuration);
                _this.fadeE1.fadeOut(_this.settings.fadeDuration);
            }
            _this.isVisible = show;
        };

        _this.el.on('mousemove', function (e) {
            if(_this.imgSize.width == null) return;
            var offset, mousePositionInImage;
            offset = $(this).offset();
            mousePositionInImage ={
                'x':e.pageX - offset.left,
                'y':e.pageY - offset.top
            };
            if (mousePositionInImage.y < 0 || mousePositionInImage .y > _this.el.height()) 
            {
              if(_this.isVisible)_this.toggleVisibility(false)
              return;
            }
            if (mousePositionInImage.x < 0 || mousePositionInImage .x > _this.el.width()) 
            {
                if(_this.isVisible)_this.toggleVisibility(false)
                return;
              }
              _this.moveTo(mousePositionInImage.x, mousePositionInImage.y);
        });
        _this.moveTo = function(x,y) {
            var magnifierImageOffset = {
                'x': -(((x / _this.el.width()) * _this.imgSize.width)-(_this.settings.magnifierSize / 2)),

                'y': -(((y / _this.el.height()) * _this.imgSize.height)-(_this.settings.magnifierSize / 2))
            }
            _this.magE1
                .css('left',x)
                .css('left',y);

            _this.magImgE1
                 .css('left',magnifierImageOffset.x)
                 .css('top',magnifierImageOffset.y);
                 if(!_this.isVisible) _this.toggleVisibility(true);
        }
};