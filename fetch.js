const APIDIV = document.querySelector(".response");
const APIURL = document.querySelector("input");
// const LIST = document.querySelector("#myList");
const clearButton = document.querySelector(".clear");
const formdiv = document.querySelector(".form");
const detail = document.querySelector(".details");
// const url = "https://jsonplaceholder.typicode.com/posts"

// function getListElement(text) {
//   const li = document.createElement("li");
//   const textnode = document.createTextNode(text);
//   li.appendChild(textnode);
//   return li;


// }

function gettablerow(singleData,key){
  //  const table = document.createElement("table");
   const tr = document.createElement("tr");
   // const td = document.createElement("td");
  //  table.appendChild(tr);
   tr.appendChild(document.createElement("th")).innerText = key;
   
   tr.appendChild(document.createElement("td")).innerText = singleData[key];
  return tr;

}

function clearAPI() {
    APIDIV.innerHTML="";
    clearButton.classList.toggle("hidden");
    formdiv.classList.toggle("hidden");
    detail.classList.toggle("hidden");
    APIURL.value="";
    detail.innerText="";
}

function runcode() {
  // console.log(APIURL.value);
  if (APIURL.value === "" || APIURL.value === null) {
    APIURL.value = prompt("Provide URL");
    runcode();
  } else {
    const URL = APIURL.value;
    const xhr = new XMLHttpRequest();
    console.log(xhr);
    xhr.open("GET", URL);
    xhr.send();
    xhr.onload = () => {
        
      let length;
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.response);
        if(!Array.isArray(data)){
           length  = 1;
      }else{
          length = data.length;
      }

        console.log(length);
        detail.innerText = 
        `
        Total number of response received : ${length}
        Status code : ${xhr.status}
        Ready State : ${xhr.readyState}

        `;
        

        // for (const singleData of data) {
        //   const li = getListElement(JSON.stringify(singleData));
        //   LIST.appendChild(li);
        // }

        let datas;
             if(!Array.isArray(data)){
                datas = [data]
            }else{
                datas = [...data];
            }
       
           for (const singleData of datas) {
            const table = document.createElement("table");
              for (const key in singleData) {
                if (Object.hasOwnProperty.call(singleData, key)) {
                    
                    // console.log(`${key}:${singleData[key]}`)
                   

                   table.appendChild(gettablerow(singleData,key));
                   
                }   
              }
              // const li = document.createElement("li").appendChild(table)
              APIDIV.appendChild(table);
           }

        clearButton.classList.toggle("hidden");
        formdiv.classList.toggle("hidden");
        detail.classList.toggle("hidden");
      }
    };
  }
}
