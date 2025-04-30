// declare all necessary numbers
var totalVariety = 0;
var totalComplexity = 0;
var totalValence = 0;
var totalEnergy = 0;
var avgVariety = 0;
var avgComplexity = 0;
var avgValence = 0;
var avgEnergy = 0;

var currentQuestion = 0;

var currentButton = 3;

const questionTexts = [
  "I listen to music to hype myself up.",
  "I listen to many different genres.",
  "I love music that gets my heart racing.",
  "I like long songs because they give space for emotion and detail.",
  "I love when music has rich layers and depth.",
  "Music that makes me smile are my go-to.",
  "Most of my favourite musicians are singers.",
  "I like it when music has many different elements playing together.",
  "I listen to music to calm me down.",
  "My music taste is all over the place. I love listening to a wild mix of music.",
  "I connect more with voices than instruments.",
  "I like listening to longer music.",
  "Soft, delicate music moves me more than loud music.",
  "Most of the music I love comes from a few specific artists.",
  "I have a genre that is clearly my favourite.",
  "If it doesn’t lift my mood, I usually skip it.",
  "I get bored when music drags on too long.",
  "I like music with special sounds, chords and harmonies.",
  "I often seek out music that matches my negative emotions.",
  "I like listening to music that makes me happy.",
  "I like catchy music that is easy to follow.",
  "I love music even without vocals.",
  "I turn to music for a little boost.",
  "I often explore new kinds of music.",
  "Too much going on in a song overwhelms me.",
  "I like knowing what to expect when I put on music.",
  "Instrumentals give me more freedom to feel.",
  "I like soothing, soft music.",
  "Lyrics are the most important part of a song for me.",
  "Short music is the best — straight to the point.",
  "I enjoy music that surprises me with unexpected changes.",
  "I often use music to process my negative emotions.",
  "Slow, mellow tracks are my safe space.",
  "If I find music I like, I often listen to it on repeat.",
  "When it comes to music, less is more.",
  "I like instrumental music.",
  "I prefer music that’s minimal and uncluttered.",
  "Bittersweet or emotional music hits me hardest.",
  "If a song is more than 4 minutes, I am not listening to it.",
  "My playlists are made up of many unrelated styles.",
  "I like music that takes time to build and unfold.",
];

var userProfile = {
  variety: 0,
  complexity: 0,
  valence: 0,
  energy: 0,
  duration: 0,
  speechiness: 0,
};

const questionImpacts = [
  { energy: 1, valence: 0.5 },
  { variety: 1 },
  { energy: 1 },
  { duration: 1, valence: -0.25, complexity: 0.25 },
  { complexity: 1 },
  { valence: 1 },
  { speechiness: 1 },
  { complexity: 1 },
  { valence: -1 },
  { variety: 1 },
  { speechiness: 1 },
  { duration: 1 },
  { valence: -1 },
  { variety: -1 },
  { variety: -1 },
  { valence: 1 },
  { duration: -1 },
  { complexity: 1 },
  { valence: -1 },
  { valence: 1 },
  { complexity: -1, valence: 0.25 },
  { speechiness: -1 },
  { energy: 1, valence: 0.25 },
  { variety: 1 },
  { complexity: 1 },
  { variety: -1, complexity: -0.5 },
  { valence: -0.5, speechiness: -1 },
  { energy: -1 },
  { speechiness: 1 },
  { duration: -1, complexity: -0.5 },
  { complexity: 1, energy: 0.25 },
  { valence: -1 },
  { energy: -1, valence: -0.5 },
  { variety: -1 },
  { variety: -0.75, complexity: -1 },
  { speechiness: -1 },
  { complexity: -1 },
  { valence: -1 },
  { duration: -1 },
  { variety: 1 },
  { duration: 1, complexity: 0.25 },
];

// current maxs
const maxEnergy = 15.75;
const maxValence = 30.25;
const maxVariety = 26.25;
const maxSpeech = 18;
const maxComplex = 28.5;
const maxDuration = 18;

const answerTexts = [
  "Totally Disagree",
  "Disagree",
  "Sort of Disagree",
  "Neutral",
  "Sort of Agree",
  "Agree",
  "Totally Agree",
];

var selectedButtons = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
];

function generateQuestions() {
  for (let i = 0; i < questionTexts.length; i++) {
    document.querySelector("body").innerHTML +=
      "<p class='question'>" + questionTexts[i] + "</p>";
    const answerBox = document.createElement("div");
    answerBox.classList.add("options");
    for (let j = 0; j < 7; j++) {
      answerBox.innerHTML +=
        '<button id="' +
        (j - 3) +
        "-" +
        i +
        '" onclick="chooseButton(' +
        (j - 3) +
        "," +
        i +
        ')">' +
        answerTexts[j] +
        "</button>";
    }
    document.querySelector("body").appendChild(answerBox);
  }
  document.querySelector("body").innerHTML +=
    "<button onclick='evaluateScore()'>Done</button>";
}
function evaluateScore() {
  var musicMBTI = [];
  for (let i = 0; i < questionImpacts.length; i++) {
    for (let key in questionImpacts[i]) {
      if (userProfile.hasOwnProperty(key)) {
        userProfile[key] += questionImpacts[i][key] * selectedButtons[i];
      }

      if (key == "variety") {
        if (userProfile[key] > 0) {
          musicMBTI[0] =
            "D" + Math.round((userProfile[key] / maxValence) * 50) + 50;
        } else {
          musicMBTI[0] =
            "S" + Math.round((userProfile[key] / maxValence) * 50) + 50;
        }
      }

      if (key == "complexity") {
        if (userProfile[key] > 0) {
          musicMBTI[1] =
            "C" + Math.round((userProfile[key] / maxValence) * 50) + 50;
        } else {
          musicMBTI[1] =
            "F" + Math.round((userProfile[key] / maxValence) * 50) + 50;
        }
      }

      if (key == "valence") {
        if (userProfile[key] > 0) {
          musicMBTI[2] =
            "P" + Math.round((userProfile[key] / maxValence) * 50) + 50;
        } else {
          musicMBTI[2] =
            "M" + Math.round((userProfile[key] / maxValence) * 50) + 50;
        }
      }

      if (key == "energy") {
        if (userProfile[key] > 0) {
          musicMBTI[3] =
            "I" + Math.round((userProfile[key] / maxValence) * 50) + 50;
        } else {
          musicMBTI[3] =
            "G" + Math.round((userProfile[key] / maxValence) * 50) + 50;
        }
      }

      if (key == "duration") {
        if (userProfile[key] > 0) {
          musicMBTI[4] =
            "-L" + Math.round((userProfile[key] / maxValence) * 50) + 50;
        } else {
          musicMBTI[4] =
            "-S" + Math.round((userProfile[key] / maxValence) * 50) + 50;
        }
      }

      if (key == "speechiness") {
        if (userProfile[key] > 0) {
          musicMBTI[5] =
            "V" + Math.round((userProfile[key] / maxValence) * 50) + 50;
        } else {
          musicMBTI[5] =
            "I" + Math.round((userProfile[key] / maxValence) * 50) + 50;
        }
      }
    }
  }
  console.log(musicMBTI.join(""));
}

function chooseButton(number, question) {
  selectedButtons[question] = number;
  for (i = -3; i < 4; i++) {
    document.getElementById(
      i.toString() + "-" + question.toString()
    ).style.border = "none";
  }
  document.getElementById(
    number.toString() + "-" + question.toString()
  ).style.border = "2px blue solid";
  console.log(selectedButtons);
}

generateQuestions();
