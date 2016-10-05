<?php
$server = "localhost";
$user = "kliu10";
$pass = "Saweqr1!";
$dbname = "glycan";

$conn = new mysqli($server, $user, $pass, $dbname);

if($conn->connect_error) {
	die("Connection failed: ").$conn->connect_error;
}

$query = "SELECT ID, Family, Series, Name, Keywords, Structure, Picture, Link_A, Link_B, Link_C, Price FROM compounds";

$result = $conn->query($query);

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	if($outp != "") {
		$outp .= ",";
	}
	$outp .= '{"ID":"'.$rs["ID"].'",';
	$outp .= '"Family":"'.$rs["Family"].'",';
	$outp .= '"Series":"'.$rs["Series"].'",';
	$outp .= '"Name":"'.$rs["Name"].'",';
	$outp .= '"Structure":"'.$rs["Structure"].'",';
	$outp .= '"Link_A":"'.$rs["Link_A"].'",';
	$outp .= '"Link_B":"'.$rs["Link_B"].'",';
	$outp .= '"Link_C":"'.$rs["Link_C"].'",';
	$outp .= '"Picture":"'.$rs["Picture"].'",';
	$outp .= '"Price":"'.$rs["Price"].'",';
	$outp .= '"Keywords":"'.$rs["Keywords"].'"}';
}

$outp = '{"records":['.$outp.']}';
$conn->close();
echo($outp);
?>
