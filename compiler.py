import csv

def csv_to_js(js_var_name, csv_path):

    js_string = "let " + js_var_name + " = ["

    with open(csv_path, 'r', encoding='utf-8-sig') as file:
        csv_reader = csv.DictReader(file)

        col_names = csv_reader.fieldnames

        for row in csv_reader:
            js_string = js_string + '\n  {'
            for col in col_names:
                next_value = row[col]
                next_value = next_value.replace('"', '\\"') # Stick a backslash infront of any quotes to escape them in the JavaScript
                js_string = js_string + col +  ':"' + next_value + '", '
            js_string = js_string[:-2] # Remove the last comma and space
            js_string = js_string + '}, '
        js_string = js_string[:-2] + "\n];" # Remove the last comma and space
    return js_string

print(type(csv_to_js("temp", "Aggregation Sites.csv")))


def insert_variable(file_path, js_var_name, insert_string):
    # Read in the file
    with open(file_path, "r") as file:
        filedata = file.read()

    # Get the names of the strings that the variable will be inserted between
    begin_string = "// BEGIN " + js_var_name
    end_string = "// END " + js_var_name
    # Get the start of the beginning string and get all the spaces between it and the beginning of the line
    # so that indentation can be handled correctly on the inserted lines and ending line
    before_starting_idx = filedata.find(begin_string)
    prev_char_idx = before_starting_idx - 1
    indentation = ""
    while(filedata[prev_char_idx] != "\n"):
        indentation = indentation + filedata[prev_char_idx]
        prev_char_idx = prev_char_idx - 1
    
    # Get all of the text that comes before the inserted string
    before_text = filedata[:filedata.find(begin_string)+len(begin_string)]
    # Get all of the text that will come after the inserted string
    after_text = filedata[filedata.find(end_string):]
    # Create the new contents of the file
    insert_string = insert_string.replace("\n", "\n" + indentation)
    new_string = before_text + "\n" + indentation + insert_string + "\n" + indentation + after_text

    # Write the file out again
    with open(file_path, 'w') as file:
        file.write(new_string)

insert_variable("compiled_data.js", "agg_sites_data", csv_to_js("agg_sites_data", "Aggregation Sites.csv"))
insert_variable("compiled_data.js", "events_by_month_data", csv_to_js("events_by_month_data", "DC Events by Month.csv"))
insert_variable("compiled_data.js", "food_and_music_data", csv_to_js("food_and_music_data", "Food and Music.csv"))