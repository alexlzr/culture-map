$(function () {
    $(".graph").find("li").on("click", function () {
        $(this).addClass("active");
        $(this).nextAll().removeClass("active");
        $(this).prevAll().removeClass("active");
    });

    let listOfCountries = [];
    let colors = [
        '#CD5C5C',
        '#9966cc',
        '#4682B4',
        '#DAA520',
        '#800000',
        '#000000',
        '#006400'
    ];
    let dictionary = new Map([
        ["Argentina", [54, 59, 45, undefined, undefined, undefined, undefined, undefined]],
        ["Australia", [13, undefined, 85, 20, undefined, 22, 38, undefined]],
        ["Brazil",[51,63, 41, 55, 62, 82, 52, 75]],
        ["Canada",[13, 53, 80, 30, undefined, undefined, undefined,undefined]],
        ["China",[86, 75, 95, 86, 87, 87, 77, 81]],
        ["Denmark",[34, 25, 60, 9, undefined, 15, 28, 26]],
        ["Finland",[36, 0, undefined, 30, undefined, 28, undefined, undefined]],
        ["France",[66, 24, 10, 63, 65, 56, 12, 55]],
        ["Germany",[24, 16, 33, 53, 34, 24, 17, 7]],
        ["Ghana",[undefined, 80, undefined, undefined, undefined, undefined, 81, undefined]],
        ["India",[76, 72, undefined, 86, 84, 90, 69, 87]],
        ["Indonesia",[91, 87, undefined, undefined, undefined, undefined, 86, undefined]],
        ["Israel",[undefined, 8, undefined, 17, undefined, undefined, 7, undefined]],
        ["Italy",[61, undefined, 10, 55, 69, 64, 34, 67]],
        ["Japan",[92, 98, 95, 92, 6, 71, 87, 16]],
        ["Kenya",[83, 72, undefined, undefined, undefined, undefined, undefined, 91]],
        ["Mexico",[59, 65, 51, 71, undefined, 74, 65, 72]],
        ["Netherlands",[20, 12, 68, 10, 20, 12, 22, 27]],
        ["Nigeria",[undefined, undefined, undefined, 100, 94, 94, undefined, 94]],
        ["Peru",[62, undefined, undefined, 78, undefined, undefined, 74, undefined]],
        ["Poland",[44, undefined, undefined, 73, undefined, 45, undefined, 44]],
        ["Russia",[68, 10, 22, 78, 80, 73, 19, 65]],
        ["Saudi Arabia",[80, 81, undefined, 82, undefined, 92, 72, 92]],
        ["Singapore",[70, undefined, undefined, undefined, undefined, undefined, 60, undefined]],
        ["South Korea",[91, 82, undefined, 92, undefined, undefined, undefined, undefined]],
        ["Spain",[57, undefined, 18, 63, undefined, 61, 27, 62]],
        ["Sweden",[undefined, undefined, 56, 8, 12, undefined, 63, 19]],
        ["Thailand",[undefined, 93, undefined, undefined, undefined, 81, 85, undefined]],
        ["Turkey",[undefined, undefined, undefined, undefined, undefined, 78, undefined, 76]],
        ["UK",[34, 56, 71, 45, 46, 34, 50, 32]],
        ["USA",[8, 50, 92, 39, 57, 6, 47, 27]]
    ]);

    function checkRepetition(value) {
        let data = {
            label: value,
            values: dictionary.get(value)
        };

        if (listOfCountries.length >= 7) {
            alert("Sorry, but you can't add more than 7 countries(")
            return false;
        }


        for (let i = 0; i < listOfCountries.length; ++i) {
            if(JSON.stringify(listOfCountries[i]).toString() === JSON.stringify(data).toString()) {
                alert("You have already had this country in your \"country list\"");
                return false
            }
        }
        return true;
    }
    function getPos(element) {
        var i = 0;
        while(element = element.previousElementSibling) {
            i++;
        }

        return i;
    }


    $("#append-country").on("change", function () {


        let bool = checkRepetition($("#append-country").val());

        if($("#append-country").val() != "-" && bool) {
            let country = document.createElement("div");
            country.className = "appended";
            let span = document.createElement("span");
            span.style.verticalAlign = "sub";
            span.innerHTML = $("#append-country").val();
            country.appendChild(span);
            document.getElementById("countries-stack").appendChild(country);

            let data = {
                label: $("#append-country").val(),
                values: dictionary.get($("#append-country").val())
            };

            let imageDiv = document.createElement('div');
            let img = document.createElement('img');
            img.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAAAmJLR0QA/4ePzL8AAAEhSURBVFjD7dbBDgExEAbgteF1SISjAx4JF/FuiIjN+rtPYS8cZRPCpi4ilm072w4OOq5TXzqddicIfPjw8echaxgjxUksRJOSn7S2S5yRYiRrZERMIO+/DH1TNvrIHvljMoL0scjIFAiJHb1Y16dlWuaFkLjQy7UuLFQyb4TEil6u9tviEqaEyNCu0F+ih+PrHyRDU4YYVGxjPcNC6Bk2Qs2wEsrDzWi957Ybzl2QGB5Cy/ARSoaXUCHF6/mxcrEx+oNnYcwt7Mx84TKWPyDmF9qZoH0InAk2xvzSOjNx1/bzm3To+4itB4mI2rYN5NYjUT6vU5mD9XC3p1/Bme2YKqb0gTvEDAfk2NAOMukgQo69mMqwYhuTq2uR7cOHj5/EDaJ2g1eWKGwWAAAAAElFTkSuQmCC";

            img.className = "delete-country";

            imageDiv.className = "image-container";
            country.setAttribute("id", (listOfCountries.length + 1).toString());
            imageDiv.onclick = function() {
                let el = document.getElementById(country.id);
                let number = Array.from(el.parentNode.children).indexOf(el);
                el.remove();

                listOfCountries = listOfCountries.filter(item => JSON.stringify(item) !== JSON.stringify(listOfCountries[number]))
            };
            imageDiv.appendChild(img);

            country.appendChild(imageDiv);
            listOfCountries.push(data)
        }
    });

    $("#addCompareCountries").on("click", function () {
        let datasets = [];
        if(listOfCountries.length > 7) {
            listOfCountries.length = 7;
        }
        $("#color-country").empty()
        for (let i = 0; i < listOfCountries.length; ++i) {
            let oneDataset = {
                label: listOfCountries[i].label,
                data: listOfCountries[i].values,
                borderColor: colors[i],
                borderDash: getStyle(i),
                backgroundColor: 'transparent',
                pointBorderWidth: '12',
                pointStrokeColor : "#fff",
                pointRadius: "6",
                lineTension: '0'
            };
            let mainDiv = document.createElement("div");
            mainDiv.className = "appended-color-country";
            let color = document.createElement("div");
            color.className = "color-div";
            let label = document.createElement("span");
            label.className = "default-span";

            color.style.border = "2px solid" + colors[i];
            color.style.backgroundColor = colors[i];
            label.innerHTML = listOfCountries[i].label;
            label.style.color = colors[i];

            mainDiv.appendChild(color);
            mainDiv.appendChild(label);

            $("#color-country").append(mainDiv);

            datasets.push(oneDataset);
        }



        createGraph(datasets);
    });


    function getStyle(number) {
        switch (number) {
            case 0: return [20, 3, 3, 3, 3, 3, 3, 3];
            case 1: return [0, 0];
            case 2: return [0, 0];
            case 3: return [12, 3, 3];
            case 4: return [20, 5];
            case 5: return [1, 1];
            case 6:
            case 7:
            case 8: return [15, 3, 3, 3];

        }
    }
});
