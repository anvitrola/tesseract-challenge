class GhView {
    makeLayout(employee) {
        let $$ = document.getElementById.bind(document);
        let teamList = $$('teamList');

        employee.forEach((object) => {
            let $ = document.createElement.bind(document);

            let li = $('li');
            li.classList.add('team__member');
            let a = $('a');
            a.classList.add('team__card');
            let img = $('img');
            img.classList.add('team__img');
            let login = $('h4');
            login.classList.add('team__login');
            img.src = object.photo;
            login.textContent = `@${object.login}`;


            teamList.appendChild(li);
            li.appendChild(a);
            a.appendChild(img);
            a.appendChild(login);
            let expanded = false;

            a.addEventListener('click', () => {
                let name = $('h3');
                name.classList.add('team__name');
                name.setAttribute('id', 'name');
                let followers = $('h5');
                followers.classList.add('team__followers');
                followers.setAttribute('id', 'followers');
                let repos = $('h5');
                repos.classList.add('team__repos');
                repos.setAttribute('id', 'repos');
                let date = $('h5');
                date.classList.add('team__date');
                date.setAttribute('id', 'date');

                name.textContent = object.name;
                followers.textContent = `Seguidores: ${object.followers}`;
                repos.textContent = `Repositórios públicos: ${object.repos}`;
                date.textContent = `Entrou em ${object.date.getDate()}/${(object.date.getMonth()) + 1}/${object.date.getFullYear()}`;
                
                if (expanded == false) {
                    a.appendChild(name);
                    a.appendChild(followers);
                    a.appendChild(repos);
                    a.appendChild(date);
                    expanded = true;
                } else {
                    $$('name').remove();
                    $$('followers').remove();
                    $$('repos').remove();
                    $$('date').remove();
                    expanded = false;
                }
            })
        });
    }
}