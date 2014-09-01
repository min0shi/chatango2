$(window).load(function() {
	$('.content').html(pageload);
	$('.menu').html("");
	$('.submenu').html("");
	var str = "";
	categories.forEach(function(obj){str+="<div id='"+obj.id+"' class='menuitem'>"+obj.name+"</div>";});
	$('.menu').html(str);
	var tot = 0;
	$('.menu div').each(function(){
		$(this).css('width','auto');
		$(this).css('padding','0 '+catpad/2+'px 0 '+catpad/2+'px');
		tot+=parseInt($(this).css('width').split('px'))+catpad;
	});
	$('.menu').css('width',tot+1+'px');

	str="";
	genrelist.forEach(function(obj){str+="<div id='"+obj.id+"' class='submenuitem'>"+obj.name+"</div>";});
	$('.submenu').html(str);
	tot = 0;
	$('.submenuitem').each(function(){
		$(this).css('width','auto');
		$(this).css('padding',genpad/2+'px '+genpad+'px');
		$(this).css('margin',genpad/4+'px');
		tot+=parseInt($(this).css('width').split('px'))+genpad*2.5;
	});
	$('.submenu').css('width',tot+1+'px');

	$(".menuitem").hover(function () {
		$(this).toggleClass('menuitemhover');
	});

	/*menu clicked*/
	$('.menuitem').click(function(){
		$('.content').html(menuselect);
		$('.menuitem').each(function() {
			$(this).removeClass('menuitemclicked');
		});
		$('.submenuitem').each(function() {
			$(this).removeClass('submenuitemclicked');
		});

		//$(this).css('borderBottom','2px solid '+col);
		//alert($(this).attr('class'));
		if(!$(this).hasClass('menuitemclicked')){
			$(this).toggleClass('menuitemclicked');
		}
		$('.content').html(menuselect);
		type_id=$(this).attr("id");
	});

	/*genre clicked*/
	$('.submenuitem').click(function(){
		$('.content').html(nocontent);
		$('.submenuitem').each(function() {
			$(this).removeClass('submenuitemclicked');
		});

		if(!$(this).hasClass('submenuitemclicked') && type_id!=""){
			$(this).toggleClass('submenuitemclicked');
		}

		if(type_id!=""){
			var txt = "";
			var id = $(this).attr('id');
			var poster = "";
			list[type_id].forEach(function(obj){
				if(obj.genre==id){
					var u = obj.url;
					if(u==""){
						u = "https://www.google.com/#q="+obj.title;
					}
					txt+="<a href='"+u+"'target='_blank'><img src='"+obj.img+"'/><br/>"+obj.title+"<br></a>";
					$('.content').html(txt);
				}
			});
		} else{
			$('.content').html(pageload);
		}
		$('.content').slimScroll({ scrollTo : '0px' });
	});

	$('.header h1').click(function(){
		$('.content').html(pageload);
		$('.menuitem').each(function() {
			$(this).removeClass('menuitemclicked');
		});
		$('.submenuitem').each(function() {
			$(this).removeClass('submenuitemclicked');
		});
		type_id="";
	});

	var step=20;
	if(navigator.userAgent.match(/Firefox/)!=null){
		step=1;
	}
	
	$('.content').slimScroll({
		height: $('.content').css('height'),
		width: $('.content').css('width'),
		wheelStep : step
	});
	$('.slimScrollDiv').css(
		"margin", "10px auto"
	);
});