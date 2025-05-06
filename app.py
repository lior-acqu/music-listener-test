from flask import Flask, render_template, request
import sqlite3

try:
    connection = sqlite3.connect("entries.db")
    db = connection.cursor()
except sqlite3.Error as error:
    print("Error: ", error)




app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "GET":
        return render_template("index.html")
    else:
        type = request.form.get("musical-type")
        percentages = request.form.get("percentages")
        return f"Hello, {type}, these are your percentages: {percentages}"
