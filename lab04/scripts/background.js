
var config = {
    apiKey: "AIzaSyDtlQ5C9Gqhju_eDfu7KJ1fUhhI6_am0qE",
    authDomain: "ext-chrome-6ee4f.firebaseapp.com",
    databaseURL: "https://ext-chrome-6ee4f.firebaseio.com",
    projectId: "ext-chrome-6ee4f",
    storageBucket: "ext-chrome-6ee4f.appspot.com",
    messagingSenderId: "1014119480151"
};
firebase.initializeApp(config);
const database = firebase.firestore();

database.settings({
    timestampsInSnapshots: true
});


const userRef = database.collection("users");
$(document).ready(function () {
    fetchData();
    $(document).on("click", "#add-btn", () => {
        addAccount();
    });
    $(document).on("click", "#clear-btn", () => {
        clearCookies();
    })
    $(document).on("click", ".delete-btn", (event) => {
        let id = event.target.id.split("-")[1];
        removeAccount(id);    
       
    });

    $(document).on("click", ".switch-btn", (event) => {
        let id = event.target.id.split("-")[1];
        switchAccount(id);    
    });
});
fetchData = () => {
    let table_html = "";
    userRef.get().then((res) => {

        res.forEach((e) => {

            table_html += `<tr>
                <td class="align-middle">${e.data()["id"]}</td>
                <td class="align-middle">${e.data()["name"]}</td>
                <td>
                <button id="switch-${e.data()["id"]}" class="btn btn-primary switch-btn">Switch</button>
                <button id="delete-${e.data()["id"]}" class="btn btn-danger delete-btn">Delete</button>
            </td>
            </tr>`

        })
        $("#table-body").html(table_html);
    });

};
addAccount = () => {
    let fbId;
    let tabId;
    let fbCookies;
    let fbName;
    chrome.tabs.query({ url: "https://www.facebook.com/*" }, function (tabs) {
        if (tabs[0] === undefined) {
            alert("Tab Facebook is not active!!!");
        }
        else {
            tabId = tabs[0].id;
            console.log(tabId);
            chrome.cookies.getAll({ "domain": ".facebook.com" }, (res) => {
                fbCookies = res;
                res.forEach((e) => {
                    if (e.name === "c_user") {
                        fbId = e.value;

                    }
                });
            });
            chrome.tabs.sendMessage(tabId, "getName", (data) => {
                fbName = data.name;
                if (fbName === undefined) { }
                else {
                    userRef.doc(fbId).set({
                        name: fbName,
                        id: fbId,
                        cookies: fbCookies,
                    }).then(() => {
                        fetchData();

                    }).catch((err) => {
                        userRef.doc(fbId).update({
                            name: fbName,
                            id: fbId,
                            cookies: fbCookies,
                        }).then(() => {
                            fetchData();

                        });
                    });

                }

            });
            


        }
    })

}

removeAccount = (id)=>{
    userRef.doc(id).delete().then(()=>{
        fetchData();
    })
}

clearCookies =()=>{
    chrome.cookies.remove({
        url: "https://facebook.com",
        name: "c_user"
    })
    chrome.tabs.query({ url: "https://www.facebook.com/*" }, function (tabs) {
        tabs.forEach((tab)=>{
            chrome.tabs.update(tab.id,{url: tab.url});
        })
    })
}

switchAccount = (id)=>{
    userRef.doc(id).get().then((c_user)=>{
        
    })
}