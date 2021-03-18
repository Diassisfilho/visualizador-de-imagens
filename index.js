console.log("Yo!")
// variaveis globais
var urls;
var ordem_imgs = document.createElement("div");

// elementos do doom
var btn_mostra_imgs = document.getElementById("mostra-imgs");
var btn_apr_em_ordem = document.getElementById("apr-imgs");
var input = document.querySelector("input");

// eventos de click dos botoes
btn_mostra_imgs.addEventListener("click",
	() => urls = mostra_grid_imagens(input.value)
);

btn_apr_em_ordem.addEventListener("click",
	() => new Viewer(ordem_imgs).show()
);

// adiciona nas divs as imagens em formato de grid responsivo
function mostra_grid_imagens(link)
{
	let urls = return_url_range(link);

	let num_column = 0;
	let columns = document.getElementsByClassName("column")
	for (let url of urls) {
		for ( x of ["apresentar","mostrar"]) {
			img = document.createElement("img");
			img.src = url;

			if ( x == "apresentar" ) ordem_imgs.appendChild(img);		
			if ( x == "mostrar" )	 columns[num_column].appendChild(img);	
		}
		// core do grid responsivo
		num_column+=1;
		if (num_column == 4) num_column = 0;
	}
	
	console.log(urls)
	const galeria = new Viewer(document.getElementById("row"));
}

function return_url_range(link) {
	const index_opcol = link.indexOf("[");
	const index_endcol = link.indexOf("]");
	const str_range = link.slice(index_opcol + 1, index_endcol);

	var str_start = str_range.split("-")[0];
	var str_end = str_range.split("-")[1];

	var start = parseInt(str_range.split("-")[0]);
	var end = parseInt(str_range.split("-")[1]);

	var urls = [];
	if (str_start[0] != 0) // loop sem zero a esquerda
	{
		for (var x of Array.from({ length: end }, (x, i) => i + start)) {
		    let imageUrl = link.slice(0, index_opcol) + x + link.slice(index_endcol + 1);
		    urls.push(imageUrl);
		    
		  	if (x == end) break;
		}	
		
	} else { // loop com zeros a esquerda
		var str_x = str_start;
		incrementLeadingZeroNumber(str_x, -1);
		for (let x of Array.from({ length: end }, (x, i) => i + start)) {
			let imageUrl = link.slice(0, index_opcol) + str_x + link.slice(index_endcol + 1);
			urls.push(imageUrl);
			
			str_x = incrementLeadingZeroNumber(str_x, 1);
			if (x == end) break;
		}
	}
	
	return urls;
}
// incrementa e decrementa strings com 0 a esquerda
function incrementLeadingZeroNumber(leadingZeroString, amountToIncrement){
  var amountOfZerosToAdd = leadingZeroString.length;
  var stringToNumber = (+leadingZeroString);
  var zerosToAdd = new Array(amountOfZerosToAdd + 1).join( '0' );

  var zerosAndNewNumber = zerosToAdd + ( stringToNumber + amountToIncrement )
  var amountToSlice = (-1 * amountOfZerosToAdd)
  var newString = zerosAndNewNumber.slice(amountToSlice)
  return newString
}
