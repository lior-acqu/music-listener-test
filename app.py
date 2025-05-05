from flask import Flask, render_template
import sqlite3

try:
    connection = sqlite3.connect("entries.db")
    db = connection.cursor()
except sqlite3.Error as error:
    print("Error: ", error)





print(sqlite3.sqlite_version)

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")
