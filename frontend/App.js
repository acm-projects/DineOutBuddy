import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View} from 'react-native';
import FormHeader from './app/components/FormHeader';
import FormSelectorBtn from './app/components/FormSelectorBtn';
import LoginForm from './app/components/LoginForm';
import SignupForm from './app/components/SignupForm';

export default function App() {
  return (
    <View style={{flex: 2, paddingTop:60,}}>
      <View style={{ height: 80}}>
        <FormHeader leftHeading='Welcome' rightHeading='Back' subHeading='DineOutBuddy'/>
      </View>

      <View style={{flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20}}>
        <FormSelectorBtn backgroundColor='rgba(27,27,51,1)' title='Log In' style={styles.borderLeft}/>
        <FormSelectorBtn backgroundColor='rgba(27,27,51,0.4)' title='Sign Up' style={styles.borderRight}/>
      </View>

      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
        <LoginForm/>
        <SignupForm/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderLeft:{
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8, 
  },
  borderRight:{
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  }
})

