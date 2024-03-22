import styled from "styled-components/native";
import { ScrollView } from 'react-native';

export const Container = styled(ScrollView).attrs(() => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    width: '90%',
    flexGrow: 1,
    backgroundColor: "#fff",
    alignSelf: 'center',
    alignItems: "center",
    paddingBottom: 50,
  },
}))``;

export const Image = styled.Image`
  width: 100%;
  height: 300px;
  resizeMode: cover;
`;

export const Card = styled.View`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  margin-top: -50px;
  elevation: 3;
  width: 90%;
`;

export const Card1 = styled.View`
  background-color: #f1f1fe;
  padding: 15px;
  border-radius: 10px;
  margin-top: 30px;
  elevation: 3;
  width: 90%;
`;

export const CardTextContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const CardText1 = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  padding-top: 7px;
`;

export const CardText2 = styled.Text`
  font-size: 18px;
  text-align: left;
  padding-top: 7px;
  color: #303030;
`;

export const DaysLeftContainer = styled.View`
  align-items: flex-end;
`;

export const CardText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

export const ReadyText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  color: #8f90a7;
`;

export const PrimaryText = styled.Text`
  color: #6b6cdc;
`;

export const Button = styled.TouchableOpacity`
  margin-top: 20px;
  width: 90%;
  padding-vertical: 15px;
  padding-horizontal: 20px;
  border-radius: 30px;
  background-color: #6b6cdc;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 3;
  };
  shadow-opacity: 0.27;
  shadow-radius: 4.65;
  elevation: 6;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

export const JoinText = styled.Text`
  margin-top: 10px;
  font-size: 16px;
  color: #6b6cdc;
  font-weight: bold;
`;

export const HorizontalLine = styled.View`
  border-bottom-color: black;
  border-bottom-width: 0.1px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 90%;
`;

export const ChallengeTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

export const ChallengeText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: black;
`;

export const BlueDot = styled.Text`
  color: #6b6cdc;
  font-size: 50px;
`;

export const AdditionalText = styled.Text`
  color: #8f90a7;
  text-align: center;
  margin-top: 10px;
  padding-horizontal: 20px;
  font-size: 20px;
  text-align: left;
`;

export const ImageContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 10px;
  margin-top: 20px;
`;

export const AdditionalImage = styled.Image`
  width: 45%;
  aspect-ratio: 1;
  resizeMode: cover;
  border-radius: 10px;
`;


// import styled from "styled-components/native";

// export const Container = styled.ScrollView`
//   flex: 1;
//   padding: 0 24px;
//   background-color: ${({ theme }) => theme.COLORS.GRAY_50};
// `;



// // const styles = StyleSheet.create({
// //     container: {
// //       flexGrow: 1,
// //       backgroundColor: "#fff",
// //       alignItems: "center",
// //       paddingBottom: 50,
// //     },
// //     image: {
// //       width: "100%",
// //       height: 300,
// //       resizeMode: "cover",
// //     },
// //     card: {
// //       backgroundColor: "#ffffff",
// //       padding: 20,
// //       borderRadius: 10,
// //       marginTop: -50,
// //       elevation: 3,
// //       width: "90%",
// //     },
  
// //     card1: {
// //       backgroundColor: "#F1F1FE",
// //       padding: 15,
// //       borderRadius: 10,
// //       marginTop: 30,
// //       elevation: 3,
// //       width: "90%",
// //     },
// //     cardTextContainer: {
// //       flexDirection: "row",
// //       justifyContent: "space-between",
// //       alignItems: "center",
// //       marginBottom: 10,
// //     },
// //     cardText1: {
// //       fontSize: 18,
// //       fontWeight: "bold",
// //       textAlign: "left",
// //       paddingTop: 7,
// //     },
// //     cardtext2: {
// //       fontSize: 18,
// //       textAlign: "left",
// //       paddingTop: 7,
// //       color: "#303030",
// //     },
// //     daysLeftContainer: {
// //       alignItems: "flex-end",
// //     },
  
// //     cardText: {
// //       fontSize: 18,
// //       fontWeight: "bold",
// //       textAlign: "center",
// //     },
// //     readyText: {
// //       fontSize: 20,
// //       fontWeight: "bold",
// //       textAlign: "center",
// //       marginTop: 20,
// //       color: "#8F90A7",
// //     },
// //     primaryText: {
// //       color: "#6B6CDC",
// //     },
  
// //     button: {
// //       marginTop: 20,
// //       width: "90%",
// //       paddingVertical: 15,
// //       paddingHorizontal: 20,
// //       borderRadius: 30,
// //       backgroundColor: "#6B6CDC",
// //       justifyContent: "center",
// //       alignItems: "center",
// //       shadowColor: "#000",
// //       shadowOffset: {
// //         width: 0,
// //         height: 3,
// //       },
// //       shadowOpacity: 0.27,
// //       shadowRadius: 4.65,
// //       elevation: 6,
// //     },
// //     buttonText: {
// //       color: "#fff",
// //       fontSize: 18,
// //       fontWeight: "bold",
// //       textAlign: "center",
// //     },
// //     joinText: {
// //       marginTop: 10,
// //       fontSize: 16,
// //       color: "#6B6CDC",
// //       fontWeight: "bold",
// //     },
// //     horizontalLine: {
// //       borderBottomColor: "black",
// //       borderBottomWidth: 0.1,
// //       marginTop: 10,
// //       marginBottom: 10,
// //       width: "90%",
// //     },
// //     challengeTextContainer: {
// //       flexDirection: "row",
// //       alignItems: "center",
// //       marginTop: 10,
// //     },
// //     challengeText: {
// //       fontSize: 24,
// //       fontWeight: "bold",
// //       color: "black",
// //     },
// //     blueDot: {
// //       color: "#6B6CDC",
// //       fontSize: 50,
// //     },
// //     additionalText: {
// //       color: "#8F90A7", // cor do texto adicional
// //       textAlign: "center",
// //       marginTop: 10,
// //       paddingHorizontal: 20,
// //       fontSize: 20,
// //       textAlign: "left",
// //     },
// //     imageContainer: {
// //       flexDirection: "row", // Alinha as imagens na horizontal
// //       justifyContent: "space-between", // Distribui as imagens igualmente na linha
// //       paddingHorizontal: 10, // Adiciona um pequeno espaço horizontal entre as imagens
// //       marginTop: 20, // Adiciona espaço acima das imagens
// //     },
// //     additionalImage: {
// //       width: "45%", // Define a largura de cada imagem para ocupar metade da largura da tela
// //       aspectRatio: 1, // Mantém a proporção original da imagem
// //       resizeMode: "cover", // Ajusta a imagem para cobrir completamente o espaço
// //       borderRadius: 10, // Adiciona bordas arredondadas às imagens
// //     },
// //   });
  