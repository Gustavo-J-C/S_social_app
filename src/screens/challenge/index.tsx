import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import {
  Card,
  Card1,
  CardText,
  CardText1,
  CardText2,
  CardTextContainer,
  Container,
  Button,
  ButtonText,
  DaysLeftContainer,
  ReadyText,
  JoinText,
  HorizontalLine,
  ChallengeTextContainer,
  ChallengeText,
  BlueDot,
  AdditionalText,
  ImageContainer,
  AdditionalImage,
} from "./style";

export default function Challenge() {
  return (
    <Container>
      <Image
        source={require("../../assets/imgs/photo.png")}
        style={{ width: "100%", height: 300 }}
      />
      <Card>
        <CardText>STREET NIGHT PORTRAIT</CardText>
      </Card>
      <Card1>
        <CardTextContainer>
          <CardText1>Deadline</CardText1>
          <DaysLeftContainer>
            <CardText2>30 days left</CardText2>
          </DaysLeftContainer>
        </CardTextContainer>
      </Card1>
      <Card1>
        <CardTextContainer>
          <CardText1>Prize</CardText1>
          <DaysLeftContainer>
            <CardText2>$100.00</CardText2>
          </DaysLeftContainer>
        </CardTextContainer>
      </Card1>
      <ReadyText>
        READY TO WIN THIS{" "}
        <BlueDot>CHALLENGE</BlueDot>
      </ReadyText>
      <TouchableOpacity
        style={{
          marginTop: 20,
          width: "90%",
          paddingVertical: 15,
          paddingHorizontal: 20,
          borderRadius: 30,
          backgroundColor: "#6B6CDC",
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
        }}
      >
        <ButtonText>SUBMIT YOUR SHOT</ButtonText>
      </TouchableOpacity>
      <JoinText>
        350 people have joined this{" "}
        <BlueDot>challenge</BlueDot>
      </JoinText>
      <StatusBar style="auto" />
      <HorizontalLine />
      <ChallengeTextContainer>
        <BlueDot>•</BlueDot>
        <ChallengeText> Challenge </ChallengeText>
        <BlueDot>•</BlueDot>
      </ChallengeTextContainer>
      <AdditionalText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis risus,
        neque cursus risus. Eget dictumst vitae enim, felis morbi. Quis risus,
        neque cursus risus. Eget dictumst vitae enim, felis morbi. Quis risus,
        neque cursus risus.
      </AdditionalText>
      <AdditionalText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis risus,
        neque cursus risus. Eget dictumst vitae enim, felis morbi. Quis risus,
        neque cursus risus. Eget dictumst vitae enim, felis morbi. Quis risus,
        neque cursus risus.
      </AdditionalText>
      <ChallengeTextContainer>
        <BlueDot>•</BlueDot>
        <ChallengeText> Inspiration </ChallengeText>
        <BlueDot>•</BlueDot>
      </ChallengeTextContainer>
      <ImageContainer>
        <AdditionalImage source={require("../../assets/imgs/photo1.png")} />
        <AdditionalImage source={require("../../assets/imgs/photo1.png")} />
      </ImageContainer>
      <ChallengeTextContainer>
        <BlueDot>•</BlueDot>
        <ChallengeText> Trending </ChallengeText>
        <BlueDot>•</BlueDot>
      </ChallengeTextContainer>
      <ImageContainer>
        <AdditionalImage source={require("../../assets/imgs/photo2.png")} />
        <AdditionalImage source={require("../../assets/imgs/photo2.png")} />
      </ImageContainer>
    </Container>
  );
}


// import { StatusBar } from "expo-status-bar";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { Container } from "./style";

// export default function Challenge() {
//   return (
//     <Container>    
//       <Image source={require("../../assets/imgs/photo.png")} style={styles.image} />
//       <View style={styles.card}>
//         <Text style={styles.cardText}>STREET NIGHT PORTRAIT</Text>
//       </View>
//       <View style={styles.card1}>
//         <View style={styles.cardTextContainer}>
//           <Text style={styles.cardText1}>Deadline</Text>
//           <View style={styles.daysLeftContainer}>
//             <Text style={styles.cardtext2}>30 days left</Text>
//           </View>
//         </View>
//       </View>
//       <View style={styles.card1}>
        
//         <View style={styles.cardTextContainer}>
//           <Text style={styles.cardText1}>Prize</Text>
//           <View style={styles.daysLeftContainer}>
//             <Text style={styles.cardtext2}>$100.00</Text>
//           </View>
//         </View>
//       </View>
//       <Text style={styles.readyText}>
//         READY TO WIN THIS{" "}
//         <Text style={[styles.primaryText, /*styles.alefFont*/]}>CHALLENGE</Text>
//       </Text>
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>SUBMIT YOUR SHOT</Text>
//       </TouchableOpacity>
//       <Text style={styles.joinText}>
//         350 people have joined this{" "}
//         <Text style={styles.primaryText}>challenge</Text>
//       </Text>
//       <StatusBar style="auto" />
//       <View style={styles.horizontalLine}></View>
//       <View style={styles.challengeTextContainer}>
//         <Text style={styles.blueDot}>•</Text>
//         <Text style={styles.challengeText}> Challenge </Text>
//         <Text style={styles.blueDot}>•</Text>
//       </View>
//       <Text style={styles.additionalText}>
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis risus,
//         neque cursus risus. Eget dictumst vitae enim, felis morbi. Quis risus,
//         neque cursus risus. Eget dictumst vitae enim, felis morbi. Quis risus,
//         neque cursus risus.
//       </Text>
//       <Text style={styles.additionalText}>
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis risus,
//         neque cursus risus. Eget dictumst vitae enim, felis morbi. Quis risus,
//         neque cursus risus. Eget dictumst vitae enim, felis morbi. Quis risus,
//         neque cursus risus.
//       </Text>
//       <View style={styles.challengeTextContainer}>
//         <Text style={styles.blueDot}>•</Text>
//         <Text style={styles.challengeText}> Inspiration </Text>
//         <Text style={styles.blueDot}>•</Text>
//       </View>
//       <View style={styles.imageContainer}>
//         <Image
//           source={require("../../assets/imgs/photo1.png")}
//           style={styles.additionalImage}
//         />
//         <Image
//           source={require("../../assets/imgs/photo1.png")}
//           style={styles.additionalImage}
//         />
//       </View>
//       <View style={styles.challengeTextContainer}>
//         <Text style={styles.blueDot}>•</Text>
//         <Text style={styles.challengeText}> Trending </Text>
//         <Text style={styles.blueDot}>•</Text>
//       </View>
//       <View style={styles.imageContainer}>
//         <Image
//           source={require("../../assets/imgs/photo2.png")}
//           style={styles.additionalImage}
//         />
//         <Image
//           source={require("../../assets/imgs/photo2.png")}
//           style={styles.additionalImage}
//         />
//       </View>
//     </Container>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     paddingBottom: 50,
//   },
//   image: {
//     width: "100%",
//     height: 300,
//     resizeMode: "cover",
//   },
//   card: {
//     backgroundColor: "#ffffff",
//     padding: 20,
//     borderRadius: 10,
//     marginTop: -50,
//     elevation: 3,
//     width: "90%",
//   },

//   card1: {
//     backgroundColor: "#F1F1FE",
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 30,
//     elevation: 3,
//     width: "90%",
//   },
//   cardTextContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   cardText1: {
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "left",
//     paddingTop: 7,
//   },
//   cardtext2: {
//     fontSize: 18,
//     textAlign: "left",
//     paddingTop: 7,
//     color: "#303030",
//   },
//   daysLeftContainer: {
//     alignItems: "flex-end",
//   },

//   cardText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   readyText: {
//     fontSize: 20,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginTop: 20,
//     color: "#8F90A7",
//   },
//   primaryText: {
//     color: "#6B6CDC",
//   },

//   button: {
//     marginTop: 20,
//     width: "90%",
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderRadius: 30,
//     backgroundColor: "#6B6CDC",
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.27,
//     shadowRadius: 4.65,
//     elevation: 6,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   joinText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: "#6B6CDC",
//     fontWeight: "bold",
//   },
//   horizontalLine: {
//     borderBottomColor: "black",
//     borderBottomWidth: 0.1,
//     marginTop: 10,
//     marginBottom: 10,
//     width: "90%",
//   },
//   challengeTextContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   challengeText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "black",
//   },
//   blueDot: {
//     color: "#6B6CDC",
//     fontSize: 50,
//   },
//   additionalText: {
//     color: "#8F90A7", // cor do texto adicional
//     textAlign: "center",
//     marginTop: 10,
//     paddingHorizontal: 20,
//     fontSize: 20,
//     //textAlign: "left",
//   },
//   imageContainer: {
//     flexDirection: "row", // Alinha as imagens na horizontal
//     justifyContent: "space-between", // Distribui as imagens igualmente na linha
//     paddingHorizontal: 10, // Adiciona um pequeno espaço horizontal entre as imagens
//     marginTop: 20, // Adiciona espaço acima das imagens
//   },
//   additionalImage: {
//     width: "45%", // Define a largura de cada imagem para ocupar metade da largura da tela
//     aspectRatio: 1, // Mantém a proporção original da imagem
//     resizeMode: "cover", // Ajusta a imagem para cobrir completamente o espaço
//     borderRadius: 10, // Adiciona bordas arredondadas às imagens
//   },
// });
