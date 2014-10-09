<!doctype html>
<html>
<head>
    <title>Ebola Tracker - VOA</title>
	<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
    <script src="raphael-min.js"></script>
    <style>
    html, body {overflow: hidden; margin:0; padding:0}
    * { font-family: Arial; font-size: 12px }
    #ebola_graph { width: 308px; height:200px; background-color: white }
    #source { padding-top:5px}
    </style>
</head>
<body>
    <div id="ebola_graph"></div>
    <div id="source">Source: <a target="_blank" href="http://www.who.int/csr/disease/ebola/situation-reports/en/">WHO</a></div>
<?php
// https://docs.google.com/spreadsheets/d/1yoTAu8C6zLgzXT5xW-bxa-IgIz2kcYSk4QHQ-c2xUmg/pubhtml?gid=0&single=true
?>
    <script><?php include( "ebola.js" ); ?></script>
</body>
</html>
