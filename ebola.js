<?php
$t = <<< EOF
2014-08-29	3052	1546
2014-09-05	3685	1841
2014-09-06	4269	2288
2014-09-12	4366	2218
2014-09-16	4963	2453
2014-09-18	5335	2622
2014-09-22	5843	2803
2014-09-24	6263	2917
2014-09-26	6553	3083
2014-10-01	7178	3338
2014-10-03	7470	3431
2014-10-08	8033	3879
EOF;

$data = array();
$t = explode("\n", trim($t) );
foreach( $t as $v ) {
  $r = explode("\t", $v);
  $data[] = array(
    "date" => $r[0],
    "infections" => $r[1],
    "deaths" => $r[2]
  );
}
?>

var top_start = 15;
var label_start = top_start + 0.5 + 2;
var bottom_height = 20;
var width = 308;
var height = 180;
var max = 8033;
var max_infections = 8033;
var max_deaths = 3879;

var styles = {
  bar1: { fill: 'red', 'stroke-width': 0.5, stroke: 'white' },
  bar2: { fill: '#ca0909', 'stroke-width': 0.5, stroke: 'white' },
  action: { fill: 'white', opacity: 0 },
  hover: { fill: 'black' },
  label: { 'text-anchor': 'start', 'fill': 'silver'},
  line: { 'stroke': 'silver', opacity:0.3}
};
var data = <?php echo json_encode($data); ?>;
var p = Raphael("ebola_graph", 308, height);


function xy_point(val, i, total) {
  var h = 0.5+(height/max) * val;
  var x = (width / total) * i;
  var w = (width / total) - 4;
  var y = top_start + 0.5+height - h;

  return({ x: x, y: y, w: w, h: h });
}

var label_1 = p.text(10,label_start, "").attr(styles.label);
var label_1_box = label_1.getBBox();

var label_2 = p.text(10,label_start + 20, "").attr(styles.label);
var label_2_box = label_2.getBBox();

label_1.update_count = function(c) {
  label_1.attr("text", "Infections: ", c);
}
label_2.update_count = function(c) {
  label_1.attr("text", "Deaths: ", c);
}
label_1.update_count( max_infections );
label_2.update_count( max_deaths );


for( i = 0; i < data.length; i++ )(function(point, i, total) {
  var a = xy_point(point.infections, i, total);
  var b = xy_point(point.deaths, i, total);

  var rect_a = p.rect(a.x, a.y, a.w, a.h).attr(styles.bar1);
  var rect_b = p.rect(b.x, b.y, b.w, b.h).attr(styles.bar2);

  p.rect(
    a.x, 0, a.x + a.w, height
  ).attr(styles.action).mouseover(function() {
    rect_a.attr(styles.hover);
    rect_b.attr(styles.hover);

    // console.info( point );
    label_1.update_count(point.infections);
    label_2.update_count(point.deaths);
    //label_1.attr("text", point.infections);
    //label_2.attr("text", point.deaths);
  }).mouseout(function(){
    rect_a.attr(styles.bar1);
    rect_b.attr(styles.bar2);
  });
})(data[i], i, data.length);

label_1.toFront();
label_2.toFront();


/*p.path(
  "M " + xt.x2 + " " + label_start + " l " + (width - xt.x2 - 10) + " 0"
).attr(
  styles.line
);*/


/*p.path(
  "M " + xt2.x2 + " " + (label_start+20) + " l " + (width - xt2.x2 - 10) + " 0"
).attr(
  styles.line
);*/
