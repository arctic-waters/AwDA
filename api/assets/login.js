const sdk = new AwDA.SDK("https://awda.arct.io/api");
const mainPage = "/";




loginBtn = () => {
  sdk.login(document.getElementById("un").value, document.getElementById("pass").value).then( (e) => {
    e.save();
    location.href = mainPage;
  });
}

signBtn = () => {
  sdk.signup(document.getElementById("un").value, document.getElementById("pass").value).then( (e) => {
    e.save();
    location.href = mainPage;
  });
}
