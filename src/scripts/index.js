const feedPosts = document.querySelector('.feed-posts');
const suggestList = document.querySelector('.suggest-list');
const modalContainer = document.getElementById('modal-container')
const postButton = document.getElementById('post-button');
const postForm = document.getElementById('post-form')

postButton.addEventListener('click', (event) => {
    const newPostObject = {
        id_post: 0, 
        user: 1,
    }
    event.preventDefault();
    const inputsPosts = postForm.children;
    for (let i = 0; i < inputsPosts.length; i++) {
        const element = inputsPosts[i];
        if(element.name){
            newPostObject[element.name] = element.value;
        }
    }
    posts.unshift(newPostObject)
    renderPosts(posts, users, postCreate);
    renderModals(posts, users, modalCreate, modalContainer)
    postButton.classList.toggle('disable-button');

});

function renderPosts(postList, userList, callback) {
    feedPosts.innerHTML = '';
    for (let e = 0; e < postList.length; e++) {
        const postElement = postList[e];
        for (let i = 0; i < userList.length; i++) {
            const userElement = userList[i];
            if (postElement.user == userElement.id) {
                feedPosts.append(callback(postElement, userElement));
            }
        }
    }
}

function postCreate(post, user) {
    const friendsPost = document.createElement('li');
    friendsPost.classList.add('friends-posts');
    let count = 0;

    const postAuthor = document.createElement('div');
    const friendPicture = document.createElement('img');
    const friendDescription = document.createElement('div');
    const friendName = document.createElement('h2');
    const friendStack = document.createElement('p');

    postAuthor.classList.add('post-author');
    friendPicture.src = `${user.img}`
    friendPicture.alt = `${user.user}`
    friendDescription.classList.add('friend-description');
    friendName.classList.add('title2');
    friendName.innerText = `${user.user}`
    friendStack.classList.add('text2');
    friendStack.innerText = `${user.stack}`

    postAuthor.append(friendPicture, friendDescription);
    friendDescription.append(friendName, friendStack);

    const postContent = document.createElement('div');
    const contentTitle = document.createElement('h2');
    const contentDescription = document.createElement('p');

    postContent.classList.add('post-content');
    contentTitle.classList.add('title1');
    contentTitle.innerText = `${post.title}`
    contentDescription.classList.add('text1');
    contentDescription.innerText = `${post.text}`

    postContent.append(contentTitle, contentDescription);

    const postInteract = document.createElement('div');
    const interactButton = document.createElement('button');
    const likesCouter = document.createElement('div');
    const likesLink = document.createElement('a');
    const likesText = document.createElement('p');


    postInteract.classList.add('post-interact');
    interactButton.innerText = 'Abrir Post'
    interactButton.classList = 'text2 bttn bttn-gray1';
    likesCouter.classList.add('likes-counter')
    likesLink.alt = 'Curtir';
    likesText.classList.add('text2');
    likesText.innerText = count;
    

    likesCouter.addEventListener('click', (event) => {
        event.preventDefault();
        let listener = document.getElementById(post.id_post + 5);
        let eventListener = listener.classList.toggle('vector-ative');
        if (eventListener) {
            likesText.innerText = count + 1;
        } else {
            likesText.innerText = count;
        }
    });

    interactButton.addEventListener('click', (event) => {
        event.preventDefault();
        let opemPost = document.getElementById(post.id_post)
        opemPost.classList.toggle('show-modal');
    })

    postInteract.append(interactButton, likesCouter);
    likesCouter.append(likesLink, likesText)

    friendsPost.append(postAuthor, postContent, postInteract)

    return friendsPost
}

renderPosts(posts, users, postCreate);

function renderSuggests(userList, idList) {
    suggestList.innerHTML = '';
    for (let u = 0; u < userList.length; u++) {
        const elementUser = userList[u];
        for (let i = 0; i < idList.length; i++) {
            const elementId = idList[i];
            if (elementUser.id == elementId) {
                suggestList.append(suggestsCreate(elementUser))
            }
        }
    }
}

renderSuggests(users, sugestUsers);

function suggestsCreate(user) {
    const suggestItem = document.createElement('li');
    suggestItem.classList.add('suggest-item');

    const suggestInfo = document.createElement('div');
    const suggestPicture = document.createElement('img');
    const suggestTitles = document.createElement('div');
    const suggestName = document.createElement('h2');
    const suggestStack = document.createElement('p');

    suggestTitles.append(suggestName, suggestStack)
    suggestInfo.append(suggestPicture, suggestTitles)

    suggestInfo.classList.add('suggest-info');
    suggestPicture.classList.add('suggest-picture')
    suggestPicture.src = `${user.img}`;
    suggestPicture.alt = `${user.user}`;
    suggestTitles.classList.add('suggest-titles');
    suggestName.classList = 'title2 suggest-name';
    suggestName.innerText = `${user.user}`;
    suggestStack.classList = 'text2 suggest-stack';
    suggestStack.innerText = `${user.stack}`;

    const buttonState = document.createElement('button');
    const innerState = ['Seguir', 'Seguindo'];
    buttonState.classList = "bttn bttn-state"
    buttonState.innerText = 'Seguir'
    buttonState.addEventListener('click', (event) => {
        event.preventDefault();
        let toggleEvent = buttonState.classList.toggle('bttn-state-active');
        if (toggleEvent) {
            buttonState.innerText = `${innerState[1]}`
        } else {
            buttonState.innerText = `${innerState[0]}`
        }


    })

    suggestItem.append(suggestInfo, buttonState)
    return suggestItem
}

function renderModals(postList, userList, callback, htmlReference) {
    for (let index = 0; index < postList.length; index++) {
        const elementP = postList[index];
        for (let i = 0; i < userList.length; i++) {
            const elementU = userList[i];
            if (elementP.user == elementU.id) {
                htmlReference.append(callback(elementP, elementU));
            }
        }
    }
}

function modalCreate(post, user) {
    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('modal-wrapper');
    modalWrapper.id = post.id_post;

    const modalItem = document.createElement('div');
    const modalUser = document.createElement('div');
    const modalPicture = document.createElement('img');
    const modalTitles = document.createElement('div');
    const modalName = document.createElement('h2');
    const modalStack = document.createElement('p');

    modalItem.classList.add('modal');
    modalUser.classList.add('modal-user');
    modalPicture.classList.add('modal-picture');


    modalPicture.src = `${user.img}`
    modalPicture.alt = `${user.user}`
    modalTitles.classList.add('modal-titles');
    modalName.classList = 'title2 modal-name';
    modalName.innerText = `${user.user}`
    modalStack.classList = 'text2 modal-stack';
    modalStack.innerText = `${user.stack}`


    const modalContent = document.createElement('div');
    const modalTitle = document.createElement('h2');
    const modalText = document.createElement('p');

    modalContent.classList.add('modal-content');
    modalTitle.classList = 'title1 modal-title';
    modalTitle.innerText = `${post.title}`;
    modalText.classList = "text1 modal-text"
    modalText.innerText = `${post.text}`

    modalContent.append(modalTitle, modalText);

    const modalClose = document.createElement('button');
    modalClose.classList = "bttn bttn-modal-close";
    modalClose.innerText = "X"

    modalClose.addEventListener('click', (event) => {
        event.preventDefault();
        let opemPost = document.getElementById(post.id_post)
        opemPost.classList.toggle('show-modal');
    })

    modalTitles.append(modalName, modalStack);
    modalUser.append(modalPicture, modalTitles);
    modalItem.append(modalUser, modalContent, modalClose);
    modalWrapper.appendChild(modalItem);

    return modalWrapper;
}

renderModals(posts, users, modalCreate, modalContainer);


