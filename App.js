import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native"
import NotaEditor from "./src/componentes/NotaEditor"
import { useEffect, useState } from "react"
import { Nota } from "./src/componentes/Nota"
import { criarTabela, buscarNotas } from "./src/servicos/Notas"
export default function App() {
  const [notas,setNotas] = useState([])
  const [notaSelecionada, setNotaSelecionada] = useState({})
  useEffect(() =>{
    criarTabela()
    mostarNotas()
  },[])
  async function mostarNotas(){  
    const todasNotas = await buscarNotas();

    setNotas(todasNotas)
  }

  return (
    <SafeAreaView style={estilos.container}>

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
	},
})

