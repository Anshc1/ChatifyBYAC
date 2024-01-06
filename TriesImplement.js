 class TrieNode{
    constructor(){
        this.children = {}; 
        this.isEnd = false;
        this.data = null; 
    }
}
export class Tries{
    constructor (){
        this.root = new TrieNode(); 
    }
    insert(word , data){
        let node = this.root; 
        for(let c of word){
            if(!node.children[c]){
                node.children[c] = new TrieNode(); 
            }
            node = node.children[c];
        }
        node.isEnd = true ; 
        node.data = data; 
    }
    startsWith(prefix){
        let node = this.root; 
        for(let c of prefix){
            if(!node.children[c]){
                return[]; 
            }
            node = node.children[c]; 
        }
        let res= [];
        const dfs=(node)=>{
            if(node.isEnd)res.push(node.data);
            if(res.length() >= 15){
                return res ;
            }
            for(let child of node.children){
                dfs(node.children[child]);  
            } 
        } 
        console.log(res)
        dfs(node); 
        return res ; 
    }

}