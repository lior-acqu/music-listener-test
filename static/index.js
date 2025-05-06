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
  "Music that makes me smile is my go-to.",
  "Most of my favourite musicians are singers.",
  "I like it when music has many different elements playing together.",
  "I listen to music to calm me down.",
  "My music taste is all over the place. I love listening to a wild mix of music.",
  "I connect more with voices than instruments.",
  "I like listening to longer music.",
  "Soft, delicate music moves me more than highly energetic music.",
  "Most of the music I love comes from a few specific artists.",
  "I have a genre that is clearly my favourite.",
  "If it doesn’t lift my mood, I usually skip it.",
  "I get bored when music drags on too long.",
  "I like music with special sounds, chords and harmonies.",
  "I often seek out music that matches my negative emotions.",
  "I like listening to music that makes me happy.",
  "I like catchy music that is easy to follow.",
  "I love music even without vocals.",
  "I often turn on music for a little boost.",
  "I often explore new kinds of music.",
  "A lot going on in a song makes it less enjoyable.",
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

var userProfile = [0, 0, 0, 0, 0, 0];

const questionImpacts = [
  [0, 0, 2, 4, 0, 0],
  [4, 0, 0, 0, 0, 0],
  [0, 0, 0, 4, 0, 0],
  [0, 1, -1, 0, 4, 0],
  [0, 4, 0, 0, 0, 0],
  [0, 0, 4, 0, 0, 0],
  [0, 0, 0, 0, 0, 4],
  [0, 4, 0, 0, 0, 0],
  [0, 0, -4, 0, 0, 0],
  [4, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 4],
  [0, 0, 0, 0, 4, 0],
  [0, 0, -4, 0, 0, 0],
  [-4, 0, 0, 0, 0, 0],
  [-4, 0, 0, 0, 0, 0],
  [0, 0, 4, 0, 0, 0],
  [0, 0, 0, 0, -4, 0],
  [0, 4, 0, 0, 0, 0],
  [0, 0, -4, 0, 0, 0],
  [0, 0, 4, 0, 0, 0],
  [0, -4, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, -4],
  [0, 0, 1, 4, 0, 0],
  [4, 0, 0, 0, 0, 0],
  [0, 4, 0, 0, 0, 0],
  [-4, -2, 0, 0, 0, 0],
  [0, 0, -2, 0, 0, -4],
  [0, 0, 0, -4, 0, 0],
  [0, 0, 0, 0, 0, 4],
  [0, -2, 0, 0, -4, 0],
  [0, 4, 0, 1, 0, 0],
  [0, 0, -4, 0, 0, 0],
  [0, 0, -2, -4, 0, 0],
  [-4, 0, 0, 0, 0, 0],
  [-3, -4, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, -4],
  [0, -4, 0, 0, 0, 0],
  [0, 0, -4, 0, 0, 0],
  [0, 0, 0, 0, -4, 0],
  [4, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 4, 0],
];

const maxValues = [63, 123, 105, 72, 114, 72];

const answerTexts = ["-", "", "", "0", "", "", "+"];

var selectedButtons = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

function generateQuestions() {
  for (let i = 0; i < questionTexts.length; i++) {
    document.querySelector(".questions-container").innerHTML +=
      "<p class='question'>" + questionTexts[i] + "</p>";
    const answerBox = document.createElement("div");
    answerBox.classList.add("options");
    for (let j = 0; j < 7; j++) {
      if (j == 6) {
        answerBox.innerHTML +=
          '<button class="test-button" style="border-right: 1px solid #15294f" id="' +
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
      } else {
        answerBox.innerHTML +=
          '<button class="test-button" id="' +
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
    }
    document.querySelector(".questions-container").appendChild(answerBox);
  }
}
function evaluateScore() {
  var musicMBTI = ["S", "F", "M", "G", "-S", "I"];
  var userProfile = [0, 0, 0, 0, 0, 0];
  var percentages = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i < questionImpacts.length; i++) {
    for (let j = 0; j < questionImpacts[i].length; j++) {
      userProfile[j] += questionImpacts[i][j] * selectedButtons[i];
    }
  }
  for (let k = 0; k < userProfile.length; k++) {
    percentages[k] = Math.ceil((userProfile[k] / maxValues[k]) * 50) + 50;
  }
  if (percentages[0] > 50) {
    musicMBTI[0] = "D";
  }
  if (percentages[1] > 50) {
    musicMBTI[1] = "C";
  }
  if (percentages[2] > 50) {
    musicMBTI[2] = "P";
  }
  if (percentages[3] > 50) {
    musicMBTI[3] = "I";
  }
  if (percentages[4] > 50) {
    musicMBTI[4] = "-L";
  }
  if (percentages[5] > 50) {
    musicMBTI[5] = "V";
  }
  document.getElementById("percentages").value = percentages.join(",");
  document.getElementById("musical-type").value = musicMBTI.join("");
}

function chooseButton(number, question) {
  selectedButtons[question] = number;
  evaluateScore();
  for (i = -3; i < 4; i++) {
    document.getElementById(
      i.toString() + "-" + question.toString()
    ).style.backgroundColor = "#ece4da";
  }
  document.getElementById(
    number.toString() + "-" + question.toString()
  ).style.backgroundColor = "#888cb2";
}

generateQuestions();
