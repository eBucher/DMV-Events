
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
    document.getElementById("shown_month").innerHTML = shown_month_name;

    update_events_for_month();
}

function change_month(diff) {
    shown_month_idx = shown_month_idx + diff;
    if(shown_month_idx < 0) {
        shown_month_idx = 11;
    } else if (shown_month_idx > 11) {
        shown_month_idx = 0;
    }
    shown_month_name = months[shown_month_idx];

    update_page()
}

document.getElementById('only_show_free_events_switch').addEventListener("change", (event) => {
    update_page();
});

function pill_for_category(category) {
    if(category == "Arts") {
        var color = "danger";
    } else if(category == "Festival") {
        var color = "Success";
    } else if(category == "Miscellaneous") {
        var color = "primary";
    } else if(category == "Holiday") {
        var color = "info";
    } else if(category == "Movies") {
        var color = "warning";
    } else {
        var color = "secondary";
    }
    return '<span class="badge rounded-pill text-bg-' + color + '">' + category + '</span>';

}

// Name should be the name of an event that contains at least one day of the week in it
function pills_for_day_of_week(name) {

    var pill_template = '<span class="badge rounded-pill text-bg-COLOR">TEXT</span>';
    var return_string = "";

    var pill_text = "";
    if(name.includes("Monday")) {
        return_string += pill_template.replace("COLOR", "dark").replace("TEXT", "Monday");
    } if(name.includes("Tuesday")) {
        return_string += pill_template.replace("COLOR", "secondary").replace("TEXT", "Tuesday");
    } if(name.includes("Wednesday")) {
        return_string += pill_template.replace("COLOR", "warning").replace("TEXT", "Wednesday");
    } if(name.includes("Thursday")) {
        return_string += pill_template.replace("COLOR", "danger").replace("TEXT", "Thursday");
    } if(name.includes("Friday")) {
        return_string += pill_template.replace("COLOR", "info").replace("TEXT", "Friday");
    } if(name.includes("Saturday")) {
        return_string += pill_template.replace("COLOR", "primary").replace("TEXT", "Saturday");
    } if(name.includes("Sunday")) {
        return_string += pill_template.replace("COLOR", "success").replace("TEXT", "Sunday");
    }

    return return_string;
}

function update_events_for_month() {

    if(document.getElementById("only_show_free_events_switch").checked == true) {
        var filtered_events = events_by_month_data.filter(function(event) {
            return event.Free == "Yes";
        });
    } else {
        var filtered_events = events_by_month_data
    }

    let events = {Annual:[], Sports:[], Farmers_Markets:[]};

    for(let i = 0; i < filtered_events.length; i++) {
        let event_obj = filtered_events[i];
        if(event_obj.Month == shown_month_name) {
            if(event_obj.Category == "Sports") {
                events.Sports.push(event_obj);
            } else if(event_obj.Category == "Farmer's Market") {
                events.Farmers_Markets.push(event_obj);
            } else {
                events.Annual.push(event_obj);
            }
        }
    }

    // Annual Events
    let insertion_div = document.getElementById("shown_annual_events");
    let new_html = ""

    if(events.Annual.length == 0) {
        new_html += "None<br>"
    } else {
        new_html += '<ul>';
        for(let i = 0; i < events.Annual.length; i++) {
            new_html += '<li><a target = "_blank" href="' + events.Annual[i].Link + '">' + pill_for_category(events.Annual[i].Category) + " " + events.Annual[i].Name + '</a></li>'
        }
        new_html += "</ul>";
    }
    
    insertion_div.innerHTML = new_html;

    // Insert sports
    insertion_div = document.getElementById("shown_sports");
    new_html = ""

    if(events.Sports.length == 0) {
        new_html += "None<br>"
    } else {
        new_html += '<ul>';
        for(let i = 0; i < events.Sports.length; i++) {
            new_html += '<li><a target = "_blank" href="' + events.Sports[i].Link + '">' + " " + events.Sports[i].Name + '</a></li>'
        }
        new_html += "</ul>";
    }

    insertion_div.innerHTML = new_html;


    // Insert Farmer's Markets
    insertion_div = document.getElementById("shown_farmers_markets");
    new_html = ""

    if(events.Farmers_Markets.length == 0) {
        new_html += "None<br>"
    } else {
        new_html += '<ul>';
        for(let i = 0; i < events.Farmers_Markets.length; i++) {
            new_html += '<li><a target = "_blank" href="' + events.Farmers_Markets[i].Link + '">' + pills_for_day_of_week(events.Farmers_Markets[i].Name) + " " + events.Farmers_Markets[i].Name + '</a></li>'
        }
        new_html += "</ul>";
    }
    
    insertion_div.innerHTML = new_html;
}


update_page();