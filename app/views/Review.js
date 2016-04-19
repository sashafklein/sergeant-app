import React, { View, TouchableHighlight, Text, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import chroma from 'chroma-js';

class Review extends React.Component {

  percentOvershoot(step) {
    return (step.elapsed / step.total) - 1;
  }

  color(step) {
    const percent = this.percentOvershoot(step);
    if (!step.elapsed) { return chroma('green'); }
    if (percent > 0) { // slower than timer
      return chroma.mix('#aaa', 'red', percent % 1).hex();
    } else if (percent < 0) { // faster than timer
      return chroma.mix('#aaa', 'green', (-1 * percent) % 1).hex();
    } else {
      return '#aaa'
    }
  }

  render() {
    const { score, drill } = this.props;

    return(
      <View
        style={{ flex: 1, flexDirection: 'column', alignSelf: 'stretch', backgroundColor: 'white' }}
      >
        <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
            {
              score.map((step, i) => {
                return (
                  <View key={ i } style={{ height: 80, alignItems: 'center', marginTop: 10, marginHorizontal: 20, backgroundColor: this.color(step), justifyContent: 'center', flexWrap: 'wrap', borderRadius: 10, padding: 15 }} >
                    <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>
                      { step.name.toUpperCase() }
                    </Text>
                  </View>
                )
              })
            }
            <TouchableHighlight
              onPress={ () => Actions.drill({ drill }) }
              style={{ alignItems: 'center', height: 80, marginVertical: 20, marginHorizontal: 20, borderRadius: 40, backgroundColor: 'black', justifyContent: 'center' }}
            >
              <Text style={{ fontSize: 60, color: 'white', textAlign: 'center' }}>{ `>` }</Text>
            </TouchableHighlight>
        </ScrollView>
      </View>
    )
  }
}

Review.propTypes = {
  score: React.PropTypes.array,
  drill: React.PropTypes.object
};

export default Review;
