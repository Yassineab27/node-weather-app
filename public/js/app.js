const search = document.querySelector("input");
let message1 = document.querySelector("#message-1");
let message2 = document.querySelector("#message-2");

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const city = search.value;
    search.value = "";
    message1.textContent = "";
    message2.textContent = "";

    console.log(city);
    if (!city) {
        alert("Please Provide Location !!")
    } else {
        fetch(`/weather?location=${city}`)
        .then(res => {
            res.json().then(data => {
                if(data.Error) {
                    message1.textContent = data.Error
                } else {
                    message1.textContent = `Location: ${data.location}`
                    message2.textContent = `Weather: ${data.forecast}.`
                }
            });
        });
    };
});
