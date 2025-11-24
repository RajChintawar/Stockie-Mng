function rankingUsers(Users){


    Users.sort((a,b)=> b.totalValue - a.totalValue);

    let currentRank = 1;
    for (let i=0;i<Users.length; i++){
        if(i==0){
            Users[i].rank = 1;
        }else{
            if(Users[i].totalValue==Users[i-1].totalValue){
                Users[i].rank =Users[i-1].rank;
            }else{
                Users[i].rank=i+1;
            }
        }
    }
    return Users;
}
module.exports ={rankingUsers};