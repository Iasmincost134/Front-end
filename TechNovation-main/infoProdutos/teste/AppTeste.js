import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

// ProductDetailsScreen
function ProductDetailsScreen({ route }) {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Image style={styles.imgProduto} source={product.image} />
      <Text style={styles.tituloProduto}>{product.name}</Text>
      <Text style={styles.textoProduto}>{product.price}</Text>
    </View>
  );
}

// HomeScreen
function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [products] = useState([
    { id: 1, name: 'Copo Dobrável', price: 'R$12,00', image: require('./assets/copoDobravel.png') },
    { id: 2, name: 'Kit Canudo Metal', price: 'R$22,00', image: require('./assets/canudoMetal.png') },
    { id: 3, name: 'Hashi Inox', price: 'R$15,00', image: require('./assets/hashiInox.png') },
    { id: 4, name: 'Garrafa Inox', price: 'R$35,00', image: require('./assets/garrafaInox.png') },
  ]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const navigation = useNavigation();

  const handleSearch = () => {
    console.log('Pesquisando por:', searchText);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.imgSeta}
          onPress={() => navigation.navigate('Home')}
        >
          <Image source={require('./assets/seta.png')} />
        </TouchableOpacity>
        <View style={styles.Pesquisa}>
          <Image style={styles.imgLocaliza} source={require('./assets/localiza.png')} />
          <TextInput
            style={styles.inputPesquisa}
            placeholder="Pesquise seu item..."
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />
        </View>
        <Text style={styles.frete}>Enviar para SP, 08673-270...</Text>
        <Image style={styles.img} source={require('./assets/planta.png')} />
        <Text style={styles.titulo}>UTENSÍLIOS</Text>

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
                <TouchableOpacity 
                  style={styles.button}
                  onPress={() => navigation.navigate('ProductDetails', { product: item })}
                >
                  <Text style={styles.compreAgora}>COMPRE AGORA</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        )}

      </View>
    </ScrollView>
  );
}

// Estilos
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
    display: 'flex',
    textAlign: 'center',
    fontSize: 16,
    color: '#666D4B',
    flex: 1,
    justifyContent: 'center',
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
  HomeScreen: {
    padding: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 2,
  }
});

// Configuração do StackNavigator
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="oie">
        <Stack.Screen name="Utensílios" component={HomeScreen}/>
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
