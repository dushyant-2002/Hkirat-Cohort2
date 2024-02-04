const zod = require("zod");
const createTodo = zod.object({
    title:zod.string(),
    description:zod.string()
})

const updateTodo = zod.object({
    id:zod.string(),
})
//we have to write zod schema for these
/*
    {
        title:string,
        desc:string
    }
    {
        id:string
    }
*/

module.exports = {createTodo,updateTodo}