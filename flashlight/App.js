import React,{useState,useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = ()=>{
  const [toggle,setToggle] = useState(false);; //podera ser mudado para true
  const trocaToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {Torch.switchState(toggle)},[toggle]); // ligando lanterna

  useEffect(()=> {
    /**muda toggle ao chacoalhar celular */
    const subscription = RNShake.addListener(()=>{setToggle(oldToggle => !oldToggle)})

    //função chamada ao desmontar componentes
    return () => subscription.remove();
  },[])

  return(
    <View style={toggle ? style.containerClaro: style.containerNoite}>
      <TouchableOpacity onPress={trocaToggle}>

        <Image
          style={toggle ? style.acendeLuz: style.apagaLuz} 
          source={ toggle ? require('./assets/icons/eco-light.png'): require('./assets/icons/eco-light-off.png')
        }/>
        <Image
          style={style.dioLogo}
          source={ toggle ? require('./assets/icons/logo-dio-white.png'): require('./assets/icons/logo-dio.png')
        }/>
      </TouchableOpacity>
    </View> // a imagem tambem pode ser carregada usando um import
  )
}

export default App;

const style = StyleSheet.create({
  containerNoite:{
    flex: 1,
    backgroundColor: 'grey',
    alignItens:'center',
    justifyContent:'center',
  },
  containerClaro:{
    flex: 1,
    backgroundColor: 'white',
    alignItens:'center',
    justifyContent:'center',
  },
  acendeLuz:{
    resizeMode: 'contain',
    alignSelf:'center',
    width: 150,
    height: 150,
  },
  apagaLuz:{
    resizeMode: 'contain',
    alignSelf:'center',
    tintColor:'white',
    width: 150,
    height: 150,
  },
  dioLogo:{
    resizeMode: 'contain',
    alignSelf:'center',
    width: 250,
    height: 250,
  },
});