import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, FlatList, TextInput, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={AppScreen} />
                <Stack.Screen
                    name="ProdutosUten"
                    component={ProdutosUten}
                    options={({ route }) => ({ title: `Products ${route.params.productId}` })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function ProdutosUten({ route, navigation }) {
    const { productId } = route.params;

    const products = {
        1: { name: 'Trinca Vidro', price: 'R$30,00', image: require('./assets/trincaVidro.png'), description: 'Este é o Trinca Vidro.' },
        2: { name: 'Sacola de Papel Kraft', price: 'R$6,00', image: require('./assets/sacolaKraft.png'), description: 'Esta é a Sacola de Papel Kraft.' },
        3: { name: 'EkoBag', price: 'R$35,00', image: require('./assets/ekobag.png'), description: 'Esta é a EkoBag.' },
        4: { name: 'Lixeira Seletiva Doméstica', price: 'R$40,00', image: require('./assets/lixeiraSeletiva.png'), description: 'Esta é a Lixeira Seletiva Doméstica.' },
        5: { name: 'Kit Filtro de Barro', price: 'R$95,00', image: require('./assets/filtroBarro.png'), description: 'Este é o Kit Filtro de Barro.' },
    };

    const renderComment = ({ item }) => (
        <View style={styles.containerComent}>
            <Image source={item.userImage} style={styles.userImage} />
            <View style={styles.commentContent}>
                <Text style={styles.commentText}>{item.text}</Text>
                <View style={styles.ratingContainer}>
                    {Array.from({ length: item.rating }).map((_, index) => (
                        <Image key={index} source={require('./assets/star.png')} style={styles.starIcon} />
                    ))}
                </View>
            </View>
        </View>
    );

    const product = products[productId];








    return (
        <View style={styles.containerDetalhe}>

            <View style={styles.topoDetalhe}>
                <TouchableOpacity style={styles.SetaButton} onPress={() => navigation.goBack()}>
                    <Image source={require('./assets/setaPreta.png')} style={styles.setaIcon} />
                </TouchableOpacity>
                <Image source={require('./assets/sacola.png')} style={styles.sacolaIcon} />
            </View>
            <Image style={styles.imgDetalhe} source={product.image} />
            <Text style={styles.tituloDetalhe}>{product.name}</Text>
            <Text style={styles.textoDetalhe}>envio nacional</Text>
            <Text style={styles.textoDetalhe}>{product.price}</Text>
            <Text style={styles.descricaoDetalhe}>{product.description}</Text>

            <View style={styles.linha}></View>

            <TouchableOpacity style={styles.ButtonCarrinho}>
                <Text style={styles.AdicionarCarrinho}>Adicionar ao carrinho</Text>
            </TouchableOpacity>

            <View style={styles.linha}></View>

            <Text style={styles.opinioesSobre}>Opiniões sobre:</Text>

            <FlatList
                // data={comments}
                renderItem={renderComment}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )








}

function AppScreen({ navigation }) {
    const [searchText, setSearchText] = useState('');
    const [products] = useState([
        { id: 1, name: 'Trinca Vidro', price: 'R$30,00', image: require('./assets/trincaVidro.png'), description: 'Este é o Trinca Vidro.' },
        { id: 2, name: 'Sacola de Papel Kraft', price: 'R$6,00', image: require('./assets/sacolaKraft.png'), description: 'Esta é a Sacola de Papel Kraft.' },
        { id: 3, name: 'EkoBag', price: 'R$35,00', image: require('./assets/ekobag.png'), description: 'Esta é a EkoBag.' },
        { id: 4, name: 'Lixeira Seletiva Doméstica', price: 'R$40,00', image: require('./assets/lixeiraSeletiva.png'), description: 'Esta é a Lixeira Seletiva Doméstica.' },
        { id: 5, name: 'Kit Filtro de Barro', price: 'R$95,00', image: require('./assets/filtroBarro.png'), description: 'Este é o Kit Filtro de Barro.' },
    ]);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleSearch = () => {
        console.log('Pesquisando por:', searchText);
    };

    const navigateToProdutosUten = (productId) => {
        navigation.navigate('ProdutosUten', { productId });
    };

    return (
        <View style={styles.containerProdutos}>
            <Image style={styles.imgPlanta} source={require('./assets/planta.png')} />

            <TouchableOpacity style={styles.imgSeta}>
                <Image source={require('./assets/seta.png')} />
            </TouchableOpacity>

            <View style={styles.header}>
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
                <Text style={styles.titulo}>ECOLOGICAMENTE FALANDO</Text>
            </View>

            <View style={styles.listContainer}>
                {filteredProducts.length === 0 ? (
                    <Text style={styles.nenhumItem}>Nenhum item encontrado</Text>
                ) : (
                    <FlatList
                        data={filteredProducts}
                        renderItem={({ item }) => (
                            <View style={styles.produtoContainer}>
                                <Image style={styles.imgProduto} source={item.image} />
                                <Text style={styles.tituloProduto}>{item.name}</Text>
                                <Text style={styles.textoProduto}>{item.price}</Text>
                                <TouchableOpacity
                                    style={styles.ButtonCompreAqui}
                                    onPress={() => navigateToProdutosUten(item.id)}
                                >
                                    <Text style={styles.compreAgora}>COMPRE AGORA</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                )}
            </View>
        </View>
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
    nenhumItem: {
        marginTop: 20,
        fontSize: 18,
        alignItems: 'center',
    },
    seta: {
        marginTop: 100,
        backgroundColor: 'red',
    },
    containerProdutos: {
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
        padding: 10,
        // width: '100%',
        width: 450,
        color: 'white',
    },
    imgPlanta: {
        width: '100%',
    },
    titulo: {
        paddingVertical: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 2,
        borderBottomColor: 'red',
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
    ButtonCompreAqui: {
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
    header: {
        alignItems: 'center',
    },
    listContainer: {
        flex: 1,
        width: '100%',
    },


    //PagDetalheProduto
    containerDetalhe: {
        marginTop: 50,
    },
    topoDetalhe: {
        flexDirection: 'row',
    },
    setaIcon: {
        marginHorizontal: 40,
    },
    sacolaIcon: {
        marginTop: -5,
        marginLeft: 250,
    },
    imgDetalhe: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 350,
        height: 350,
        marginLeft: 30,
        marginTop: 50,
    },
    linha: {
        marginLeft: 25,
        backgroundColor: 'black',
        height: 1,
        width: '88%',
    },
});
