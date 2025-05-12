from flask import Flask, render_template, request
import sqlite3

list_of_types = []

try:
    connection = sqlite3.connect("entries.db")
    db = connection.cursor()
    list_of_types = db.execute("SELECT * FROM musical_types")
    list_of_types = list_of_types.fetchall()
except sqlite3.Error as error:
    print("Error: ", error)

headers = list_of_types[0]
rows = list_of_types[1:]

# Convert to list of dictionaries
json_of_types = [dict(zip(headers, row)) for row in rows]

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "GET":
        return render_template("index.html")
    else:
        type = request.form.get("musical-type")
        percentages = [int(x) for x in request.form.get("percentages").split(",")]
        name = ""
        adjectives = ""
        description = ""
        group = ""
        colour = ""
        variety = ""
        complexity = ""
        valence = ""
        energy = ""
        group_description = ""
        # get all listed types
        try:
            connection = sqlite3.connect("entries.db")
            db = connection.cursor()
            list_of_types = db.execute("SELECT * FROM musical_types")
            list_of_types = list_of_types.fetchall()
        except sqlite3.Error as error:
            return f"Error: {error}"
        # check if type exists
        type_found = False
        for i in range(len(json_of_types)):
            if type[:4] == json_of_types[i]["type"]:
                type_found = True
                name = json_of_types[i]["name"]
                adjectives = json_of_types[i]["adjectives"]
                description = json_of_types[i]["description"]
                group = json_of_types[i]["group"]
                colour = json_of_types[i]["colour"]
                variety = json_of_types[i]["variety"]
                complexity = json_of_types[i]["complexity"]
                energy = json_of_types[i]["energy"]
                group_description = json_of_types[i]["group_description"]
                valence = json_of_types[i]["valence"]
        if not type_found:
            return f"Incorrect Type: {type[:4]}"
        return render_template("result.html", type = type, colour = colour, name = name, adjectives = adjectives, description = description, group = group, variety = variety, group_description = group_description, complexity = complexity, valence = valence, energy = energy, percentages = percentages) #f"Hello, {type} - {name}, you are one of the {group}. This is your description: {description}, these are your adjectives: {adjectives}, these are your percentages: {percentages}"
