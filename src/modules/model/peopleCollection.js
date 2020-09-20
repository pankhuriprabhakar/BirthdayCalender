class PeopleCollection{
constructor(){}
parseData(jsonData){
    
try{
    var peopleCollection= JSON.parse(jsonData);
    if(!Array.isArray(peopleCollection)){
        alert("Invalid People Details. Please re-enter");
        return null;
    }
    else{
        return peopleCollection;
    }
}
catch{
    alert("Invalid People Details. Please re-enter");
}

}
}
export default PeopleCollection