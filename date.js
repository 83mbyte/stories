function getCurrentDate(){
    let date = new Date();
    let res = date.toDateString().split(' ');
    return (`${res[2]} ${res[1]} ${res[3]}`);
}

getCurrentDate();