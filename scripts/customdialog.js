export let config = {
	promptVal: "",
	confirmVal: ""
};

export function showAlert() {
	document.getElementById("diagLabel").innerText = "Alert pressed!";
	document.getElementById("input").setAttribute("type", "hidden");
	document.getElementById("cancel").setAttribute("hidden", "hidden");
	document.getElementById("confirmed").setAttribute("hidden", "hidden");
	document.getElementById("diagBox").showModal();

}

export function showConfirm() {
	const diagLabel = document.getElementById("diagLabel");
	diagLabel.innerText = "Do you confirm this?";
	document.getElementById("input").setAttribute("type", "hidden");

	document.getElementById("cancel").removeAttribute("hidden");

	document.getElementById("confirmed").innerHTML = "";
	document.getElementById("confirmed").removeAttribute("hidden");

	document.getElementById("diagBox").showModal();
}


export function showPrompt() {
	const diagLabel = document.getElementById("diagLabel");
	diagLabel.innerText = "What is your name?";
	const txtInput = document.getElementById("input");
	txtInput.setAttribute("type", "text");

	document.getElementById("cancel").removeAttribute("hidden");

	document.getElementById("confirmed").innerHTML = "";
	document.getElementById("confirmed").removeAttribute("hidden");

	const diag = document.getElementById("diagBox");
	diag.showModal();
}