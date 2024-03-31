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


export async function atualizarNota(nota){
    return new Promise((resolver)=>{
        console.log(nota)
        db.transaction((transaction)=>{
            transaction.executeSql("UPDATE Notas SET titulo = ?, categoria = ? , texto = ? WHERE id = ?;", [nota.titulo, nota.categoria, nota.texto, nota.id ], () =>{
                resolver("Nota atualizado com sucesso!") 
            } )
        })
    })
}

export async function deletarNota(nota){
    return new Promise((resolver)=>{
        console.log(nota)
        db.transaction((transaction)=>{
            transaction.executeSql("DELETE FROM Notas WHERE id = ?;", [nota.id], () =>{
                resolver("Nota deletada com sucesso!") 
            } )
        })
    })
}

