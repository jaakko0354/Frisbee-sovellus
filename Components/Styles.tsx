import { position } from 'native-base/lib/typescript/theme/styled-system';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appbar: {
    backgroundColor: 'green',
    flexDirection: 'row',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapSearch: {
    position: 'absolute',
    top: 20,
    left: 6,
    height: 40,
    width: '80%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  mapSearchInput: {
    width: '80%',
    height: '100%',
    fontSize: 20,
  },
  mapSearchButton: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#50bf6a',
  },
  newGameButton: {
    position: 'absolute',
    bottom: 50,
    width: '40%',
    height: 50,
    backgroundColor: '#50bf6a',
    borderColor: '#00701b',
    borderWidth: 2,
  },
  startGameView: {
    position: 'absolute',
    bottom: 300,
    backgroundColor: '#50bf6a',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: '#00701b',
    borderWidth: 2,
    width: 250,
    height:150,

},
startGameText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: 'black'
},
  startGameButton: {
    position: 'absolute',
    bottom: -70,
    width: '74%',
    height: '30%',
    backgroundColor: '#50bf6a',
    borderColor: '#00701b',
    borderWidth: 2,
    paddingTop: 10,
    marginTop:10,
  },
  gameView:{
    position: 'absolute',
    bottom: '10%',
    width: '100%',
    height: 120,
    alignItems: 'center',
  },
  gameStatHeader: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  gameStat: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  buttonViewSave: {
    width: '54%',
    height: '40%',
    backgroundColor: '#50bf6a',
    borderColor: '#00701b',
    borderWidth: 2,
    paddingTop: 10,
    marginTop:10,
  },
  score: {
    position: 'absolute',
    bottom: '40%',
    width: '90%',
    height: '30%',
    backgroundColor: '#50bf6a',
    borderColor: '#00701b',
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    height: 50,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    width: '80%',
    textAlign: 'center',
  },
  scoreInput: {
    height: 55,
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  saveGameButton: {
    position: 'absolute',
    bottom: -70,
    width: '60%',
    height: 50,
    backgroundColor: '#50bf6a',
    borderColor: '#00701b',
    borderWidth: 2,
  },
  informationContainer: {
    display: 'flex',
    height: '45%',
    width: '100%',
    position: 'absolute',
    bottom: -90,
    marginBottom: 10,
    alignItems: 'center',
  },
  informationTextHeader: {
    paddingTop: 5,
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  informationContainerBody: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    backgroundColor: '#50bf6a',
    borderColor: '#336600',
    borderRadius: 10,
    borderWidth: 3,
    paddingLeft: '5%',
    height: '45%',
    width: '97%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  informationContainerHeader: {
    padding: 5,
    backgroundColor: '#50bf6a',
    borderColor: '#336600',
    borderRadius: 10,
    borderWidth: 3,
    height: '15%',
    width: '97%',
    justifyContent: 'center'
  },
  informationText: {
    padding: 7,
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'flex-start',
  },
  directionButton: {
    color: 'green',
    backgroundColor: 'green',
    borderColor: '#336600',
    borderWidth: 3,
    width: '50%',
    height: '40%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  directionButtonContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },

  switchView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '8%',
    right: 10,
  },
  switchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: '#50bf6a',
  },
  switchText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
   searchResultContainer: {
    backgroundColor: 'white',
    display: 'flex',
    width: '95%',
    position: 'absolute',
    top:115,
    maxHeight:200,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  searchResultButton: {
    width:'100%',
    padding:5,
    backgroundColor:'#f2f2f2',
    borderRadius:0,
  },

  searchResultText:{
    fontSize:20,
    padding:5,
  },
  savedGamesView: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    display: 'flex',
    height: '100%',
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
  },
  noSavedGamesText: {
    fontSize: 25,
    padding: 7,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
  },
  savedGameText: {
    height: 45,
    fontSize: 18,
    width: '40%',
    marginVertical: 5,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'flex-start',
    marginLeft: 5,
  },
  savedGamesAddresses: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2, 
    backgroundColor: '#f2f2f2',
    width: '100%',
    borderColor: '#00701b',
    borderWidth: 1,
    borderRadius: 5,
  },
  savedGamesButton: {
    height: 50,
    width: '15%',
    backgroundColor: '#f2f2f2',
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
  },
});

export {styles}