
const today = new Date();
var shown_month_idx = today.getMonth();
const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var shown_month_name = months[shown_month_idx];

document.getElementById("shown_month").innerHTML = shown_month_name

function unique_vals_in_array(arr) {
    return [... new Set(arr)]
}

function update_page() {
    document.getElementById("shown_month").innerHTML = shown_month_name + " Annual Events";

    update_events_for_month();
}

function change_month(diff) {
    shown_month_idx = shown_month_idx + diff;
    if(shown_month_idx + diff < 0) {
        shown_month_idx = 11
    } else if (shown_month_idx > 11) {
        shown_month_idx = 0
    }
    shown_month_name = months[shown_month_idx];

    update_page()
}

document.getElementById('only_show_free_events_switch').addEventListener("change", (event) => {
    update_page();
});


function update_events_for_month() {
    let events = {};
    let categories = [];

    for(let i = 0; i < events_by_month_data.length; i++) {
        let cat = events_by_month_data[i].Category
        let event_name = events_by_month_data[i]["Name"];
        let link = events_by_month_data[i]["Link"];
        let month = events_by_month_data[i]["Month"];
        let free = events_by_month_data[i]["Free"];
        if(!categories.includes(cat)) {
            categories.push(cat);
            events[cat] = [];
        }
        if(month == shown_month_name) {
            events[cat].push({Name: event_name, Link: link, Free: free})
        }
    }

    categories = categories.sort();

    let container = document.getElementById("monthly_events");

    let new_html = ""

    for(let i = 0; i < categories.length; i++) {
        let cat = categories[i]
        new_html += "<h3>" + cat + "</h3>";

        if(document.getElementById("only_show_free_events_switch").checked == true) {
            var filtered_events = events[cat].filter(function(event) {
                console.log(event.Free);
                return event.Free == "Yes";
            });
        } else {
            var filtered_events = events[cat];
        }
        
        if(filtered_events.length == 0) {
            new_html += "None<br>"
        } else {
            new_html += '<ul class="list-group list-group-flush">';
            for(let j = 0; j < filtered_events.length; j++) {
                new_html += '<li class="list-group-item"><a target = "_blank" href="' + filtered_events[j]['Link'] + '">' + filtered_events[j]['Name'] + '</a></li>'
            }
            new_html += "</ul>";
        }
    }

    container.innerHTML = new_html;
}


update_page();