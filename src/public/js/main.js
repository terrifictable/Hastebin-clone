/*
 * I could have done this in the index.html file itself, but I think this is more organized
 */


function sendItem() {
    var item = document.getElementById("input_field").value;
    if (!item) {
        return;
    }

    const req = new XMLHttpRequest();
    req.open("POST", "/add");
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(
        {
            code: item
        }
    ));


    req.addEventListener("load", () => {
        const response = JSON.parse(req.response);

        if (response["message"].toLowerCase().includes("success")) {
            window.location.assign("/posts/" + response["id"]);
        } else {
            console.log(response);
        }
    });

}
