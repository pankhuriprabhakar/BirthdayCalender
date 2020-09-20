
import MainContainerLayout from "./../view/BirthdayCalenderMainView.js";
class BirthdayCalenderController {
  constructor() {
    var that = this;
    this.mainViewInstance = new MainContainerLayout();
    this.mainViewInstance.renderWeekCardS();
    this.mainViewInstance.renderJSONTextArea();
    this.mainViewInstance.renderYearInputAndSubmitButton();
  }
}
export default BirthdayCalenderController