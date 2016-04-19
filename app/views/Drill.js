import React, { View, Text, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import 'fetch';

class Drill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: `https://sergeant-api.herokuapp.com/graphql?query={
        drill(id:1){
          name,
          steps {
            id,
            name,
            minutes
          }
        }
      }`,
      drill: props.drill
    };
  }

  componentDidMount() {
    if (this.props.drill) { return null; }

    this.serverRequest = fetch(this.state.source)
      .then((result) => result.json())
      .then((json) => {
        this.setState({
          drill: json.data.drill
        });
      });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    const { drill } = this.state;
    if (!drill) { return null; }

    return(
      <TouchableHighlight
        style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', backgroundColor: '#333' }}
        onPress={ () => Actions.step({ stepIndex: 0, drill }) }
      >
        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 60, fontWeight: 'bold', flex: 1, fontFamily: 'helvetica', color: 'white' }}>
            Start
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const { object } = React.PropTypes;
Drill.propTypes = {
  drill: object
};

export default Drill;