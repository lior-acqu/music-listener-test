from flask import Flask, render_template, request
import sqlite3
import datetime

list_of_types = []
list_of_results = []
count_of_entries = 0
avg_variety = 0
avg_complexity = 0
avg_valence = 0
avg_energy = 0

try:
    connection = sqlite3.connect("entries.db")
    db = connection.cursor()
    list_of_types = db.execute("SELECT * FROM musical_types").fetchall()
    list_of_results = db.execute("SELECT * FROM results").fetchall()
    count_of_entries = db.execute("SELECT COUNT(*) FROM results").fetchone()[0]
    avg_variety = db.execute("SELECT AVG(variety) FROM results").fetchone()[0]
    avg_complexity = db.execute("SELECT AVG(complexity) FROM results").fetchone()[0]
    avg_valence = db.execute("SELECT AVG(valence) FROM results").fetchone()[0]
    avg_energy = db.execute("SELECT AVG(energy) FROM results").fetchone()[0]
except sqlite3.Error as error:
    print("Error: ", error)

headers = list_of_types[0]
rows = list_of_types[1:]

# Convert to list of dictionaries
json_of_types = [dict(zip(headers, row)) for row in rows]

# since there is no title row in this one, we define the columns ourselves
columns = ["id","type","song","genre","variety","complexity","valence","energy"]

# Convert to list of dictionaries
json_of_results = [dict(zip(columns, row)) for row in list_of_results]




app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "GET":
        return render_template("index.html")
    else:
        type = request.form.get("musical-type")
        percentages = [int(x) for x in request.form.get("percentages").split(",")]
        song = ""
        if request.form.get("fav-song"):
            song = request.form.get("fav-song")
        genre = ""
        if request.form.get("fav-genre"):
            genre = request.form.get("fav-genre")
        consent = request.form.get("database-entry")
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
        # add results to database
        if consent != None:
            try:
                connection = sqlite3.connect("entries.db")
                db = connection.cursor()
                # differentiate between cases (depends on input)
                if song == "" and genre == "":
                    db.execute("INSERT INTO results(type,variety,complexity,valence,energy) VALUES (?,?,?,?,?)", (type, percentages[0], percentages[1], percentages[2], percentages[3]))
                    connection.commit()
                elif song == "":
                    db.execute("INSERT INTO results(type,genre,variety,complexity,valence,energy) VALUES (?,?,?,?,?,?)", (type, genre, percentages[0], percentages[1], percentages[2], percentages[3]))
                    connection.commit()
                elif genre == "":
                    db.execute("INSERT INTO results(type,song,variety,complexity,valence,energy) VALUES (?,?,?,?,?,?)", (type, song, percentages[0], percentages[1], percentages[2], percentages[3]))
                    connection.commit()
                else:
                    db.execute("INSERT INTO results(type,song,genre,variety,complexity,valence,energy) VALUES (?,?,?,?,?,?,?)", (type, song, genre, percentages[0], percentages[1], percentages[2], percentages[3]))
                    connection.commit()
            except sqlite3.Error as error:
                return f"Error: {error}"
        return render_template("result.html", type = type, colour = colour, name = name, adjectives = adjectives, description = description, group = group, variety = variety, group_description = group_description, complexity = complexity, valence = valence, energy = energy, percentages = percentages) #f"Hello, {type} - {name}, you are one of the {group}. This is your description: {description}, these are your adjectives: {adjectives}, these are your percentages: {percentages}"

@app.route("/types", methods=["GET"])
def types():
    type = request.args.get("type")
    # get the general information about the type (if it exists)
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
    # get the information saved by the users
    list_of_type = []
    count_of_type = 0
    try:
        connection = sqlite3.connect("entries.db")
        db = connection.cursor()
        list_of_type = db.execute("SELECT * FROM results WHERE type LIKE (?)", (f"{type[:4]}%",)).fetchall()
        count_of_type = db.execute("SELECT COUNT(*) FROM results WHERE type LIKE (?)", (f"{type[:4]}%",)).fetchone()[0]
        count_of_entries = db.execute("SELECT COUNT(*) FROM results").fetchone()[0]
    except sqlite3.Error as error:
        print("Error: ", error)

    columns = ["id","type","song","genre","variety","complexity","valence","energy"]

    # Convert to list of dictionaries
    json_of_musical_type = [dict(zip(columns, row)) for row in list_of_type]
    #json_of_type = [dict(zip(headers, row)) for row in rows]
    
    #build the object we send to the html
    typeData = {
        "type": type,
        "name": name,
        "adjectives": adjectives,
        "description": description,
        "group": group,
        "colour": colour,
        "variety": variety,
        "complexity": complexity,
        "energy": energy,
        "group_description": group_description,
        "valence": valence,
        "ratio": round(count_of_type / count_of_entries * 100),
        "songs": ""
    }
    # create a list of all fav songs
    songArray = []
    for i in range(len(json_of_musical_type)):
        if json_of_musical_type[i]["song"] and json_of_musical_type[i]["genre"]:
            song = json_of_musical_type[i]["song"]
            genre = json_of_musical_type[i]["genre"]
            songArray.append(f"{song} (by a {genre} fan)")
    typeData["songs"] = ", ".join(songArray)
    return render_template("type.html", data = typeData)