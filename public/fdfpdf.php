<?php header('Content-type: application/pdf');
header('Content-Disposition: attachment; filename="Download.pdf"');
passthru("pdftk result.pdf result.xfdf output - ");
exit;
?>