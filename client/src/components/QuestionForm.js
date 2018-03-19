import React from 'react';
import { Form } from 'semantic-ui-react';
import { Question } from '../lib/requests'
import AnswerShow from './AnswerShow'

class QuestionForm extends React.Component {
  constructor(props){
    super(props)
    this.addAnswer = this.addAnswer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      numOfAnswers: 1
    }
  }

  addAnswer(){
    let numOfAnswers = this.state.numOfAnswers;
    this.setState({
      numOfAnswers: numOfAnswers + 1
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    const questionBody = document.querySelector(".questionBody textarea").value
    let answerBodies = []
    document.querySelectorAll(".answerBody textarea").forEach( answerBody => answerBodies.push(answerBody.value))

    const outputObj = {
      'body': questionBody,
      'answers_attributes': { }
    }

    for (let i = 0; i < answerBodies.length; i += 1) {
      outputObj.answers_attributes[`${i}`] = { 'body': answerBodies[i] }
    }
    
    let user_id = this.props.match.params.quiz_id
    Question.create(outputObj, quiz_id)

  }
  render() {
    return (
      <div className='QuestionForm'>
        <Form onSubmit={this.handleSubmit}>
          <div className="questionBody" >
            <label>Question</label>
            <textarea  name="question" />
          </div>
          <AnswerShow {...this.state} />
          <input className="addAnswerButton"
                 type="button"
                 value="Additional Answer"
                 onClick={this.addAnswer} />
          <Form.Field className="saveQuestionButton"
                      control='button'
                      >Save Question
          </Form.Field>
        </Form>
        </div>
    )}
}
export default QuestionForm;
