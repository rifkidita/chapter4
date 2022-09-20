let page = 1;
let limit = 10;
let listdata = [];
let keyword = "";

fetch('https://jsonplaceholder.typicode.com/todos')
  .then((objectdata)=>{
    console.log(objectdata);
    return objectdata.json();
  }).then((objectdata)=>{
      listdata = objectdata;
    render();
  })

function render (){

  const filtered = listdata.filter(data => {
      if (data.title.toLowerCase().includes(keyword)) return data
  })
  const slicelistdata = filtered.slice((page-1)*limit, page*limit);
  const listcard = slicelistdata.reduce((a,b)=>{
      return (a +=`
      
          <div class="card col-5 ms-4 mt-4" >
                  <div id="card" class="card-body">
                      <h5>${b.title}</h5>
                      <h6>${b.completed ? `<span style="color:green">complete</span>` : `<span style="color:red">not complete</span>`}</h6>
                  </div>
          </div>
      `           
          )
  },'')
  document.getElementById(`card`).innerHTML=listcard;
  document.getElementById("indicator-page").innerHTML=page;

    if(page > 1){
        document.getElementById("previous-page").classList.remove("disabled");
    }else {
        document.getElementById("previous-page").classList.add("disabled");
    }

    if(page < 20){
      document.getElementById("next-page").classList.remove("disabled");
    }else {
      document.getElementById("next-page").classList.add("disabled");
  }

}

document.getElementById("previous-page").addEventListener("click",()=>{ 
  if(page===1){
      return 
  }
  page= page-1;
  render()
  
})

document.getElementById("next-page").addEventListener("click",()=>{
  if(page===20){
      return
  }
  page= page+1;
  render()
  
})

// Select form
document.getElementById("select-form").addEventListener("change",(e)=>{
  limit = e.target.value;
  page= 1;
  render()
})

// Search
document.getElementById("search-form").addEventListener("keyup",(e)=>{ 
  keyword = e.target.value;
  render()
})