
let areas = {
    a: null,
    b: null,
    c: null
};

//EVENTOS 
//Criando o eveto drang and drop nos itens
document.querySelectorAll('.item').forEach((item)=>{
    item.addEventListener('dragstart', dragStart); //dragstart: é disparado quando o item começa a ser arrastado
    item.addEventListener('dragend', dragEnd); //dragend: é disparado quando o item parou de ser arrastado
});

//Habilitando as areas para o drag and drop
document.querySelectorAll('.areas').forEach((area)=>{
    area.addEventListener('dragover', dragOver); //dragover: aciona a função toda vez que o item passa por cima da area em que pode ser solto.
    area.addEventListener('dragleave', dragLeave);//dragleave: aciona a função toda vez que o item está em uma área em que pode ser solto, porém ele sai dessa área. 
    area.addEventListener('drop', drop);//drop: aciona a função quando é solto. Preciso de um preventDefault() em dragOver para o drop funcionar.
});

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);


//FUNÇÕES DO ITEM
function dragStart(event){
    event.currentTarget.classList.add('dragging');
};
function dragEnd(event){
    event.currentTarget.classList.remove('dragging');
};

//FUNÇÕES DA ÁREA
function dragOver(event){
    event.preventDefault(); //Eu impesso o comportamento padrão que é negar ou drop, logo, eu libero o drop.
    event.target.classList.add('hover');
    
};
function dragLeave(event){
    event.target.classList.remove('hover');
    
};
function drop(event){
    
    event.target.classList.remove('hover');

    
    let itemSelected = document.querySelector('.item.dragging').getAttribute('data-item');
    let itemCancel = document.querySelector('.item.dragging');
    console.log(itemCancel);
    
    if(event.target.innerHTML == ''){
        if (itemSelected == 1){
            event.target.innerHTML = `<div class="item" draggable="true" data-item="1">1</div>`;
        }else if (itemSelected == 2){
            event.target.innerHTML = `<div class="item" draggable="true" data-item="2">2</div>`;
        }else{
            event.target.innerHTML = `<div class="item" draggable="true" data-item="3">3</div>`;
        }

        itemCancel.parentNode.removeChild(itemCancel);
          
        
        document.querySelectorAll('.item').forEach((item)=>{
        item.addEventListener('dragstart', dragStart); 
        item.addEventListener('dragend', dragEnd); 

        updataAreas();
    });  

    }
 
};

//FUNCÕES DA NEUTRALAREA

function dragOverNeutral(eventNeutral){
    eventNeutral.preventDefault();
    eventNeutral.target.classList.add('hover');
};

function dragLeaveNeutral(eventNeutral){
    eventNeutral.target.classList.remove('hover');
};

function dropNeutral(eventNeutral){
    eventNeutral.target.classList.remove('hover');
    let itemSelected = document.querySelector('.item.dragging').getAttribute('data-item');
    let itemCancel = document.querySelector('.item.dragging'); 

    
    let newDiv = document.createElement('div');
    newDiv.className = 'item';
    newDiv.draggable = 'true';
    document.querySelector('.neutralArea').appendChild(newDiv);
    newDiv.setAttribute('data-item',`${itemSelected}`);
    newDiv.innerHTML = `${itemSelected}`;
    console.log(newDiv);

    itemCancel.parentNode.removeChild(itemCancel);
      
    
    document.querySelectorAll('.item').forEach((item)=>{
    item.addEventListener('dragstart', dragStart); 
    item.addEventListener('dragend', dragEnd); 
    });
    
    updataAreas();
};

function updataAreas(){
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name');

        //Verificando o item que está em cada uma das areas
        if(area.querySelector('.item')!==null){
            areas[name] = area.querySelector('.item').innerHTML;
        }else{
            areas[name] = null;
        }
    });
    
    //Acionando a resposta correta/incorreta
    if(areas.a==='1' && areas.b==='2' && areas.c==='3'){
        document.querySelector('.areas').classList.remove('wrong');
        document.querySelector('.areas').classList.add('correct');
    }else if(areas.a===null || areas.b===null || areas.c === null){
        document.querySelector('.areas').classList.remove('correct');
        document.querySelector('.areas').classList.remove('wrong');
    }else{
        document.querySelector('.areas').classList.remove('correct');
        document.querySelector('.areas').classList.add('wrong');
    };
}
        
    
