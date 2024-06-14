import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList, TextInput } from 'react-native';
import React, { useState } from 'react';
// import PagHigiene from '../infoProdutos/pages/Higiene';


export default function App() {
  
  const [searchText, setSearchText] = useState('');
  const [products] = useState([
    { id: 1, name: 'Escova de Dentes de Bambu', price: 'R$15,00', image: require('./assets/escovaDente.png') },
    { id: 2, name: 'Escova de Cabelo de Bambu', price: 'R$25,00', image: require('./assets/escovaCabelo.png') },
    { id: 3, name: 'Escova de Banho de Bambu', price: 'R$30,00', image: require('./assets/escovaCorpo.png') },
    { id: 4, name: 'Bucha Vegetal', price: 'R$30,00', image: require('./assets/esponjaVegetal.png') },
    { id: 5, name: 'Shampoo e Condicionador em Barras', price: 'R$15,00', image: require('./assets/barraCabelo.png') },
  ]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = () => {
    console.log('Pesquisando por:', searchText);
  };

  // const PageHigiene = () => {
  //   navigation.navigate('PagHigiene');
  // };

  return (
    <>
      <StatusBar style="auto" />
      <ScrollView>
        <View style={styles.container}>
          <Image style={styles.img} source={require('./assets/planta.png')} />
          {/* <TouchableOpacity style={styles.imgSeta} title="PagHigiene" onPress={(PageHigiene)}>
          <Image source={require('./assets/seta.png')} />
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.imgSeta}>
          <Image source={require('./assets/seta.png')} />
          </TouchableOpacity>
          <View style={styles.Pesquisa}>
          <Image style={styles.imgLupa} source={require('./assets/lupa.png')} />
          <TextInput
            style={styles.inputPesquisa}
            placeholder="Pesquise seu item..."
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />
          </View>
          <Text style={styles.frete}>Enviar para SP, 08673-270...</Text>
          <Image style={styles.imgLocaliza} source={require('./assets/localiza.png')} />
          <Text style={styles.titulo}>HIGIENE</Text>

          {filteredProducts.length === 0 ? (
            <Text style={styles.semItem}>Nenhum item encontrado.</Text>
          ) : (
            <FlatList
              data={filteredProducts}
              renderItem={({ item }) => (
                <View style={styles.produtoContainer}>
                  <Image style={styles.imgProduto} source={item.image} />
                  <Text style={styles.tituloProduto}>{item.name}</Text>
                  <Text style={styles.textoProduto}>{item.price}</Text>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.compreAgora}>COMPRE AGORA</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => item.id.toString()}
            />
          )}

        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  Pesquisa: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffff',
    borderWidth: 1,
    borderColor: '#6BBD4E',
    borderRadius: 10,
    padding: 7.5,
    marginTop: -75,
    marginLeft: 30,
    marginBottom: 25,
    width: '80%',
  },
  inputPesquisa: {
    width: 250,
    marginLeft: 10,
  },
  semItem: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666D4B',
  },
  semItem: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666D4B',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgLocaliza: {
    marginTop: -27,
    marginLeft: -350,
  },
  imgSeta: {
    marginTop: -60,
    marginBottom: 40,
    marginLeft: -350,
  },
  frete: {
    backgroundColor: '#6BBD4E',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: 9,
    width: '100%',
    color: 'white',
  },
  img: {
    width: '100%',
  },
  titulo: {
    padding: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  produtoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imgProduto: {
    margin: 0,
    width: 330,
    height: 250,
    borderRadius: 17,
  },
  tituloProduto: {
    padding: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textoProduto: {
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    marginBottom: 40,
  },
  compreAgora: {
    paddingVertical: 5,
    paddingHorizontal: 30,
    textAlign: 'center',
    backgroundColor: '#6BBD4E',
    color: '#FFFFFF',
    borderRadius: 1.76,
  },
  
});
