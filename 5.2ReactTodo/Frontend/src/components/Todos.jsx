

export function Todos({todos}){
    console.log("todos",todos);
    return(
        <div>
        {todos.map((todo)=>{
            return <div>
                <h1>{todo.title}</h1>
                <h2>{todo.description}</h2>
                <button>{todo.completed?"completed":"Mark as Complete"}</button>
            </div>
        })}
        </div>
    )
}