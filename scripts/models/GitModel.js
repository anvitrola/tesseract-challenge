class GhModel {
    constructor () {
        this.team = [];
    }
    async request () {
        try {
            let response = await fetch("https://api.github.com/orgs/grupotesseract/public_members");

            if(!response.ok) throw new Error("[ERROR]: Response error");
            
            let data = await response.json();

            /**Aqui é mais cabível usar o map porque ele retorna um array de Promises e não os dados resolvidos, como o forEach faria**/
            let team_list = data.map(async (object) => {
                try {
                    let res = await fetch(`https://api.github.com/users/${object.login}`)
                    
                    if(!res.ok) throw new Error("[ERROR]: Response error");

                    let memberData = await res.json();

                    let member = {
                        login: memberData.login,
                        name: memberData.name,
                        photo: memberData.avatar_url,
                        repos: memberData.public_repos,
                        followers: memberData.followers,
                        date: new Date(memberData.created_at)
                    }
                    return member                    
                } catch (error) {
                    console.log(error)
                }
            })
            /*Pegando as promises do array e resolvendo-as*/
            this.team = await Promise.all(team_list);
        } catch (error) { 
            console.log(error);
        }
    }
}
