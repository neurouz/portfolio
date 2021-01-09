$(function(){
    var dataDelay = 0;

    const api_url = "https://api.github.com/repositories/";
    const repos = ["306111171", "292325199", "165105438"];
    const img_path = "./img/repos/";

    async function getData(url){
        var result = await axios.get(url);
        return result;
    }

    function insertElement(elementName, attributes, content){
        var element = document.createElement(elementName);
        if(attributes) {
            Object.keys(attributes).forEach(key => {
                element.setAttribute(key, attributes[key]);
            });
        }
        if(content){
            element.innerHTML = content;
        }
        return element;
    }

    repos.forEach(id => {
        var repo = getData(api_url.concat(id));
        repo.then(result => {

            // Fetching data
            var title = result.data.name;
            var link = result.data.html_url;
            var date = result.data.created_at;
            var localDate = new Date(date.trim()).toLocaleDateString();
            var image = img_path.concat(result.data.id).concat(".jpg");
            var description = result.data.description;
            var date_modified = new Date(result.data.updated_at.trim()).toLocaleDateString();

            // Creating HTML elements
            var card = insertElement("div", { "class": "project-card", "data-aos": "zoom-out-up", "data-aos-delay": dataDelay });
            var p = insertElement("p", { class: "project-title"}, title);
            var img = insertElement("img", { src: image, class: "project-image", alt: "project-image"});
            var dateElement = insertElement("p", { class: "project-date"}, "Created: " + localDate);
            var last_modified = insertElement("p", {class: "modified-date"}, "Modified: " + date_modified);
            
            var visit = insertElement("a", {
                class: "project-link",
                href: link,
                target: "_blank"
            }, "View code");

            var preview = insertElement("a", {
                class: "project-preview",
                onclick: title.concat("_Show()")
            }, "Demo");


            if(result.data.id == "306111171"){
                description = description + "<br />Credentials:<br /><b> Admin : AppAdmin1!<br />User : AppUser1!</b>";
            }

            var infotext = insertElement("p", { class: "project-info" }, description);


            // Appending elements in card div
            card.appendChild(p);
            card.appendChild(img);
            card.appendChild(dateElement);
            card.appendChild(last_modified);
            card.appendChild(visit);
            card.appendChild(preview);
            card.append(infotext);

            // Appending card into main element
            document.getElementById("projects").appendChild(card);

            dataDelay += 250;
        });
    });
});