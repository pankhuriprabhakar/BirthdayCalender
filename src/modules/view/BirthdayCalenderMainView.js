import PeopleCollection from "./../model/PeopleCollection.js";

class MainContainerLayout {
  constructor() {
    var that = this;

    this.getYearAndPeopleDetails = this.getYearAndPeopleDetails.bind(this);
    this.UserInteractionContainer = document.createElement('div');
    this.UserInteractionContainer.setAttribute("id", "userInteractionContainer");
    this.header = document.createElement('div');
    this.header.setAttribute("id", "headerBirthday");
    this.header.innerText = "Birthday Calender";
    document.getElementById("mainContainer").appendChild(this.header)

  }

  renderWeekCardS() {
    this.weekNamesArray = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    var weekCardsContainer = document.createElement('div')
    weekCardsContainer.setAttribute("id", "weekCardsContainer");
    document.getElementById("mainContainer").appendChild(weekCardsContainer)
    var weekCards = this.weekNamesArray.map(function (weekName, weekIndex, weekArr) {
      return `
      <div id="${weekIndex}" class= "weekCard ${weekIndex}">
      <div id="weekNameHeader">${weekName}</div>
      <div id="birthdayNamesWeekContainer"></div>
      </div>
      `

    }).join("")
    document.querySelector("#weekCardsContainer").innerHTML = weekCards;
  }
  renderJSONTextArea() {
    var birthdayInfoContainer = document.createElement('div')
    birthdayInfoContainer.setAttribute("id", "birthdayInfoContainer");
    birthdayInfoContainer.setAttribute("class", "col-xs-7");

    var inputJSONcontainer = `
    <textarea id="inputJSON" name="inputJSON" rows="20" cols="100"> 
    [ {
      "name": "Sansa Stark",
      "birthday": "08/08/1980"
    },
      {
        "name": "Tyrion Lannister",
        "birthday": "12/02/1979"
      }, {
        "name": "Cersei Lannister",
        "birthday": "11/30/1979"
      }, {
        "name": "Daenerys Targaryen",
        "birthday": "11/24/1979"
      }, {
        "name": "Arya Stark",
        "birthday": "11/25/1979"
      }, {
        "name": "Jon Snow",
        "birthday": "12/03/1979"
      }, {
        "name": "Sansa Stark",
        "birthday": "08/08/1979"
      }, {
        "name": "Sansa Stark",
        "birthday": "08/08/1980"
      }
    ]
    </textarea>
    `
    document.getElementById("mainContainer").appendChild(this.UserInteractionContainer)
    document.getElementById("userInteractionContainer").appendChild(birthdayInfoContainer)
    document.querySelector("#birthdayInfoContainer").innerHTML = inputJSONcontainer;

  }
  renderYearInputAndSubmitButton() {
    var that = this;
    that.birthdayYearInput = document.createElement('div');
    that.birthdayYearLabel = document.createElement('div');
    that.birthdayYearLabel.innerText = "Year"
    var birthdayYearInput = document.createElement('input')
    birthdayYearInput.setAttribute("id", "birthdayYearInput");
    birthdayYearInput.setAttribute("type", "number");
    birthdayYearInput.setAttribute("min", "1");
    birthdayYearInput.setAttribute("value", "1979");

    var birthdayYearContainer = document.createElement('div')
    birthdayYearContainer.setAttribute("id", "birthdayYearContainer");
    birthdayYearContainer.setAttribute("class", "col-xs-5");
    document.getElementById("userInteractionContainer").appendChild(birthdayYearContainer)
    document.querySelector("#birthdayYearContainer").appendChild(that.birthdayYearLabel);
    document.querySelector("#birthdayYearContainer").appendChild(that.birthdayYearInput);
    that.birthdayYearInput.appendChild(birthdayYearInput);

    //submitButton
    var submitButton = document.createElement('input')
    submitButton.setAttribute("type", "button");
    submitButton.setAttribute("value", "Update");
    submitButton.addEventListener("click", that.getYearAndPeopleDetails)

    document.querySelector("#birthdayYearContainer").appendChild(submitButton);
  }
  getYearAndPeopleDetails() {
    var namesContainers = document.querySelectorAll("#birthdayNamesWeekContainer");
    namesContainers.forEach(function (weekNamesContainer) {
      weekNamesContainer.innerHTML = ""
    })
    var that = this;
    var jsonData = document.getElementById("inputJSON").value;
    var birthdayYear = document.getElementById("birthdayYearInput").value;
    that.peopleCollectionInstance = new PeopleCollection();
    var peopleDetailsArray = that.peopleCollectionInstance.parseData(jsonData);
    if (peopleDetailsArray !== null) {
      if (peopleDetailsArray.length !== 0) {
        this.separatePeopleBirthdaysByDay(peopleDetailsArray, birthdayYear);
        this.sortWeekCardsByBirthdays();
        this.renderPersonNameCards();
      }
    }
  }
  separatePeopleBirthdaysByDay(peopleDetailsArray, birthdayYear) {
    var that = this;
    var birthdayYear = birthdayYear;
    this.allWeeksArray = [];
    this.SUN = []; this.MON = []; this.TUE = []; this.WED = []; this.THU = []; this.FRI = []; this.SAT = [];
    peopleDetailsArray.forEach(function (personInfo) {
      var personBirthday = personInfo.birthday;
      var personBirthdayYear = new Date(personBirthday).getFullYear();
      if (personBirthday !== "Invalid Date" && personBirthdayYear == birthdayYear) {
        switch (new Date(personBirthday).getDay()) {
          case 0:
            that.SUN.push(personInfo);
            break;
          case 1:
            that.MON.push(personInfo);
            break;
          case 2:
            that.TUE.push(personInfo);
            break;
          case 3:
            that.WED.push(personInfo);
            break;
          case 4:
            that.THU.push(personInfo);
            break;
          case 5:
            that.FRI.push(personInfo);
            break;
          case 6:
            that.SAT.push(personInfo);
        }
      }
    })

    this.allWeeksArray.push(this.MON);
    this.allWeeksArray.push(this.TUE);
    this.allWeeksArray.push(this.WED);
    this.allWeeksArray.push(this.THU);
    this.allWeeksArray.push(this.FRI);
    this.allWeeksArray.push(this.SAT);
    this.allWeeksArray.push(this.SUN);
    console.log(this.allWeeksArray);
  }
  sortWeekCardsByBirthdays() {
    this.allWeeksArray.forEach(function (week) {
      week.sort(function (a, b) {
        return new Date(a.birthday).getTime() - new Date(b.birthday).getTime();
      });
    })
    console.log(this.allWeeksArray);
  }
  renderPersonNameCards() {
    this.allWeeksArray.forEach(function (eachWeekArray, weekCount) {
      var eachWeekCard = document.getElementById(weekCount);//'#\\31 '
      eachWeekArray.forEach(function (personObject, indexNameCard) {
        var matches = personObject.name.match(/\b(\w)/g);
        var initials = matches.join('');
        var cardView = document.createElement("div");
        cardView.setAttribute("class", "name_card " + indexNameCard);
        // cardView.setAttribute("value",  initials);
        eachWeekCard.children[1].appendChild(cardView);
        cardView.innerText = initials

      });
    })
  }
}
export default MainContainerLayout