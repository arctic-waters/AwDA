const sdk = new AwDA.SDK("https://awse.arct.io/api");

let serArr;
let devArr;
let accArr;

const loginPage = "/login";


let devSource;
let devEditSource;
let devHand;
let devAdd;
let devBox;
let devEditBox;
let devPlace;
let devEditPlace;
let devSelected = -1;
let devCard = -1;

let accDrop;
let accEditDrop;
let accName;
let accEditName;
let accValue
let accEditValue
let accHand;
let accAdd;
let accPlace;
let accEditPlace;
let accSelected = -1;
let accCard = -1;

let accSize = 0;

let serSource;
let serEditSource;
let serHand;
let serAdd;
let serBox;
let serEditBox;
let serPlace;
let serEditPlace;
let serSelected = -1;
let serCard = -1;

let confBox;
let confFile;

let curWin = -1;

let totScore = 0;
let totAm = 0;


updateScore = () => {
  document.getElementById("totScore").innerHTML = "Total Score: " + (((totScore/3.0)/(totAm==0?1:totAm))*100).toFixed(2) + "% Vulnerable";
  document.getElementById("totScore").style.color = "rgb(" + (((totScore/3.0)/(totAm==0?1:totAm))*255) + "," + (100 - ((totScore/3.0)/(totAm==0?1:totAm))*500) + ",0)"
}

const devSearch = function(e) {
  // console.log(devSource.value);

  let res = "";

  for (let i = 0; i < devArr.length; i++){
    const element = devArr[i];
    if(element.name.toLowerCase().includes(devSource.value.toLowerCase())){
      res += `<div name="searchRes" id="${i}" class="searchRes" onclick="select(this)">
        <p class="searchResText">
          ${element.name}
        </p>
      </div>
      <div class = "searchSpacer"></div>`
    }
  }

  devPlace.innerHTML = res;
  devSelected = -1;
}

const devEditSearch = function(e) {
  // console.log(devSource.value);

  let res = "";

  for (let i = 0; i < devArr.length; i++){
    const element = devArr[i];
    if(element.name.toLowerCase().includes(devEditSource.value.toLowerCase())){
      res += `<div name="searchRes" id="${i}" class="searchRes" onclick="select(this)">
        <p class="searchResText">
          ${element.name}
        </p>
      </div>
      <div class = "searchSpacer"></div>`
    }
  }

  devEditPlace.innerHTML = res;
  devSelected = -1;
}

hideDev = () => {
  devBox.hidden = true;
  select(null);
  curWin = -1;
}

showDev = () => {
  devBox.hidden = false;
  curWin = 0;
}

addDev = async (push = true) => {
  //dd
  if(devSelected != -1){

    if(push){
      let dev = await user.addDevice(devArr[devSelected]);
    }

    console.log(devSelected);

    let sev = 0;

    for (let elm of await devArr[devSelected].vulnerabilities()){
      if(elm.severity > sev){ // name, severity, description
        sev = elm.severity;
      }
      console.log(elm)
    }

    totAm++;
    totScore += sev;

    let got;

    if(sev == 1){
      got = "one";
    }else if(sev == 2){
      got = "two";
    }else if(sev == 3){
      got = "three";
    }else {
      got = "none";
    }

    devAdd.insertAdjacentHTML("beforebegin", `
      <div class = "cardd ${got}" id="d_${devSelected}" onclick="showDevEdit(this)">
        <img src="${devArr[devSelected].image}" class="icon">
        <div class="cardTextBox">
          <p class="cardName">${devArr[devSelected].name}</p>
        </div>
      </div>
    `);
    hideDev();
  }
  updateScore();
}


hideDevEdit = () => {
  devEditBox.hidden = true;
  select(null);
  curWin = -1;
}

showDevEdit = async (e) => {
  devEditBox.hidden = false;
  curWin = 0;
  devCard = parseInt(e.id.substring(2));

  let res = "";

  for (let elm of await devArr[devCard].vulnerabilities()){
    res += " - " + elm.description + "\n";
  }

  document.getElementById("vulnDev").innerHTML = res;
}

devSave = async () => {
  if(devCard != -1 && devSelected != -1){

    let sev = 0;

    for (let elm of await devArr[devSelected].vulnerabilities()){
      if(elm.severity > sev){ // name, severity, description
        sev = elm.severity;
      }
      console.log(elm)
    }

    let got;

    if(sev == 1){
      got = "one";
    }else if(sev == 2){
      got = "two";
    }else if(sev == 3){
      got = "three";
    }else {
      got = "none";
    }

    document.getElementById("d_" + devCard).innerHTML =
    `<img src="${devArr[devSelected].image}" class="icon">
    <div class="cardTextBox">
      <p class="cardName">${devArr[devSelected].name}</p>
    </div>`
    document.getElementById("d_" + devCard).className = `cardd ${got}`
    hideDevEdit();
  }
}

devDelete = () => {
  if(devCard != -1){
    document.getElementById("d_" + devCard).remove();
    hideDevEdit();
  }
}


const serSearch = function(e) {
  // console.log(devSource.value);

  let res = "";

  for (let i = 0; i < serArr.length; i++){
    const element = serArr[i];
    if(element.name.toLowerCase().includes(serSource.value.toLowerCase())){
      res += `<div name="searchRes" id="${i}" class="searchRes" onclick="select(this)">
        <p class="searchResText">
          ${element.name + (element.version?(" v" + element.version):"")}
        </p>
      </div>
      <div class = "searchSpacer"></div>`
    }
  }

  serPlace.innerHTML = res;
  serSelected = -1;
}

hideSer = () => {
  serBox.hidden = true;
  select(null);
  curWin = -1;
}

showSer = () => {
  serBox.hidden = false;
  curWin = 1;
}

addSer = async (push = true) => {
  if(serSelected != -1){

    if(push){
      let ser = await user.addSoftware(serArr[serSelected]);
    }

    let sev = 0;

    for (let elm of await serArr[serSelected].vulnerabilities()){
      if(elm.severity > sev){ // name, severity, description
        sev = elm.severity;
      }
      console.log(elm)
    }

    totAm++;
    totScore += sev;

    let got;

    if(sev == 1){
      got = "one";
    }else if(sev == 2){
      got = "two";
    }else if(sev == 3){
      got = "three";
    }else {
      got = "none";
    }

    serAdd.insertAdjacentHTML("beforebegin", `
      <div class = "cardd ${got}" id="s_${serSelected}" onclick="showSerEdit(this)">
        <img src="${serArr[serSelected].image}" class="icon">
        <div class="cardTextBox">
          <p class="cardName">${serArr[serSelected].name + (serArr[serSelected].version?(" v" + serArr[serSelected].version):"")}</p>
        </div>
      </div>
    `);
    hideSer();
  }
  updateScore();
}


const serEditSearch = function(e) {
  // console.log(devSource.value);

  let res = "";

  for (let i = 0; i < serArr.length; i++){
    const element = serArr[i];
    if(element.name.toLowerCase().includes(serEditSource.value.toLowerCase())){
      res += `<div name="searchRes" id="${i}" class="searchRes" onclick="select(this)">
        <p class="searchResText">
          ${element.name + (element.version?(" v" + element.version):"")}
        </p>
      </div>
      <div class = "searchSpacer"></div>`
    }
  }

  serEditPlace.innerHTML = res;
  serSelected = -1;
}

hideSerEdit = () => {
  serEditBox.hidden = true;
  select(null);
  curWin = -1;
}

showSerEdit = async (e) => {
  serEditBox.hidden = false;
  curWin = 1;
  serCard = parseInt(e.id.substring(2));

  let res = "";

  for (let elm of await serArr[serCard].vulnerabilities()){
    res += " - " + elm.description + "\n";
  }

  document.getElementById("vulnSer").innerHTML = res;
}

serSave = async () => {
  if(serCard != -1 && serSelected != -1){

    let sev = 0;

    for (let elm of await serArr[serSelected].vulnerabilities()){
      if(elm.severity > sev){ // name, severity, description
        sev = elm.severity;
      }
      console.log(elm)
    }

    let got;

    if(sev == 1){
      got = "one";
    }else if(sev == 2){
      got = "two";
    }else if(sev == 3){
      got = "three";
    }else {
      got = "none";
    }

    document.getElementById("s_" + serCard).innerHTML =
    `<img src="${serArr[serSelected].image}" class="icon">
    <div class="cardTextBox">
      <p class="cardName">${serArr[serSelected].name + (serArr[serSelected].version?(" v" + serArr[serSelected].version):"")}</p>
    </div>`
    document.getElementById("s_" + serCard).className = `cardd ${got}`
    hideSerEdit();
  }
}

serDelete = () => {
  if(serCard != -1){
    document.getElementById("s_" + serCard).remove();
    hideSerEdit();
  }
}





hideAcc = () => {
  accBox.hidden = true;
  select(null);
  curWin = -1;
  accDrop.value = "Email";
  accName.value = "";
  accValue.value = "";
}

showAcc = () => {
  accBox.hidden = false;
  curWin = 2;
}

addAcc = async (push = true, type = null) => {

  if(type == null){
    type = accDrop.value.toLowerCase();
  }
  let name = accName.value;
  let value = accValue.value;

  if(push) {
    accArr.push(await user.addAccount(type, name, value));
  }

  let vuln = await accArr[accSize].vulnerabilities();

  console.log(vuln)

  totAm++;
  totScore += vuln*2;

  let got;

  if(vuln > 0){
    got = "three";
  }else {
    got = "none";
  }

  accAdd.insertAdjacentHTML("beforebegin", `
    <div class = "cardd ${got}" id="a_${accSize++}" onclick="showAccEdit(this)">
      <img src="${type=="email"?"email.png":"pass.png"}" class="icon">
      <div class="cardTextBox">
        <p class="cardName">${name}</p>
      </div>
    </div>
  `);
  hideAcc();
  updateScore();
}

hideAccEdit = () => {
  accEditBox.hidden = true;
  select(null);
  curWin = -1;
}

showAccEdit = async (e) => {
  accEditBox.hidden = false;

  accCard = parseInt(e.id.substring(2));

  accEditDrop.value = accArr[accCard].type=="email"?"Email":"Password";
  accEditName.value = accArr[accCard].name;
  accEditValue.value = accArr[accCard].value;

  curWin = 1;


  let res = "No vulnerabilities found.";

  if(await accArr[accCard].vulnerabilities() > 0){
    res = "This email or password has been involved in one or more data breaches. <br> Please refer to <a href = 'https://haveibeenpwned.com/'>https://haveibeenpwned.com/</a> for more details."
  }

  document.getElementById("vulnAcc").innerHTML = res;
}

accSave = () => {
  if(accCard != -1){

    let got = "one";

    let type = accEditDrop.value.toLowerCase();
    let name = accEditName.value;

    accArr[accCard] = {"type":type, "name":name, "value":accEditValue.value};

    document.getElementById("a_" + accCard).innerHTML = (`
      <img src="${type=="email"?"email.png":"pass.png"}" class="icon">
      <div class="cardTextBox">
        <p class="cardName">${name}</p>
      </div>
    `);
    hideAccEdit();
  }
}

accDelete = async () => {
  if(accCard != -1){
    document.getElementById("a_" + accCard).remove();
    await user.removeAccount(accArr[accCard]);
    hideAccEdit();
  }
}


showConf = () => {
  confBox.hidden = false;
  curWin = 3;
}

hideConf = () => {
  confBox.hidden = true;
  curWin = -1;
}

openDialog = () => {
  confFile.click();
}


addConf = async () => {
  const a = await sdk.device(2);
  const b = await sdk.software(1);
  const c = await sdk.software(11);
  const d = await sdk.device(3);

  await user.addDevice(a);
  await user.addDevice(d);
  await user.addSoftware(b);
  await user.addSoftware(c);

  console.log(a,b,c,d);

  window.location.reload(false);
}


select = (element) => {
  let got = document.getElementsByName("searchRes");

  for (const el of got){
    el.style.backgroundColor = "#eeeeee";
  }

  if(element != null){
    element.style.backgroundColor = "6addff";
    if(curWin == 0){
      devSelected = parseInt(element.id);
    }else if (curWin == 1){
      serSelected = parseInt(element.id);
    }else if(curWin == 2){
      accSelected = parseInt(element.id);
    }else {
      devSelected = -1;
      serSelected = -1;
      accSelected = -1;
    }
  }else {
    devSelected = -1;
    serSelected = -1;
    accSelected = -1;
  }
}

let user;

window.onload = async function() {

  user = sdk.load();

  if(!user){
    location.href = loginPage;
  }

  // if(localStorage.getItem('Token') == null){
  //   location.href = loginPage;
  // }

  devArr = await sdk.devices();
  serArr = await sdk.allSoftware();
  accArr = await user.accounts(); // id, type = "email" or "password" name=string value = string

  devSource = document.getElementById('devForm');
  devEditSource = document.getElementById('devEditForm');
  devHand = document.getElementById('devices');
  devAdd = document.getElementById('devCardAdd');
  devBox = document.getElementById('devAdd');
  devEditBox = document.getElementById('devEdit');
  devPlace = document.getElementById('devResBox');
  devEditPlace = document.getElementById('devEditResBox');

  accDrop = document.getElementById('accDrop');
  accEditDrop = document.getElementById('accEditDrop');
  accName = document.getElementById('accName');
  accEditName = document.getElementById('accEditName');
  accValue = document.getElementById('accValue');
  accEditValue = document.getElementById('accEditValue');
  accHand = document.getElementById('accounts');
  accAdd = document.getElementById('accCardAdd');
  accBox = document.getElementById('accAdd');
  accEditBox = document.getElementById('accEdit');

  serSource = document.getElementById('serForm');
  serEditSource = document.getElementById('serEditForm');
  serHand = document.getElementById('services');
  serAdd = document.getElementById('serCardAdd');
  serBox = document.getElementById('serAdd');
  serEditBox = document.getElementById('serEdit');
  serPlace = document.getElementById('serResBox');
  serEditPlace = document.getElementById('serEditResBox');

  confBox = document.getElementById('confAdd');
  confFile = document.getElementById('fileid');

  devSource.addEventListener('input', devSearch);
  devEditSource.addEventListener('input', devEditSearch);
  serSource.addEventListener('input', serSearch);
  serEditSource.addEventListener('input', serEditSearch);

  document.getElementById('fileBtn').addEventListener('click', openDialog);

  console.log("started")
  devSearch();
  devEditSearch();
  serSearch();
  serEditSearch();
  updateScore();

  let acc = await user.accounts()
  for (let tmpAcc of acc){
    accName.value = tmpAcc.name;
    accValue.value = tmpAcc.value;
    console.log(tmpAcc)
    await addAcc(false, tmpAcc.type);
  }

  let dev = await user.devices()
  for (let tmpAcc of dev){
    devSelected = devArr.findIndex(element => element.id == tmpAcc.id);
    await addDev(false);
  }

  let ser = await user.software()
  for (let tmpAcc of ser){
    serSelected = serArr.findIndex(element => element.id == tmpAcc.id);
    await addSer(false);
  }
}

document.onkeydown = function (e) {
    e = e || window.event;

    if(e.key === "Escape") {
      hideDev();
      hideSer();
      hideAcc();
      hideDevEdit();
      hideSerEdit();
      hideAccEdit();
    }
};
