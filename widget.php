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
    </style>
</head>
<body>
    <div id="ebola_graph"></div>
    <script><?php include( "ebola.js" ); ?></script>
</body>
</html>
