import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

type _endereco= {
  cep: string,
  logradouro: string,
  complemento: string,
  unidade: string,
  bairro: string,
  localidade: string,
  uf: string,
  estado: string,
  regiao: string,
  ibge: string,
  gia: string,
  ddd: string,
  siafi: string
}

export default function App() {
  const [cep, setCep] = useState('');
  const [endereco , setEndereco] = useState<_endereco>();
  const [buscado, setBuscado] = useState(false);
  const [erro, setErro] = useState(false)

  async function buscarCEP(){
    try {
      let r = await fetch("https://viacep.com.br/ws/"+cep+"/json/");
      let dados = await r.json();
      let x : _endereco;
      setEndereco(dados);
      setBuscado(true);
      setErro(false);
    } catch (e) {
      setErro(true);
    }
  }

  function mostrarEnd(){
    if(erro)
      return <Text>Sem resultado</Text>
    return <>
      <Text>{endereco?.logradouro}</Text>
      <Text>{endereco?.localidade}</Text>
      <Text>{endereco?.bairro}</Text>
      <Text>{endereco?.estado}</Text>
      <Text>{endereco?.regiao}</Text>
      <Text>{endereco?.complemento}</Text>
      <Text>{endereco?.unidade}</Text>
      <Text>{endereco?.uf}</Text>
      <Text>{endereco?.ibge}</Text>
      <Text>{endereco?.gia}</Text>
      <Text>{endereco?.ddd}</Text>
      <Text>{endereco?.siafi}</Text>
    </>;
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
      {mostrarEnd()}
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
