import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 



export default function ProdutosUten({ route, navigation }) {
  const { productId } = route.params;
  const navigation = useNavigation();

  const products = {
    1: { name: 'Trinca Vidro', price: 'R$30,00', image: require('./assets/trincaVidro.png'), description: 'Este é o Trinca Vidro.' },
    2: { name: 'Sacola de Papel Kraft', price: 'R$6,00', image: require('./assets/sacolaKraft.png'), description: 'Esta é a Sacola de Papel Kraft.' },
    3: { name: 'EkoBag', price: 'R$35,00', image: require('./assets/ekobag.png'), description: 'Esta é a EkoBag.' },
    4: { name: 'Lixeira Seletiva Doméstica', price: 'R$40,00', image: require('./assets/lixeiraSeletiva.png'), description: 'Esta é a Lixeira Seletiva Doméstica.' },
    5: { name: 'Kit Filtro de Barro', price: 'R$95,00', image: require('./assets/filtroBarro.png'), description: 'Este é o Kit Filtro de Barro.' },
  };

  const product = products[productId];

  const comments = [
    { id: 1, userId: 1, text: 'Ótimo produto!', rating: 5, userImage: require('./assets/user1.png') },
    { id: 2, userId: 2, text: 'Recomendo!', rating: 4, userImage: require('./assets/user2.png') },
    { id: 3, userId: 3, text: 'Produto de qualidade.', rating: 5, userImage: require('./assets/user3.png') },
  ];
  
  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
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


  return (
    <View style={styles.containerProduto}>
       
            <View style={styles.topoProduto}>
                <TouchableOpacity style={styles.setaButton} onPress={() => navigation.goBack()}>
                    <Image source={require('./assets/setaPreta.png')} style={styles.setaIcon} />
                </TouchableOpacity>
                <Image source={require('./assets/sacola.png')} style={styles.sacolaIcon} />
            </View>
      
        <Image style={styles.imgProdutoSolo} source={product.image} />
        <Text style={styles.tituloProduto}>{product.name}</Text>
        <Text style={styles.textoProduto}>envio nacional</Text>
        <Text style={styles.textoProduto}>{product.price}</Text>
        <Text style={styles.descricaoProduto}>{product.description}</Text>

        <View style={styles.separator}></View>

        <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartButtonText}>Adicionar ao carrinho</Text>
        </TouchableOpacity>

        <View style={styles.separator}></View>

        <Text style={styles.opinioesTitle}>Opiniões sobre:</Text>

        <FlatList
            // data={comments}
            renderItem={renderComment}
            keyExtractor={(item) => item.id.toString()}
        />
    </View>
)
}

const styles = StyleSheet.create({
//PagDetalheProduto



containerProduto: {
  marginTop: 50,
},
topoProduto: {
  alignItems: 'center',
},
setaButton,
sacolaIcon:{
  width: 20,
},

});
