<?php
// replace with db-loaded data...

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
