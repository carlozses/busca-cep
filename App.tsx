import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(
    {
      logradouro: '',
      complemento:'',
      unidade:'',
      localidade:'',
      uf:'',
      bairro:'',
      estado:'',
      regiao:'',
      ibge:'',
      gia:'',
      ddd:'',
      siafi:''
    }
  );

  async function buscarCEP(){
    let r = await fetch("https://viacep.com.br/ws/"+cep+"/json/");
    let dados = await r.json();
    setEndereco(dados);
  }

  return (
    <View style={styles.container}>
      <Text>Consulte seu CEP</Text>
      <TextInput 
      style={styles.textinput}
      value={cep}
      onChangeText={setCep}
      />
      <Text>{cep}</Text>
      <Button title='Buscar'
      onPress={buscarCEP}
      />
      <Text>{endereco.logradouro}</Text>
      <Text>{endereco.localidade}</Text>
      <Text>{endereco.bairro}</Text>
      <Text>{endereco.estado}</Text>
      <Text>{endereco.regiao}</Text>
      <Text>{endereco.complemento}</Text>
      <Text>{endereco.unidade}</Text>
      <Text>{endereco.uf}</Text>
      <Text>{endereco.ibge}</Text>
      <Text>{endereco.gia}</Text>
      <Text>{endereco.ddd}</Text>
      <Text>{endereco.siafi}</Text>
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput:{
    borderWidth: 1,
    color: 'red'
  }
});
