var base = 16;

var Color = class Color {
/**
 * Class representing a RGB color.
 *
 * @class
 */

	constructor(r, g, b) {
	this.r = r;
	this.g = g;
	this.b = b;
	this.coll = [r,g,b];
	this.text = this.toText(this.coll);
	}

	toText(color,type) {
	/**
	 *
	 * @param {String} color - name of color e.g for RGB ['100', '100', '100']
	 * @param {String} type - type of input color e.g. rgb, hex etc. Note:so far
	 * working only with RGB :(
	 * @return {String} text representation of color. Example for RGB - rgb(100, 100, 100)
	 */
	var colType = 'rgb'; // set default RGB for now
	var result = '';
	var d = 1;
	if (type) {
		var colorType = type;
	} else {
		colorType = colType
	}
	if (colorType == 'hex') {var base = 16}
	if (colorType == 'rgbp') {d = 2.55}
	for (var k = 0; k < 3; k++) {
		var val = Math.round(color[k]/d);
		var piece = val.toString(base);
		if (colorType == 'hex' && piece.length < 2) {piece = '0' + piece;}
		if (colorType == 'rgbp') {piece = piece + '%'}
		if (colorType != 'hex' && k < 2) {piece = piece + ',';}
		result = result + piece;
	}
	if (colorType == 'hex') {result = '#' + result.toUpperCase();}
		else {result = 'rgb(' + result + ')';}
	return result;
	}
};


var Palette = class Palette {
/**
 * Class color Palette(color range)
 *
 * @class
 */

	constructor(start, stop, steps){
		this.paletteStartStop = [this.colorStore(start, 'rgb'), this.colorStore(stop), 'rgb'];
		this.step = this.stepCalc(steps, this.paletteStartStop);
		this.palette = this.mixPalette(steps, this.paletteStartStop, this.step)
	}

	stepCalc(steps, startColors) {
		/**
		 *Helper function that calculate step between color. Warning!-math included
		 *
		 * @param {Integer} steps - number of colors between base colors to be calculated
		 * @param {Array} startColors - array of colors between which range of colors will be calculated
		 * @return {Integer} step - caclculated step that will be used  in mixPalette
		 */
		var step = new Array(3);
		steps = steps + 1;
		step[0] = (startColors[1].r - startColors[0].r) / steps;
		step[1] = (startColors[1].g - startColors[0].g) / steps;
		step[2] = (startColors[1].b - startColors[0].b) / steps;
		return step
	}


	colorStore(inCol, colType) {
		/**
		 *Helper function that 'store' colors in instance of @class Color
		 *
		 * @param {Array} inCol - input color
		 * @param {String} colType - type of input color e.g. rgb, hex etc. Note:so far
		 * working only with RGB :(
		 * @return {Color} - instance of @class Color
		 */
		var c = this.colorParse(inCol,colType);
		return new Color(c[0],c[1],c[2]);
	}

	colorParse(c,t) {
		/**
		 * helper method that parse colors :)
		 *
		 * @param {Array}
		 * @param {String}
		 *
		 * @return {Array}
		 */
		var m = 1;
		c = c.toUpperCase();
		var col = c.replace('RGB','').replace(/[\#\(]*/i,'');
		var num;
		var base;
		if (t == 'hex') {
			if (col.length == 3) {
				a = col.substr(0,1);
				b = col.substr(1,1);
				c = col.substr(2,1);
				col = a + a + b + b + c + c;
			}
			num = [col.substr(0,2),col.substr(2,2),col.substr(4,2)];
			base = 16;
		} else {
			num = col.split(',');
			base = 10;
		}
		if (t == 'rgbp') {m = 2.55}
		var result = [parseInt(num[0],base)*m,parseInt(num[1],base)*m,parseInt(num[2],base)*m];
		return result;
	}

	mixPalette(steps, ends, step) {
		/**
		 * Actuall color mixing to get colors 'in between'
		 *
		 * @param {Integer}
		 * @param {Array}
		 *
		 * @return {Array}
		 */

		var count = steps + 1;
		var palette = [];
		palette[0] = new Color(ends[0].r,ends[0].g,ends[0].b);
		palette[count] = new Color(ends[1].r,ends[1].g,ends[1].b);
		for (var i = 1; i < count; i++) {
			var r = (ends[0].r + (step[0] * i));
			var g = (ends[0].g + (step[1] * i));
			var b = (ends[0].b + (step[2] * i));

				palette[i] = new Color(r,g,b);
		}
		return palette;
	}

};



const DAY = 'day';
const MORNING = 'morning';
const EVENING = 'evening';


var DAY_TIME = {};
DAY_TIME[MORNING] = DAY;
DAY_TIME[DAY] = EVENING;
DAY_TIME[EVENING] = MORNING;


var getStyleData = function (dayTime) {
    var dayStyleDependency = {
        'morning': {'background-blend-mode': 'hue',
                    'start': "228, 182, 158",
					'stop': [140, 53,1],
					'type': 'rgb'
                    },
        'day': {'background-blend-mode': 'hue',
					'start':"198, 213, 186",
					'stop': [198, 213, 186],
					'type': 'rgb'},
        'evening': {'background-blend-mode': 'hue',
                    'start': "233, 99, 0",
					'stop': [228, 182, 158],
					'type': 'rgb'
                    }
    };

	return dayStyleDependency[dayTime];

};


var step = 0;

function updateGradient()
{
// array of all colors that will be applied  with linear gradient
	var dayTime;

	// var time = new Date().getHours();
    //
	// if (time > 8 && time < 13){
	// 	dayTime = MORNING;
	// }else if(time > 13 && time < 18){
	// 	dayTime = DAY;
	// }else if(time > 18){
	// 	dayTime = EVENING;
	// }

	///
	// dayTime = DAY;
	dayTime = EVENING;
	///


	var nextDayTime = DAY_TIME[dayTime];
	var startStyles = getStyleData(dayTime);
	var endStyles = getStyleData(nextDayTime);

	var startColor = startStyles['start'];
	var endColor = endStyles['start'];
	var startBlendMode =  startStyles['background-blend-mode'];
	var endBlendMode =  endStyles['background-blend-mode'];

	var palette = new Palette(startColor, endColor, 5);

	// var colors = new Array(
	//   [198, 213, 186],
	//   [229,161,119],
	//   [210,175,124],
	//   [216,156,93],
	//   [221,137,62],
	//   [227,118,31],
	//   [233, 99, 0]);
	//
	//color table indices for:
	// current color left
	// next color left
	// current color right
	// next color right
	var colorIndices = [0,1,2,3];
	var gradientSpeed = 0.001; //transition speed

	var colors = palette.palette;

    if ( $===undefined ) return;
    
    var c0_0 = colors[colorIndices[0]].coll;
    var c0_1 = colors[colorIndices[1]].coll;
    var c1_0 = colors[colorIndices[2]].coll;
    var c1_1 = colors[colorIndices[3]].coll;

	//TEST
    //
	// var colors = new Array(
	//   [198, 213, 186],
	//   [229,161,119],
	//   [210,175,124],
	//   [216,156,93],
	//   [221,137,62],
	//   [227,118,31],
	//   [233, 99, 0]);
    //
    // var c0_0 = colors[colorIndices[0]];
    // var c0_1 = colors[colorIndices[1]];
    // var c1_0 = colors[colorIndices[2]];
    // var c1_1 = colors[colorIndices[3]];
	// //



    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    
    var color1 = "rgba("+r1+","+g1+","+b1+","+0.1+")";
    
    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    
    var color2 = "rgba("+r2+","+g2+","+b2+","+0.7+")";

	if ("rgb("+r1+","+g1+","+b1+")" == colors[5].text){
        console.log('finish');
        return;
    }

     $('.gradient').css({
        'background': "linear-gradient(to bottom, "+color1+" 30%, "+color2+" 60%) ,url("+"static/img/background.png"+ ") no-repeat center center fixed",
        'background-blend-mode' : "color-burn",
         'overflow': 'hidden',
         'background-size': 'cover'
     });


    if (color1 == colors[7]){
        console.log('finish');
        return;
    }
    
      step += gradientSpeed;
      if ( step >= 1 )
      {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];
    
        //pick two new target color indices
        //do not pick the same as the current one
        colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
      }
}

// setInterval(updateGradient,20);



// var colors = new Array(
// [228, 182, 158]
// [225, 185.1, 160.8]
// [222, 188.2, 163.6]
// [219, 191.3, 166.4]
// [216, 194.4, 169.2]
// [213, 197.5, 172]
// [210, 200.6, 174.8]
// [207, 203.7, 177.6]
// [204, 206.8, 180.4]
// [201, 209.9, 183.2]
// [198, 213, 186]);


var step = 0;
//color table indices for:
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.005;

function updateGradient()
{

    if ( $===undefined ) return;

    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];

    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);

    var color1 = "rgba("+r1+","+g1+","+b1+","+0.1+")";

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);

    var color2 = "rgba("+r2+","+g2+","+b2+","+0.7+")";
    console.log("step:", step);

     $('.gradient').css({
        'background': "linear-gradient(to bottom, "+color1+" 30%, "+color2+" 60%) ,url("+"static/img/background.png"+ ") no-repeat center center fixed",
        'background-blend-mode' : "color-burn",
         'overflow': 'hidden',
         'background-size': 'cover'
     });

      step += gradientSpeed;
      if ( step >= 1 )
      {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];

        //pick two new target color indices
        //do not pick the same as the current one
        colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;

      }
}

// setInterval(updateGradient,20);


/// Morning to Day

var colors = new Array(
[228, 182, 158],
[225, 185, 160],
[222, 188, 163],
[219, 191, 166],
[216, 194, 169],
[213, 197, 172],
[210, 200, 174],
[207, 203, 177],
[204, 206, 180],
[201, 209, 183],
[198, 213, 186]);

var step = 0;
//color table indices for:
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.005;

function updateGradient()
{

    if ( $===undefined ) return;

    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];

    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);

    var color1 = "rgb("+r1+","+g1+","+b1+")";

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);

    var color2 = "rgb("+r2+","+g2+","+b2+")";


	var currentColor1 = [r1, g1, b1];

	if (currentColor1.toString() == colors[6].toString()){
		 $('.gradient').css({
			'background': "linear-gradient(to bottom, "+color_1+" 10%, "+color_2+" 60%) ,url("+"static/img/background.png"+ ") no-repeat center center fixed",
			'background-blend-mode' : "saturation",
			 'overflow': 'hidden',
			 'background-size': 'cover'
		 });
	}else if(currentColor1.toString() == colors[7].toString() ){
		 $('.gradient').css({
			'background': "linear-gradient(to bottom, "+color_1+" 15%, "+color_2+" 60%) ,url("+"static/img/background.png"+ ") no-repeat center center fixed",
			'background-blend-mode' : "saturation",
			 'overflow': 'hidden',
			 'background-size': 'cover'
		 });
	}else if(currentColor1.toString() == colors[8].toString()){
		var color_1= "rgba("+r1+","+g1+","+b1+","+0.1+")";
		var color_2= "rgba("+r1+","+g1+","+b1+","+0.4+")";
		 $('.gradient').css({
			'background': "linear-gradient(to bottom, "+color_1+" 30%, "+color_2+" 60%) ,url("+"static/img/background.png"+ ") no-repeat center center fixed",
			'background-blend-mode' : "saturation",
			 'overflow': 'hidden',
			 'background-size': 'cover'
		 });
	}else if(currentColor1.toString() == colors[9].toString()){
		var color_1= "rgba("+r1+","+g1+","+b1+","+0.1+")";
		var color_2= "rgba("+r1+","+g1+","+b1+","+0.4+")";
		 $('.gradient').css({
			'background': "linear-gradient(to bottom, "+color_1+" 30%, "+color_2+" 60%) ,url("+"static/img/background.png"+ ") no-repeat center center fixed",
			'background-blend-mode' : "color-burn",
			 'overflow': 'hidden',
			 'background-size': 'cover'
		 });
		return;
	}
	else{
     $('.gradient').css({
        'background': "linear-gradient(to bottom, "+color1+" 5%, "+color2+" 95%) ,url("+"static/img/background.png"+ ") no-repeat center center fixed",
        'background-blend-mode' : "hue",
         'overflow': 'hidden',
         'background-size': 'cover'
     });

	}

      step += gradientSpeed;
      if ( step >= 1 )
      {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];

        //pick two new target color indices
        //do not pick the same as the current one
        colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;

      }
}

// setInterval(updateGradient,20);

