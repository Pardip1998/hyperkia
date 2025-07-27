<?php

$filename = 'svg-icons.svg';

if (file_exists($filename)) {
    
    if (unlink($filename)) {        
    } else {
        echo "Something is wrong";
    }
}

$svg_sprits = [];


$svgFiles = glob("*.svg");


if (!empty($svgFiles)) {
    foreach ($svgFiles as $file) {

    		
        $htmlContent = file_get_contents($file);

        if ($htmlContent !== false) {
            
            if (preg_match('/viewBox="([^"]+)"/', $htmlContent, $matches)) {
                $viewBoxValue = $matches[1];                
            }
        }


        
				$dom = new DOMDocument();
				libxml_use_internal_errors(true); 
				$dom->loadHTML($htmlContent, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
				libxml_clear_errors();

				
				$svgElement = $dom->getElementsByTagName('svg')->item(0);

				
				$innerHTML = '';
				if ($svgElement) {
				    foreach ($svgElement->childNodes as $child) {
				        $innerHTML .= $dom->saveHTML($child);
				    }
				}
				$innerHTML; 


        $svg_sprits[$file] = [
        	'id' => str_replace(".svg", "", $file),
        	'viewbox' => $viewBoxValue,
        	'content' => $innerHTML,
        ];
    }
} else {
    echo "No SVG files found in the current directory." . PHP_EOL;
}



$sprits_file_contents = '<svg class="svg" xmlns="http://www.w3.org/2000/svg">';
foreach ($svg_sprits as $key => $value) {	
	$sprits_file_contents .= '
		<symbol id="'.$value['id'].'-symbol" viewBox="'.$value['viewbox'].'">
        '.$value['content'].'
    </symbol>
	';
}
$sprits_file_contents .= '</svg>';



file_put_contents($filename, $sprits_file_contents);
echo 'Success! File name is <strong>'.$filename.'</strong>';


?>
