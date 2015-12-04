<?php

include( "data.php" );

function validate($parm, $default) {
	if( isset($_GET[$parm]) && strlen(trim($_GET[$parm])) > 0 ) {
		echo $_GET[$parm];
	} else {
		echo $default;
	}
}

?>

var left_start = -3;
var top_start = 15;
var bottom_height = 0;
var width = 312;
var height = 200;

var label_start_x = 20;
var label_start_y = top_start + 0.5 - 7;

var max_infections = <?php echo $range["infections"]["max"] ?>;
var max_deaths = <?php echo $range["deaths"]["max"] ?>;
var max_date = "<?php echo $data[count($data)-1]["date"] ?>";

var language = {
	infections: "<?php validate("infections", "Infections"); ?>",
	deaths: "<?php validate("deaths", "Deaths"); ?>",
	date: "<?php validate("date", "Date"); ?>"
}

var styles = {
    infections: { fill: '90-#fff-#6f0f0c', 'stroke-width': 0, stroke: 'white' },
    deaths: { fill: '90-#fff-black', 'stroke-width': 0, stroke: 'white' },
    action: { fill: 'white', opacity: 0 },
    hover: { fill: 'black' },
	legend: {
		infections: { fill: '#6f0f0c', 'stroke-width': 0 },
		deaths: { fill: 'black', 'stroke-width': 0 }
	},
    label: { 'text-anchor': 'start', 'fill': 'gray', 'font-weight': 'bold'},
    line: { 'stroke': 'gray', opacity:0.3 }
};
var data = <?php echo json_encode($data); ?>;
var p = Raphael("ebola_graph", 308, height);

// simple scaling function
function xy_point(val, i, total) {
    var h = 0.5+(height/max_infections) * val;
    var x = left_start + (width / total) * i;
    var w = (width / total) - 0.5;
    var y = top_start + 0.5+height - h;

    return({ x: x, y: y, w: w, h: h });
}

// legend + labels
p.rect(
	label_start_x - 20, label_start_y + 20 - 7, 13, 13
).attr(styles.legend.infections);
p.rect(
	label_start_x - 20, label_start_y + 40 - 7, 13, 13
).attr(styles.legend.deaths);

var label_0 = p.text(label_start_x,label_start_y, "").attr(styles.label);
var label_1 = p.text(label_start_x,label_start_y + 20, "").attr(styles.label);
var label_2 = p.text(label_start_x,label_start_y + 40, "").attr(styles.label);

var label_0_box = label_0.getBBox();
var label_1_box = label_1.getBBox();
var label_2_box = label_2.getBBox();


// mechanism for text updates (mouseover, etc)
label_0.update_count = function(c) {
    label_0.attr("text", language.date + ": " + c);
}
label_1.update_count = function(c) {
    label_1.attr("text", language.infections + ": " + c);
}
label_2.update_count = function(c) {
    label_2.attr("text", language.deaths + ": " + c);
}

function reset() {
	label_0.hide().update_count( max_date );
	label_1.update_count( max_infections );
	label_2.update_count( max_deaths );
}

// draw bar graph
for( i = 0; i < data.length; i++ )(function(point, i, total) {
    var a = xy_point(point.infections, i, total);
    var b = xy_point(point.deaths, i, total);

    var rect_a = p.rect(a.x, a.y, a.w, a.h).attr(styles.infections);
    var rect_b = p.rect(b.x, b.y, b.w, b.h).attr(styles.deaths);

    p.rect(
        a.x, 0, a.x + a.w, height
    ).attr(styles.action).mouseover(function() {
        rect_a.attr(styles.hover);
        rect_b.attr(styles.hover);

        label_0.update_count(point.date);
        label_1.update_count(point.infections);
        label_2.update_count(point.deaths);
		label_0.show();
    }).mouseout(function(){
        rect_a.attr(styles.infections);
        rect_b.attr(styles.deaths);
		label_0.hide();
		reset();
    });

})(data[i], i, data.length);

// ready
reset();
