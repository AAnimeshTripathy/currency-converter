let dropdown=document.querySelectorAll(".dropdown select"); //2 selects
let btn=document.querySelector("form button");
let alt=document.querySelector(".dropdown i");

let BASEURL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

let fromCurrency=document.querySelector("#from");
let toCurrency=document.querySelector("#to");
let msg=document.querySelector(".msg p");

for(select of dropdown){    //2 times //of because dropdown is an array
    for(currCode in countryList){ //in because countryList is an object
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(currCode==="USD" && select.getAttribute("name")==="from"){
            newOption.selected="selected";
        }else if(currCode==="INR" && select.getAttribute("name")==="to"){
            newOption.selected="selected";  
        }
        select.append(newOption);
        
    }
    
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
};

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    element.parentElement.querySelector("img").src=newSrc;
};

const updateData= async ()=>{
    let URL=`${BASEURL}${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;
    let promise=await fetch(URL);
    let rateObject=await promise.json();
    let rate=rateObject[toCurrency.value.toLowerCase()];

    let inputValue=document.querySelector("#userInput");
    let amountInput=inputValue.value 
    if(amountInput==="" || amountInput<0){
        amountInput=1;
        inputValue.value="1";
    }
    let value=amountInput * rate;
    msg.innerText=`Exchange Rate  \n ${amountInput} ${fromCurrency.value} = ${value} ${toCurrency.value}`;
    
};

alt.addEventListener("click",()=>{
    [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value]; 
    // Update flag for "from" currency
    updateFlag(fromCurrency);
    // Update flag for "to" currency
    updateFlag(toCurrency);

    //************Method 2************
    // let fromCurrVal=toCurrency.value;
    // let toCurrVal=fromCurrency.value;
    // console.log(fromCurrVal,toCurrVal);
    // for(select of dropdown){    //2 times //of because dropdown is an array
    //     let options=select.querySelectorAll("option");
    //     for(option of options){ //in because countryList is an object
    //         if(select.getAttribute("name")==="from" && option.value===fromCurrVal){
    //             option.selected="selected";
    //             let countryCode=countryList[fromCurrVal];
    //             let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    //             select.parentElement.querySelector("img").src=newSrc;
    //             break;
    //         }else if(option.value===toCurrVal && select.getAttribute("name")==="to"){
    //             option.selected="selected";  
    //             let countryCode=countryList[toCurrVal];
    //             let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    //             select.parentElement.querySelector("img").src=newSrc;
    //             break;
    //         }  
    //     }
    // }

});

window.addEventListener("load",()=>{
    updateData();
});

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateData();
});
