import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestionThunk} from '../redux/actions';  

class PageGame extends React.Component {
  constructor() {
    super();
    this.state = {
      counter:  0,

    };
    this.questionsSort = this.questionsSort.bind(this);
  }

  componentDidMount() {
    const { fetchQuestion } = this.props
    const token = localStorage.getItem("token");
    fetchQuestion(token);
  }
 // referencs https://flaviocopes.com/how-to-shuffle-array-javascript/ 
  questionsSort() {
    const  { counter } = this.state;
    const { results } = this.props;
    let incorrectAnswersIndex = -1;
    let allAnswers = [results[counter].correct_answer, ...results[counter].incorrect_answers];
    allAnswers = allAnswers.sort( () => Math.random() - 0.5 );

    return ( <div>
       {allAnswers.map((answer) => {
        if(answer === results[counter].correct_answer){
  
          return (<button type="button" data-testid= "correct-answer">{answer}</button>)
        } else {
             incorrectAnswersIndex += 1 

           return ( <button data-testid={`wrong-answer-${incorrectAnswersIndex}`}>{answer}</button> )

        }

       }

      )}
    </div>
    )
  }
  

  render() {
    const  { counter } = this.state;
    const { results } = this.props;

    if(results.length){
      return (
        <div>
          <h2>Game</h2>

           
  
          <h3 data-testid= "question-category ">{ results[counter].category }</h3>
          <p data-testid="question-text" >{results[counter].question}</p>
          { this.questionsSort() }
           


        </div>
      ) 
      
    } return <p>login</p>

  }
}
const mapStateToProps = (state) => ({
  results: state.myReducer.results,
});



const mapDispatchToProps = (dispatch) => ({
  fetchQuestion: (results) => dispatch(fetchQuestionThunk(results)),
});

export default connect(mapStateToProps,mapDispatchToProps)(PageGame);
