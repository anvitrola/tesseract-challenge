class GhModel {
    constructor () {
        this.team = [];
    }
    openRequest (){
        let request = new XMLHttpRequest;
        request.open('GET', 'https://api.github.com/orgs/grupotesseract/public_members', false);
        request.addEventListener('load', () => {
            let result = JSON.parse(request.responseText);
            if (request.status == 200){
               result.forEach((object) => {
                    let xhr = new XMLHttpRequest;
                    xhr.open('GET', `https://api.github.com/users/${object.login}`, false);
                    xhr.addEventListener('load', () => {
                        let memberResult = JSON.parse(xhr.responseText);
                        if(xhr.status === 200){
                            let member = {
                                login: memberResult.login,
                                name: memberResult.name,
                                photo: memberResult.avatar_url,
                                repos: memberResult.public_repos,
                                followers: memberResult.followers,
                                date: new Date(memberResult.created_at)
                            }
                            this.team.push(member);
                        } else{
                            throw new Error(`Request error ${xhr.status}: ${xhr.statusText}.`);
                        }
                    })
                    xhr.send();
               })
            } else {
                throw new Error(`Request error ${request.status}: ${request.statusText}.`);
            }
        })
        request.send();
    }

}