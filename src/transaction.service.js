function getTransactions() {
    return fetch('./data.json')
      .then(response =>response.json());
}

function calculateRewards(price) {
    if (price >=50 && price < 100) {
        return price-50;
    } else if (price >100){
        return (2*(price-100) + 50);
    }
    return 0;
}

function rewardPerMonth(transactions) {

    let obj = {};
    for(let i=0; i < transactions.length; i++) {
        let points = this.calculateRewards(transactions[i].bill);
        let month = new Date(transactions[i].date).getMonth() +1;
        if(!obj[transactions[i].customer]){
            obj[transactions[i].customer] = {total: 0};
        }

        if(!obj[transactions[i].customer][month]) {
            obj[transactions[i].customer][month] = 0;
        }
        
        obj[transactions[i].customer][month] += points;
        obj[transactions[i].customer].total += points; 
    }
    return obj;
}

function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }

  export {getMonthName, rewardPerMonth, calculateRewards, getTransactions};