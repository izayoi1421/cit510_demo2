<template>
  <v-row class="vrow">
    <v-col cols="8" sm="10" md="8" lg="6">
      <v-card
        class="ma-15"
        ref="form"
        style="background-color: rgba(19, 62, 124, 0.75);"
      >
        <v-card-text>
          <section class="quiz" v-if="!squiz">
            <v-card-text class="logostartquiz">
              <img src="/logostartquiz2.png" width="250" height="250" />
            </v-card-text>
            <v-card-text class="startquizcard">
              <img src="/play.png" @click="startQuiz" width="75" height="75" />
            </v-card-text>
          </section>
          <section v-else>
            <section class="quiz" v-if="!quizCompleted">
              <v-card-text v-if="!havename">              
                <v-text style="color:white;">
                  <v-text-field
                    v-model="stringname"
                    label="Enter Name"
                    placeholder="Name"
                    rounded
                    required
                  ></v-text-field>
                </v-text>
                <v-card-actions>
                  <span
                  style="
                    display: block;
                    width: 300px;
                    margin-left: auto;
                    margin-right: auto;
                    padding-left: 9%;
                  "
                >
                  <button width="400px"
                    rounded color="#00539CFF"
                    style="color: royalblue"
                  @click="submitName">Submit</button>
                </span>
                </v-card-actions>
              </v-card-text>              
              <v-card-text v-else>
                <h1 id="logo-headline">Quiz</h1>
                <h5>Score: {{ score }}/{{ questions.length }}</h5>
                <!-- div#correctAnswers -->
                <v-spacer class="divider"></v-spacer>
                <h5>
                  Question: {{ questionCurrentNumber }}/{{ questions.length }}
                </h5>
                <span>
                  <v-card-text class="questioncard">
                    <h1
                      v-html="loading ? 'Loading...' : currentQuestion.question"
                    ></h1>
                  </v-card-text>
                  <form v-if="currentQuestion">
                    <button
                      v-for="answer in currentQuestion.answers"
                      :index="currentQuestion.key"
                      :key="answer"
                      v-html="answer"
                      @click.prevent="handleButtonClick"
                    ></button>
                  </form>
                  <v-spacer></v-spacer>
                </span>
              </v-card-text>
            </section>
            <section v-else>
              <v-card-text v-if="!pass">
                <img
                  src="/gameover.png"
                  style="display: block; margin-left: auto; margin-right: auto"
                  width="400"
                  height="350"
                />
                <h1 id="quizfailed">{{ result }}</h1>
                <p id="quizfailed">{{ score }}/{{ questions.length }}</p>
                <span
                  style="
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                    padding-left: 40%;
                    padding-left: 40%;
                  "
                >
                  <v-btn
                    type="text"
                    rounded
                    color="#00539CFF"
                    style="padding-bottom: 10%; color: greenyellow"
                    class="btn1"
                    @click="reloadPage()"
                    >Play Again?</v-btn
                  >
                </span>
              </v-card-text>
              <v-card-text v-else>
                <img
                  src="/win.png"
                  style="display: block; margin-left: auto; margin-right: auto"
                  width="200"
                  height="200"
                />
                <h1 id="quizpassed">{{ result }}</h1>
                <p id="quizpassed">{{ score }}/{{ questions.length }}</p>
                <span
                  style="
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                    padding-left: 40%;
                    padding-left: 40%;
                  "
                >
                  <v-btn
                    type="text"
                    rounded
                    color="#00539CFF"
                    style="padding-bottom: 10%; color: greenyellow"
                    class="btn1"
                    @click="reloadPage()"
                    >Play Again?</v-btn
                  >
                </span>
              </v-card-text>
            </section>
          </section>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
    
    <script>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import db from "@/fb";

export default {
  name: "Quiz",
  // data() function stores state variables
  data() {
    return {
      questions: [],
      loading: true,
      index: 0,
      score: 0,
      questionCurrentNumber: 1,
      quizCompleted: false,
      result: "",
      passingScore: "",
      pass: false,
      squiz: false,
      stringname: ref(),
      havename: false,
    };
  },
  computed: {
    currentQuestion() {
      if (this.questions !== []) {
        return this.questions[this.index];
      }
      return null;
    },
  },

  // Custom methods of the Vue Component
  methods: {
    async fetchQuestions() {
      this.loading = true;
      let response = await fetch(
        "https://opentdb.com/api.php?amount=5&category=15"
      );
      let jsonResponse = await response.json();
      let index = 0; // index is used to identify single answer
      let data = jsonResponse.results.map((question) => {
        // put answers on question into single array
        question.answers = [
          question.correct_answer,
          ...question.incorrect_answers,
        ];
        // Shuffle question.answers array
        for (let i = question.answers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [question.answers[i], question.answers[j]] = [
            question.answers[j],
            question.answers[i],
          ];
        }
        // add rightAnswer and key property to each question
        question.rightAnswer = null;
        question.key = index;
        index++;
        return question;
      });
      this.questions = data;
      this.loading = false;
    },
    startQuiz() {
      const squiz=ref(0);
      this.squiz = true;
      return squiz;
    },
    reloadPage() {
      this.squiz = false;
      this.quizCompleted = false;
      this.index = 0;
      this.score = 0;
      this.questionCurrentNumber = 1;
    },
    submitName() {
      const stringname =ref(0);
      this.name = stringname.value;
      this.havename = true;
      return
    },

    handleButtonClick: function (event) {
      /* Find index to identiy question object in data */
      let index = event.target.getAttribute("index");

      let pollutedUserAnswer = event.target.innerHTML; // innerHTML is polluted with decoded HTML entities e.g ' from &#039;
      /* Clear from pollution with ' */
      let userAnswer = pollutedUserAnswer.replace(/'/, "&#039;");

      /* Set userAnswer on question object in data */
      this.questions[index].userAnswer = userAnswer;

      /* Set class "clicked" on button with userAnswer -> for CSS Styles; Disable other sibling buttons */
      event.target.classList.add("clicked");
      let allButtons = document.querySelectorAll(`[index="${index}"]`);

      for (let i = 0; i < allButtons.length; i++) {
        if (allButtons[i] === event.target) continue;

        allButtons[i].setAttribute("disabled", "");
      }

      /* Invoke checkAnswer to check Answer */
      this.checkAnswer(event, index);
    },
    checkAnswer: function (event, index) {
      let question = this.questions[index];

      if (question.userAnswer) {
        if (this.index < this.questions.length - 1) {
          setTimeout(
            function () {
              this.index += 1;
            }.bind(this),
            500
          );
        }
        if (question.userAnswer === question.correct_answer) {
          /* Set class on Button if user answered right, to celebrate right answer with animation joyfulButton */
          event.target.classList.add("rightAnswer");
          /* Set rightAnswer on question to true, computed property can track a streak out of 10 questions */
          this.questions[index].rightAnswer = true;
          this.score++;
        } else {
          /* Mark users answer as wrong answer */
          event.target.classList.add("wrongAnswer");
          this.questions[index].rightAnswer = false;
          /* Show right Answer */
          let correctAnswer = this.questions[index].correct_answer;
          let allButtons = document.querySelectorAll(`[index="${index}"]`);
          allButtons.forEach(function (button) {
            if (button.innerHTML === correctAnswer) {
              button.classList.add("showRightAnswer");
            }
          });
        }

        if (this.questionCurrentNumber < this.questions.length) {
          this.questionCurrentNumber++;
        } else {
          const auth = getAuth();
          this.quizCompleted = true;
          if ((this.quizCompleted = true)) {
            this.passingScore = 0.5 * this.questions.length;
            if (this.score >= this.passingScore) {
              this.result = "Passed";
              this.pass = true;
            } else {
              this.result = "Failed";
            }
          }
          const data = {
            name: this.stringname,
            user: auth.currentUser.email,
            scores: this.score,
            remarks: this.result,
            timestamp: new Date(),
          };
          db.collection("userQuizResult")
            .add(data)
            .then(() => {
              console.log("Quiz has been recorded");
            });
        }
      }
    },
  },

  // Code inside mounted() runs after the Component has mounted
  mounted() {
    this.fetchQuestions();
  },
};
</script>
    
    <style scoped>
.vrow {
  height: 101%;
  width: 105%;
  background-size: cover;
  background-image: url("/layoutHome.jpg");
}
.quiz-container {
  margin: 1rem auto;
  padding: 1rem;
  max-width: 750px;
}
.tryagain {
  padding-left: 10px;
}

#resultscore {
  font-size: 2rem;
  padding: 0.5rem;
  color: #7eb2ff;
  text-align: center;
}
#quizresult {
  font-size: 2rem;
  color: #ff6161;
}
#quizpassed {
  font-size: 1.7rem;
  padding: 0.5rem;
  color: #67ff9a;
  text-align: center;
  border: 1px;
}
#quizfailed {
  font-size: 1.7rem;
  padding: 0.5rem;
  color: #ff6161;
  text-align: center;
  border: 1px;
}
#logo-headline {
  font-size: 2rem;
  padding: 0.5rem;
  color: #7eb2ff;
  text-align: center;
}

#logo-crown {
  display: block;
  width: 40%;
  margin: 0 auto;
}

@media only screen and (max-width: 500px) {
  #logo-crown {
    width: 30%;
  }

  #logo-headline {
    font-size: 1.8rem;
  }
}

h1 {
  font-size: 1.3rem;
  padding: 0.7rem;
}
.btn {
  background-image: url("playbutton.png");
  background-size: cover;
}

.btn1 {
  width: 120px;
  border-radius: 50px;
}
.logostartquiz {
  justify-content: center;
  margin-left: 26%;
}
.startquizcard {
  justify-content: center;
  padding-left: 44%;
}
.divider {
  margin: 0.5rem 0;
  border: 2px solid rgba(102, 163, 255, 0.986);
  border-radius: 2px;
  box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.3);
}

form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

button {
  font-size: 1rem;
  box-sizing: border-box;
  padding: 1rem;
  margin: 0.3rem;
  width: 47%;
  background-color: rgba(255, 255, 255, 0.541);
  border: none;
  border-radius: 0.4rem;
  box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.2);
}

.questioncard {
  font-size: 1.1rem;
  box-sizing: border-box;
  margin-left: 30px;
  width: 90%;
  background-color: rgba(255, 255, 255, 0.541);
  border: none;
  border-radius: 0.4rem;
  box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.2);
}

button:hover:enabled {
  transform: scale(1.02);
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -1px rgba(0, 0, 0, 0.2);
}

button:focus {
  outline: none;
}

button:active:enabled {
  transform: scale(1.05);
}

@keyframes flashButton {
  0% {
    opacity: 1;
    transform: scale(1.01);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.02);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

button.clicked {
  pointer-events: none;
}

button.rightAnswer {
  animation: flashButton;
  animation-duration: 700ms;
  animation-delay: 200ms;
  animation-iteration-count: 3;
  animation-timing-function: ease-in-out;
  color: black;
  background: linear-gradient(
    210deg,
    rgba(0, 178, 72, 0.5),
    rgba(0, 178, 72, 0.75)
  );
}

button.wrongAnswer {
  color: black;
  background: linear-gradient(
    210deg,
    rgba(245, 0, 87, 0.5),
    rgba(245, 0, 87, 0.75)
  );
}
.vrow {
  justify-content: center;
  margin-right: 50% auto;
  padding-left: 5% auto;
  height: 100% auto;
  width: 100% auto;
  font-size: 15px;
  font-weight: 600;
  align-items: center;
}
.vcard {
  border-radius: 50px;
}
.vcardaction {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ma-15 {
  border-radius: 50px;
  padding-top: 10px;
  width: 600px auto;
}
button.showRightAnswer {
  animation: flashButton;
  animation-duration: 700ms;
  animation-delay: 200ms;
  animation-iteration-count: 2;
  animation-timing-function: ease-in-out;
  color: black;
  background: linear-gradient(
    210deg,
    rgba(0, 178, 72, 0.25),
    rgba(0, 178, 72, 0.5)
  );
}
</style>