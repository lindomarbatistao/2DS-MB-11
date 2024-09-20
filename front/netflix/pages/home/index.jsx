import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Pressable, Image, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import styles from "./styles";
import axios from "axios";

export default function Home() {
  const [id, setID] = useState("");
  const [filmeG, setFilmeG] = useState("");
  const [generoG, setGeneroG] = useState("");
  const [anoG, setAnoG] = useState("");
  const [classifG, setClassifG] = useState("");
  const [idiomaG, setIdiomaG] = useState("");
  const [fileNameG, setFileNameG] = useState('')
  const [filme, setFilme] = useState("");
  const [genero, setGenero] = useState("");
  const [ano, setAno] = useState("");
  const [classif, setClassif] = useState("");
  const [idioma, setIdioma] = useState("");
  const [token, setToken] = useState("");
  const [base64, setBase64] = useState(null);
  const [imageName, setImageName] = useState(null)
  const [imageSource, setImageSource] = useState('')

  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((resp) => {
        if (token != null) {
          setToken(resp);
        }
      })
      .catch((error) => {
        console.error("Erro ao salvar o token", error);
      });
  }, [base64, imageName]);

  const capturar = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/filme/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resp = await axios.get(
        "http://127.0.0.1:8000/api/genero/" + response.data.genre
      );
      console.log("resp", resp);
      console.log(response.data);
      setFilmeG(response.data.titulo);
      setGeneroG(resp.data.genre);
      setAnoG(response.data.ano);
      setClassifG(response.data.classif);
      setIdiomaG(response.data.idioma);
      setFileNameG(response.data.fileName)
    } catch {
      console.log(Error);
    }
  };

  const enviar = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/listarfilmes",

        {
          titulo: filme,
          genre: genero,
          ano: ano,
          classif: classif,
          idioma: idioma,
          fileName: imageName
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      uploadImage(base64, imageName, token)
      
      console.log("Dados inseridos com sucesso...");
      setFilme("");
      setGenero("");
      setAno("");
      setClassif("");
      setIdioma("");
      setBase64(null)
    } catch (error) {
      console.log("Erro ao inserir os dados...", error);
    }
  };

  const atualizar = async () => {
    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/filme/" + id,
        {
          titulo: filmeG,
          genero_id: generoG,
          ano: anoG,
          classif: classifG,
          idioma: idiomaG,
          
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Alterado com sucesso...");
    } catch (error) {
      console.log("Erro ao atualizar", error);
    }
  };

  const apagar = async () => {
    try {
      const response = await axios.delete(
        "http://127.0.0.1:8000/api/filme/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Apagado com sucesso...");
      setFilmeG("");
      setGeneroG("");
      setAnoG("");
      setClassifG("");
      setIdiomaG("");
    } catch (error) {
      console.log("Erro ao atualizar", error);
    }
  };

  // ####################################### Imagem ###################################

  const pickImage = async () => {
    // Abre a galeria para seleção de imagem
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // Se o usuário não cancelar, executa o upload
    if (!result.canceled) {
      const imageName = result.assets[0].fileName || "image.jpg"; // Definir o nome do arquivo
      const imageUri = result.assets[0].uri;
      setBase64(imageUri); // Armazena a URI da imagem no estado
      setImageName(imageName)
    }
  };

  // Função de upload da imagem
  const uploadImage = async (uri, imageName, token) => {
    let formData = new FormData();
    formData.append("image", {
      uri: uri,
      type: "image/jpeg", // Tipo do arquivo (ajustar conforme necessário)
      name: imageName, // Nome do arquivo
    });

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/images/",
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Imagem enviada com sucesso:", response.data);
    } catch (error) {
      console.error(
        "Erro ao enviar a imagem:",
        error.response ? error.response.data : error.message
      );
    }
  };
  // #################################### Fim Imagem ###################################

  return (
    <View style={styles.container}>
      <View style={styles.stGet}>
        <View style={{ flexDirection: "row", padding: 10 }}>
          <Text>ID:</Text>
          <TextInput
            value={id}
            onChangeText={(e) => {
              setID(e);
            }}
            style={styles.caixaID}
          />
          <Pressable style={styles.btnGe} onPress={capturar}>
            <Text style={{ fontWeight: "bold" }}>GET</Text>
          </Pressable>
          <Pressable style={styles.btnPu} onPress={atualizar}>
            <Text style={{ fontWeight: "bold" }}>PUT</Text>
          </Pressable>
          <Pressable style={styles.btnDe} onPress={apagar}>
            <Text style={{ fontWeight: "bold" }}>DEL</Text>
          </Pressable>
        </View>
        <Text>Filme</Text>
        <TextInput
          style={styles.caixaGet}
          value={filmeG}
          onChangeText={(e) => setFilmeG(e)}
        />

        <Text>Gênero</Text>
        <TextInput
          style={styles.caixaGet}
          value={generoG}
          onChangeText={(e) => setGeneroG(e)}
        />

        <View style={styles.foto03}>
          <View style={styles.foto01}>
            <Text>Ano</Text>
            <TextInput
              style={styles.caixaGet2}
              value={anoG}
              onChangeText={(e) => setAnoG(e)}
            />

            <Text>Idioma</Text>
            <TextInput
              style={styles.caixaGet2}
              value={idiomaG}
              onChangeText={(e) => setIdiomaG(e)}
            />

            <Text>Classificação</Text>
            <TextInput
              style={styles.caixaGet2}
              value={classifG}
              onChangeText={(e) => setClassifG(e)}
            />
          </View>
          <View style={styles.foto02}>
            <Image
              style={styles.foto04}
              source={{ uri: imageSource}}
            />
          </View>
          
        </View>
      </View>

      <View style={styles.stPost}>
        <Pressable style={styles.btnPo} onPress={enviar}>
          <Text style={{ fontWeight: "bold" }}>POST</Text>
        </Pressable>
        <Text>Filme</Text>
        <TextInput
          value={filme}
          onChangeText={(e) => {
            setFilme(e);
          }}
          style={styles.caixaPost}
        />
        <Text>Gênero</Text>
        <TextInput
          value={genero}
          onChangeText={(e) => {
            setGenero(e);
          }}
          style={styles.caixaPost}
        />
        <View style={styles.foto03}>
          <View style={styles.foto01}>
            <Text>Ano</Text>
            <TextInput
              value={ano}
              onChangeText={(e) => {
                setAno(e);
              }}
              style={styles.caixaPost2}
            />
            <Text>Idioma</Text>
            <TextInput
              value={idioma}
              onChangeText={(e) => {
                setIdioma(e);
              }}
              style={styles.caixaPost2}
            />
            <Text>Classificação</Text>
            <TextInput
              value={classif}
              onChangeText={(e) => {
                setClassif(e);
              }}
              style={styles.caixaPost2}
            />
          </View>
          <Pressable style={styles.foto02} onPress={pickImage}>
            <Image
              style={styles.foto04}
              source={{
                uri: base64,
              }}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
