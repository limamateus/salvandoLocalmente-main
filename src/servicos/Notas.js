import {db} from './SQLite'


export function criarTabela(){
    db.transaction((transaction) => {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS " +
        "Notas "+
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT , categoria TEXT, texto TEXT);")  
       
    })

}


export async function adicionarNota(nota){
    return new Promise((resolver)=>{
        db.transaction((transaction)=>{
            transaction.executeSql("INSERT INTO Notas (titulo, categoria, texto) VALUES (?,?,?);", [nota.titulo, nota.categoria, nota.texto], () =>{
                resolver("Nota adicionada com sucesso!") 
            } )
        })
    })
}



export async function buscarNotas(){
    return new Promise((resolver)=>{
        db.transaction((transaction)=>{
            transaction.executeSql("SELECT * FROM Notas;", [], (transaction, resultado) =>{
                resolver(resultado.rows._array)  // devolver lista de notas do banco
            } )
        })
    })
}