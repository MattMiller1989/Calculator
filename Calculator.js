var dispText="0";
var evalText=[];
const dispDiv=document.getElementById("display");
var canAddDec=true;
var isEntering=true;
function updateText(){
        //const dispDiv=document.getElementById("display");
        if(dispText.length>1){
            dispText=dispText.replace(/^0+/, '');
        }
        dispDiv.innerHTML=dispText;
        console.log("update");
}
function placeDigit(num){
    if(isEntering){
    if(num=='.'){
        if(canAddDec){
            canAddDec=false;
            dispText=dispText+num;
        }  
        
    }else{
    dispText=dispText+num;
    }
}else{
    dispText=num;
    isEntering=true;
}
updateText();
}
function clearField(){
    console.log('clear!!!');
    dispText='0';
    updateText();
    evalText=[];
    
}
function addOperator(op){
    if(!isEntering){
        evalText.push(op);
        //isEntering=true;
    }else{   
    if(!(dispText=='/'||dispText=='x'||dispText=='+'||dispText=='-')){
        if(dispText.length>0){
            evalText.push(dispText);
            dispText="";
            evalText.push(op);
            dispDiv.innerHTML=op;
        }
        
        
    }
}
    //updateText();
    console.log(evalText);

}
function operate(){
    isEntering=false;
    var done=false;
    
    if(!isNaN(dispText)){
        evalText.push(dispText);
    }
    outerLoop:
    while((evalText.length>2)&&!done){
        for(var ind=0;ind<evalText.length;ind++){
            const currVal=evalText[ind];
            const a=evalText[ind-1];
            const b=evalText[ind+1];
            if(currVal=='/'||currVal=='x'){
                if(currVal=='/'&&b=='0'){
                    dispDiv.innerHTML="DIV BY 0 YOU FUCK!";
                    console.log("DIV BY O");
                    done=true;
                    break outerLoop;
                }
                let ans=doOperation(a,b,currVal);
                evalText.splice(ind-1,3,ans);
                

            }
            
        }
        for(var ind=0;ind<evalText.length;ind++){
            const currVal=evalText[ind];
            const a=evalText[ind-1];
            const b=evalText[ind+1];
            if(currVal=='+'||currVal=='-'){
                let ans=doOperation(a,b,currVal);
                evalText.splice(ind-1,3,ans);
                

            }
            
        }
    /*if(evalText.length>1){
        operate();
    }*/
}
    if(!done){
    console.log(evalText);
    console.log(evalText.length);
    dispText=evalText[0];
    dispDiv.innerHTML=dispText;
    }
}
function doOperation(a,b,op){
    
        if(op=='+')
            return Number(a)+Number(b);
        if(op=='-')
            return Number(a)-Number(b);
        if(op=='/'){
            if(b==0){
                console.log("divide by zero");
                
               
            }else{
                return Number(a)/Number(b);
            }
        }
        if(op=='x')
            return Number(a)*Number(b);
}
