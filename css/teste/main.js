(function()
{
	var IdeaFixa = {};

	IdeaFixa.init = function(siteUrl)
	{
		IdeaFixa.siteUrl  = siteUrl;
		IdeaFixa.siteName = 'IdeaFixa';
		IdeaFixa.path 	  = '/';
		IdeaFixa.ajax 	  = false;

		IdeaFixa.loaderIn();
		IdeaFixa.loaderAdjust();
		IdeaFixa.search();
		IdeaFixa.changeRoute();
		IdeaFixa.menu();
		IdeaFixa.menuMobile();
		IdeaFixa.login();
		IdeaFixa.events();
		IdeaFixa.loaderOut();
	}

	IdeaFixa.menuMobile = function()
	{
		$('.menuMobile').on('click', function()
		{
			$('.menuMobileAberto').attr({'class':'menuMobileAberto aberto'});
			$('html').css('overflow-y', 'hidden');
		});

		$('.fechaMenuMobile').on('click', function()
		{
			$('.menuMobileAberto').attr({'class':'menuMobileAberto'});
			$('html').css('overflow-y', 'scroll');
		});		

		$('.abreCategorias').on('click', function()
		{
			$(this).children('.mobileCategorias').toggleClass('show');
		});
		$('.menuMobileAberto a').on('click', function()
		{
			$('.menuMobileAberto').attr({'class':'menuMobileAberto'});
			$('.fechaMenuMobile').fadeOut(400);
			$('.menuMobile').fadeIn(400);
			$('.viewMobile').fadeIn(400);
			$('html').css('overflow-y', 'scroll');
		});
		$('.viewMobile')
			.off('click')
			.on('click', function()
			{
				$(this).toggleClass('visible');
				$(this).children('ul').toggleClass('show');
			});
		$('.viewMobile ul li.magazine, .viewMobile ul li.galeria, .viewMobile ul li.videos')
			.off('click')
			.on('click', function()
			{
				$(this).removeClass('visible');
				$(this).children('ul').removeClass('show');
			});
	}

	IdeaFixa.login = function()
	{
		$('.loginButton').on('click', function()
		{
			var btn = $('.logarBtn');
			var con = $('.containerLogin');

			if(btn.hasClass('abreLogin')){
				btn.attr({'class':'logarBtn fechaLogin'});

				$('header').addClass('onlyLogin');
				$('.containerLogin').attr({'class':'containerLogin show'});
				con.css({'visibile':'visible'});
				$('.finalizaCadastro ').attr({'class':'finalizaCadastro hide'});
				// $('.optionsLoginContainer .show').css('display', 'block');
				$('html').css('overflow-y', 'hidden');
				$('.xxx').css('display', 'none');

				if($('header').hasClass('scroll')){
					$('header').removeClass('scroll');
				}
			}else{
				btn.attr({'class':'logarBtn abreLogin'});
				$('header').removeClass('onlyLogin');
				$('.xxx').css('display', 'block');
				$('.containerLogin').attr({'class':'containerLogin'});
				con.css({'visibile':'hidden'});
				$('html').css('overflow-y', 'auto');
			}			
		});

		$('.fechaMobile').on('click', function()
		{
			$('.containerLogin').css('left', '-125%');
			$('.containerLogin').removeClass('show');
		});
		$('.mobileLogue').on('click', function()
		{
			$('.containerLogin').css('left', '0');
		});
	}

	IdeaFixa.search = function()
	{
		$('.search')
			.off('click')
			.on('click', function(e) {
				e.preventDefault();
				$('#searchContainer').addClass('open');

				$('#buscaSite .searchInput').focus();
			});

		$('#buscaSite, #buscaMobile,#buscaSemResultado')
			.off('submit')
			.on('submit', function(e){
				e.preventDefault();
				busca = $(this).find('.searchInput').val();
				IdeaFixa.changeRoute(IdeaFixa.siteUrl + '/busca/' + busca);
				IdeaFixa.loaderIn();
				$('#searchContainer').removeClass('open');	
				$('.searchInput').val("");

				$('.menuAberto').removeClass('show');
				$('html').css('overflow-y', 'scroll');

				
				$('.menuMobileAberto').attr({'class':'menuMobileAberto'});
				$('html').css('overflow-y', 'scroll');
			});
	}

	IdeaFixa.loader = function(filename, callback, params)
	{
		if(IdeaFixa.ajax){
			IdeaFixa.ajax.abort();
		}

		IdeaFixa.ajax = $.ajax({
			url: IdeaFixa.siteUrl +'/'+ filename + '.php',
			type: 'POST',
			data: params,
		});

		IdeaFixa.ajax.done(function(data){
			IdeaFixa.ajax = false;

			if(callback){
				callback(data);
			}else{
				$('#main')
					.html(data)
					.addClass('visible');

					setTimeout(function(){
						IdeaFixa.loaderOut();
					}, 500);

					var titlePage = $('#main').find('#titlePage').text();

					if(titlePage){
						IdeaFixa.siteTitle(titlePage);
					}else{
						IdeaFixa.siteTitle(false);
					}
			}
		})
		.fail(function(){})
		.error(function(XMLHttpRequest, textStatus, errorThrown){
        	// IdeaFixa.changeRoute('404');
        })
		.always(function(){});
	}

	IdeaFixa.changeRoute = function(rota)
	{
		var pathname = window.location.pathname; // Returns path only

		var objHistory = {};
		var objParams  = {};
		var arrRota = [];

		if(rota){
			var nrota   = rota.replace(IdeaFixa.siteUrl, "/");
			var arrHref = nrota.split("/");
		}else{
			var nrota   = window.location.href.replace(IdeaFixa.siteUrl, "");
			var arrHref = nrota.split("/");
			rota = IdeaFixa.siteUrl + nrota;
		}

		arrHref.forEach(function(elm){
			if(elm != ''){
				arrRota.push(elm);
			};
		});

		var file = arrRota[0];

		if(window.location.hash == '#continue-cadastro')
		{

			$('html').css('overflow','hidden');

			$('.xxx').css('display', 'none');

			$('header').addClass('onlyLogin');

			var btn = $('.logarBtn');
			var con = $('.containerLogin');

			btn.attr({'class':'logarBtn fechaLogin'});
			btn.append('<a style="position:absolute; top:0; left:0; width:100%; height:100%;" href="'+IdeaFixa.siteUrl+'"></a>');
			$('header').addClass('onlyLogin');
			$('.containerLogin').attr({'class':'containerLogin show'});
			con.css({'visibile':'visible'});

			if($('header').hasClass('scroll')){
				$('header').removeClass('scroll');
			}

			
			$('.containerLogin').addClass('show');
			$('.optionsLoginContainer .show').css('display', 'none');
			$('.finalizaCadastro').attr({'class': 'finalizaCadastro'});
		} else {
			$('.xxx').css('display', 'block');
		} 
		
		var urls = arrRota.length == 0 || arrRota[0] == '#' || arrRota[0] == 'categoria' || arrRota[0] == 'autor' || arrRota[0] == 'usuario' || arrRota[0] == 'post' || arrRota[0] == 'postnovo' || arrRota[0] == 'oldbutgold' || arrRota[0] == 'projeto' || arrRota[0] == 'projetos' || arrRota[0] == 'portfolio' || arrRota[0] == 'casa' || arrRota[0] == 'evento' || arrRota[0] == 'sobre-nos' || arrRota[0] == 'enviar-post' || arrRota[0] == 'enviar-post/#sucesso' || arrRota[0] == 'politica-de-privacidade' || arrRota[0] == 'termos-de-uso' || arrRota[0] == 'finaliza-cadastro' || arrRota[0] == 'busca' || arrRota[0] == 'logout' || arrRota[0] == 'contato' || window.location.hash == '#continue-cadastro';

		if(!urls)
		{
			file = '404';
			objParams.p = arrRota[0];
		}

		if(arrRota.length == 0 || arrRota[0] == '#' ||  arrRota[0] == 'categoria' || arrRota[0] == 'autor' || arrRota[0] == 'usuario' || window.location.hash == '#continue-cadastro'){
			file = 'feed';

			$('#main').removeClass('feedGaleria');
			$('header .view').html(''+
				'<ul>'+
					'<li class="magazine"><a class="changeRoute" data-href="'+ IdeaFixa.siteUrl +'" href="'+ IdeaFixa.siteUrl +'" ><img src="'+IdeaFixa.siteUrl+'/img/blank.png" height="100%" width="100%" alt="" /></a></li>'+
					'<li class="divisor"></li>'+
					'<li class="galeria" title="Ver por Imagens"><a class="changeRoute" data-href="'+ IdeaFixa.siteUrl +'/categoria/galeria" href="'+ IdeaFixa.siteUrl +'/categoria/galeria" ><img src="'+IdeaFixa.siteUrl+'/img/blank.png" height="100%" width="100%" alt="" /></a></li>'+
					'<li class="divisor"></li>'+
					'<li class="videos" title="Ver por Vídeos"><a class="changeRoute" data-href="'+ IdeaFixa.siteUrl +'/categoria/videos" href="'+ IdeaFixa.siteUrl +'/categoria/videos" ><img src="'+IdeaFixa.siteUrl+'/img/blank.png" height="100%" width="100%" alt="" /></a></li>'+
				'</ul>'+
			'');
		}
		
		if(arrRota[0] == 'post' ||arrRota[0] == 'postnovo' || arrRota[0] == 'oldpost' || arrRota[0] == 'projetos' || arrRota[0] == 'portfolio' || arrRota[0] == 'projeto' || arrRota[0] == 'oldbutgold' || arrRota[0] == 'evento' || arrRota[0] == 'escola-curso'){
			objParams.p = arrRota[1]; 
			display = $('.filter, .view');
			$(display).css('display', 'none');
			$('.shareHeader').css('display','block');
		} else {
			hide = $('.filter, .view');
			$(hide).css('display', 'block');
			$('.shareHeader').css('display','none');
		} 

		if(arrRota[0] == 'post'){
			file = 'postnovo';
		}

		if(arrRota[0] == 'landing'){
			file = 'landing';
		}

		if(arrRota[0] == '#_=_'){
			file = 'feed';
		}

		if(arrRota[0] == '/?s='){
			console.log('tem');
			// window.location.href.replace(IdeaFixa.siteUrl + '/?s=',IdeaFixa.siteUrl + '/busca/');
		}

		if(arrRota[0] == 'casa'){
			file = 'casa-ideafixa';
			$('body').addClass('casaIdeaFixa');
		} else {
			$('body').removeClass('casaIdeaFixa');
		}

		if(arrRota[1] == 'cadastro'){
			file = 'cadastro';
			console.log('aaaaeee');
		}

		if(arrRota[0] == 'evento'){
			$('body').addClass('eventoSingle');
			$('.voltar a').attr('href', IdeaFixa.siteUrl + '/casa');
		} else {
			$('body').removeClass('eventoSingle');
			$('.voltar a').attr('href', IdeaFixa.siteUrl + '/portfolio');
		}

		if(arrRota[0] == 'oldbutgold'){
			file = 'oldpost';
		}

		if(arrRota[0] == 'logout'){
			file = 'feed';
		}

		if(arrRota[0] == 'projeto'){
			$('.voltar').css('display','block');
			$('.sendPost').css('display', 'none');
		}  else if (arrRota[0] == 'enviar-post') {
			$('.voltar, .sendPost').css('display', 'none'); 
		} else {
			$('.voltar').css('display','none');
			$('.sendPost').css('display', 'block');
		}
		
		if(arrRota[0] == 'categoria' && arrRota[1] == 'galeria'){
			$('header .view').html(''+
				'<ul>'+
					'<li class="galeria">'+
						'<a class="changeRoute" data-href="'+ IdeaFixa.siteUrl +'/categoria/galeria" href="'+ IdeaFixa.siteUrl +'/categoria/galeria" >'+
							'<img src="'+IdeaFixa.siteUrl+'/img/blank.png" height="100%" width="100%" alt="" />'+
						'</a>'+
					'</li>'+
					'<li class="divisor"></li>'+
					'<li class="magazine" title="Ver Todos">'+
						'<a class="changeRoute" data-href="'+ IdeaFixa.siteUrl +'" href="'+ IdeaFixa.siteUrl +'" >'+
							'<img src="'+IdeaFixa.siteUrl+'/img/blank.png" height="100%" width="100%" alt="" />'+
						'</a>'+
					'</li>'+
					'<li class="divisor"></li>'+
					'<li class="videos" title="Ver por Vídeos">'+
						'<a class="changeRoute" data-href="'+ IdeaFixa.siteUrl +'/categoria/videos" href="'+ IdeaFixa.siteUrl +'/categoria/videos" >'+
							'<img src="'+IdeaFixa.siteUrl+'/img/blank.png" height="100%" width="100%" alt="" />'+
						'</a>'+
					'</li>'+
				'</ul>'+
			'');
			$('#main').addClass('feedGaleria');
		}

		if(arrRota[0] == 'categoria' && arrRota[1] == 'videos'){
			$('header .view').html(''+
				'<ul>'+
					'<li class="videos">'+
						'<a class="changeRoute" data-href="'+ IdeaFixa.siteUrl +'/categoria/videos" href="'+ IdeaFixa.siteUrl +'/categoria/videos" >'+
							'<img src="'+IdeaFixa.siteUrl+'/img/blank.png" height="100%" width="100%" alt="" />'+
						'</a>'+
					'</li>'+
					'<li class="divisor"></li>'+
					'<li class="magazine" title="Ver Todos">'+
						'<a class="changeRoute" data-href="'+ IdeaFixa.siteUrl +'" href="'+ IdeaFixa.siteUrl +'" >'+
							'<img src="'+IdeaFixa.siteUrl+'/img/blank.png" height="100%" width="100%" alt="" />'+
						'</a>'+
					'</li>'+
					'<li class="divisor"></li>'+
					'<li class="galeria" title="Ver por Imagens">'+
						'<a class="changeRoute" data-href="'+ IdeaFixa.siteUrl +'/categoria/galeria" href="'+ IdeaFixa.siteUrl +'/categoria/galeria" >'+
							'<img src="'+IdeaFixa.siteUrl+'/img/blank.png" height="100%" width="100%" alt="" />'+
						'</a>'+
					'</li>'+
				'</ul>'+
			'');
		}

		if(arrRota[0] == 'categoria') {
			objParams.cat = arrRota[1];
		}

		if(arrRota[0] == 'portfolio'){
			$('body').addClass('portfolioPage');
			$('.contatoPort').css('display','block');
		} else {
			$('body').removeClass('portfolioPage');
			$('.contatoPort').css('display','none');
		}

		if(arrRota[0] == 'projeto'){
			$('.contatoPort').css('display','block');
			$('.xxx').css('display','none');
		} else {
			$('.contatoPort').css('display','none');
			$('.xxx').css('display','none');
		}

		if(arrRota[0] == 'undefined'){
			setTimeout(function(){
				window.location.href = IdeaFixa.siteUrl;
			}, 50);
		}

		if (arrRota[0] == 'autor') {
			objParams.autor = arrRota[1];
		}
		if (arrRota[0] == 'usuario') {
			objParams.user = arrRota[1];
		}
		if (arrRota[0] == 'busca') {
			file = 'feed';
			objParams.busca = arrRota[1];
		}
		if(arrRota[0] == 'posts-da-galera'){
			file = 'feed';
			objParams.customPost = arrRota[1];
		}
		if(arrRota[0] == 'cases' || arrRota[0] == 'projetos' || arrRota[0] == 'portifolio'){
			window.location.href="/portfolio";
		}
		if(arrRota[1] == 'sucesso') {
			setTimeout(function()
			{
				$('.sucessoMsg').addClass('show');
			}, 2000);

			setTimeout(function()
			{
				$('.sucessoMsg').removeClass('show');
			}, 7000);
		}

		objHistory.pagina = arrRota[0];
		objHistory.dados  = arrRota[1];

		if(window.ga){
			ga('send', 'pageview', window.location.href.split('/')[3] + '/' + window.location.href.split('/')[4]);
		}

		window.history.pushState(objHistory, false, rota);

		IdeaFixa.area = file;

		IdeaFixa.loader(file, false, objParams);
	}

	IdeaFixa.scrollTop = function()
	{
		$('html, body').animate({scrollTop:0}, 100);
	}

	IdeaFixa.loaderAdjust = function()
	{
		var h = $(window).height();
		$('#loader').css('height', h);
	}

	IdeaFixa.loaderIn = function()
	{
		var mprogress = new Mprogress({
			template: 3
		});

		mprogress.start();

		// $('#loader').removeClass('hide');
		// $('html').css('overflow', 'hidden');
	}

	IdeaFixa.loaderOut = function()
	{
		var mprogress = new Mprogress({
			template: 3
		});

		mprogress.end();
		
		// $('#loader').addClass('hide');
		// $('html').css('overflow', 'auto');
	}

	IdeaFixa.menu = function()
	{
		var h 	 = $(window).height();
		var hDiv = $('.categoriasContainer').height();

		$('.menuAberto .abreLoja').on('click', function(){
			$('.menuAberto .loja').addClass('lojaAberta');
			$('.containerTitle').html('loja');
			$(this).addClass('ativo');
			$('.menuAberto .abreCat').removeClass('ativo');
			$('.categorias').css('right', '-100%');
		});

		$('.menuAberto .abreCat').on('click', function(){
			$('.menuAberto .loja').removeClass('lojaAberta');
			$('.containerTitle').html('categorias');
			$(this).addClass('ativo');
			$('.menuAberto .abreLoja').removeClass('ativo');
			$('.categorias').css('right', '0');
		});

		$('.menu').on('click', function(){
			$('.menuAberto').addClass('show');
			$('html').css('overflow', 'hidden');
			// IdeaFixa.scrollTop();
			
		});

		$('.closeMenu, .fechaMenu').on('click', function(){
			$('.menuAberto').removeClass('show');
			$('html').css('overflow-y', 'scroll');
		});

		$('.categorias a').each(function() {
			$(this).on('click', function(){
				$('.menuAberto').removeClass('show');
			$('html').css('overflow-y', 'scroll');
			})
		});

		var infoLoja = $('.containerLoja').height();
		$('.containerLoja').css('margin-top', -infoLoja / 2);
	}

	IdeaFixa.siteTitle = function(titleTxt)
	{
		var titleBarra = (titleTxt) ? titleTxt + ' | ' : '';
		document.title = titleBarra + 'IdeaFixa';
	}


	IdeaFixa.sendNews = function($this)
	{
		var $response = $this.find('#response'),
		    $mail     = $this.find('#signup-email'),
		    testmail  = /^[^0-9][A-z0-9._%+-]+([.][A-z0-9_]+)*[@][A-z0-9_]+([.][A-z0-9_]+)*[.][A-z]{2,4}$/,
		    hasError  = false;

		if ( !testmail.test($mail.val()) ){
		    $response.html('Por favor insira um email valido');

		    $response.addClass('showResponse error');
		    setTimeout(function(){
		    	$response.removeClass('showResponse error');
		    }, 3000);
			    
			$mail.css('background-image', '');
			$mail.css('background-position', '');
		    hasError = true;
		}

		if (hasError === false) {

		    $.ajax({
		        type: "POST",
		        dataType: 'json',
		        cache: false,
		        url: $this.attr('action'),
		        data: {
		        	signup_email:$mail.val()
		        }
		    }).done(function (data) {
		    	if(data['status'] == 'error')
		    	{
		    		$response.addClass('showResponse error');
				    setTimeout(function(){
				    	$response.removeClass('showResponse error');
				    }, 3000);
				    hasError = true;
		    	} else {
		    		$response.addClass('showResponse');
				    setTimeout(function(){
				    	$response.removeClass('showResponse');
						$mail.val('');
				    }, 3000);
		    	}
		        $response.html(data.message);

		    }).fail(function() {
		        $response.html('Erro. Tente novamente.');
		    }).always(function(data){
		    	// console.log(data);
		    });

		}
	}

	IdeaFixa.events = function()
	{

		// $('html').css('overflow', 'hidden');

		// if (window.location.hash == "#_=_")
		// {
		//     // window.location.hash = "";
		//     window.location = IdeaFixa.siteUrl;
		// }

		$(window)
			.on('resize', function()
			{
				IdeaFixa.loaderAdjust
			});

		$('.changeRoute')
			.off('click')
			.on('click', function(){
				if($('.menuAberto').hasClass('show')){
					$('.menuAberto').removeClass('show');
					$('html').css('overflow-y', 'scroll');
				}
				if($('.menuMobileAberto').hasClass('aberto')){
					// $('.fechaMenuMobile').fadeOut(400);
					// $('.menuMobile').fadeIn(400);
					// $('.viewMobile').fadeIn(400);
					$('.menuMobileAberto').removeClass('aberto');
					$('html').css('overflow-y', 'scroll');

					$('.menuMobileAberto').attr({'class':'menuMobileAberto'});
				}
			});

		if(IdeaFixa.changeRoute && $('.menuMobileAberto').hasClass('aberto')){
			$('.menuMobileAberto').removeClass('aberto');
			$('.fechaMenuMobile').fadeOut(400);
			$('.menuMobile').fadeIn(400);
			$('.viewMobile').fadeIn(400);
			$('html').css('overflow-y', 'scroll');

			$('.menuMobileAberto').attr({'class':'menuMobileAberto'});
		}

		$('.close')
			.off('click')
			.on('click', function(event) {
				event.preventDefault();
				$('#searchContainer').removeClass('open');
			});

		$(document)
			.off('click')
			.on('click', '.changeRoute', function(e){
				e.preventDefault();
				var url = ($(this).attr("data-href")) ? $(this).attr("data-href") : $(this).attr("href") ;

				IdeaFixa.scrollTop();
				IdeaFixa.loaderIn();

				IdeaFixa.changeRoute(url);
			});

		window.onpopstate = function(){
			IdeaFixa.scrollTop();
			IdeaFixa.loaderIn();
			IdeaFixa.changeRoute();
		};

		var lastScrollTop = 0;

		$('#scrollTopo')
			.off('click')
			.on('click', function(){
				IdeaFixa.scrollTop();
			})

		$(document)
			.off('scroll')
			.on('scroll', function(){
				var h       = $(window).height(),
					scroll  = $(this).scrollTop(),
					header 	= $('header');

				if (scroll > lastScrollTop) {
				    $('header').addClass('scroll');
				    header.find('.menu, .sendPost, .search, .filter li, .view li, .xxx, .logarBtn, .bgMenu, .shareHeader li, .voltar, .inscrevase').addClass('bgAtivo');
				    $('#scrollTopo').css('opacity', '0');
				    $('#scrollTopo').css('pointer-events', 'none');
				    
				} else {
				    $('header').removeClass('scroll');
			    	$('#scrollTopo').css('opacity', '1');
			    	$('#scrollTopo').css('pointer-events', 'auto');
				}

				if(scroll < 1) {
					header.find('.menu, .sendPost, .search, .filter li, .view li, .xxx, .logarBtn, .bgMenu, .shareHeader li, .voltar, .inscrevase').removeClass('bgAtivo');
					$('#scrollTopo').css('opacity', '0');
				}

				if(scroll > ($(window).height() / 2)){
					header.find('.logo, .xxx').addClass('removeLogo');
				} else {
					header.find('.logo, .xxx').removeClass('removeLogo');					
				}

				lastScrollTop = $(this).scrollTop();
			});

		$(document)
			.off('submit')
			.on('submit', '#newsletter', function(e)
			{
				e.preventDefault();

				IdeaFixa.sendNews($(this));
			});

		$('.formCadastro')
			.off('submit')
			.on('submit', function(e){
				e.preventDefault();

				var testmail = /^[^0-9][A-z0-9._%+-]+([.][A-z0-9_]+)*[@][A-z0-9_]+([.][A-z0-9_]+)*[.][A-z]{2,4}$/;
				var email 	 = $(this).find('.emailUser').val();

				if( testmail.test(email) ){
					$.ajax({
						url: IdeaFixa.siteUrl +'/finaliza-cadastro',
						type: 'POST',
						data: {emailUser:email},
					})
					.done(function(data){
						if(data == '1'){
							window.location.href = window.location.href.split('#')[0];
						}else if(data == '-1'){
							alert('este e-mail não está disponivel');
						}else if(data == '2'){
							alert('e-mail não válido');
						}
					})
					.fail(function(){})
					.error(function(XMLHttpRequest, textStatus, errorThrown){
			        	// IdeaFixa.changeRoute('404');
			        })
					.always(function(){});
				}else{
					alert('e-mail não válido');
				}
			});
	}

	IdeaFixa.makeRules = function(arr){
		var obj = {}
		arr.forEach(function(elm, idx){
			if(arr[idx+1] && idx%2==0){
				obj[elm] = arr[idx+1]
			}
		});
		return obj;
	}

	window.IdeaFixa = IdeaFixa;
})();