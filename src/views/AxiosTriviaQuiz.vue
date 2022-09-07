<template>
    <v-row class="vrow">
        <v-col
            cols="12"
            sm="10"
            md="8"
            lg="6"
        >
            <v-card class="ma-15" ref="form" color="#D8FFF8">
                <v-card-text>
            
                    <h1 id="logo-headline">Quiz </h1>
                    <h5>Score: {{score}}/{{questions.length}}</h5>
                    <v-spacer></v-spacer>        
                    <h5>Question: {{questionCurrentNumber}}/{{questions.length}}</h5>
            <!-- div#correctAnswers -->
                    <v-spacer class="divider"></v-spacer>
                    <section class="quiz" v-if="!quizCompleted">
                        <span>
                            <h1 v-html="loading ? 'Loading...' : currentQuestion.question"></h1>
                            <form v-if="currentQuestion">
                                <button
                                    v-for="answer in currentQuestion.answers"
                                    :index="currentQuestion.key"
                                    :key="answer"
                                    v-html="answer"
                                    @click.prevent="handleButtonClick"
                                ></button>
                            </form>
                            <v-spacer class="divider"></v-spacer>
                        </span>
                    </section>
                    <section v-else>
                        <h2>Done Quiz</h2>
                        <p>Your score is {{score}}/{{questions.length}}</p>
                    </section>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
  </template>
    
    <script>
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
          "https://opentdb.com/api.php?amount=5&category=9"
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
          
          if(this.questionCurrentNumber==this.questions.length){
            this.questionCurrentNumber--;
          }
            this.questionCurrentNumber+=1;
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
  .quiz-container {
    margin: 1rem auto;
    padding: 1rem;
    max-width: 750px;
  }
  
  #logo-headline {
    font-size: 2rem;
    padding: 0.5rem;
    color: #f5002e;
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
  
  .divider {
    margin: 0.5rem 0;
    border: 2px solid rgba(102, 255, 166, 0.7);
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
    font-size: 1.1rem;
    box-sizing: border-box;
    padding: 1rem;
    margin: 0.3rem;
    width: 47%;
    background-color: rgba(100, 100, 100, 0.3);
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
      rgba(0, 178, 72, 0.25),
      rgba(0, 178, 72, 0.5)
    );
  }
  
  button.wrongAnswer {
    color: black;
    background: linear-gradient(
      210deg,
      rgba(245, 0, 87, 0.25),
      rgba(245, 0, 87, 0.5)
    );
  }
  .vrow {
     justify-content: center;
     margin-right: 50%;
     padding-left: 5%;
     height: 100%;
     width: 100%;
     font-size: 15px;
     font-weight: 600;
}
.vcard{
  border-radius:50px;
}
.vcardaction {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ma-15{
  border-radius:50px;
  padding-top: 25px;
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