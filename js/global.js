$(document).on('ready',inicial);

function inicial(){
	$('a[rel="modalContent"]').on('click',modalIn);
	menuFixed();

	/*var data = [
            { label: "House", category: "Bazuca Club" },
            { label: "24", category: "Bazuca Club" },
            { label: "Bob esponja", category: "Bazuca Club" },
            { label: "Batman", category: "Premier" },
            { label: "Avengers", category: "Premier" },
            { label: "Spiderman", category: "Premier" },
            { label: "Shrek", category: "Bazuca Kids" },
            { label: "Hercules", category: "Bazuca Kids" },
            { label: "Barney", category: "Bazuca Kids" }
        ];
 
        $( "#search" ).catcomplete({
            delay: 0,
            source: data
        });*/
	
	/* Big search */
	$('#search').on('keyup',bigsearch);
	/* Fin big search */
	
	/* Big search */
	$('.like,.smallLike').on('click',like);
	/* Fin big search */

	/* toglee menu catalogo */
	$('#slideMenuUp').on('click',esconderMenu);
	$('#slideMenuDown').on('click',mostrarMenu);
	/* fin toglee menu catalogo */

	/* Popover */
	$('.movies article').on('mouseenter',popoverUp);
	$('.movies article').on('mouseleave',popoverDown);
	/* Fin popover */


	/* Slide principal */
	$("#slide").carouFredSel({
        width   : '100%',
        infinite : true,
        responsive: true,
        circular : true,
        scroll  : 700,
        auto    : true,
        prev    : "#slidePrev",
        next    : "#slideNext",
        pagination :"#slidepag"
    });
    /* Fin slide principal */

    $('#carruselEstrenos').carouFredSel({
	    circular: true,
	    infinite: true,
	    auto    : true
    });
    
    /* Paralax home  */
    $('.estrenos').parallax("50%",0.1);
    $('.kids').parallax("50%", 0.4);
    $('.club').parallax("50%", 0.4);
    $('.vtr').parallax("50%", 0.4);
    /* Fin paralax home*/
}

/* Toglee menu  */
function esconderMenu(e){
	e.preventDefault();

	$('section.catalog aside').slideUp('fast',function(){
		$('section.catalog .movies article').animate({width:'16.3%'},'fast');
		$('section.catalog .movies').animate({width:'100%'},'fast');
		$('#slideMenuDown').show();
	});

}

function mostrarMenu(e){
	e.preventDefault();

	$('#slideMenuDown').hide();
	$('section.catalog .movies').animate({width:'80.6%'},'fast',function(){
		$('section.catalog .movies article').animate({width:'19.6%'},'fast');
		$('section.catalog aside').slideDown();
	});

}

/* Fin toglee menu */


/* like */
function like(){
	if($(this).hasClass('dont')){
		$(this).removeClass('dont');
	}else{
		$(this).addClass('dont');
	}
}
/* fin like*/

/* Popover caratulas */
function popoverUp(){
	$('.popover',this).delay(500).fadeIn('fast')
}
function popoverDown(){
	$('.popover').stop().hide()
}
/* Fin popover caratulas */



/* big search */
function bigsearch(){
	var valor = $(this).val();
	var valorCount = valor.length;
	if(valorCount>="2"){
		$('#searchModal').fadeIn('fast');
		$('#bigsearch').focus().val(valor);
	}
}

function bigSearchDown(){
	$('#searchModal').fadeOut('fast');
}

/* fin big search */


/* Menú fixed */
function menuFixed(){
	$(window).scroll(function () { 
		var headerPosition = $('#positionFixed').offset();
		var headerPosition = headerPosition.top;
		if(headerPosition>='467'){
			$('header').addClass('fixed');
		}else{
			$('header').removeClass('fixed');
		}
    });

}

/* Fin menú fixed */


/* Ventana modal */
function modalIn(e,mensaje,tipo){
	e.preventDefault();

	var href 		=  $(this).attr('href');
	var title 		=  $(this).attr('title');
	var error		=	"<div class='error'><strong>:(</strong> No hemos encontrado el contenido</div>"
	var modalContent = "<section id='modalContainer' style='display:none;'><article id='modalLoading'><img src='img/301.gif'/></article><section id='modalContent'><span class='closeModal'><span class='icon-remove-sign icon-white'></span></span><h2>"+title+"</h2><article class='modalContentSection'></article></section></section>";
	$('body').append(modalContent);
	$('#modalLoading').animate({top:'50%'},'fast');

		$.ajax({
		  url: href,
		  complete: function(){
			$('#modalLoading').animate({top:'80%',opacity:'0'},'fast',function(){
				$('#modalLoading').remove();
			});
		  },
		  success: function(data) {
		    $('.modalContentSection').html(data);
		    //$('body').html(data)
		  },
		  error:function(){
		    $('.modalContentSection').html(error);
		  }

		});

	$('#modalContainer').fadeIn('fast',function(){
		$('#modalContent').animate({top:'40%'},'fast');
	});

	$('.closeModal').on('click',modalOff)
}

function modalOff(){
	$('#modalContent').animate({top:'-40%'},'fast',function(){
		$('#modalContainer').fadeOut('fast',function(){
			$('#modalContainer').remove();
		});
	});
}
/* Fin ventana modal */

/* Autocomplete */

    $.widget( "custom.catcomplete", $.ui.autocomplete, {
        _renderMenu: function( ul, items ) {
            var that = this,
                currentCategory = "";
            $.each( items, function( index, item ) {
                if ( item.category != currentCategory ) {
                    ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
                    currentCategory = item.category;
                }
                that._renderItemData( ul, item );
            });
        }
    });

/* Fin autocomplete */








/* Recursos  */

/* html modal 

	<section id='modalContainer' style='display:none;'>
		<article id='modalLoading'>
			<img src='img/301.gif'/>
		</article>
		<section id='modalContent'>
			<span class='closeModal'>x</span>
			<h2></h2>
			<article class='modalContentSection'></article>
		</section>
	</section>

fin html modal */


/* Fin recursos */






