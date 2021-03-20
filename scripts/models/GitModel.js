class GhModel {
    constructor () {
        this.team = [];
    }
    openRequest (){
        let request = new XMLHttpRequest;
        request.open('GET', 'https://api.github.com/orgs/grupotesseract/public_members');
        request.addEventListener('load', () => {
            let result = JSON.parse(request.responseText);
            if (request.status == 200){
               result.forEach((object) => {
                    let memberRequest = new XMLHttpRequest;
                    memberRequest.open('GET', `https://api.github.com/users/${object.login}`);
                    memberRequest.addEventListener('load', () => {
                        let memberResult = JSON.parse(memberRequest.responseText);
                        if(memberRequest.status == 200){
                            let member = {
                                login: memberResult.login,
                                name: memberResult.name,
                                photo: memberResult.avatar_url,
                                repos: memberResult.public_repos,
                                followers: memberResult.followers,
                                date: new Date(memberResult.created_at)
                            }
                            this.team.push(member);
                            console.log(this.team);
                        } else{
                            throw new Error(`Request error ${memberRequest.status}: ${memberRequest.statusText}.`);
                        }
                    })
                    memberRequest.send();
               })
            } else {
                throw new Error(`Request error ${request.status}: ${request.statusText}.`);
            }
        })
        request.send();
    }
}