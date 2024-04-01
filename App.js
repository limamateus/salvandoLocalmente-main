import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native"
import NotaEditor from "./src/componentes/NotaEditor"
import { useEffect, useState } from "react"
import { Nota } from "./src/componentes/Nota"
import { criarTabela, buscarNotas, buscarNotasPorCategoria } from "./src/servicos/Notas"
import { Picker } from "@react-native-picker/picker"

export default function App() {
  const [notas,setNotas] = useState([])
  const [notaSelecionada, setNotaSelecionada] = useState({})
  const [filtraCategoria, setFiltraCategoria] = useState('Todos');
  
  useEffect(() =>{
    criarTabela()
    if(filtraCategoria === 'Todos'){
      mostarNotas()
    }else{

       buscarNotasFiltradas()

    }
   

  },[filtraCategoria])

   async function buscarNotasFiltradas(){
    const todasNotasFiltradas = await buscarNotasPorCategoria(filtraCategoria)
    setNotas(todasNotasFiltradas)
   } 
  async function mostarNotas(){  
    const todasNotas = await buscarNotas();

    setNotas(todasNotas)
  }

  return (
    <SafeAreaView style={estilos.container}>
       <View  style={estilos.modalPicker}>
                <Text style={estilos.modalSubTitulo}>Filtar Por Categoria</Text>
                <Picker
                
                  selectedValue={filtraCategoria}
                  onValueChange={filtroCategorio => setFiltraCategoria(filtroCategorio)}>
                  <Picker.Item label="Todos" value="Todos" />
                  <Picker.Item label="Pessoal" value="Pessoal" />
                  <Picker.Item label="Trabalho" value="Trabalho" />
                  <Picker.Item label="Outros" value="Outros" />
                </Picker>

              </View>
      <FlatList
      data={notas}
      renderItem={(nota) => <Nota  {...nota} setNotaSelecionada={setNotaSelecionada}/>}
      keyExtractor={nota => nota.id}

      />
      <NotaEditor 
        mostarNotas ={mostarNotas}
        notaSelecionada={notaSelecionada}
        setNotaSelecionada={setNotaSelecionada}
      />


      <StatusBar/>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
	}, modalPicker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#EEEEEE",
    marginBottom: 12,   
    
  },
  modalSubTitulo: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "600",
    marginTop:15,
    marginLeft:15
  }
})

