

let obj = {
    date1: {
        x: 10
    },
    date2: {
        x:5
    },
    date3: {
        x:15
    }
}

function start(){
    let dataArr = [];
     
     
    Object.keys(obj).map(item=>{
        dataArr.push({[item]:obj[item]});
    })
    
    console.log(dataArr)
    console.log('--')
    dataArr.sort( function(a,b) {
        console.log('P: '+Object.keys(a))
        return b[Object.keys(b)].x-a[Object.keys(a)].x;
    });
    console.log(dataArr)
}

start();