// TODO: Paste the Firebase initialization code first
var config = {
apiKey: "AIzaSyB6gtSlZelZY8NeaDovNMQ5kfd0wWNA-ao",
authDomain: "moisbo-ga-js1.firebaseapp.com",
databaseURL: "https://moisbo-ga-js1.firebaseio.com",
storageBucket: "",
};
// Initialize Firebase
firebase.initializeApp(config);
// State
var state = {
    items:[]
};
// TODO: Your code below

firebase.database().ref('tasks/').on('value', (snapshot) => {
    state.items = snapshot.val();
    renderList(state, document.querySelector('ul'))
});

document.querySelector('button').addEventListener('click', () => {
    var newItem = document.querySelector('#new-item');
    firebase.database().ref('tasks/').push({item:newItem.value, done:false});
});

delegate('ul', 'click', 'li', (event) => {
    var id = event.target.dataset.id;
    console.log(event.delegateTarget);
    firebase.database().ref('tasks/' + id).remove();
    renderList(state, document.querySelector('ul'));
});

delegate('ul', 'click', 'span', (event) => {
    console.log(event.target);
    var id = event.target.dataset.id;
    console.log(event.delegateTarget);
    firebase.database().ref('tasks/'+id).update({done:true});
    renderList(state, document.querySelector('ul'));
});

function renderList(data, into) {
    var arr = '';
    Object.keys(data.items).forEach((el) => {
        arr += `<li data-id="${el}"><span data-id="${el}">${isDone(data.items[el].done)}</span> - ${data.items[el].item}</li>`
    }); 
    into.innerHTML = arr;  
}
function isDone(el) {
    if(el)return 'done';
    else return 'pending';
}