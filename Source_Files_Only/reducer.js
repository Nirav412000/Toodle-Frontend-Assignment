// Global State Creation, DataLayer which holds all the data that is entered by the User
export const initialState = {
    task: [], //original Data Array
    no: 0, // to give unique id to all entered standards
};


// Reducer that will handle action which is despatched by the components 
const reducer = (state, action) => {
    
    switch(action.type){
        case 'ADD_TASK':
            // to enter the next standard with the same indent like previous. 
            let adddata = action.values;
            let lastindent = 0;
            if(state.task.length !== 0)
                lastindent = state.task[state.task.length-1].indent;

            adddata.indent = lastindent;
            return{
                ...state,
                task: [...state.task,adddata],
                no: state.no+1
            }
        case 'UP-CHANGE':
            // one by one swaping of the object with the upper object if there is any
            let copytask1 = state.task;
            let index1 = state.task.findIndex((taskItem) => taskItem.id === action.id);
            if(index1 !== 0){
                let temp = copytask1[index1];
                copytask1[index1] = copytask1[index1-1];
                copytask1[index1-1] = temp; 
            }
            return{
                ...state,
                task: copytask1,
            }
        case 'DOWN-CHANGE':
            //one by one swapping of the object with the lower object if there is any
            let copytask2 = state.task;
            let index2 = state.task.findIndex((taskItem) => taskItem.id === action.id);
            if(index2 !== copytask2.length-1){
                let temp2 = copytask2[index2];
                copytask2[index2] = copytask2[index2+1];
                copytask2[index2+1] = temp2; 
            }
            return{
                ...state,
                task: copytask2,
            }
        case 'DECREASE':
            const copytask = state.task;
            copytask.map(t => {
                if(action.id===t.id){
                    if(t.indent!==0){
                        t.indent = t.indent-1;
                    }
                }
            })
            return{
                ...state,
                task: copytask
            }
        case 'INCREASE':
            const coptask = state.task;
            coptask.map(t => {
                if(action.id===t.id && t.indent!==8){
                    t.indent = t.indent+1;
                }
            })
            return{
                ...state,
                task: coptask
            }
        case 'DELETE':
            // deletion of the parent and its all the chiledren standards from the state
            let cotask = [...state.task];
            let index = state.task.findIndex((taskItem) => taskItem.id === action.id);
            const pastindent = cotask[index].indent;
            let count = 1;
            let i = index;
            for(i += 1;i < cotask.length; i++){
                if(cotask[i].indent > pastindent) count++;
                else break;
            }
            for(;count>0;count--) cotask.splice(index,1);
            return{
                ...state,
                task: cotask
            }
        case 'CHANGE_TEXT':
            // to make the text clickable and changeable
            let ctask = [...state.task];
            ctask.map(t => {
                if(t.id === action.id){
                    t.text = action.value;
                }
            })    
            return{
                ...state,
                task: ctask
            }
        case 'LOAD-DATA':
            // to load data to the State from the stored file
            return{
                ...state,
                task: action.value
            }
        case 'CLEAR-DATA':
            return{
                ...state,
                task: []
            }
        default:
            return state;
    }
}

export default reducer;