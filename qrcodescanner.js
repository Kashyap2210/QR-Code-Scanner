const wrapper = document.querySelector(".wrapper"),
  form = document.querySelector("form"),
  fileInp = document.querySelector("input");
infoText = form.querySelector("p");
copyBtn = wrapper.querySelector(".copy");
closeBtn = wrapper.querySelector(".close");

//STEP 2
function fetchRequest(formData, file) {
  infoText.innerText = "Scanning QR Code...";
  //sending post request to qr server api with passing
  //form data as body & getting response from it
  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      result = result[0].symbol[0].data;
      wrapper.querySelector("textarea").innerText = result;
      infoText.innerText = result
        ? "Upload QR Code to Scan"
        : "Couldn't scan QR Code.";
      if (!result) return;
      wrapper.classList.add("active");
      form.querySelector("img").src = URL.createObjectURL(file);
    }).catch(()=>{
        infoText.innerText = "Couldn't scan QR Code."
    })
}

// STEP 1
fileInp.addEventListener("change", (e) => {
  let file = e.target.files[0]; //Here we get user selected file
  if (!file) return;
  let formData = new FormData(); //here we create new user Form Data object
  formData.append("file", file); //here we add selected file to formData
  fetchRequest(formData, file);
});

//STEP 3
copyBtn.addEventListener("click", () => {
  let text = wrapper.querySelector("textarea").textContent;
  navigator.clipboard.writeText(text);
});

form.addEventListener("click", () => fileInp.click());

//STEP 4
closeBtn.addEventListener("click", () => {
  wrapper.classList.remove("active");
});
