import React, { View, Text, TouchableHighlight } from 'react-native';
import chroma from 'chroma-js';
import { Actions } from 'react-native-router-flux';

class Step extends React.Component {
  constructor(props) {
    super(props);

    const colorOptions = ['#003B71', '#06625C', '#255200',
                          '#472F91', '#003B71', '#D14A0C',
                          '#2C709A', '#248F8D', '#4A7628',
                          '#7A6DB1', '#EF944E'];

    const step = this.props.drill.steps[this.props.stepIndex];
    const secondsLeft = step.minutes * 60;
    const screenColor = colorOptions[this.props.stepIndex % (colorOptions.length - 1)]
    const bg = chroma(screenColor).hex();

    this.state = {
      step, secondsLeft, bg,
      originBG: bg,
      originSeconds: secondsLeft,
      score: props.score || []
    };
  }

  componentDidMount() {
    this.startCountDown();
  }

  componentWillUnmount() {
    this.setState({ done: true });
    clearTimeout(this.timer);
  }

  startCountDown() {
    const moveForwardOneSecond = () => {
      const secondsLeft = this.state.secondsLeft - 1;
      const percentLeft = secondsLeft / (this.state.step.minutes * 60.0);
      const bg = secondsLeft <= 0 ? '#bbb' :
        chroma.mix(this.state.originBG, '#bbb', 1 - percentLeft).hex();

      this.setState({ secondsLeft, bg })
      if (!this.state.done) { this.startCountDown(); }
    };

    this.timer = setTimeout(moveForwardOneSecond.bind(this), 1000)
  }

  onward() {
    const { stepIndex, drill } = this.props;
    const { step, originSeconds, secondsLeft, score } = this.state;

    if (stepIndex + 1 >= drill.steps.length) { // Last step
      return () => Actions.review({ drill, score });
    } else {
      const newScore = [...score, { name: step.name, elapsed: originSeconds - secondsLeft, total: originSeconds }];
      return () => Actions.step({
        stepIndex: stepIndex + 1,
        drill,
        score: newScore
      });
    }
  }

  render() {
    const { step } = this.state;

    const minutes = Math.floor(step.minutes);
    const seconds = (step.minutes * 100) % 100;
    const clock = [minutes, seconds].filter(t => t).join(":");
    return(
      <TouchableHighlight
        style={{
          flex: 1,
          alignSelf: 'stretch',
          backgroundColor: this.state.bg,
          justifyContent: 'center',
          flexDirection: 'column'
        }}
        onPress={ this.onward() }
      >
        <View>
          <View style={{ alignSelf: 'center', flex: 3 }}>
            <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}>{ step.name.split(', ').join('\n') }</Text>
          </View>
          <View style={{ alignSelf: 'center', flex: 1 }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>{clock}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const { object, number, array } = React.PropTypes;
Step.propTypes = {
  drill: object,
  stepIndex: number,
  score: array
};

export default Step;