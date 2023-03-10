export let config = {
	index: 3
}

window.storage = [];

const container = document.getElementById("container");

const localLength = JSON.parse(localStorage.getItem("blogs")).length;
console.log(localLength);
for (let i = 0; i < localLength; i++) {
	container.appendChild(document.getElementById("blog-template").content.cloneNode(true));

	container.children[i + 3].querySelector("#title").innerHTML = JSON.parse(localStorage.getItem("blogs"))[i].title;
	container.children[i + 3].querySelector("#time").innerHTML = JSON.parse(localStorage.getItem("blogs"))[i].time;
	container.children[i + 3].querySelector("#summary").innerHTML = JSON.parse(localStorage.getItem("blogs"))[i].summary;
	container.children[i + 3].querySelector(".blog-id").id = JSON.parse(localStorage.getItem("blogs"))[i].id;

	const tempBlog = {
		title: container.children[i + 3].querySelector("#title").innerHTML,
		time: container.children[i + 3].querySelector("#time").innerHTML,
		summary: container.children[i + 3].querySelector("#summary").innerHTML,
		index: container.children[i + 3].querySelector(".blog-id").id
	};
	storage.push(tempBlog);
}

const diagBox = document.getElementById("diagBox");
diagBox.addEventListener("close", () => {
	/* When cancel or no input, just exit */
	if (diagBox.returnValue == "Cancel" || document.getElementById("title-input").value == "" || document.getElementById("time-input").value == "" || document.getElementById("summary-input").value == "") {
		document.getElementById("title-input").value = "";
		document.getElementById("time-input").value = "";
		document.getElementById("summary-input").value = "";
	}

	/* When saving, create new blog */
	else if (diagBox.returnValue == "Save") {
		/* Fill template with dialog input */
		const addTemp = document.getElementById("blog-template");
		addTemp.content.querySelector("#blog").querySelector("#title").innerHTML = DOMPurify.sanitize(document.getElementById("title-input").value);
		addTemp.content.querySelector("#blog").querySelector("#time").innerHTML = DOMPurify.sanitize(document.getElementById("time-input").value);
		addTemp.content.querySelector("#blog").querySelector("#summary").innerHTML = DOMPurify.sanitize(document.getElementById("summary-input").value);
		addTemp.content.querySelector("#blog").querySelector(".blog-id").id = config.index;
		config.index++;

		/* Add to storage array */
		const blogObj = {
			title: addTemp.content.querySelector("#blog").querySelector("#title").innerHTML,
			time: addTemp.content.querySelector("#blog").querySelector("#time").innerHTML,
			summary: addTemp.content.querySelector("#blog").querySelector("#summary").innerHTML,
			index: addTemp.content.querySelector("#blog").querySelector(".blog-id").id
		};
		storage.push(blogObj);

		/* Set to local storage */
		localStorage.setItem("blogs", JSON.stringify(storage));

		/* Empty dialog */
		document.getElementById("title-input").value = "";
		document.getElementById("time-input").value = "";
		document.getElementById("summary-input").value = "";

		container.appendChild(addTemp.content.cloneNode(true));

		/* Remove empty indicator */
		document.getElementById("empty").setAttribute("hidden", "hidden");
		container.removeAttribute("hidden");
	}

	/* Editing current blog */
	else {
		const currIndex = diagBox.querySelector(".diag-id").id;
		const editBlog = document.getElementById(currIndex).parentElement;
		editBlog.querySelector("#title").innerHTML = DOMPurify.sanitize(document.getElementById("title-input").value);
		editBlog.querySelector("#time").innerHTML = DOMPurify.sanitize(document.getElementById("time-input").value);
		editBlog.querySelector("#summary").innerHTML = DOMPurify.sanitize(document.getElementById("summary-input").value);

		/* Find index of element to edit */
		for (let i = 0; i < storage.length; i++) {
			if (storage[i].index == currIndex) {
				storage[i].title = editBlog.querySelector("#title").innerHTML;
				storage[i].time = editBlog.querySelector("#time").innerHTML;
				storage[i].summary = editBlog.querySelector("#summary").innerHTML;
			}
		}

		localStorage.setItem("blogs", JSON.stringify(storage));

		document.getElementById("title-input").value = "";
		document.getElementById("time-input").value = "";
		document.getElementById("summary-input").value = "";
	}
});